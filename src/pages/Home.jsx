import React, { useEffect, useState, useContext } from "react";
import config from "../config";
import BlogCard from "../components/BlogCard";
import { AuthContext } from "../context/AuthContext";
import { BlogsContext } from "../context/BlogContext";
import "../styles/Home.css";
import ClipLoader from "react-spinners/ClipLoader";
import { TypeAnimation } from 'react-type-animation'
import Footer from "../components/Footer";

function Home() {
  const baseURL =
    process.env.NODE_ENV === "production" ? config.production : config.local;

  const { blogs, dispatch } = useContext(BlogsContext);
  const { user, userExists } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const dataLoad = async () => {
      setIsLoading(true);
      const response = await fetch(`${baseURL}/api/blogs/`);

      const data = await response.json();

      if (response.ok) {
        // setBlogs(data.Blogs)
        dispatch({ type: "SET_BLOGS", payload: data.Blogs });
        setIsLoading(false);
      }
    };

    dataLoad();
  }, []);

  const override = {
    display: "block",
    margin: "0 auto",
    marginTop: "25vh",
  };

  return (
    <div className="w-full" >

      <div className='header w-[97%] flex items-center justify-center bg-gray-900 rounded-2xl mx-6 px-3'>
        <h1 className='font-bold text-white'>
        <TypeAnimation
          sequence={[
            '"The secret of getting ahead is getting started so Read!"',
            1000,
            '"The secret of getting ahead is getting started so Write!"',
            1000,
            '"The secret of getting ahead is getting started so and"',
            1000,
            '"The secret of getting ahead is getting started so Repeat!"',
            1000,
          ]}
          speed={50}
          style={{ fontSize: '3em' }}
          repeat={Infinity}
        />
        </h1>
        
      </div>



      {isLoading ? (
        <div className="dud">
          <ClipLoader
            aria-label="Loading Spinner"
            cssOverride={override}
            color={"#ca3434"}
            size={150}
          />
        </div>
      ) : (
        <>
          <div
            className="home"
            style={{
              maxWidth: "1100px",
              margin: "0 auto",
              "margin-bottom": "50px",
            }}
          >
            {blogs &&
              blogs.map((singleData) => <BlogCard singleData={singleData} />)}
          </div>
        </>
      )}

      <Footer />
    </div>
  );
}

export default Home;
