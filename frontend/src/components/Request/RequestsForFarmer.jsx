import React, { useEffect, useState } from 'react';
import { getLandReq } from '../../Api/api';

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

const RequestsForFarmer = () => {
  const [reqData, setReqData] = useState([]);
  const userId = localStorage.getItem('key');

  const getFarmerReq = async () => {
    const res = await getLandReq(userId);
    setReqData(res.data);
  };
  console.log(reqData);
  useEffect(() => {
    getFarmerReq();
  }, []);
  return (
    <React.Fragment>
      <table className="w-full table-auto border-[1px] mt-3">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-center">Land Amount</th>
            <th className="py-3 px-6 text-center">Land location</th>
            <th className="py-3 px-6 text-center">Experience</th>
            <th className="py-3 px-6 text-center">Status</th>
          </tr>
        </thead>
        <tbody className="text-gray-700 text-md">
          {reqData.map((req) => (
            <tr
              key={req.Key}
              className="border-b border-gray-200 hover:bg-gray-100"
            >
              <td className="py-3 px-6 text-center whitespace-nowrap">
                {req.Record.LandAmount}
              </td>
              <td className="py-3 px-6 text-center whitespace-nowrap">
                {req.Record.LandLocation}
              </td>
              <td className="py-3 px-6 text-center whitespace-nowrap">
                {req.Record.ExpTime}
              </td>
              <td className="py-3 px-6 text-center whitespace-nowrap">
                <button
                  className={`${
                    req.Record.Status == 'pending'
                      ? 'bg-red-400'
                      : 'bg-[#42A045]'
                  } px-2 py-1 text-white rounded-md`}
                >
                  {req.Record.Status}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </React.Fragment>
  );
};

export default RequestsForFarmer;
