import axios from 'axios';

const API_URL = '/api/transactions';

const getTransactionsByUserId = (userId) => {
  return axios.get(`${API_URL}/user/${userId}`).then(response => response.data);
};

const getTransactionById = (id) => {
  return axios.get(`${API_URL}/${id}`).then(response => response.data);
};

const getTransactionAll = () => {
    return axios.get(API_URL).then(response => response.data.transactions);
};

export default {
  getTransactionsByUserId,
  getTransactionById,
  getTransactionAll
};
