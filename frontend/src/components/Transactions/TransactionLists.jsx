import React from "react";
import { AiOutlineTransaction } from "react-icons/ai";
const TransactionLists = () => {
  return (
    <React.Fragment>
      <div className="w-full min-h-screen flex justify-center items-start">
        <div className="w-[70%] flex flex-col justify-start items-start mt-36">
          <div className="w-full flex justify-start items-center gap-x-2">
            <AiOutlineTransaction className="text-3xl text-[#42A045]" />
            <span className="text-2xl font-bold text-[#42A045]">
              All Transactions
            </span>
          </div>
          <div className="w-full grid grid-cols-4 gap-8 mt-10">
            <div className="flex flex-col items-center shadow-md p-5 border-[1px] rounded-md">
              <h2>Trans: name</h2>
              <h2>Trans: time</h2>
              <h2>Trans: others</h2>
            </div>
            <div className="flex flex-col items-center shadow-md p-5 border-[1px] rounded-md">
              <h2>Trans: name</h2>
              <h2>Trans: time</h2>
              <h2>Trans: others</h2>
            </div>
            <div className="flex flex-col items-center shadow-md p-5 border-[1px] rounded-md">
              <h2>Trans: name</h2>
              <h2>Trans: time</h2>
              <h2>Trans: others</h2>
            </div>{" "}
            <div className="flex flex-col items-center shadow-md p-5 border-[1px] rounded-md">
              <h2>Trans: name</h2>
              <h2>Trans: time</h2>
              <h2>Trans: others</h2>
            </div>
            <div className="flex flex-col items-center shadow-md p-5 border-[1px] rounded-md">
              <h2>Trans: name</h2>
              <h2>Trans: time</h2>
              <h2>Trans: others</h2>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default TransactionLists;
