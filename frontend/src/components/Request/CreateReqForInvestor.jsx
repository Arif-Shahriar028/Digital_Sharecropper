import React, { useState } from "react";
import { MdClear } from "react-icons/md";

const CreateReqForInvestor = ({ setReqModal }) => {
  const [amount, setAmont] = useState();
  const handleSubmit = () => {};
  return (
    <React.Fragment>
      <div className="w-[600px] bg-white flex flex-col items-start justify-start p-3 rounded-lg">
        <div className="w-full flex justify-end items-center">
          <MdClear
            onClick={() => {
              setReqModal(false);
            }}
            className="text-gray-700 text-2xl cursor-pointer"
          />
        </div>
        <div className="w-full text-2xl font-bold text-[#42A045] flex justify-center items-center">
          Create new request
        </div>
        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col gap-y-5 items-start justify-start p-4"
        >
          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmont(e.target.value)}
            style={{
              borderTopLeftRadius: "25px",
              borderBottomRightRadius: "25px",
            }}
            className="w-full p-2 px-5 text-black outline-none border-[1px] border-gray-800 focus:border-2 focus:border-[#42A045]"
          />
          <div className="w-full flex justify-center items-center">
            <button
              type="submit"
              className="px-5 py-2 rounded-md bg-[#42A045] text-white"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
};

export default CreateReqForInvestor;
