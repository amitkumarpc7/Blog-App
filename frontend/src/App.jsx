import React from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import {Routes,Route} from 'react-router-dom'
// pages 
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import PostDetails from './pages/PostDetails'
import CreatePost from './pages/CreatePost'
import EditPost from './pages/EditPost'
import MyBlogs from './pages/MyBlogs'
import Profile from './pages/Profile'
import { UserContextProvider } from './context/UserContext'

const App = () => {
  return (
    <>
    <UserContextProvider>
    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/register' element={<Register/>}></Route>
      <Route exact path="/write" element={<CreatePost/>}/>
      <Route path='/posts/post/:id' element={<PostDetails/>}></Route>
      <Route exact path="/edit/:id" element={<EditPost/>}/>
      <Route exact path="/myblogs/:id" element={<MyBlogs/>}/>
      <Route exact path="/profile/:id" element={<Profile/>}/>
    </Routes>
    </UserContextProvider>
   
  
    {/* <Footer/> */}
    </>
  )
}

export default App