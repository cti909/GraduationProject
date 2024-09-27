// import { createSlice } from "@reduxjs/toolkit";
// import {
//   friendFilterAction,
//   friendInvitation,
//   getFriendInvitationAction,
//   userFilterAction,
// } from "../actions/userAction";

// const initialState = {
//   friendInvitationSender: [],
//   friendInvitationReceiver: [],
//   friendFilter: [],
//   userFilter: [],
//   loading: false,
//   error: null,
// };

// export const userSlice = createSlice({
//   name: "user",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     // friendFilter
//     builder.addCase(friendFilterAction.pending, (state) => {
//       state.loading = true;
//     });
//     builder.addCase(friendFilterAction.fulfilled, (state, action) => {
//       console.log(action.payload.data);
//       state.loading = false;
//       state.friendFilter = action.payload.data;
//     });
//     builder.addCase(friendFilterAction.rejected, (state, action) => {
//       state.loading = false;
//       console.log("error in slice: ", action.error.message);
//       state.error = action.error.message;
//     });
//     // userFilter
//     builder.addCase(userFilterAction.pending, (state) => {
//       state.loading = true;
//     });
//     builder.addCase(userFilterAction.fulfilled, (state, action) => {
//       state.loading = false;
//       state.userFilter = action.payload.data;
//     });
//     builder.addCase(userFilterAction.rejected, (state, action) => {
//       state.loading = false;
//       console.log("error in slice: ", action.error.message);
//       state.error = action.error.message;
//     });
//     // friendInvitation
//     builder.addCase(getFriendInvitationAction.pending, (state) => {
//       state.loading = true;
//     });
//     builder.addCase(getFriendInvitationAction.fulfilled, (state, action) => {
//       state.loading = false;
//       state.friendInvitationSender = action.payload.data.senderList;
//       state.friendInvitationReceiver = action.payload.data.receiverList;
//     });
//     builder.addCase(getFriendInvitationAction.rejected, (state, action) => {
//       state.loading = false;
//       console.log("error in slice: ", action.error.message);
//       state.error = action.error.message;
//     });
//   },
// });

// export default userSlice.reducer;
