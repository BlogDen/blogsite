import React, { useEffect, useContext } from 'react'
import BlogCard from '../components/BlogCard';
import { AuthContext } from '../context/AuthContext';
import { BlogsContext } from '../context/BlogContext'
import { useNavigate } from "react-router-dom";
import config from "../config";

function OwnBlogs() {
    const baseURL = process.env.NODE_ENV === 'production' ? config.production : config.local;

    const navigate = useNavigate();

    console.log("Own blogs page")

    // const [blogs, setBlogs] = useState([]);
    const { blogs, dispatch } = useContext(BlogsContext);
    const { user } = useContext(AuthContext);


    useEffect(() => {

        //setTimout can be used here as the user is picked from local storage if it exists. So internet speed won't affect the results
        const timer = setTimeout(() => {
            if (!user) {
                navigate('/login');
            }
        }, 300);
        return () => clearTimeout(timer);

    }, [user])

    useEffect(() => {

        const dataLoad = async () => {
            const response = await fetch(`${baseURL}/api/blogs/own-blogs`, {
                // const response = await fetch('https://blog-server-llqa.onrender.com/api/blogs/own-blogs', {
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


    }, [user])

    return (
        <div>
            <h1>OwnBlogs</h1>
            <div style={{ "maxWidth": "800px", "margin": "0 auto " }} >
                {
                    blogs && (
                        blogs.map((singleData) => <BlogCard singleData={singleData} />)
                    )
                }
            </div>

        </div>
    )
}

export default OwnBlogs;
