import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { useParams } from "react-router-dom";
import axios from "axios";
import { URL } from "../url";
import { UserContext } from "../context/UserContext";
import Loader from "../components/Loader";

const PostDetails = () => {
  const postId = useParams().id;
  // console.log(postId);
  const [post, setPost] = useState({});
  const { user } = useContext(UserContext);
  const [loader, setLoader] = useState(false);

  // for fetching posts
  const fetchPost = async () => {
    setLoader(true);
    try {
      const res = await axios.get(URL + "/api/posts/" + postId);
      // console.log(res.data)
      setPost(res.data);
      setLoader(false);
    } catch (e) {
      console.log(e);
      setLoader(false);
    }
  };
  useEffect(() => {
    fetchPost();
  }, [postId]);
  return (
    <div>
      <Navbar />
      {loader ? (
        <div className="h-[80vh] flex justify-center items-center w-full">
          <Loader />
        </div>
      ) : (
        <div className="px-8 md:px-24 mt-8">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-black md:text-3xl">
              {post.title}
            </h1>
            <div className="flex items-center justify-center space-x-2">
              {user?._id === post?.userId && (
                <div className="flex justify-center items-center space-x-2 ">
                  <p className="cursor-pointer">
                    <BiEdit />
                  </p>
                  <p className="cursor-pointer">
                    <MdDelete />
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center justify-between mt-2 md:mt-4">
            <p>@{post.username}</p>
            <div className="flex space-x-2">
              <p>{new Date(post.createdAt).toLocaleDateString()}</p>
              <p>{new Date(post.createdAt).toLocaleTimeString()}</p>
            </div>
          </div>
          <img src={post.photo} alt="AI" className="w-full mx-auto mt-8"></img>
          <p className="mx-auto mt-8">{post.desc}</p>
          <div className="flex items-center mt-8 space-x-4 font-semibold">
            <p>Categories:</p>
            <div className="flex justify-center items-center space-x-2">
              {post.categories?.map((c, i) => (
                <>
                  <div key={i} className="bg-gray-300 rounded-lg px-3 py-1">
                    {c}
                  </div>
                </>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostDetails;
