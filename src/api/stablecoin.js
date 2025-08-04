import axios from 'axios';

const API_URL = '/api/stablecoin';

// const getBalance = (userId) => {
    
//   return axios.get(`${API_URL}/balance/${userId}`).then(response => response.data);
// };


const getBalance = async (userId) => {
  try {
    const response = await axios.post(API_URL + '/balance', {
      address: userId, // 请求体中使用 address 字段
    });

    if (response.data.code === "0") {
      const balance = response.data.balance;
      return balance;
    } else {
      throw new Error(`请求失败: ${response.data.message}`);
    }
  } catch (error) {
    console.error('获取余额失败:', error);
    throw error;
  }
};

const transfer = (transferData) => {
  return axios.post(API_URL + '/transfer', transferData).then(response => response.data);
};

export default {
  getBalance,
  transfer
};
