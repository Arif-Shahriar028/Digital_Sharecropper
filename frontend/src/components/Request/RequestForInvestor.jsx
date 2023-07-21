import React, { useEffect, useState } from 'react';
import { getInvestment } from '../../Api/api';

const RequestForInvestor = () => {
  const [investData, setInvestData] = useState([]);
  const userId = localStorage.getItem('key');

  const investmentData = async () => {
    const res = await getInvestment(userId);
    console.log(res);
    setInvestData(res.data);
  };
  useEffect(() => {
    investmentData();
  }, []);
  return (
    <React.Fragment>
      <table className="w-full table-auto border-[1px] mt-3">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-center">Investor Name</th>
            <th className="py-3 px-6 text-center">Investor Amount</th>
            <th className="py-3 px-6 text-center">Invextor NID</th>
          </tr>
        </thead>
        <tbody className="text-gray-700 text-md">
          {investData.map((req) => (
            <tr
              key={req.Key}
              className="border-b border-gray-200 hover:bg-gray-100"
            >
              <td className="py-3 px-6 text-center whitespace-nowrap">
                {req.Record.InvestorName}
              </td>
              <td className="py-3 px-6 text-center whitespace-nowrap">
                {req.Record.InvestAmount}
              </td>
              <td className="py-3 px-6 text-center whitespace-nowrap">
                {req.Record.InvestorNid}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </React.Fragment>
  );
};

export default RequestForInvestor;
