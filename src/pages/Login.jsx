import React, { useState, useContext } from 'react'
import { AuthContext } from '../context/AuthContext';
import config from "../config";
import '../styles/Login.css'

function Login() {
    const baseURL = process.env.NODE_ENV === 'production' ? config.production : config.local;

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { user, dispatch } = useContext(AuthContext)
    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch(`${baseURL}/api/users/login`, {
            // const response = await fetch('https://blog-server-llqa.onrender.com/api/users/login', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })

        const json = await response.json();

        if (response.ok) {
            //Save user and token to local storage
            localStorage.setItem('user', JSON.stringify(json));

            //Set user in authcontext i.e dispatch action
            dispatch({ type: "LOGIN", payload: json })
        }
    }

    return (
        <div className='login-container' >
            <div className="login-content">
                <h1>Login</h1>

                <form onSubmit={handleSubmit} >
                    <div>
                        <label>Email : </label> <br />
                        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} /> <br />
                    </div>

                    <div>
                        <label>Password : </label> <br />
                        <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} /> <br />
                    </div>


                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default Login