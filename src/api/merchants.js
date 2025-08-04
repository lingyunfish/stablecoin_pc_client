import axios from 'axios';

const API_URL = '/api/merchants';

const getMerchants = () => {
  return axios.get(API_URL).then(response => response.data.merchants);
};

const getMerchantById = (id) => {
  return axios.get(`${API_URL}/${id}`).then(response => response.data);
};

const createMerchant = (merchantData) => {
  return axios.post(API_URL, merchantData).then(response => response.data);
};

const updateMerchant = (id, merchantData) => {
  return axios.put(`${API_URL}/${id}`, merchantData).then(response => response.data);
};

const deleteMerchant = (id) => {
  return axios.delete(`${API_URL}/${id}`).then(response => response.data);
};

export default {
  getMerchants,
  getMerchantById,
  createMerchant,
  updateMerchant,
  deleteMerchant
};
