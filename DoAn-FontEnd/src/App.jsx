import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { LoginPage } from "./pages/Auth/LoginPage";
import { NotFound } from "./pages/ReponseStatusPage/NotFound";
import HomePage from "./pages/Homepage/HomePage";
import { PlantPage } from "./pages/Plant/PlantPage";
import { LogoutPage } from "./pages/Auth/LogoutPage";
import { LandPage } from "./pages/Land/LandPage";
import { PlantDiseasePage } from "./pages/PlantDisease/PlantDiseasePage";
import { LandDetail } from "./pages/Land/LandDetail";
import { LandManagementPage } from "./pages/LandManagement/LandManagementPage";
import { PlantDetail } from "./pages/Plant/PlantDetail";
import { SubscribePage } from "./pages/Subscribe/SubscribePage";
import { SubscribeDetail } from "./pages/Subscribe/SubscribeDetail";
import { TransactionPage } from "./pages/Transaction/TransactionPage";
import { LandManagementDetail } from "./pages/LandManagement/LandManagementDetail";
import { RegisterPage } from "./pages/Auth/RegisterPage";
import { LandManagementInfor } from "./pages/LandManagement/LandManagementInfor";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/logout" element={<LogoutPage />} />

        <Route path="/" element={<HomePage />} />

        <Route path="/plant" element={<PlantPage />} />
        <Route path="/plant/:plantId" element={<PlantDetail />} />

        <Route path="/land" element={<LandPage />} />
        <Route path="/land/:landId" element={<LandDetail />} />

        <Route path="/land-management" element={<LandManagementPage />} />
        <Route
          path="/land-management/:landManagementId"
          element={<LandManagementDetail />}
        />
        <Route
          path="/land-management/:landManagementId/land/:landId"
          element={<LandManagementInfor />}
        />

        <Route path="/subscribe" element={<SubscribePage />} />
        <Route path="/subscribe/:subscribeId" element={<SubscribeDetail />} />

        <Route path="/classification" element={<PlantDiseasePage />} />

        <Route path="/transaction" element={<TransactionPage />} />

        <Route path="/*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
