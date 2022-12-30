import React, { useState } from 'react'
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import config from "../config";
import '../styles/Signup.css'
import ClipLoader from "react-spinners/ClipLoader";


function Signup() {
    const baseURL = process.env.NODE_ENV === 'production' ? config.production : config.local;

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { user, dispatch } = useContext(AuthContext)
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const response = await fetch(`${baseURL}/api/users/signup`, {
            // const response = await fetch('https://blog-server-llqa.onrender.com/api/users/signup', {
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
            setIsLoading(false);
        }
    }

    const override = {
        display: "block",
        margin: "0 auto",
        marginTop: "25vh"
    };

    return (
        <div className='signup-container' >
            {
                isLoading ? <div className='dud'>
                    <ClipLoader aria-label="Loading Spinner" cssOverride={override} color={'#ca3434'} size={150} />
                </div> : (
                    <>
                        <div className="signup-content">
                            <h1>Signup</h1>
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
                    </>
                )
            }


        </div>
    )
}

export default Signup

{/* <div style={{ "margin": "20px" }} >
<h1 className='text-5xl font-bold mb-4 ' >Signup</h1>

<form onSubmit={handleSubmit} >
    <label>Email : </label> <br />
    <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} className="input input-sm input-bordered input-success w-full max-w-xs" /> <br />

    <label>Password : </label> <br />
    <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} className="input input-sm input-bordered input-success w-full max-w-xs" /> <br />

    <button type="submit" className="btn btn-outline btn-success mt-4" >Submit</button>
</form>
</div> */}