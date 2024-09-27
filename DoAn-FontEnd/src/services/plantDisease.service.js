import axios from "axios";
import { API_BASE_URL, headers } from "./api.config";
import queryString from "query-string";

const plantDiseaseApi = {
    createPlantDisease: (userId, photo) => {
        console.log("api createPlantDisease");
        const token = localStorage.getItem("accessToken");
        const postData = {
            userId: userId,
            photos: photo
          };
          console.log(postData);
        return axios.post(API_BASE_URL + "/plantDisease/classifyPlantDisease",
        postData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        });
    },
    getAllPlantDisease: (queryParams) => {
      console.log("api getAllPlantDisease");
      return axios.get(API_BASE_URL + "/plantDisease?" + queryString.stringify(queryParams), headers);
  },
};
export default plantDiseaseApi;
