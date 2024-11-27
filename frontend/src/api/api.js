
import axios from 'axios';

const API_URL = 'https://hackaton-33os.onrender.com/account/login/';

export const loginAdmin = async (username, password) => {
  try {
    const response = await axios.post(API_URL, { username, password });
    const data = response.data;

    if (data.message === "Logged in successfully with session" && data.is_admin) {
      return data.message; // Return the message (or a session token if available)
    } else {
      throw new Error(data.message || 'Login failed');
    }
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Network error');
  }
};

export const logoutAdmin = () => {
  localStorage.removeItem('authToken');
};





