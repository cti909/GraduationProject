import axios from "axios";
import { API_BASE_URL, authHeaders } from "./api.config";
import queryString from "query-string";

const subscribeApi = {
    getAllSubscribeByUser: (queryParams) => {
        console.log("api getAllSubscribeByUser");
        return axios.get(API_BASE_URL + "/subscribe?" + queryString.stringify(queryParams), authHeaders);
    },

    getSubscribeById: (id) => {
        console.log("api getSubscribeById");
        return axios.get(API_BASE_URL + "/subscribe/" + id, authHeaders);
    },

    createSubscribe: (description, durationTime, totalPrice, userId, landManagementId) => {
        console.log("api createSubscribe");
        const postData = {
            description: description,
            durationTime: durationTime,
            totalPrice: totalPrice,
            landManagementId: landManagementId,
            userId: userId,
          };
          console.log(postData);
        return axios.post(API_BASE_URL + "/subscribe", postData, authHeaders);
    },
    
    updateSubscribePlant: (queryParams) => {
        console.log("api updateSubscribePlant");
        const postData = {
            landManagementId: queryParams.landManagementId,
            plantId: queryParams.plantId,
            subscribeId: queryParams.subscribeId,
            userId: queryParams.userId,
          };
        //   console.log(queryParams);
        return axios.post(API_BASE_URL + "/subscribe/plant", postData, authHeaders);
    },
    cancelSubscribe: (queryParams) => {
        console.log("api cancelSubscribe");
        const postData = {
            subscribeId: queryParams.subscribeId,
            landManagementId: queryParams.landManagementId
          };
        //   console.log(queryParams);
        return axios.post(API_BASE_URL + "/subscribe/cancelSubscribe", postData, authHeaders);
    },
};
export default subscribeApi;
