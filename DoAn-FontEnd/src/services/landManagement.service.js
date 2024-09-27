import axios from "axios";
import { API_BASE_URL, authHeaders } from "./api.config";
import queryString from "query-string";

const landManagementApi = {
    getAllLandManagementByUser: (queryParams) => {
        console.log("api getAllLandManagementByUser");
        return axios.get(API_BASE_URL + "/landManagement?" + queryString.stringify(queryParams), authHeaders);
    },

    getLandManagementById: (id) => {
        console.log("api getLandManagementById");
        return axios.get(API_BASE_URL + "/landManagement/" + id, authHeaders);
    },
    
    updateLandManagementsFinishPlant: (queryParams) => {
        console.log("api updateLandManagementsFinishPlant");
        return axios.post(API_BASE_URL + "/landManagement/"+ queryParams.id +"/finishPlant", authHeaders);
    },
};
export default landManagementApi;
