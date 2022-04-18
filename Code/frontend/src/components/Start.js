import { SignUp } from "./SignUp.js"
import { Login } from "./Login.js"
import './Start.css';

export function Start() {
    return (
        <div>
            <h1 className="titlestart">SNAKE</h1>
            <div className="container">
                <div className="signup">
                    <h2>Create a New Account</h2>
                    <SignUp onSubmit={async (fields) => {
                        const res = await fetch('/signup', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(
                                fields
                            )
                        })
                        const responseJson = await res.json();
                        return responseJson
                    }}
                    />

                </div>
                <div className="login">
                    <div className="headerlogin">
                        <p>Already have an account?</p>
                        <h2>Login</h2>
                    </div>
                    <Login onSubmit={async function checkLogin(fields) {
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
                        return responseJson
                    }} />
                </div>
            </div>
        </div>
    );
}

export default Start;