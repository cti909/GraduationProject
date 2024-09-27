// const urlBEAPI = "https://finalprojectbe-development-v1.up.railway.app";
// // const urlBEAPI="http://localhost:8080"
export const API_BASE_URL = "http://127.0.0.1:5268/api";
export const API_BASE = "http://127.0.0.1:5268"
export const headers = {
  headers: {
    "Content-Type": "application/json",
  },
};
export const authHeaders = {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  },
};

