import React, { useState } from "react";
import Modal from "../components/Modal/Modal";
import CreateReq from "../components/Request/CreateReq";
const reqLists = [
  {
    id: 1,
    appointmentTime: "10:30 AM",
    landLocation: "Rangpur,Sadar",
    experience: "2 years",
    nid: "1234567891",
    status: "Pending",
  },
  {
    id: 2,
    appointmentTime: "12:30 ",
    landLocation: "Rangpur,Sadar",
    experience: "3 years",
    nid: "1234567892",
    status: "Accepted",
  },
];
const Request = () => {
  const [reqModal, setReqModal] = useState(false);
  return (
    <React.Fragment>
      {reqModal && (
        <Modal>
          <CreateReq setReqModal={setReqModal} />
        </Modal>
      )}
      <div className="w-full min-h-screen flex justify-center items-start">
        <div className="w-[70%] flex flex-col mt-36">
          <div className="w-full flex justify-end items-center">
            <button
              onClick={() => {
                setReqModal(true);
              }}
              className="text-white text-md px-10 py-3 bg-[#42A045] rounded-md"
            >
              Create request
            </button>
          </div>

          <div className="w-full flex justify-center items-center">
            <table className="w-full table-auto mt-10 border-[1px]">
              <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                  {/* <th className="py-3 px-6 text-center"></th> */}
                  <th className="py-3 px-6 text-center">Land unit</th>
                  <th className="py-3 px-6 text-center">Land location</th>
                  <th className="py-3 px-6 text-center">Experience</th>
                  <th className="py-3 px-6 text-center">NID</th>
                  <th className="py-3 px-6 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="text-gray-700 text-md">
                {reqLists.map((req) => (
                  <tr
                    key={req.id}
                    className="border-b border-gray-200 hover:bg-gray-100"
                  >
                    <td className="py-3 px-6 text-center whitespace-nowrap">
                      {req.landUnit}
                    </td>
                    <td className="py-3 px-6 text-center whitespace-nowrap">
                      {req.landLocation}
                    </td>
                    <td className="py-3 px-6 text-center whitespace-nowrap">
                      {req.experience}
                    </td>
                    <td className="py-3 px-6 text-center whitespace-nowrap">
                      {req.nid}
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

export default Request;
