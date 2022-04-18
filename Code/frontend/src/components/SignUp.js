import "./SignUp.css";
import { React } from "react"
import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";

function useSignUp() {
    const [fields, setFields] = useState({
        username: "",
        password: "",
        passwordConfirmation: "",
    })
    const [errors, setErrors] = useState({})


    useEffect(() => {
        const checkUsername = checkUsernameStrength(fields.username)
        let usernameError = undefined
        // if (fields.username.length === 0) {
        //     usernameError = "Please insert a username."
        if (checkUsername === 0) {
            usernameError = "Your username should have at least 5 characters."
        }

        setErrors(err => ({
            ...err,
            username: usernameError
        }))
    }, [fields.username])

    useEffect(() => {
        // console.log(fields)
        // Validação da Password
        const passwordStrength = checkPasswordStrength(fields.password)
        let passwordError = undefined
        //if (fields.password.length === 0) {
        //    passwordError = "Please insert a new password."
        if (fields.password.length > 0 && fields.password.length < 9) {
            passwordError = "Your password should have at least 9 characters."
        } else if (passwordStrength < 3 && passwordStrength > 0) {
            passwordError = "Your password should have a lowercase letter, an uppercase letter and a number."
        }

        let passwordConfirmationError = undefined
        // if (fields.passwordConfirmation.length === 0) {
        //     passwordConfirmationError = "Please insert you password again."
        if (fields.passwordConfirmation.length !== 0 && fields.password !== fields.passwordConfirmation) {
            passwordConfirmationError = "The passwords do not match."
        }

        setErrors(err => ({
            ...err,
            password: passwordError,
            passwordConfirmation: passwordConfirmationError
        }))

        // Validação da Confirmação da Password
    }, [fields.password, fields.passwordConfirmation])

    return [fields, setFields, errors, setErrors]
}

export function SignUp({ onSubmit }) {
    const [fields, setFields, errors, setErrors] = useSignUp()
    // const [visible, setVisible] = useState(false)

    let navigate = useNavigate();

    async function checkSignup(fields) {
        const res = await fetch('/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
                fields
            )
        })

        if (res.status === 201) {
            alert("Account created successfully! Please login.")
        }

        // if (res.status === 200) {
        //     Navigate("/home")
        // }

        const responseJson = await res.json();
        return responseJson
    }

    return (
        <div>
            <form onSubmit={async (e) => {
                e.preventDefault();
                const existingErrors = Object.keys(errors)
                    .map(key => errors[key])
                    .filter(v => v !== undefined)
                if (existingErrors.length === 0) {
                    const res = await onSubmit(fields)
                    if (res.errors) {
                        setErrors(res.errors)
                    }
                }
            }}>

                <div className="field">
                    <TextInput
                        name="username"
                        fields={fields}
                        errors={errors}
                        setFields={setFields}
                    />
                </div>

                <div className="field">
                    <PasswordInput
                        name="password"
                        fields={fields}
                        errors={errors}
                        setFields={setFields}
                    />
                </div>

                <div className="field">
                    <CPasswordInput
                        name="passwordConfirmation"
                        fields={fields}
                        errors={errors}
                        setFields={setFields}
                    />
                </div>
                {/* <div>
                    {
                        visible ? <Window /> : ""
                    }
                </div> */}
                <button className="buttonSignup" type="submit"
                    onClick={() =>
                        checkSignup(fields)
                        // ,setVisible(st => !st)
                    }>
                    SIGN UP
                </button>
            </form>

        </div>
    )
}

// const Window = () => {
//     return (
//         <div className="containerwindow">
//             <div className="window">
//                 <button>yo</button>
//                 <button>yo</button>
//                 <button>yo</button>
//                 <button>yo</button>
//             </div>
//         </div>
//     )
// }


function TextInput({ fields, setFields, name, errors, type = "text" }) {
    return (
        <div>
            <input
                placeholder="Insert a username"
                id={name}
                type={type}
                value={fields[name]}
                onChange={(e) => setFields(f => ({
                    ...f,
                    [name]: e.target.value
                }))}
            />
            {
                errors && errors[name] !== undefined && (
                    <div>
                        {errors[name]}
                    </div>
                )
            }
        </div>
    )
}

function TextInput2({ fields, setFields, name, errors, type = "text" }) {
    return (
        <div>
            <input
                placeholder="Insert a password"
                id={name}
                type={type}
                value={fields[name]}
                onChange={(e) => setFields(f => ({
                    ...f,
                    [name]: e.target.value
                }))}
            />
            {
                errors && errors[name] !== undefined && (
                    <div>
                        {errors[name]}
                    </div>
                )
            }
        </div>
    )
}

function TextInput3({ fields, setFields, name, errors, type = "text" }) {
    return (
        <div>
            <input
                placeholder="Confirm your password"
                id={name}
                type={type}
                value={fields[name]}
                onChange={(e) => setFields(f => ({
                    ...f,
                    [name]: e.target.value
                }))}
            />
            {
                errors && errors[name] !== undefined && (
                    <div>
                        {errors[name]}
                    </div>
                )
            }
        </div>
    )
}


function PasswordInput(props) {
    // const [visible, setVisible] = useState(false)
    return (
        <div>
            {< TextInput2 {...props} type="password" />}
            {/* <TextInput {...props} type={visible ? "text" : "password"} />
            {/* <button className="showhideCP" type="button" onClick={() => setVisible(v => !v)}>
                {visible ? 'Hide' : 'Show'}
            </button> */}
        </div>
    )
}

function CPasswordInput(props) {
    // const [visible, setVisible] = useState(false)
    return (
        <div>
            {< TextInput3 {...props} type="password" />}
            {/* <TextInput {...props} type={visible ? "text" : "password"} />
            {/* <button className="showhideCP" type="button" onClick={() => setVisible(v => !v)}>
                {visible ? 'Hide' : 'Show'}
            </button> */}
        </div>
    )
}

function checkUsernameStrength(username) {
    if (username.length > 0)
        if (username.length < 5) return 0;
    return 1
}


function checkPasswordStrength(password) {
    // if (password.length > 1 && password.length < 9) return 1;
    const regexes = [
        /[a-z]/,
        /[A-Z]/,
        /[0-9]/,
    ]
    return regexes
        .map(re => re.test(password))
        .reduce((score, t) => t ? score + 1 : score, 0)
}