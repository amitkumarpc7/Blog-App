import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { FaBars } from "react-icons/fa";
import Menu from "./Menu";
import { UserContext } from "../context/UserContext";

const Navbar = () => {
  const [menu, setMenu] = useState(false);
  const [prompt,setPrompt]=useState("");
  // console.log(prompt)
  const showMenu = () => {
    setMenu(!menu);
  };

  const {user}=useContext(UserContext)
  return (
    <div className="flex items-center justify-between px-6 md:px-[100px] py-4">
      <h1 className="text-lg md:text-xl font-extrabold">
        <Link to="/">Blog Market</Link>
      </h1>
      <div className="flex justify-center items-center space-x-0">
        <p className="cursor-pointer">
          <BsSearch />
        </p>
        <input
          type="text"
          placeholder="Search a post"
          className="outline-none px-3 py-1"
          onClick={(e)=>setPrompt(e.target.value)}
        ></input>
      </div>
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
