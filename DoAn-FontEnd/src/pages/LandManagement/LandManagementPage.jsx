import ControlNavbar from "../Layouts/Header";
import Footer from "../Layouts/Footer";
import { useState } from "react";
import { LandInformationTable } from "../../components/LandManagement/LandInformationTable";
import { CreateLandForm } from "../../components/LandManagement/CreateLandForm";

export const LandManagementPage = () => {
  const [selectedTab, setSelectedTab] = useState(1);

  const handleData = (select) => {
    console.log(select);
    setSelectedTab(select);
  };

  const renderContent = () => {
    switch (selectedTab) {
      case 1:
        return <LandInformationTable />;
      case 2:
        return <CreateLandForm />;
      default:
        return null;
    }
  };

  return (
    <>
      <ControlNavbar />

      <div className="container mx-auto my-10 w-full">
        <div className="flex">
          <div className="w-1/5">
            <ul className="pr-3">
              <li className="w-full p-3 border-2 border-black bg-orange-100 uppercase">
                <h5 className="font-bold">Quản lý</h5>
              </li>
              <li className="w-full py-2 px-3 cursor-pointer border-l-2 border-r-2 border-b-2 border-black bg-orange-50 hover:bg-slate-300">
                <div className="w-full" onClick={() => handleData(1)}>
                  Quản lý đất
                </div>
              </li>
              <li className="w-full py-2 px-3 cursor-pointer border-l-2 border-r-2 border-b-2 border-black bg-orange-50 hover:bg-slate-300">
                <div className="w-full" onClick={() => handleData(2)}>
                  Tạo mới thông tin đất
                </div>
              </li>
            </ul>
          </div>
          <div className="w-4/5"> {renderContent()}</div>
        </div>
      </div>

      <Footer />
    </>
  );
};
