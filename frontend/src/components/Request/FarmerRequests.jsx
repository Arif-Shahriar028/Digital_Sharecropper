import React, { useContext, useEffect, useState } from 'react';
import Loader from '../Loader';
import { ApiContext } from '../../Context/ApiContext';

const FarmerRequests = () => {
  const location = localStorage.getItem('location');
  const [loading, setLoading] = useState(false);
  const { farmerRequests, farmerReqData } = useContext(ApiContext);

  const allFarmerRequest = async () => {
    setLoading(true);
    await farmerRequests(location);
    setLoading(false);
  };
  useEffect(() => {
    allFarmerRequest();
  }, []);
  return (
    <React.Fragment>
      {loading ? (
        <Loader />
      ) : (
        <table className="w-full table-auto border-[1px] mt-3">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              {/* <th className="py-3 px-6 text-center"></th> */}
              <th className="py-3 px-6 text-center">Name</th>
              <th className="py-3 px-6 text-center">NID</th>
              <th className="py-3 px-6 text-center">Phone</th>
              <th className="py-3 px-6 text-center">Experience</th>
              <th className="py-3 px-6 text-center">Harvest type</th>
              <th className="py-3 px-6 text-center">Land Amount</th>
              <th className="py-3 px-6 text-center">Land Location</th>
              <th className="py-3 px-6 text-center">Date</th>
              <th className="py-3 px-6 text-center">Status</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-md">
            {farmerReqData.map((req) => (
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
                  {req.Record.FarmerId}
                </td>
                <td className="py-3 px-6 text-center whitespace-nowrap">
                  {req.Record.ExpTime}
                </td>
                <td className="py-3 px-6 text-center whitespace-nowrap">
                  {req.Record.HarvestType}
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

export default FarmerRequests;
