import React, { useContext, useEffect, useState } from "react";
import HomePosts from "../components/HomePosts";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";
import { URL } from "../url";
import { UserContext } from "../context/UserContext";

const Home = () => {
  const {user}=useContext(UserContext);
  const [posts,setPosts]=useState([]); 
  const fetchPosts = async () => {
    try {
      const res = await axios.get(URL + "/api/posts/");
      // console.log(res.data);
      setPosts(res.data);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(()=>{
    fetchPosts();

  },[])
  return (
    <>
      <Navbar />
      <div className="px-8 md:px-[200px]">
        {posts.map((post)=>(
          <HomePosts key={post._id} post={post}/>
        ))}
        {/* <HomePosts/> */}
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default Home;
