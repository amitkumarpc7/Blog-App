import React from 'react'
import Navbar from '../components/Navbar'
import {BiEdit} from 'react-icons/bi'
import {MdDelete} from 'react-icons/md'

const PostDetails = () => {
  return (
    <div>
      <Navbar/>
      <div className='px-8 md:px[-200px] mt-8'>
        <div className='flex justify-between items-center'>
          <h1 className='text-2xl font-bold text-black md:text-3xl'>Uses of AI in daily Life</h1>
          <div className='flex items-center justify-center space-x-2'>
            <p><BiEdit/></p>
            <p><MdDelete/></p>
          </div>
        </div>
        <div className='flex items-center justify-between mt-2 md:mt-4'>
          <p>@amitkumar</p>
          <div className='flex space-x-2'>
            <p>16/08/2024</p>
            <p>13:45</p>
          </div>
        </div>
        <img src='https://www.freepik.com/free-photos-vectors/computer-science-background' alt='AI' className='w-full mx-auto mt-8'></img>
      </div>
    </div>
  )
}

export default PostDetails