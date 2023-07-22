import React, { useState } from 'react';
import FarmerRequests from './FarmerRequests';
import LandOwnerRequests from './LandOwnerRequests';

const RequestsForAgent = () => {
  const [activeReq, setActiveReq] = useState('farmer_req');
  return (
    <React.Fragment>
      <div className="w-full flex justify-center item-center">
        <div className="w-full flex flex-col justify-center items-center">
          <div className="w-full flex justify-center mt-5">
            <div
              onClick={() => setActiveReq('landowner_req')}
              className={`w-full rounded-md flex justify-center items-center p-2 ${
                activeReq === 'landowner_req'
                  ? 'bg-[#42A045] text-white text-lg'
                  : 'bg-gray-300'
              }`}
            >
              Landowner requests
            </div>
            <div
              onClick={() => setActiveReq('farmer_req')}
              className={`w-full rounded-md flex justify-center items-center p-2 ${
                activeReq === 'farmer_req'
                  ? 'bg-[#42A045] text-lg text-white'
                  : 'bg-gray-300'
              }`}
            >
              Farmer requests
            </div>
          </div>
          {activeReq === 'farmer_req' ? (
            <FarmerRequests />
          ) : (
            <LandOwnerRequests />
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default RequestsForAgent;
