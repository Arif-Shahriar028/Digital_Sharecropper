import React from "react";
import HeadDiv from "../utils/HeadDiv";
import { blogsDta } from "./blogsdata";
import Blog from "./Blog";
const AllBlogs = () => {
  return (
    <React.Fragment>
      <div className="w-full min-h-screen flex flex-col ">
        <HeadDiv title="Blogs" />
        <div className="w-full flex flex-col justify-center items-center pb-10">
          <div className="w-[75%] grid grid-cols-3 gap-x-10 ">
            {blogsDta.map((blog) => (
              <Blog key={blog.id} blog={blog} />
            ))}
          </div>
          <button className="text-[#F4F4F5] px-8 py-3 bg-[#42A045] mt-10">
            View all
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default AllBlogs;
