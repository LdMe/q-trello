import { useState } from "react";
import { register, login } from "../utils/fetch";
import { saveToken } from "../utils/local";

const Register = ({ onSubmit }) => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordRepeat, setPasswordRepeat] = useState("");
    const [error, setError] = useState("");
    const [isRegister, setIsRegister] = useState(false);

    const handleLogin = async () => {
        const response = await login({
            username,
            password
        })
        if (response.token ) {
            saveToken(response.token);
            onSubmit(response.token);
        } else {
            setError(response.message);
        }
    }

    const handleRegister = async () => {
        if (password !== passwordRepeat) {
            setError("Passwords do not match");
            return;
        }
        const response = await register({
            username,
            email,
            password,
            passwordRepeat
        })
        if (response.status === 200) {
            setIsRegister(false);
        } else {
            setError(response.message);
        }
    }

    const handleSubmit = (e) => {

        e.preventDefault();
        if (isRegister) {
            handleRegister();
        } else {
            handleLogin();
        }
    }

    return (
        <>
            {isRegister ? <h2>Register</h2> : <h2>Login</h2>}
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                {isRegister &&
                    <>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </>
                }
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {isRegister && (
                    <>
                        <label htmlFor="passwordRepeat">Repeat Password</label>
                        <input
                            type="password"
                            id="passwordRepeat"
                            name="passwordRepeat"
                            value={passwordRepeat}
                            onChange={(e) => setPasswordRepeat(e.target.value)}
                        />
                    </>
                )}

                < button type="submit">{isRegister ? "Register" : "Login"}</button>
                {error && <p>{error}</p>}
            </form >
            <button onClick={() => setIsRegister(!isRegister)}>{isRegister ? "Login" : "Register"}</button>

        </>
    )
}

export default Register
