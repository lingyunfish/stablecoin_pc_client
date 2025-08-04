import axios from 'axios';

const API_URL = '/api/auth';

export const login = (username, password) => {
  return axios
    .post(API_URL + '/login', {
      username,
      password
    })
    .then(response => {
        console.log('登录响应:', response);
      if (response.data.token) {
        localStorage.setItem('user', JSON.stringify(response.data));
      }
      return response.data;
    });
};

export const logout = () => {
  localStorage.removeItem('user');
  return axios.post(API_URL + '/logout');
};

export const register = (username, email, password) => {
  return axios.post(API_URL + '/register', {
    username,
    email,
    password
  });
};

export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('user'));
};

export default {
  login,
  logout,
  register,
  getCurrentUser
};
