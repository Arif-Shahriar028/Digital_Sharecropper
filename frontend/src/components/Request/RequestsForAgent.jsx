import React, { useState } from 'react';
const reqLists = [
  {
    id: 1,
    appointmentTime: '10:30 AM',
    landLocation: 'Rangpur,Sadar',
    experience: '2 years',
    nid: '1234567891',
    status: 'Pending',
  },
  {
    id: 2,
    appointmentTime: '12:30 ',
    landLocation: 'Rangpur,Sadar',
    experience: '3 years',
    nid: '1234567892',
    status: 'Accepted',
  },
];

const RequestsForAgent = () => {
  const [activeReq, setActiveReq] = useState('Approved');
  return (
    <React.Fragment>
      <div className="w-[70%] flex justify-center item-center">
        <div className="w-full flex flex-col justify-center items-center">
          <div className="w-full flex justify-center mt-5">
            <div
              onClick={() => setActiveReq('Approved')}
              className={`w-full rounded-md flex justify-center items-center p-2 ${
                activeReq === 'Approved'
                  ? 'bg-[#42A045] text-white text-lg'
                  : 'bg-gray-300'
              }`}
            >
              Landowner requests
            </div>
            <div
              onClick={() => setActiveReq('Pending')}
              className={`w-full rounded-md flex justify-center items-center p-2 ${
                activeReq === 'Pending'
                  ? 'bg-[#42A045] text-lg text-white'
                  : 'bg-gray-300'
              }`}
            >
              Farmer requests
            </div>
          </div>
          <table className="w-full table-auto border-[1px] mt-3">
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
                        req.status == 'Pending' ? 'bg-red-400' : 'bg-[#42A045]'
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
    </React.Fragment>
  );
};

export default RequestsForAgent;
