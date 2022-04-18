const express = require("express")
const { connectToMongo, getMongoCollection, insertUser, insertScore, findUserByUsername, insertSession, findSessionByToken, readAllScores } = require("./db")
const app = express()
const port = process.env.PORT ?? 5000
app.use(express.json())

// let scores = []


// SIGNUP //////////////////////////////////
app.post("/signup", async (req, res) => {
    const errors = await validateNewUser(req.body)

    if (Object.keys(errors).length === 0) {
        const { passwordConfirmation, ...username } = req.body
        const id = await insertUser(username)
        res.status(201).json({
            "message": "User created.",
            _id: id
        })
        return
    }
    res.status(400).json({
        message: "The data is not valid.",
        errors
    })
})


// LOGIN //////////////////////////////////
app.post("/login", async (req, res) => {
    const { username, password } = req.body
    const id = await findUserByUsername(username)
    if (!id || id.password !== password)
        return res
            .status(404)
            .json({ errors: { username: "Incorrect username and password combination." } })

    const token = await insertSession({ username: username })
    res.status(200).json({ token })
})


// GET USERNAME /////////////////////////////
app.get("/username", async (req, res) => {
    const token = req.header("authorization")
    console.log(token)
    if (token === undefined)
        return res
            .status(401)
            .json({ message: "The authentication token has not been sent." })

    const session = await findSessionByToken(token)
    if (!session)
        return res
            .status(403)
            .json({ message: "There isn't a session with the selected token." })

    const user = await findUserByUsername(session.username)
    delete user.password

    res.status(200).json(user)
})


// ADD SCORE //////////////////////////////////
// app.post("/score", async (req, res) => {
//     const { username, score } = req.body
//     scores.push(req.body)
//     res.status(200).json({ _id: await insertScore(req.body) })
// })

// ADD SCORE //////////////////////////////////
app.post("/score", async (req, res) => {
    const { score } = req.body
    const token = req.header("authorization")
    console.log(token)
    if (token === undefined)
        return res
            .status(401)
            .json({ message: "The authentication token has not been sent." })

    const session = await findSessionByToken(token)
    if (!session)
        return res
            .status(403)
            .json({ message: "There isn't a session with the selected token." })

    const id = await insertScore({ username: session.username, score })
    res.sendStatus(200)
})

// app.delete("/session", async (req, res) => {
//     const { username } = req.body
//     const token = req.header("authorization")
// })


// GET SCORES ////////////////////////////////
app.get("/scores", async (req, res) => {
    const all = await readAllScores()
    // const scoresUser = scores.filter(s => s.username === username)
    return res.status(200).json({ scores: all })
})


// GET USER SCORE //////////////////////////////////
app.get("/user/score", async (req, res) => {
    const { username, score } = req.params
    const scores = await readAllScores(req.params)
    if (username === req.params.id)
        // const scoresUser = scores.filter(s => s.username === username)
        return res.status(200).json(scores)
})



// GET USER HIGHEST SCORE //////////////////////////////////
app.post("/user/highest", async (req, res) => {
    const { username } = req.body
    const scores = await readAllScores()
    if (scores.filter(e => e.username === username).length === 0) {
        return res.status(400).json({ score: 0 })
    }
    const highest = scores.filter(e => e.username === username).reduce((acc, e) => acc.score > e.score ? acc : e)
    // const scoresUser = scores.filter(s => s.username === username)

    return res.status(200).json({ score: highest.score })
})


// GET USER LAST FIVE SCORES //////////////////////////////////

app.post("/user/lastfive", async (req, res) => {
    const { username } = req.body
    const scores = await readAllScores()
    if (scores.filter(e => e.username === username).length === 0) {
        return res.status(400).json({ score: 0 })
    }
    const filterScores = scores.filter(e => e.username === username)
    const last = filterScores.slice(filterScores.length < 5 ? 0 : filterScores.length - 5)
    // const scoresUser = scores.filter(s => s.username === username)

    return res.status(200).json({ scores: last })
})



app.listen(port, () => console.log(`À escuta em http://localhost:${port}`))


async function validateNewUser(data) {
    const errors = {}
    if (data.username === undefined || data.username.length === 0) {
        errors.username = "Please insert your username."
    } else if (!checkUsernameStrength(data.username)) {
        errors.username = "Please insert a valid username."
    } else if (Boolean(await findUserByUsername(data.username))) {
        errors.username = "The username is already being used."
    }

    if (data.password === undefined) {
        errors.password = "Please insert your password."
    } else {
        const passwordStrength = checkPasswordStrength(data.password)
        if (data.password.length === 0) {
            errors.password = "Please insert your password."
        } else if (passwordStrength === 0) {
            errors.password = "Your password should have at least 9 characters."
        } else if (passwordStrength < 3) {
            errors.password = "Your password should have a lowercase letter, a uppercase letter and a number."
        }
    }

    if (data.passwordConfirmation === undefined || data.passwordConfirmation.length === 0) {
        errors.passwordConfirmation = "Please insert your password again."
    } else if (data.password !== data.passwordConfirmation) {
        errors.passwordConfirmation = "The passwords don't match."
    }

    return errors
}


function checkUsernameStrength(username) {
    if (username.length < 5) return 0;
    return true
}

function checkPasswordStrength(password) {
    if (password.length < 9) return 0;
    const regexes = [
        /[a-z]/,
        /[A-Z]/,
        /[0-9]/,
    ]
    return regexes
        .map(re => re.test(password))
        .reduce((score, t) => t ? score + 1 : score, 0)
}