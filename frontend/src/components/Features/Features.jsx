import React, { useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";

const features = [
  {
    id: 1,
    icon: "/icons/farmer.png",
    title: "Farmers",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem aliquam nemo aspernatur ex.",
  },
  {
    id: 2,
    icon: "/icons/landowner.png",
    title: "Land Owners",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem aliquam nemo aspernatur ex.",
  },
  {
    id: 3,
    icon: "/icons/investor.png",
    title: "Investors",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem aliquam nemo aspernatur ex.",
  },
];
const Features = () => {
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
      <div className="w-full flex flex-col justify-center items-center p-10">
        <div className="w-full flex justify-center items-center">
          <span className="text-4xl font-bold text-[#42A045]">
            What we provide?
          </span>
        </div>
        <div ref={ref} className="w-[70%] grid grid-cols-3 gap-10">
          {features.map((feature) => (
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 75 },
                visible: { opacity: 1, y: 0 },
              }}
              initial="hidden"
              animate={mainControls}
              transition={{ duration: 0.5, delay: 0.25 }}
              key={feature.id}
              className="flex flex-col items-center justify-center mt-10 p-10 border-[1px] shadow-sm rounded-lg hover:shadow-lg"
            >
              <img src={feature.icon} alt="icon" className="h-20 w-20" />
              <h2 className="text-2xl text-[#42A045] font-bold my-3">
                {feature.title}
              </h2>
              <p className="text-center text-md text-gray-700">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Features;
