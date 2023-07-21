import axios from 'axios';

const url = 'http://localhost:3001';

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
