import React, { useContext } from 'react'
import '../styles/BlogCard.css'
import { useNavigate } from 'react-router-dom'
import config from '../config';
import { AuthContext } from '../context/AuthContext';
import axios from "axios"

function BlogCard({ singleData }) {
    const blob = new Blob([Int8Array.from(singleData.img.data.data)], { type: singleData.img.contentType });
    const image = window.URL.createObjectURL(blob);
    const baseURL = process.env.NODE_ENV === 'production' ? config.production : config.local;

    const { user } = useContext(AuthContext);

    const navigate = useNavigate();

    const handleClick = (id) => {
        navigate(`/blogview/${id}`)
    }

    const handleDelete =  async (id) => {
    //     // const response = await axios.delete(`/blogs/${id}`)
    //     try {
    //         const response = await axios.delete(`${baseURL}/api/blogs/${id}`, {
    //             headers: {
    //                 'Authorization': `Bearer ${user.token}`
    //             }
    //         });
    //         console.log(response.data); // Handle the response as needed
    //     } catch (error) {
    //         console.error('Error deleting blog:', error.message);
    //     }
    }

    return (
        <div className='blog-card' key={singleData._id} onClick={() => handleClick(singleData._id)}>
            {/* <img className='trash_icon' onClick={handleDelete }  src="/delete.svg" alt="trash icon" /> */}
            <div className='blog-card-img-container'>
                <img alt="Dummy scene" className='blog-card-img' src={image} />
            </div>

            <h1>{singleData.title}</h1>

        </div>
    )
}

export default BlogCard

