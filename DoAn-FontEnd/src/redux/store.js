import { configureStore } from "@reduxjs/toolkit";
// import thunk from "redux-thunk";
import authSlice from "./reducers/authSlice";
import plantSlice from "./reducers/plantSlice";
import plantDiseaseSlice from "./reducers/plantDiseaseSlice";
import landSlice from "./reducers/landSlice";
import subscribeSlice from "./reducers/subscribeSlice";
import landManagementSlice from "./reducers/landManagementSlice";
import transactionSlice from "./reducers/transactionSlice";
import provinceSlice from "./reducers/provinceSlice";
import landManagementLogSlice from "./reducers/landManagementLogSlice";
import recommendPlantSlice  from "./reducers/recommendPlantSlide";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    plant: plantSlice,
    land: landSlice,
    subscribe: subscribeSlice,
    transaction: transactionSlice,
    landManagement: landManagementSlice,
    landManagementLog: landManagementLogSlice,
    plantDisease: plantDiseaseSlice,
    province: provinceSlice,
    recommendPlant: recommendPlantSlice
  },
//   middleware: [thunk],
});
