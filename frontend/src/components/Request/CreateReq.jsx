/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { MdClear } from "react-icons/md";
import { distictsData } from "./districts";
import { upozillasData } from "./upozilla";
import { landRequest } from "../../Api/api";

const CreateReq = ({ setReqModal }) => {
  // const [name, setName] = useState("");
  const [landUnit, setLandUnit] = useState("");
  const [landLocation, setLandLocation] = useState("");
  const [experience, setExperience] = useState("");
  const [landID, setLandID] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await landRequest({
      // userId,
      // name,
      landUnit,
      landLocation,
      experience,
    });
    console.log(res);
  };
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
            placeholder="Land unit"
            value={landUnit}
            onChange={(e) => setLandUnit(e.target.value)}
            style={{
              borderTopLeftRadius: "25px",
              borderBottomRightRadius: "25px",
            }}
            className="w-full p-2 px-5 text-black outline-none border-[1px] border-gray-800 focus:border-2 focus:border-[#42A045]"
          />
          <select
            style={{
              borderTopLeftRadius: "25px",
              borderBottomRightRadius: "25px",
            }}
            value={landLocation}
            onChange={(e) => setLandLocation(e.target.value)}
            className="w-full p-2 px-5 bg-white outline-none border-[1px] border-gray-800 focus:border-2 focus:border-[#42A045]"
          >
            <option value="">Select Location</option>
            {distictsData.map((dist) =>
              upozillasData.map(
                (upo) =>
                  dist.id === upo.district_id && (
                    <option key={upo.id} value={`${dist.name}, ${upo.name}`}>
                      {dist.name}, {upo.name}
                    </option>
                  )
              )
            )}
          </select>
          <input
            type="number"
            placeholder="Experience"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            style={{
              borderTopLeftRadius: "25px",
              borderBottomRightRadius: "25px",
            }}
            className="w-full p-2 px-5 text-black outline-none border-[1px] border-gray-800 focus:border-2 focus:border-[#42A045]"
          />
          <input
            type="number"
            placeholder="Land ID"
            value={landID}
            onChange={(e) => setLandID(e.target.value)}
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

export default CreateReq;
