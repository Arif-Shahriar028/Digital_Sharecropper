import React, { useContext, useEffect, useState } from 'react';
import { getDealForAgent } from '../../Api/api';
import Loader from '../Loader';

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
const DealForAgent = () => {
  const [loading, setLoading] = useState(false);
  const [agentDealData, setAgentDealData] = useState([]);

  const agentDeals = async () => {
    setLoading(true);
    const res = await getDealForAgent();
    setAgentDealData(res.data);
    setLoading(false);
  };
  useEffect(() => {
    agentDeals();
  }, []);
  return (
    <React.Fragment>
      <div className="w-full flex flex-col justify-center items-center">
        {loading ? (
          <Loader />
        ) : (
          <table className="w-full table-auto mt-3 border-[1px]">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-center">Agent ID</th>
                <th className="py-3 px-6 text-center">Farmer NID</th>
                <th className="py-3 px-6 text-center">Land Owner NID</th>
                <th className="py-3 px-6 text-center">Land ID</th>
                <th className="py-3 px-6 text-center">Land amount</th>
                <th className="py-3 px-6 text-center">Date</th>
                <th className="py-3 px-6 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-md">
              {agentDealData.map((req) => (
                <tr
                  key={req.Record.Key}
                  className="border-b border-gray-200 hover:bg-gray-100"
                >
                  <td className="py-3 px-6 text-center whitespace-nowrap">
                    {req.Record.AgentId}
                  </td>
                  <td className="py-3 px-6 text-center whitespace-nowrap">
                    {req.Record.FarmerNid}
                  </td>
                  <td className="py-3 px-6 text-center whitespace-nowrap">
                    {req.Record.LandOwnerNid}
                  </td>
                  <td className="py-3 px-6 text-center whitespace-nowrap">
                    {req.Record.LandId}
                  </td>
                  <td className="py-3 px-6 text-center whitespace-nowrap">
                    {req.Record.LandAmount}
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
      </div>
    </React.Fragment>
  );
};

export default DealForAgent;
