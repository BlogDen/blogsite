import React, { useEffect, useState, useContext } from 'react'
import config from "../config";
import BlogCard from '../components/BlogCard';
import { AuthContext } from '../context/AuthContext';
import { BlogsContext } from '../context/BlogContext'
import '../styles/Home.css'
import ClipLoader from "react-spinners/ClipLoader";


function Home() {
    const baseURL = process.env.NODE_ENV === 'production' ? config.production : config.local;

    const { blogs, dispatch } = useContext(BlogsContext);
    const { user, userExists } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const dataLoad = async () => {
            setIsLoading(true);
            const response = await fetch(`${baseURL}/api/blogs/`)
            
            // const response = await fetch(`${baseURL}/api/blogs/`, {
            //     // const response = await fetch('https://blog-server-llqa.onrender.com/api/blogs/', {
            //     headers: {
            //         'Authorization': `Bearer ${user.token}`
            //     }
            // })
            const data = await response.json();

            if (response.ok) {
                // setBlogs(data.Blogs)
                dispatch({ type: 'SET_BLOGS', payload: data.Blogs });
                setIsLoading(false)
            }
        }
        if (true) {
            dataLoad()
        }
    }, [dispatch])

    const override = {
        display: "block",
        margin: "0 auto",
        marginTop: "25vh"
    };

    return (
        <div>
            {
                isLoading ? <div className='dud'>
                    <ClipLoader aria-label="Loading Spinner" cssOverride={override} color={'#ca3434'} size={150} />
                </div> : (
                    <>
                        <h1>Home</h1>
                        <div className='home' style={{ "maxWidth": "800px", "margin": "0 auto", "margin-bottom": "50px" }} >
                            {
                                blogs && (
                                    blogs.map((singleData) => <BlogCard singleData={singleData} />)
                                )
                            }
                        </div>
                    </>
                )
            }



        </div>
    )
}

export default Home;
