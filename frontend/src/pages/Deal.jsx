import React, { useState } from "react";
import CreateDeal from "../components/Deal/CreateDeal";
import Modal from "../components/Modal/Modal";
const appointLists = [
  {
    id: 1,
    appointmentTime: "10:30 AM",
    place: "Rangpur,Sadar",
    status: "Pending",
  },
  {
    id: 2,
    appointmentTime: "12:30 PM",
    place: "Rangpur,Sadar",
    status: "Accepted",
  },
];
const Deal = () => {
  const [delaModal, setDealModal] = useState(false);
  const [activeReq, setActiveReq] = useState("Approved");
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

          <div className="w-full flex flex-col justify-center items-center">
            <div className="w-full flex justify-center mt-5">
              <div
                onClick={() => setActiveReq("Approved")}
                className={`w-full rounded-md flex justify-center items-center p-2 ${
                  activeReq === "Approved"
                    ? "bg-[#42A045] text-white text-lg"
                    : "bg-gray-300"
                }`}
              >
                Approved deals
              </div>
              <div
                onClick={() => setActiveReq("Pending")}
                className={`w-full rounded-md flex justify-center items-center p-2 ${
                  activeReq === "Pending"
                    ? "bg-[#42A045] text-lg text-white"
                    : "bg-gray-300"
                }`}
              >
                Pending deals
              </div>
            </div>
            <table className="w-full table-auto mt-3 border-[1px]">
              <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                  {/* <th className="py-3 px-6 text-center"></th> */}
                  <th className="py-3 px-6 text-center">Landowner NID</th>
                  <th className="py-3 px-6 text-center">Farmer NID</th>
                  <th className="py-3 px-6 text-center">Location</th>
                  <th className="py-3 px-6 text-center">Land amount</th>
                  <th className="py-3 px-6 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="text-gray-700 text-md">
                {appointLists.map((req) => (
                  <tr
                    key={req.id}
                    className="border-b border-gray-200 hover:bg-gray-100"
                  >
                    <td className="py-3 px-6 text-center whitespace-nowrap">
                      {/* {req.landUnit} */}
                    </td>
                    <td className="py-3 px-6 text-center whitespace-nowrap">
                      {/* {req.landLocation} */}
                    </td>
                    <td className="py-3 px-6 text-center whitespace-nowrap">
                      {req.appointmentTime}
                    </td>
                    <td className="py-3 px-6 text-center whitespace-nowrap">
                      {req.place}
                    </td>
                    <td className="py-3 px-6 text-center whitespace-nowrap">
                      <button
                        className={`${
                          req.status == "Pending"
                            ? "bg-red-400"
                            : "bg-[#42A045]"
                        } px-2 py-1 text-white rounded-md`}
                      >
                        {req.status}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Deal;
