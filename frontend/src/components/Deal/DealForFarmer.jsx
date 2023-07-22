import React, { useEffect, useState } from 'react';
import { getDealForUsers } from '../../Api/api';

const appointLists = [
  {
    id: 1,
    appointmentTime: '10:30 AM',
    place: 'Rangpur,Sadar',
    status: 'Pending',
  },
  {
    id: 2,
    appointmentTime: '12:30 PM',
    place: 'Rangpur,Sadar',
    status: 'Accepted',
  },
];

const DealForFarmer = () => {
  const userId = localStorage.getItem('key');
  const [dealsData, setDealData] = useState([]);
  const getDeals = async () => {
    const res = await getDealForUsers(userId);
    setDealData(res.data);
  };
  useEffect(() => {
    getDeals();
  }, []);
  return (
    <React.Fragment>
      {dealsData.length > 0 ? (
        <table className="w-full table-auto mt-3 border-[1px]">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-center">Landowner NID</th>
              <th className="py-3 px-6 text-center">Farmer NID</th>
              <th className="py-3 px-6 text-center">Location</th>
              <th className="py-3 px-6 text-center">Land ID</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-md">
            {dealsData.map((req) => (
              <tr
                key={req.Record.Key}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="py-3 px-6 text-center whitespace-nowrap">
                  {req.Record.LandOwnerId}
                </td>
                <td className="py-3 px-6 text-center whitespace-nowrap">
                  {req.Record.FarmerId}
                </td>
                <td className="py-3 px-6 text-center whitespace-nowrap">
                  {req.Record.Location}
                </td>
                <td className="py-3 px-6 text-center whitespace-nowrap">
                  {req.Record.LandId}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="w-full h-screen justify-center items-center">
          <h1 className="text-xl text-gray-800">There is no deals.</h1>
        </div>
      )}
    </React.Fragment>
  );
};

export default DealForFarmer;
