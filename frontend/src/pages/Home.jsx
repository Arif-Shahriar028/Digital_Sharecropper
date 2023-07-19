import React from "react";
import Hero from "../components/Hero/Hero";
import Features from "../components/Features/Features";
import Details from "../components/Details/Details";

const Home = () => {
  return (
    <React.Fragment>
      <div className="w-full flex justify-center items-center">
        <Hero />
        <div className="w-full h-screen flex justify-center items-center absolute bg-[#00000080]">
          <div className="flex flex-col w-[60%] items-center p-2">
            <h1 className="text-4xl font-bold text-gray-300">
              Find Your Best Products.
            </h1>
            <p className="text-md p-3 text-gray-300">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. <br />
              Atque hic quaerat consectetur numquam.
            </p>
            <button className="py-2 px-5 bg-[#42A045] text-white font-bold text-sm mt-5 hover:bg-green-700 hover:text-white">
              Get Started
            </button>
          </div>
        </div>
      </div>
      <Features />
      <Details />
    </React.Fragment>
  );
};

export default Home;
