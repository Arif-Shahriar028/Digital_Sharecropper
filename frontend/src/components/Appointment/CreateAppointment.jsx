/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { MdClear } from "react-icons/md";
import { distictsData } from "../Request/districts";
import { upozillasData } from "../Request/upozilla";
import { appointmentReq } from "../../Api/api";

const CreateAppointment = ({ setAppointModal }) => {
  const [appointmentTime, setAppointmentTime] = useState("");
  const [place, setPlace] = useState("");
  const [userId, setUserId] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await appointmentReq({
      userId,
      // agentId,
      appointmentTime,
      place,
    });
    console.log(res);
  };
  return (
    <React.Fragment>
      <div className="w-[600px] bg-white flex flex-col items-start justify-start p-3 rounded-lg">
        <div className="w-full flex justify-end items-center">
          <MdClear
            onClick={() => {
              setAppointModal(false);
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
            type="datetime-local"
            placeholder="Appointment time"
            value={appointmentTime}
            onChange={(e) => setAppointmentTime(e.target.value)}
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
            value={place}
            onChange={(e) => setPlace(e.target.value)}
            className="w-full p-2 px-5 bg-white outline-none border-[1px] border-gray-800 focus:border-2 focus:border-[#42A045]"
          >
            <option value="">Select District</option>
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
          <select
            style={{
              borderTopLeftRadius: "25px",
              borderBottomRightRadius: "25px",
            }}
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            className="w-full p-2 px-5 bg-white outline-none border-[1px] border-gray-800 focus:border-2 focus:border-[#42A045]"
          >
            <option value="">Select User</option>
            <option value="User_1">User - 1</option>
            <option value="User_2">User - 2</option>
            <option value="User_3">User - 3</option>
          </select>
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

export default CreateAppointment;
