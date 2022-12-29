import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { BlogsContext } from '../context/BlogContext'
import "../styles/BlogView.css"

function BlogView() {
  const { blogs, dispatch } = useContext(BlogsContext);
  const { id } = useParams();

  const selectedBlog = blogs.filter((el) => {
    return el._id == id
  })


  return (
    // <div>BlogView : {id} </div>
    <div className='blogview-complete-page' >
      <div className="blogview-container">
        {
          selectedBlog.map((blog) => {
            const blob = new Blob([Int8Array.from(blog.img.data.data)], { type: blog.img.contentType });
            const image = window.URL.createObjectURL(blob);
            console.log(blog)
            const createdDate = blog.updatedAt.substring(0, 10);
            return (
              <div className='indiv-blog' >
                <div className='blog-header-img-cont'>
                  <img alt="Dummy scene" className='blog-header-img' src={image} />
                </div>

                <section >
                  <div className='blog-author-info' >
                    <img src="https://picsum.photos/id/237/40" alt="avatar" />
                    <div>
                      <p className='author-name' >General Zod</p>
                      <p className='posted-date' >{createdDate}</p>
                    </div>
                  </div>

                  <h1 className='blog-title'>{blog.title}</h1>
                  <p id="text-body" dangerouslySetInnerHTML={{ __html: blog.body }} ></p>
                </section>
              </div>)
          })
        }
      </div>

    </div>
  )
}

export default BlogView