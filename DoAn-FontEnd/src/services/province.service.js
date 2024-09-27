import axios from "axios";
import { API_BASE_URL, headers } from "./api.config";

const provinceApi = {
    getAllProvinces: () => {
      console.log("api getAllProvinces");
      return axios.get(API_BASE_URL + "/province", headers);
  },
};
export default provinceApi;
