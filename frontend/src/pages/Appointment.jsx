import React, { useState } from "react";
import Modal from "../components/Modal/Modal";
import CreateAppointment from "../components/Appointment/CreateAppointment";

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
const Appointment = () => {
  const [appointModal, setAppointModal] = useState(false);
  return (
    <React.Fragment>
      {appointModal && (
        <Modal>
          <CreateAppointment setAppointModal={setAppointModal} />
        </Modal>
      )}
      <div className="w-full min-h-screen flex justify-center items-start">
        <div className="w-[70%] flex flex-col mt-36">
          <div className="w-full flex justify-end items-center">
            <button
              onClick={() => {
                setAppointModal(true);
              }}
              className="text-white text-md px-10 py-3 bg-[#42A045] rounded-md"
            >
              Create appointment
            </button>
          </div>

          <div className="w-full flex justify-center items-center">
            <table className="w-full table-auto mt-10 border-[1px]">
              <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                  {/* <th className="py-3 px-6 text-center"></th> */}
                  <th className="py-3 px-6 text-center">Agent</th>
                  <th className="py-3 px-6 text-center">User</th>
                  <th className="py-3 px-6 text-center">Appointment time</th>
                  <th className="py-3 px-6 text-center">Location</th>
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

export default Appointment;
