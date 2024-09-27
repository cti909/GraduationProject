import axios from 'axios';
import queryString from 'query-string';

import { headers, authHeaders, API_BASE_URL  } from './api.config';


// auth
const login = async (formData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/loginAdmin`, formData, headers);
    console.log(response.data);
    localStorage.setItem('accessToken', response.data.accessToken);
    return response.data;
  } catch (error) {
    console.error('Error login data: ', error);
    throw error;
  }
};

const getMe = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/auth/me`, authHeaders);
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error login data: ', error);
    throw error;
  }
};

// user
const getAllUserAsync = async (queryParams) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/user?${queryString.stringify(queryParams)}`, authHeaders);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error login data: ', error);
    throw error;
  }
};


export default {login, getMe, getAllUserAsync}