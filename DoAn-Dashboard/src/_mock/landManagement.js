import axios from 'axios';
import queryString from 'query-string';

import { headers, API_BASE_URL, authHeaders  } from './api.config';

const getAllLandManagementAsync = async (queryParams) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/landManagement/pendingStatus?${queryString.stringify(queryParams)}`, authHeaders);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error land management data: ', error);
    throw error;
  }
};

const updateLandManagementStatusAsync = async (id, status) => {
  try {
    console.log(status)
    const response = await axios.post(
      `${API_BASE_URL}/landManagement/${id}/status`,
      {"status": status},
      authHeaders
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error updating land management status: ', error);
    throw error;
  }
};

export default {getAllLandManagementAsync, updateLandManagementStatusAsync}