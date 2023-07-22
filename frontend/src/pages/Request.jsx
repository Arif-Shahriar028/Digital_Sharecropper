import React, { useState } from 'react';
import Modal from '../components/Modal/Modal';
import CreateReq from '../components/Request/CreateReq';
import RequestForLandowner from '../components/Request/RequestForLandowner';
import RequestsForAgent from '../components/Request/RequestsForAgent';
import RequestsForFarmer from '../components/Request/RequestsForFarmer';
import CreateReqForInvestor from '../components/Request/CreateReqForInvestor';
import RequestForInvestor from '../components/Request/RequestForInvestor';

const Request = () => {
  const [reqModal, setReqModal] = useState(false);

  const userType = localStorage.getItem('Type');

  return (
    <React.Fragment>
      {reqModal && (
        <Modal>
          {userType === 'investor' ? (
            <CreateReqForInvestor setReqModal={setReqModal} />
          ) : (
            <CreateReq setReqModal={setReqModal} />
          )}
        </Modal>
      )}
      <div className="w-full min-h-screen flex justify-center items-start">
        <div className="w-[70%] flex flex-col mt-32">
          <div className="w-full flex justify-end items-center">
            {userType !== ('agent' || 'admin') && (
              <button
                onClick={() => {
                  setReqModal(true);
                }}
                className="text-white text-md px-10 py-3 bg-[#42A045] rounded-md"
              >
                {userType === 'investor' ? 'Invest' : 'Create request'}
              </button>
            )}
          </div>

          {userType === 'landowner' && <RequestForLandowner />}
          {userType === 'farmer' && <RequestsForFarmer />}
          {userType === 'agent' && <RequestsForAgent />}
          {userType === 'investor' && <RequestForInvestor />}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Request;
