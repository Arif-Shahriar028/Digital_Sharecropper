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
