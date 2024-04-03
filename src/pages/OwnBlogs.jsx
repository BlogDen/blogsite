import React, { useEffect, useContext, useState } from 'react'
import BlogCard from '../components/BlogCard';
import { AuthContext } from '../context/AuthContext';
import { BlogsContext } from '../context/BlogContext'
import { useNavigate } from "react-router-dom";
import config from "../config";
import ClipLoader from "react-spinners/ClipLoader";


function OwnBlogs() {
    const baseURL = process.env.NODE_ENV === 'production' ? config.production : config.local;

    const navigate = useNavigate();
    
    console.log("Own blogs page")

    // const [blogs, setBlogs] = useState([]);
    const { blogs, dispatch } = useContext(BlogsContext);
    const { user } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {

        //setTimout can be used here as the user is picked from local storage if it exists. So internet speed won't affect the results
        const timer = setTimeout(() => {
            if (!user) {
                navigate('/login');
            }
        }, 300);
        return () => clearTimeout(timer);

    }, [user])

    const dataLoad = async () => {
        setIsLoading(true);

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
            setIsLoading(false);
        }
    }

    useEffect(() => {

        if (user) {
            dataLoad()
        }
    }, [user])

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
                        <h1 className='text-4xl font-bold text-center mt-4' >PROFILE</h1>
                        <div className='home mb-[50px] m-auto' >
                            {
                                blogs && (
                                    blogs.map((singleData) => <BlogCard singleData={singleData} comp="own-blogs" />)
                                )
                            }
                        </div>
                    </>
                )
            }




        </div>
    )
}

export default OwnBlogs;
