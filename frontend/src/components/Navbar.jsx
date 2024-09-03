import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { FaBars } from "react-icons/fa";
import Menu from "./Menu";
import { UserContext } from "../context/UserContext";

const Navbar = () => {
  const [menu, setMenu] = useState(false);
  const [prompt,setPrompt]=useState("");
  const navigate=useNavigate();
  const path=useLocation().pathname;
  // console.log(path)
  // console.log(prompt)
  const showMenu = () => {
    setMenu(!menu);
  };

  const handleSearch=()=>{
    if(prompt){
      navigate(`?search=${prompt}`)
    }
    else{
      navigate("/")
    }
  }
  const {user}=useContext(UserContext)
  return (
    <div className="flex items-center justify-between px-6 md:px-[100px] py-4">
      <h1 className="text-lg md:text-xl font-extrabold">
        <Link to="/">The Bloggggg</Link>
      </h1>
     {path==="/" && <div className="flex justify-center items-center space-x-0">
        <p onClick={handleSearch} className="cursor-pointer">
          <BsSearch />
        </p>
        <input
          type="text"
          placeholder="Search a post"
          className="outline-none px-3 py-1"
          onChange={(e)=>setPrompt(e.target.value)}
        ></input>
      </div>}
      <div className="hidden md:flex items-center justify-center space-x-2 md:space-x-4">
        {user ? (
          <h3>
            <Link to="/write">Write</Link>
          </h3>
        ) : (
          <Link to="/login">Login</Link>
        )}
        {user ? (
          <div>
            <p className="cursor-pointer" onClick={showMenu}>
              <FaBars />
            </p>
            {menu && <Menu />}
          </div>
        ) : (
          <h3>
            <Link to="/register">Register</Link>
          </h3>
        )}
      </div>
      <div className="md:hidden text-lg" onClick={showMenu}>
        <p className="cursor-pointer">
          <FaBars />
        </p>
        {menu && <Menu />}
      </div>
    </div>
  );
};

export default Navbar;
