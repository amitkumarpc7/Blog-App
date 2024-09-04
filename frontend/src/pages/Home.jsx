import React, { useContext, useEffect, useState } from "react";
import HomePosts from "../components/HomePosts";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";
import { URL } from "../url";
import { UserContext } from "../context/UserContext";
import { Link, useLocation } from "react-router-dom";
import Loader from "../components/Loader";

const Home = () => {
  const { user } = useContext(UserContext);
  const { search } = useLocation();
  const [posts, setPosts] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const [loader, setLoader] = useState(false);

  const fetchPosts = async () => {
    setLoader(true);
    try {
      const res = await axios.get(URL + "/api/posts/" + search);
      setPosts(res.data);
      if (res.data.length === 0) {
        setNoResults(true);
      } else {
        setNoResults(false);
      }
      setLoader(false);
    } catch (e) {
      console.log(e);
      setLoader(true);
    }
  };
  useEffect(() => {
    fetchPosts();
  }, [search]);
  return (
    <>
      <Navbar />
      {/* <HomePosts/> */}
      <div className="px-8 md:px-24 mt-8">
        {loader ? (
          <div className="h-[50vh] flex justify-center items-center">
            <Loader />
          </div>
        ) : !noResults ? (
          posts.map((post) => (
            <>
              <Link to={user ? `/posts/post/${post._id}` : "/login"}>
                <HomePosts key={post._id} post={post} />{" "}
              </Link>
            </>
          ))
        ) : (
          <h3 className="text-center font-bold mt-14">No Posts found</h3>
        )}
        
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default Home;
