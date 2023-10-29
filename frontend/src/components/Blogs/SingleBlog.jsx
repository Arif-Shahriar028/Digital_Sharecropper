import React, { useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import { useParams } from "react-router-dom";
import { blogsDta } from "./blogsdata";
const SingleBlog = () => {
  const { id } = useParams();
  const data = blogsDta.filter((bdata) => bdata.id == id);

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
      <div
        ref={ref}
        className="w-full min-h-screen flex justify-center items-start"
      >
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 75 },
            visible: { opacity: 1, y: 0 },
          }}
          initial="hidden"
          animate={mainControls}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="mt-24 w-[50%] flex flex-col justify-start items-center pb-8"
        >
          <img
            src={data[0].image}
            alt=""
            className="h-[35vh] w-full rounded-lg"
          />
          <h1 className="text-2xl font-semibold mt-2 text-gray-700">
            {data[0].title}
          </h1>
          <p className="text-lg text-gray-600 mt-3">{data[0].desc}</p>
        </motion.div>
      </div>
    </React.Fragment>
  );
};

export default SingleBlog;
