import React, { useState } from "react";
import CreateDeal from "../components/Deal/CreateDeal";
import Modal from "../components/Modal/Modal";
import DealForLandowner from "../components/Deal/DealForLandowner";
import DealForFarmer from "../components/Deal/DealForFarmer";
import DealForAgent from "../components/Deal/DealForAgent";
import DealForAdmin from "../components/Deal/DealForAdmin";

const Deal = () => {
  const [delaModal, setDealModal] = useState(false);

  const userType = localStorage.getItem("Type");
  console.log(userType);
  return (
    <React.Fragment>
      {delaModal && (
        <Modal>
          <CreateDeal setDealModal={setDealModal} />
        </Modal>
      )}
      <div className="w-full min-h-screen flex justify-center items-start">
        <div className="w-[70%] flex flex-col mt-32">
          <div className="w-full flex justify-end items-center">
            <button
              onClick={() => {
                setDealModal(true);
              }}
              className="text-white text-md px-10 py-3 bg-[#42A045] rounded-md"
            >
              Deal request
            </button>
          </div>
          {userType === "landowner" && <DealForLandowner />}
          {userType === "farmer" && <DealForFarmer />}
          {userType === "agent" && <DealForAgent />}
          {userType === "admin" && <DealForAdmin />}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Deal;
