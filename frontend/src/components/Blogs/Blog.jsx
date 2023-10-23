/* eslint-disable react/prop-types */
import React, { useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import { Link } from "react-router-dom";
const Blog = ({ blog }) => {
  const { id, title, desc, image } = blog;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const mainControls = useAnimation();
  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    }
  }, [isInView, mainControls]);
  return (
    <React.Fragment>
      <div ref={ref} className="w-full">
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 75 },
            visible: { opacity: 1, y: 0 },
          }}
          initial="hidden"
          animate={mainControls}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="w-full flex flex-col items-start justify-start mt-10 shadow-md rounded-lg border hover:shadow-lg cursor-pointer"
        >
          <img
            src={image}
            alt="blog"
            className=" w-full h-[220px] rounded-t-lg"
          />
          <div className="flex flex-col p-3">
            <h1 className="text-xl font-semibold">{title}</h1>
            <h3 className="text-md text-gray-700 mt-3 text-start ">{desc.slice(0,100)}</h3>
          </div>
          <div className="w-full flex justify-center items-center">
            <Link
              to={`/blogs/${id}`}
              className="text-[#F4F4F5] px-4 py-2 bg-[#42A045] mb-3 cursor-pointer"
            >
              Read more
            </Link>
          </div>
        </motion.div>
      </div>
    </React.Fragment>
  );
};

export default Blog;
