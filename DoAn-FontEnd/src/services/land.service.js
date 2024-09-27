import axios from "axios";
import { API_BASE_URL, headers } from "./api.config";
import queryString from "query-string";

const landApi = {
    getAllLands: (queryParams) => {
        console.log("api getAllLands");
        return axios.get(API_BASE_URL + "/land?" + queryString.stringify(queryParams), headers);
    },
    getLandById: (id) => {
        console.log("api getLandById");
        return axios.get(API_BASE_URL + "/land/" + id, headers);
    },
    createLand: ({photos, ...queryParams}) => {
        console.log("api createLand");
        const userId = localStorage.getItem("userId");
        const token = localStorage.getItem("accessToken");

        const postData = {
          name: queryParams.name,
          description: queryParams.description,
          province: queryParams.province,
          size: queryParams.size,
          n: queryParams.n,
          p: queryParams.p,
          k: queryParams.k,
          pH: queryParams.pH,
          pricePerMonth: queryParams.pricePerMonth,
          isTree: queryParams.isTree,
          plantId: queryParams.plantId,
          harvestMonthTime: queryParams.harvestMonthTime,
          photos: photos,
          userId: userId,
        };

        return axios.post(API_BASE_URL + "/land", postData, 
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
        );
    },
};
export default landApi;
