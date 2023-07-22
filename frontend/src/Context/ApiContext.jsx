import { useState, createContext } from 'react';
import {
  dealRequest,
  getAllDeals,
  getFarmersRequests,
  getLandOwnerRequests,
  getLandReq,
  getLendLandReq,
} from '../Api/api';
export const ApiContext = createContext();

const ApiProvider = ({ children }) => {
  const userId = localStorage.getItem('key');
  const [farmerData, setFarmerata] = useState([]);
  const [reqLand, setReqLand] = useState([]);
  const [farmerReqData, setFarmerReqData] = useState([]);
  const [landOwnerData, setLandOwnerData] = useState([]);
  const [dealsData, setDealsData] = useState([]);

  const getFarmerReq = async () => {
    const res = await getLandReq(userId);
    setFarmerata(res.data);
  };

  const getOwnerLand = async () => {
    const res = await getLendLandReq(userId);
    setReqLand(res.data);
  };
  const farmerRequests = async (location) => {
    const res = await getFarmersRequests(location);
    setFarmerReqData(res.data);
  };

  const landOwnerRequests = async (location) => {
    const res = await getLandOwnerRequests(location);
    setLandOwnerData(res.data);
  };

  const allDeals = async () => {
    const res = await getAllDeals();
    console.log(res.data);
    setDealsData(res.data);
  };

  return (
    <ApiContext.Provider
      value={{
        farmerData,
        reqLand,
        farmerReqData,
        landOwnerData,
        dealsData,
        getFarmerReq,
        getOwnerLand,
        farmerRequests,
        landOwnerRequests,
        allDeals,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};

export default ApiProvider;
