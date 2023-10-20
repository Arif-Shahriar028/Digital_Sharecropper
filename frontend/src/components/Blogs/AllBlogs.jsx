import React from "react";
import HeadDiv from "../utils/HeadDiv";
import { blogsDta } from "./blogsdata";
import Blog from "./Blog";
const AllBlogs = () => {
  return (
    <React.Fragment>
      <div className="w-full min-h-screen flex flex-col ">
        <HeadDiv title="Blogs" />
        <div className="w-full flex justify-center items-center">
          <div className="w-[80%] flex flex-col justify-start items-start p-5">
            {blogsDta.map((blog) => (
              <Blog key={blog.id} blog={blog} />
            ))}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default AllBlogs;
