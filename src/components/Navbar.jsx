import React, { useContext } from 'react'
import { Link } from "react-router-dom"
import { AuthContext } from '../context/AuthContext'
import { BlogsContext } from '../context/BlogContext';
// import { useLogout } from '../hooks/useLogout'
import '../styles/Navbar.css'
import Dropdown from './Dropdown';

function Navbar() {
    const { user, dispatch } = useContext(AuthContext);
    const { dispatch: BlogDispatch } = useContext(BlogsContext)
    const handleLogoutClick = () => {

        BlogDispatch({ type: "SET_BLOGS", payload: null })
        dispatch({ type: "LOGOUT" })
        localStorage.removeItem("user");

    }

    return (
        <div className='navbar' >
            {
                user ? <>
                    <Link to="/" >Home</Link>
                    <span>{user.email}</span>
                    {/* <button onClick={handleLogoutClick} >Logout</button>
                    <Link to="/create"> CreateBlog </Link> */}
                    <Dropdown handleLogoutClick={handleLogoutClick} />
                </>
                    : <>
                        <Link to="/login" >Login</Link>
                        <Link to="/signup" >Signup</Link>
                    </>
            }


        </div>

    )
}

export default Navbar;


