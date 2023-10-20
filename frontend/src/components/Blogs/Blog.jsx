/* eslint-disable react/prop-types */
import React, { useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";

const Blog = ({ blog }) => {
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
      <div ref={ref}>
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 75 },
            visible: { opacity: 1, y: 0 },
          }}
          initial="hidden"
          animate={mainControls}
          transition={{ duration: 0.5, delay: 0.25 }}
          className={`w-full flex ${
            blog.id % 2 == 0 ? "flex-row-reverse" : "justify-between"
          } p-5 mt-10`}
        >
          <div
            className={`w-full flex flex-col ${
              blog.id % 2 == 0 ? "items-end" : "items-start"
            }`}
          >
            <h3 className="text-xl font-bold ">{blog.username}</h3>
            <p
              className={`text-lg text-gray-600 mt-5 ${
                blog.id % 2 == 0 ? "text-end" : "text-start"
              }`}
            >
              {blog.desc}
            </p>
          </div>
          <div className="w-full p-4">
            <img
              src={blog.image}
              alt="blog"
              className="h-[30vh] w-full rounded-lg"
            />
          </div>
        </motion.div>
      </div>
    </React.Fragment>
  );
};

export default Blog;
