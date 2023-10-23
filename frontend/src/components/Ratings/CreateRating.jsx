/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { MdClear } from "react-icons/md";
import { createReview } from "../../Api/api";
const CreateRating = ({ setShowReview }) => {
  const [user, setUser] = useState(null);
  const [type, setType] = useState(null);
  const [rating, setRating] = useState(null);
  const [desc, setDesc] = useState(null);

  const handleSubmit = async () => {
    await createReview({
      agent: "Rafiqul Islam",
      user,
      type,
      rating,
      desc,
    });
  };
  return (
    <React.Fragment>
      <div className="w-[600px] bg-white flex flex-col items-start justify-start p-3 rounded-lg">
        <div className="w-full flex justify-end items-center">
          <MdClear
            onClick={() => {
              setShowReview(false);
            }}
            className="text-gray-700 text-2xl cursor-pointer"
          />
        </div>
        <div className="w-full text-2xl font-bold text-[#42A045] flex justify-center items-center">
          Create Review
        </div>
        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col gap-y-5 items-start justify-start p-4"
        >
          <select
            style={{
              borderTopLeftRadius: "25px",
              borderBottomRightRadius: "25px",
            }}
            value={user}
            onChange={(e) => setUser(e.target.value)}
            className=" p-2 w-full outline-none border-[1px] border-gray-800 focus:border-2 focus:border-[#42A045]"
          >
            <option value="">Select User</option>
            <option value="User_1">User_1</option>
            <option value="User_2">User_2</option>
            <option value="User_3">User_3</option>
            {/* {landOwnerData.map((req) => (
              <option key={req.Key} value={req.Record.Nid}>
                {req.Record.Nid}
              </option>
            ))} */}
          </select>
          <select
            style={{
              borderTopLeftRadius: "25px",
              borderBottomRightRadius: "25px",
            }}
            value={type}
            onChange={(e) => setType(e.target.value)}
            className=" p-2 w-full outline-none border-[1px] border-gray-800 focus:border-2 focus:border-[#42A045]"
          >
            <option value="">Select User type</option>
            <option value={"Farmer"}>Farmer</option>
            <option value={"Landowner"}>Landowner</option>
            <option value={"Investor"}>Investor</option>
          </select>
          <input
            type="number"
            placeholder="Your rating"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            style={{
              borderTopLeftRadius: "25px",
              borderBottomRightRadius: "25px",
            }}
            className="w-full p-2 px-5 text-black outline-none border-[1px] border-gray-800 focus:border-2 focus:border-[#42A045]"
          />
          <textarea
            placeholder="Write description"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            style={{
              borderTopLeftRadius: "25px",
              borderBottomRightRadius: "25px",
            }}
            className="outline-none w-full p-3 border-[1px] border-gray-800 focus:border-2 focus:border-[#42A045]"
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

export default CreateRating;
