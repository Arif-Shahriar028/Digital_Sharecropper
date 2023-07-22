import React, { useContext, useEffect, useState } from 'react';
import { ApiContext } from '../../Context/ApiContext';
import Loader from '../../components/Loader';
import { updateDeal } from '../../Api/api';

const DealForAdmin = () => {
  const [loading, setLoading] = useState(false);

  const { allDeals, dealsData } = useContext(ApiContext);

  const adminDeals = async () => {
    setLoading(true);
    await allDeals();
    setLoading(false);
  };

  const updateDealRequest = async (landId) => {
    console.log(landId);
    const res = await updateDeal(landId);
    if (res.status === 200) {
      adminDeals();
    }
  };
  useEffect(() => {
    adminDeals();
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
                <th className="py-3 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-md">
              {dealsData.map((req) => (
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
                  {req.Record.Status === 'approved' ? (
                    <td className="py-3 px-6 text-center whitespace-nowrap">
                      approved by admin.
                    </td>
                  ) : (
                    <td className="py-3 flex gap-x-2 justify-center px-6 text-center whitespace-nowrap">
                      <button
                        onClick={() => {
                          updateDealRequest(req.Record.LandId);
                        }}
                        className={` bg-[#42A045] px-2 py-1 text-white rounded-md`}
                      >
                        Allow
                      </button>
                      <button
                        className={` bg-red-400 px-2 py-1 text-white rounded-md`}
                      >
                        Deny
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </React.Fragment>
  );
};

export default DealForAdmin;
