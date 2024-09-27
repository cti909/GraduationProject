import axios from "axios";
import { API_BASE_URL, authHeaders } from "./api.config";
import queryString from "query-string";

const recommendPlantApi = {
    getAllRecommendPlant: (queryParams) => {
        console.log("api getAllRecommendPlant");
        return axios.get(API_BASE_URL + "/recommendPlant?" + queryString.stringify(queryParams), authHeaders);
    },

    createRecommendPlantFromFarmer: (queryParams) => {
        console.log("api createRecommendPlantFromFarmer");
        // console.log(queryParams);
        return axios.post(API_BASE_URL + "/recommendPlant", queryParams, authHeaders);
    },
};
export default recommendPlantApi;