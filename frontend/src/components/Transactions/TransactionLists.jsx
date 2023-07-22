import React, { useEffect, useState } from 'react';
import { AiOutlineTransaction } from 'react-icons/ai';
import { getTransactions } from '../../Api/api';
import Loader from '../Loader';
const TransactionLists = () => {
  const [trnasactionData, setTransactionData] = useState([]);
  const [loading, setLoading] = useState(false);
  const getAllTransaction = async () => {
    setLoading(true);
    const res = await getTransactions();
    console.log(res.data);
    setTransactionData(res.data);
    setLoading(false);
  };
  useEffect(() => {
    getAllTransaction();
  }, []);
  return (
    <React.Fragment>
      <div className="w-full min-h-screen flex justify-center items-start p-5">
        <div className="w-[70%] flex flex-col justify-start items-start mt-36">
          <div className="w-full flex justify-start items-center gap-x-2">
            <AiOutlineTransaction className="text-3xl text-[#42A045]" />
            <span className="text-2xl font-bold text-[#42A045]">
              All Transactions
            </span>
          </div>
          <div className="w-full grid grid-cols-3 gap-12 mt-10">
            {loading ? (
              <Loader />
            ) : (
              trnasactionData.map((data) => (
                <div
                  style={{
                    borderTopLeftRadius: '25px',
                  }}
                  key={data.Key}
                  className="flex flex-col items-center shadow-md border-2 rounded-md"
                >
                  <div
                    style={{
                      borderTopLeftRadius: '25px',
                    }}
                    className="h-10 w-full bg-[#42A045]"
                  ></div>
                  <div className="p-5">
                    <h2 className="text-gray-800 font-semibold">
                      Date: {data.Record.Date}
                    </h2>
                    <h2 className="text-gray-800 font-semibold">
                      Time: {data.Record.Time}
                    </h2>
                    <h2 className="text-gray-800 font-semibold">
                      Transaction id: {data.Record.TxId}
                    </h2>
                    <h2 className="text-gray-800 font-semibold">
                      Transaction type: {data.Record.Type}
                    </h2>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default TransactionLists;
