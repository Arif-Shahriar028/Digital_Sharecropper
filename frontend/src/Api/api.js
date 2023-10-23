import axios from "axios";

const url = "http://localhost:3001";

export const userSignup = async (data) => {
  const res = await axios.post(`${url}/register`, data);
  return res;
};

export const userSignin = async (data) => {
  const res = await axios.post(`${url}/login`, data);
  return res;
};

export const landRequestForFarmer = async (data) => {
  const res = await axios.post(`${url}/farmer/request-land`, data);
  return res;
};

export const landRequestForOwner = async (data) => {
  const res = await axios.post(`${url}/landowner/lend-land`, data);
  return res;
};

export const appointmentReq = async (data) => {
  const res = await axios.post(`${url}/agent/set-appointment`, data);
  return res;
};

export const dealRequest = async (data) => {
  const res = await axios.post(`${url}/agent/req-deal`, data);
  return res;
};

export const newInvestment = async (data) => {
  const res = await axios.post(`${url}/investor/invest-req`, data);
  return res;
};

export const adminAgentLogin = async (data) => {
  const res = await axios.post(`${url}/admin/login`, data);
  return res;
};

export const updateDeal = async (landId) => {
  const res = await axios.post(`${url}/admin/make-deal`, { landId });
  return res;
};

// all get api

export const getLandReq = async (userId) => {
  const res = await axios.get(`${url}/farmer/get-req/${userId}`);
  return res;
};

export const getLendLandReq = async (userId) => {
  const res = await axios.get(`${url}/landowner/get-req/${userId}`);
  return res;
};

export const getInvestment = async (userId) => {
  const res = await axios.get(`${url}/investor/investment/${userId}`);
  return res;
};

export const getFarmersRequests = async (location) => {
  const res = axios.get(`${url}/agent/farmer-req/${location}`);
  return res;
};

export const getLandOwnerRequests = async (location) => {
  const res = axios.get(`${url}/agent/landowner-req/${location}`);
  return res;
};

export const getAllDeals = async () => {
  const res = axios.get(`${url}/admin/deal-req`);
  return res;
};

export const getTransactions = async () => {
  const res = await axios.get(`${url}/transaction`);
  return res;
};

export const getDealForUsers = async (userId) => {
  const res = await axios.get(`${url}/farmer/current-deal/${userId}`);
  return res;
};

export const getDealForAgent = async () => {
  const res = await axios.get(`${url}/admin/deal-req`);
  return res;
};

// local db
const local_db_url = " http://localhost:4000";

export const getReviews = async () => {
  const res = await axios.get(`${local_db_url}/reviews`);
  return res.data;
};

export const createReview = async (data) => {
  const res = await axios.post(`${local_db_url}/reviews`, data);
  return res.data;
};
