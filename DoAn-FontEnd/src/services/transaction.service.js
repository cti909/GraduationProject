import axios from "axios";
import { API_BASE_URL, authHeaders } from "./api.config";
import queryString from "query-string";

const transactionApi = {
    getAllTransactionByUserId: (queryParams) => {
        console.log("api getAllTransactionByUser");
        return axios.get(API_BASE_URL + "/transaction?" + queryString.stringify(queryParams), authHeaders);
    },
    createTransaction: (queryParams) => {
        console.log("api createTransaction");
        var postData = {
            vnp_Amount: queryParams.vnp_Amount,
            vnp_BankCode: queryParams.vnp_BankCode,
            vnp_Locale: queryParams.vnp_Locale,
            userId: queryParams.userId,
          };
        return axios.post(API_BASE_URL + "/transaction/begin", postData, authHeaders);
    },
};
export default transactionApi;
