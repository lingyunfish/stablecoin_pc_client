import axios from 'axios';

const API_URL = '/api/users';

const getUsers = () => {
  return axios.get(API_URL).then(response => response.data.users);
};

const getUserById = (id) => {
  return axios.get(`${API_URL}/${id}`).then(response => response.data);
};

const createUser = (userData) => {
  return axios.post(API_URL, userData).then(response => response.data);
};

const updateUser = (id, userData) => {
  return axios.put(`${API_URL}/${id}`, userData).then(response => response.data);
};

const deleteUser = (id) => {
  return axios.delete(`${API_URL}/${id}`).then(response => response.data);
};

export default {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};
