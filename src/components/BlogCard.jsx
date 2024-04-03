import React, { useContext, useState } from 'react'
import '../styles/BlogCard.css'
import { useNavigate } from 'react-router-dom'
import config from '../config';
import { AuthContext } from '../context/AuthContext';
import axios from "axios"
import { ChatBubbleOvalLeftIcon, HandThumbUpIcon, ShareIcon, TrashIcon } from '@heroicons/react/24/outline'
import { BlogsContext } from '../context/BlogContext';
// import {  } from "@heroicons/24/outline"

function BlogCard({ singleData, comp }) {
    const blob = new Blob([Int8Array.from(singleData.img.data.data)], { type: singleData.img.contentType });
    const image = window.URL.createObjectURL(blob);
    const baseURL = process.env.NODE_ENV === 'production' ? config.production : config.local;

    const { user } = useContext(AuthContext);
    const { blogs, dispatch } = useContext(BlogsContext);
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const handleClick = (id) => {
        navigate(`/blogview/${id}`)
    }

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

    const handleDelete = async (id, event) => {
        event.stopPropagation();
        console.log("IM runing")
        const response = await fetch(`${baseURL}/api/blogs/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })

        if (response.ok) {
            dataLoad()
        }

        const json = await response.json();
        
    }


    return (
        <div className='blog-card' key={singleData._id}  onClick={() => handleClick(singleData._id)}>
            <div className='blog-card-img-container'>
                <img alt="Dummy scene" className='blog-card-img' src={image} />
            </div>
            <div className='title'>
                <h1>{singleData.title}</h1> 
            </div>
            <div className='font-light'>
                {singleData.description}
            </div>
            <div className='flex items-center justify-between bottom-0'>
                <HandThumbUpIcon className='h-6 w-6' />
                <ChatBubbleOvalLeftIcon className='h-6 w-6'/>

                {
                    comp == 'own-blogs' ? <TrashIcon onClick={ (event) => handleDelete(singleData._id, event) } className='h-6 w-6'/> :
                    <ShareIcon className='h-6 w-6'/>

                }
                
            </div>

        </div>
    )
}

export default BlogCard

