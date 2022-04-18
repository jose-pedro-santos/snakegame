// const express = require("express")
// const { connectToMongo, getMongoCollection, insertUser, insertScore, findUserByUsername, insertSession, findSessionByToken, readAllScores } = require("./db")
// const app = express()
// const port = process.env.PORT ?? 9000
// app.use(express.json())

// let scores = []


// ////////////////////////////////////////////
// app.post("/signup", async (req, res) => {
//     const errors = await validateNewUser(req.body)

//     if (Object.keys(errors).length === 0) {
//         const { passwordConfirmation, ...username } = req.body
//         const id = await insertUser(username)
//         res.status(201).json({
//             "message": "User created.",
//             _id: id
//         })
//         return
//     }
//     res.status(400).json({
//         message: "The data is not valid.",
//         errors
//     })
// })



// ////////////////////////////////////////////
// app.post("/login", async (req, res) => {
//     const { username, password } = req.body

//     const id = await findUserByUsername(username)
//     if (!username || username.password !== password)
//         return res
//             .status(404)
//             .json({ errors: { username: "Incorrect username and password combination." } })

//     const token = await insertSession({ username })
//     res.status(200).json({ _id: id, token })
// })



// ////////////////////////////////////////////
// app.post("/score", async (req, res) => {
//     const { username, score } = req.body
//     scores.push(req.body)
//     res.status(200).json({ _id: await insertScore(req.body) })
// })



// //////////////////////////////////////////////
// app.get("score", async (req, res) => {
//     const { username, score } = req.params
//     const scores = await readAllScores(req.params)
//     // const scoresUser = scores.filter(s => s.username === username)
//     return res.status(200).json(scores)
// })


// /////////////////////////////////////////////
// app.get("/user/score", async (req, res) => {
//     const { username, score } = req.params
//     const scores = await readAllScores(req.params)
//     if (username === req.params.id)
//         // const scoresUser = scores.filter(s => s.username === username)
//         return res.status(200).json(scores)
// })


// // HIGHEST SCORE

// app.get("/user/highest", async (req, res) => {
//     const { username, score } = req.params
//     const scores = await readAllScores(req.params)
//     const highest = scores.reduce((acc, e) => acc.score > e.score ? acc : e)
//     if (username === req.params.id)
//         // const scoresUser = scores.filter(s => s.username === username)
//         return res.status(200).json({ score: highest.score })
// })


// // LAST FIVE SCORES

// app.get("/user/lastfive", async (req, res) => {
//     const { username, score } = req.params
//     const scores = await readAllScores(req.params)
//     const lastfive = scores.slice(Math.max(scores.length - 5, 0))
//     if (username === req.params.id)
//         // const scoresUser = scores.filter(s => s.username === username)
//         return res.status(200).json(lastfive.map(e => ({ score: e.score })))
// })

// // arr.slice(Math.max(arr.length - 5, 1))


// ////////////////////////////////////////////
// app.get("/username", async (req, res) => {
//     const token = req.header("authorization")
//     console.log(token)
//     if (token === undefined)
//         return res
//             .status(401)
//             .json({ message: "The authentication token has not been sent." })

//     const session = await findSessionByToken(token)
//     if (!session)
//         return res
//             .status(403)
//             .json({ message: "There isn't a session with the selected token." })

//     const user = await findUserByUsername(session.username)
//     delete user.password

//     res.status(200).json(user)
// })


// app.listen(port, () => console.log(`À escuta em http://localhost:${port}`))

// async function validateNewUser(data) {
//     const errors = {}
//     if (data.username === undefined || data.username.length === 0) {
//         errors.username = "Please insert your username."
//     } else if (!checkUsernameStrength(data.username)) {
//         errors.username = "Please insert a valid username."
//     } else if (Boolean(await findUserByUsername(data.username))) {
//         errors.username = "The username is already being used."
//     }

//     if (data.password === undefined) {
//         errors.password = "Please insert your password."
//     } else {
//         const passwordStrength = checkPasswordStrength(data.password)
//         if (data.password.length === 0) {
//             errors.password = "Please insert your password."
//         } else if (passwordStrength === 0) {
//             errors.password = "Your password should have at least 9 characters."
//         } else if (passwordStrength < 3) {
//             errors.password = "Your password should have a lowercase letter, a uppercase letter and a number."
//         }
//     }

//     if (data.passwordConfirmation === undefined || data.passwordConfirmation.length === 0) {
//         errors.passwordConfirmation = "Please insert your password again."
//     } else if (data.password !== data.passwordConfirmation) {
//         errors.passwordConfirmation = "The passwords don't match."
//     }

//     return errors
// }


// function checkUsernameStrength(username) {
//     if (username.length < 5) return 0;
//     return true
// }

// function checkPasswordStrength(password) {
//     if (password.length < 9) return 0;
//     const regexes = [
//         /[a-z]/,
//         /[A-Z]/,
//         /[0-9]/,
//     ]
//     return regexes
//         .map(re => re.test(password))
//         .reduce((score, t) => t ? score + 1 : score, 0)
// }