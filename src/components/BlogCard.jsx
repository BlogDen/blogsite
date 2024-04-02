import React, { useContext } from 'react'
import '../styles/BlogCard.css'
import { useNavigate } from 'react-router-dom'
import config from '../config';
import { AuthContext } from '../context/AuthContext';
import axios from "axios"
import { ChatBubbleOvalLeftIcon, HandThumbUpIcon, ShareIcon } from '@heroicons/react/24/outline'

function BlogCard({ singleData }) {
    const blob = new Blob([Int8Array.from(singleData.img.data.data)], { type: singleData.img.contentType });
    const image = window.URL.createObjectURL(blob);
    const baseURL = process.env.NODE_ENV === 'production' ? config.production : config.local;

    const { user } = useContext(AuthContext);

    const navigate = useNavigate();

    const handleClick = (id) => {
        navigate(`/blogview/${id}`)
    }


    return (
        // <div className='blog-card' key={singleData._id} onClick={() => handleClick(singleData._id)}>
        //     {/* <img className='trash_icon' onClick={handleDelete }  src="/delete.svg" alt="trash icon" /> */}
        //     <div className='blog-card-img-container'>
        //         <img alt="Dummy scene" className='blog-card-img' src={image} />
        //     </div>

        //     <h1>{singleData.title}</h1>

        // </div>

        <div className='blog-card' key={singleData.id}  onClick={() => handleClick(singleData.id)}>
            <div className='blog-card-img-container'>
                <img alt="Dummy scene" className='blog-card-img' src={image} />
            </div>
            <div className='title'>
                <h1>{singleData.title}</h1> 
            </div>
            <div className='font-light'>
                Three.js allows the creation of graphical processing unit (GPU)-accelerated 3D animations using the JavaScript language
            </div>
            <div className='flex items-center justify-between bottom-0'>
                <HandThumbUpIcon className='h-6 w-6' />
                <ChatBubbleOvalLeftIcon className='h-6 w-6'/>
                <ShareIcon className='h-6 w-6'/>
            </div>

        </div>
    )
}

export default BlogCard

