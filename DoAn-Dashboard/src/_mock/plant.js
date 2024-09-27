import axios from 'axios';
import queryString from 'query-string';

import { headers, API_BASE_URL  } from './api.config';

// plant
const getAllPlantAsync = async (queryParams) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/plant?${queryString.stringify(queryParams)}`, headers);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error login data: ', error);
    throw error;
  }
};

const createPlantAsync = async (queryParams) => {
  // try {
    const token = localStorage.getItem("accessToken");
    const response = await axios.post(`${API_BASE_URL}/plant`, queryParams, 
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response.data);
    return response.data;
  // } catch (error) {
  //   console.error('Error data: ', error);
  //   throw error;
  // }
};

export default {getAllPlantAsync, createPlantAsync}