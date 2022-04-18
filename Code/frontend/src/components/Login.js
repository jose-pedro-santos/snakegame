import "./Login.css"
import { React } from "react"
import { useState } from 'react'
import { useNavigate } from "react-router-dom";

// function useLogin() {
//     const [fields, setFields] = useState({
//         username: "",
//         password: "",
//     })
//     const [errors, setErrors] = useState({})

//     useEffect(() => {
//         let errorMessage = undefined
//         if (fields.username === username) {
//             errorMessage = "Incorrect username and password combination."
//         }

//         setErrors(err => ({
//             ...err,
//             username: usernameError
//         }))
//     }, [fields.username])
// }

export function Login({ onSubmit }) {
    const [fields, setFields] = useState({
        username: "",
        password: ""
    })

    const [errors, setErrors] = useState({})

    let navigate = useNavigate();

    async function checkLogin(fields) {
        const res = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
                fields
            )
        })

        const responseJson = await res.json();

        if (res.status === 200) {
            localStorage.setItem("token", responseJson.token)
            navigate("/home")
        }


        return responseJson
    }


    return (
        <div>
            <form
                onSubmit={async (e) => {
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
                }}
            // afterSubmit={() => setToHome(true)}
            >
                <div className="field1">
                    <TextInput
                        name="username"
                        fields={fields}
                        errors={errors}
                        setFields={setFields} />
                </div>
                <div className="field2">
                    <PasswordInput
                        name="password"
                        fields={fields}
                        errors={errors}
                        setFields={setFields} />
                </div>
                <button className="buttonLogin" type="submit" onClick={() => checkLogin(fields)}>
                    LOGIN
                </button>

            </form>

        </div>
    )
}

function TextInput({ fields, setFields, name, errors, type = "text" }) {
    return (
        <div>
            <div>
                <div className="errorLogin">
                    {
                        errors && errors[name] !== undefined && (
                            <div>
                                {errors[name]}
                            </div>
                        )
                    }
                </div>
                <input
                    className="inputlogin"
                    placeholder="Insert your username"
                    id={name}
                    type={type}
                    value={fields[name]}
                    onChange={(e) => setFields(f => ({
                        ...f,
                        [name]: e.target.value
                    }))}
                />

            </div>
        </div>
    )
}

function TextInput2({ fields, setFields, name, errors, type = "text" }) {
    return (
        <div>
            {
                errors && errors[name] !== undefined && (
                    <div>
                        {errors[name]}
                    </div>
                )
            }
            <input
                className="inputlogin"
                placeholder="Insert your password"
                id={name}
                type={type}
                value={fields[name]}
                onChange={(e) => setFields(f => ({
                    ...f,
                    [name]: e.target.value
                }))}
            />

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