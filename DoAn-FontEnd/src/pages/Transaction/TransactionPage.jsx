import { useState } from "react";
import { PaymentForm } from "../../components/Transaction/TransactionForm";
import Footer from "../Layouts/Footer";
import ControlNavbar from "../Layouts/Header";
import { TransactionHistory } from "../../components/Transaction/TransactionHistory";

export const TransactionPage = () => {
  const [selectedTab, setSelectedTab] = useState(1);

  const handleData = (select) => {
    console.log(select);
    setSelectedTab(select);
  };

  const renderContent = () => {
    switch (selectedTab) {
      case 1:
        return <TransactionHistory />;
      case 2:
        return <PaymentForm />;
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
                  Lịch sử thanh toán
                </div>
              </li>
              <li className="w-full py-2 px-3 cursor-pointer border-l-2 border-r-2 border-b-2 border-black bg-orange-50 hover:bg-slate-300">
                <div className="w-full" onClick={() => handleData(2)}>
                  Thanh toán
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
