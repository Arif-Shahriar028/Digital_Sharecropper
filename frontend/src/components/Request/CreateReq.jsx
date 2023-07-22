/* eslint-disable react/prop-types */
import React, { useContext, useState } from 'react';
import { MdClear } from 'react-icons/md';
import { distictsData } from './districts';
import { upozillasData } from './upozilla';
import { landRequestForFarmer, landRequestForOwner } from '../../Api/api';
import { cropList } from './cropLists';
import { ApiContext } from '../../Context/ApiContext';
import Loader from '../Loader';

const CreateReq = ({ setReqModal }) => {
  const [landLocation, setLandLocation] = useState('');
  const [experience, setExperience] = useState('');
  const [landId, setLandID] = useState('');
  const [landAmount, setLandAmount] = useState('');
  const [harvestType, setHarvestType] = useState('');
  const [loading, setLoading] = useState(false);

  const { getFarmerReq, getOwnerLand } = useContext(ApiContext);

  const userType = localStorage.getItem('Type');
  const userId = localStorage.getItem('key');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (userType === 'landowner') {
      const res = await landRequestForOwner({
        userId,
        landId,
        landAmount,
        landLocation,
      });
      getOwnerLand();
    } else {
      const res = await landRequestForFarmer({
        userId,
        landLocation,
        landAmount,
        experience,
        harvestType,
      });
    }
    setReqModal(false);
    setLoading(false);
    getFarmerReq();
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
          {userType === 'farmer' ? (
            <>
              <input
                type="number"
                placeholder="Experience"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                style={{
                  borderTopLeftRadius: '25px',
                  borderBottomRightRadius: '25px',
                }}
                className="w-full p-2 px-5 text-black outline-none border-[1px] border-gray-800 focus:border-2 focus:border-[#42A045]"
              />

              <select
                style={{
                  borderTopLeftRadius: '25px',
                  borderBottomRightRadius: '25px',
                }}
                value={harvestType}
                onChange={(e) => setHarvestType(e.target.value)}
                className=" p-2 w-full outline-none border-[1px] border-gray-800 focus:border-2 focus:border-[#42A045]"
              >
                <option value="">Select harvest type</option>
                {cropList.map((crop) => (
                  <option key={crop.id} value={crop.name}>
                    {crop.name}
                  </option>
                ))}
              </select>
            </>
          ) : (
            <>
              <input
                type="number"
                placeholder="Land ID"
                value={landId}
                onChange={(e) => setLandID(e.target.value)}
                style={{
                  borderTopLeftRadius: '25px',
                  borderBottomRightRadius: '25px',
                }}
                className="w-full p-2 px-5 text-black outline-none border-[1px] border-gray-800 focus:border-2 focus:border-[#42A045]"
              />
            </>
          )}
          <select
            style={{
              borderTopLeftRadius: '25px',
              borderBottomRightRadius: '25px',
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
            placeholder="Land amount (Acre)"
            value={landAmount}
            onChange={(e) => setLandAmount(e.target.value)}
            style={{
              borderTopLeftRadius: '25px',
              borderBottomRightRadius: '25px',
            }}
            className="w-full p-2 px-5 text-black outline-none border-[1px] border-gray-800 focus:border-2 focus:border-[#42A045]"
          />

          <div className="w-full flex justify-center items-center">
            {loading ? (
              <Loader />
            ) : (
              <button
                type="submit"
                className="px-5 py-2 rounded-md bg-[#42A045] text-white"
              >
                Submit
              </button>
            )}
          </div>
        </form>
      </div>
    </React.Fragment>
  );
};

export default CreateReq;
