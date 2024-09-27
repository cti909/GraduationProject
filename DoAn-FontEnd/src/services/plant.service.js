import axios from "axios";
import { API_BASE_URL, headers } from "./api.config";
import queryString from "query-string";

const plantApi = {
    getAllPlants: (queryParams) => {
        console.log("api getAllPlants");
        return axios.get(API_BASE_URL + "/plant?" + queryString.stringify(queryParams), headers);
    },

    getAllPerennialBasicPlants: () => {
        console.log("api getAllPerennialBasicPlants");
        return axios.get(API_BASE_URL + "/plant/perennialBasic", headers);
    },
    getPlantById: (id) => {
        console.log("api getPlantById");
        return axios.get(API_BASE_URL + "/plant/" + id, headers);
    },

    getAllPlantsRecommend: (queryParams) => {
        console.log("api getAllPlantsRecommend");
        var postData = {
            "top_select": queryParams.top_select,
            "n": queryParams.N,
            "p": queryParams.P,
            "k": queryParams.K,
            "ph": queryParams.ph
        }
        return axios.post(API_BASE_URL + "/plant/recommend", postData, headers);
    },
};
export default plantApi;
