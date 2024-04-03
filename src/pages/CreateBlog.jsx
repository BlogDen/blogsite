import React, { useState, useEffect } from 'react'
import axios from "axios"
import TextEditor from '../components/TextEditor';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import '../styles/CreateBlog.css'
import { useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import config from "../config";

function CreateBlog() {
    const baseURL = process.env.NODE_ENV === 'production' ? config.production : config.local;

    const [uploadImg, setUploadImg] = useState(null);
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [description, setDescription] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false);

    const navigate = useNavigate();
    const { user } = useContext(AuthContext)

    useEffect(() => {
        //setTimout can be used here as the user is picked from local storage if it exists. So internet speed won't affect the results
        const timer = setTimeout(() => {
            if (!user) {
                navigate('/login');
            }
        }, 300);
        return () => clearTimeout(timer);
    }, [user])

    const handleSubmit = (e) => {
        e.preventDefault()
        setIsSubmitting(true);

        if (!user) {
            console.log("User doesnt exist")
            return
        }

        let formdata = new FormData();
        formdata.append('title', title)
        formdata.append('body', content)
        formdata.append('description', description)
        formdata.append('testImage', uploadImg)

        axios({
            url: `${baseURL}/api/blogs/`,
            // url: "https://blog-server-llqa.onrender.com/api/blogs/",
            method: 'POST',
            headers: {
                'authorization': `Bearer ${user.token}`
            },
            data: formdata
        }).then((res) => {
            setIsSubmitting(false);
            console.log("Image uploaded from frontend");
            navigate('/');
        })
    }

    const override = {
        display: "block",
        margin: "0 auto",
        marginTop: "50vh"
    };
    return (
        <div className='createblog-main-container' >

            {
                isSubmitting ? <div className='dud'>
                    <ClipLoader aria-label="Loading Spinner" cssOverride={override} color={'#ca3434'} size={150} />
                </div> : (
                    <div className='createblog-text-container' >
                        <form onSubmit={handleSubmit}>
                            <label>Title </label> <br />
                            <input className="title-textarea" type="text" required onChange={(e) => setTitle(e.target.value)} value={title} /> <br />
                            <label>Short Description: </label> <br />
                            <input className="title-textarea" type="text" required onChange={(e) => setDescription(e.target.value)} value={description} /> <br />

                            {/* <label>Body </label> <br />
                        <input type="text" required onChange={(e) => setBody(e.target.value)} value={body} /> <br /> */}
                            <TextEditor bodyInput={content} setBodyInput={setContent} />


                            <input type="file" required onChange={(e) => setUploadImg(e.target.files[0])} accept="image/*" />
                            <button type="submit" >submit</button>
                        </form>
                        <br />
                    </div>)
            }



        </div>
    )
}

export default CreateBlog;
