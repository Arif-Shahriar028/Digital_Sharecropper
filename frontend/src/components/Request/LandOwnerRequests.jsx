import React, { useContext, useEffect, useState } from 'react';
import { getLandOwnerRequests } from '../../Api/api';
import Loader from '../Loader';
import { ApiContext } from '../../Context/ApiContext';
const reqLists = [
  {
    id: 1,
    landUnit: '1',
    landLocation: 'Dhaka, Dhamrai',
    nid: '123456',
  },
];
const LandOwnerRequests = () => {
  const location = localStorage.getItem('location');
  const [loading, setLoading] = useState(false);
  const { landOwnerRequests, landOwnerData } = useContext(ApiContext);

  const allLandOwnerRequests = async () => {
    setLoading(true);
    await landOwnerRequests(location);
    setLoading(false);
  };
  useEffect(() => {
    allLandOwnerRequests();
  }, []);
  return (
    <React.Fragment>
      {loading ? (
        <Loader />
      ) : (
        <table className="w-full table-auto border-[1px] mt-3">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-center">Name</th>
              <th className="py-3 px-6 text-center">NID</th>
              <th className="py-3 px-6 text-center">Phone</th>
              <th className="py-3 px-6 text-center">Land Amount</th>
              <th className="py-3 px-6 text-center">Land Location</th>
              <th className="py-3 px-6 text-center">Date</th>
              <th className="py-3 px-6 text-center">Status</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-md">
            {landOwnerData.map((req) => (
              <tr
                key={req.Record.Key}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="py-3 px-6 text-center whitespace-nowrap">
                  {req.Record.Name}
                </td>
                <td className="py-3 px-6 text-center whitespace-nowrap">
                  {req.Record.Nid}
                </td>
                <td className="py-3 px-6 text-center whitespace-nowrap">
                  {req.Record.LandOwnerId}
                </td>
                <td className="py-3 px-6 text-center whitespace-nowrap">
                  {req.Record.LandAmount} acre
                </td>
                <td className="py-3 px-6 text-center whitespace-nowrap">
                  {req.Record.LandLocation}
                </td>
                <td className="py-3 px-6 text-center whitespace-nowrap">
                  {req.Record.ReqTime}
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
      )}
    </React.Fragment>
  );
};

export default LandOwnerRequests;
