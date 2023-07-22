/* eslint-disable react/prop-types */
import React, { useContext, useEffect, useState } from 'react';
import { MdClear } from 'react-icons/md';
import { dealRequest } from '../../Api/api';
import { ApiContext } from '../../Context/ApiContext';

const CreateDeal = ({ setDealModal }) => {
  let agentId = localStorage.getItem('key');
  const [landOwnerNid, setLandOwnerNid] = useState('');
  const [farmerNid, setFarmerNid] = useState('');
  const [landAmount, setLandAmount] = useState('');
  const [landId, setLandId] = useState('');

  const location = localStorage.getItem('location');

  const { farmerReqData, landOwnerData, farmerRequests, landOwnerRequests } =
    useContext(ApiContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log({ agentId, landOwnerNid, farmerNid, landAmount, landId });
    const res = await dealRequest({
      agentId,
      landOwnerNid,
      farmerNid,
      landAmount,
      landId,
    });
    console.log(res);
  };

  useEffect(() => {
    farmerRequests(location);
    landOwnerRequests(location);
  }, []);
  return (
    <React.Fragment>
      <div className="w-[600px] bg-white flex flex-col items-start justify-start p-3 rounded-lg">
        <div className="w-full flex justify-end items-center">
          <MdClear
            onClick={() => {
              setDealModal(false);
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
          <select
            style={{
              borderTopLeftRadius: '25px',
              borderBottomRightRadius: '25px',
            }}
            value={landOwnerNid}
            onChange={(e) => setLandOwnerNid(e.target.value)}
            className=" p-2 w-full outline-none border-[1px] border-gray-800 focus:border-2 focus:border-[#42A045]"
          >
            <option value="">Select Landowner NID</option>
            {landOwnerData.map((req) => (
              <option key={req.Key} value={req.Record.Nid}>
                {req.Record.Nid}
              </option>
            ))}
          </select>
          <select
            style={{
              borderTopLeftRadius: '25px',
              borderBottomRightRadius: '25px',
            }}
            value={landId}
            onChange={(e) => setLandId(e.target.value)}
            className=" p-2 w-full outline-none border-[1px] border-gray-800 focus:border-2 focus:border-[#42A045]"
          >
            <option value="">Select Land ID</option>
            {landOwnerData.map(
              (req) =>
                req.Record.Nid === landOwnerNid && (
                  <option key={req.Key} value={req.Record.LandId}>
                    {req.Record.LandId}
                  </option>
                )
            )}
          </select>
          <select
            style={{
              borderTopLeftRadius: '25px',
              borderBottomRightRadius: '25px',
            }}
            value={farmerNid}
            onChange={(e) => setFarmerNid(e.target.value)}
            className=" p-2 w-full outline-none border-[1px] border-gray-800 focus:border-2 focus:border-[#42A045]"
          >
            <option value="">Select Farmer NID</option>
            {farmerReqData.map((req) => (
              <option key={req.Record.Key} value={req.Record.Nid}>
                {req.Record.Nid}
              </option>
            ))}
          </select>
          <input
            type="number"
            placeholder="Land Amount"
            value={landAmount}
            onChange={(e) => setLandAmount(e.target.value)}
            style={{
              borderTopLeftRadius: '25px',
              borderBottomRightRadius: '25px',
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

export default CreateDeal;
