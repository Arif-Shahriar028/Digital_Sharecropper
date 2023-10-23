import React, { useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";

const Details = () => {
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
      <div ref={ref} className="w-full flex justify-center items-center">
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 75 },
            visible: { opacity: 1, y: 0 },
          }}
          initial="hidden"
          animate={mainControls}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="w-[70%] grid grid-cols-1"
        >
          <div className="w-full flex justify-center items-center p-10">
            <div className="w-full flex justify-start">
              <img
                src="/img/farmer.jpg"
                alt=""
                className="h-[400px] w-[500px]"
              />
            </div>
            <div className="w-full flex flex-col items-end gap-y-3 p-5">
              <h2 className="text-3xl font-bold text-[#42A045]">
                Provides land for the farmers.
              </h2>
              <p className="text-gray-600 text-lg text-end">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Optio
                quis itaque necessitatibus! Ea sequi pariatur deleniti sunt
                alias repudiandae praesentium!
              </p>
              <button className="bg-[#42A045] text-white px-10 py-3 text-lg rounded-md mt-3">
                Learn more
              </button>
            </div>
          </div>

          <div
            ref={ref}
            className="w-full flex justify-center items-center p-10"
          >
            <div className="w-full flex flex-col items-start gap-y-3 p-5">
              <h2 className="text-3xl font-bold text-[#42A045]">
                Provides land owners to lend their land.
              </h2>
              <p className="text-gray-600 text-lg text-start">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Optio
                quis itaque necessitatibus! Ea sequi pariatur deleniti sunt
                alias repudiandae praesentium!
              </p>
              <button className="bg-[#42A045] text-white px-10 py-3 text-lg rounded-md mt-3">
                Learn more
              </button>
            </div>
            <div className="w-full flex justify-end">
              <img
                src="/img/landlord.jpg"
                alt=""
                className="h-[300px] w-[500px]"
              />
            </div>
          </div>

          <div className="w-full flex justify-center items-center p-10">
            <div className="w-full flex justify-start">
              <img
                src="/img/investor.jpg"
                alt=""
                className="h-[300px] w-[400px] rounded-lg"
              />
            </div>
            <div className="w-full flex flex-col items-end gap-y-3 p-5">
              <h2 className="text-3xl font-bold text-[#42A045]">
                Provides land for the farmers.
              </h2>
              <p className="text-gray-600 text-lg text-end">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Optio
                quis itaque necessitatibus! Ea sequi pariatur deleniti sunt
                alias repudiandae praesentium!
              </p>
              <button className="bg-[#42A045] text-white px-10 py-3 text-lg rounded-md mt-3">
                Learn more
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </React.Fragment>
  );
};

export default Details;
