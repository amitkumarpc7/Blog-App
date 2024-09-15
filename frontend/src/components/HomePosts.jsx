import {IF} from '../url'
const HomePosts = ({ post }) => {
  // const imageUrl = `${IF}${post.photo.replace(/^\//, '')}`;
  // console.log(post)

  return (
    <div className="w-full flex mt-8 space-x-4 hover:bg-gray-100 transition">
      {/* Left */}
      <div className="w-[35%] h-[200px] flex justify-center items-center">
        <img
          src={IF+post.photo}
          alt=""
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex flex-col w-[65%]">
        <h1 className="text-xl font-bold md:mb-2 mb:1 md:text-2xl">
          {post.title}
        </h1>
        <div className="flex mb-2 text-sm font-semibold text-gray-500 items-center justify-between md:mb-4">
          <p>@{post.username}</p>
          <div className="flex space-x-2">
            <p>{new Date(post.createdAt).toString().slice(0, 15)}</p>
            <p className='hidden md:flex'>{new Date(post.createdAt).toString().slice(16, 24)}</p>
          </div>
        </div>
        {/* <p className="text-sm md:text-lg">{post.desc.slice(0,200)+" ... Read more"}</p> */}
        <p className="text-sm md:text-lg">{post.desc.slice(0,200)}<span className="text-blue-500 hover:font-bold ml-1 cursor-pointer">... Read more</span></p>
      </div>
    </div>
  );
};

export default HomePosts;
