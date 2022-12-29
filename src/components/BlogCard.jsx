import React from 'react'
import '../styles/BlogCard.css'
import { useNavigate } from 'react-router-dom'

function BlogCard({ singleData }) {
    const blob = new Blob([Int8Array.from(singleData.img.data.data)], { type: singleData.img.contentType });
    const image = window.URL.createObjectURL(blob);

    const navigate = useNavigate();

    const handleClick = (id) => {
        navigate(`/blogview/${id}`)
    }

    return (
        <div className='blog-card' key={singleData._id} onClick={() => handleClick(singleData._id)}>
            <div className='blog-card-img-container'>
                <img alt="Dummy scene" className='blog-card-img' src={image} />
            </div>

            <h1>{singleData.title}</h1>

        </div>
    )
}

export default BlogCard


            // {
            //     blogs && (
            //         blogs.map((singleData) => {
            //             const blob = new Blob([Int8Array.from(singleData.img.data.data)], { type: singleData.img.contentType });
            //             const image = window.URL.createObjectURL(blob);

            //             return <>
            //                 <p>{singleData.title}</p>
            //                 <div dangerouslySetInnerHTML={{ __html: singleData.body }} />
            //                 <img src={image} height="100px" />
            //             </>
            //         })
            //     )
            // }