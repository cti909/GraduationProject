import axios from "axios";
import { API_BASE_URL, authHeaders } from "./api.config";
import queryString from "query-string";

const landManagementLogApi = {
    getLandManagementLogDetailBySubscribe: (queryParams) => {
        console.log("api getLandManagementLogDetailBySubscribe");
        return axios.get(API_BASE_URL + "/landManagementLog?" + queryString.stringify(queryParams), authHeaders);
    },
    
    updateLandManagementLog: (queryParams) => {
        console.log("api updateLandManagementLog");
        return axios.patch(API_BASE_URL + "/landManagementLog", queryParams, authHeaders);
    },
};
export default landManagementLogApi;
