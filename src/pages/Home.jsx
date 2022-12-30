import React, { useEffect, useState, useContext } from 'react'
import config from "../config";
import BlogCard from '../components/BlogCard';
import { AuthContext } from '../context/AuthContext';
import { BlogsContext } from '../context/BlogContext'
import '../styles/Home.css'

function Home() {

    const baseURL = process.env.NODE_ENV === 'production' ? config.production : config.local;

    const { blogs, dispatch } = useContext(BlogsContext);
    const { user, userExists } = useContext(AuthContext);

    useEffect(() => {

        const dataLoad = async () => {
            const response = await fetch(`${baseURL}/api/blogs/`, {
                // const response = await fetch('https://blog-server-llqa.onrender.com/api/blogs/', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const data = await response.json();

            if (response.ok) {
                // setBlogs(data.Blogs)
                dispatch({ type: 'SET_BLOGS', payload: data.Blogs });
            }
        }
        if (user) {
            dataLoad()
        }
    }, [dispatch])

    return (
        <div>
            <h1>Home</h1>
            <div className='home' style={{ "maxWidth": "800px", "margin": "0 auto", "margin-bottom": "50px" }} >
                {
                    blogs && (
                        blogs.map((singleData) => <BlogCard singleData={singleData} />)
                    )
                }
            </div>

        </div>
    )
}

export default Home;
