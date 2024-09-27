// import { createAsyncThunk } from "@reduxjs/toolkit";
// import {
//   FILTER_FRIEND,
//   FILTER_USER,
//   GET_ALL_FRIEND_INVITATION,
// } from "../actionConstants";
// import userApi from "../services/User/user.service";

// export const getFriendInvitationAction = createAsyncThunk(
//   GET_ALL_FRIEND_INVITATION,
//   async () => {
//     try {
//       const response = await userApi.friendInvitation();
//       return response.data;
//     } catch (error) {
//       console.log("error: ", error);
//       throw new Error(error.response.data.message);
//     }
//   }
// );

// export const userFilterAction = createAsyncThunk(
//   FILTER_USER,
//   async ({ searchToken }) => {
//     try {
//       const response = await userApi.userFilter(searchToken);
//       return response.data;
//     } catch (error) {
//       console.log("error: ", error);
//       throw new Error(error.response.data.message);
//     }
//   }
// );

// export const friendFilterAction = createAsyncThunk(
//   FILTER_FRIEND,
//   async ({ searchToken }) => {
//     try {
//       const response = await userApi.friendFilter(searchToken);
//       return response.data;
//     } catch (error) {
//       console.log("error: ", error);
//       throw new Error(error.response.data.message);
//     }
//   }
// );
