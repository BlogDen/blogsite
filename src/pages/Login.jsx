import React, { useState, useContext } from 'react'
import { AuthContext } from '../context/AuthContext';
import config from "../config";

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
        <div style={{ "margin": "20px" }} >
            <h1 className='text-5xl font-bold mb-4' >Login</h1>

            <form onSubmit={handleSubmit} >
                <label>Email : </label> <br />
                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} className="input input-sm input-bordered input-success w-full max-w-xs" /> <br />

                <label>Password : </label> <br />
                <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} className="input input-sm input-bordered input-success w-full max-w-xs" /> <br />

                <button type="submit" className="btn btn-outline btn-success mt-4" >Submit</button>
            </form>
        </div>
    )
}

export default Login