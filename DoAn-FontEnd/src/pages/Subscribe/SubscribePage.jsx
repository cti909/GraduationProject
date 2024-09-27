import { SubscribeTable } from "../../components/Subscribe/SubscribeTable";
import Footer from "../Layouts/Footer";
import ControlNavbar from "../Layouts/Header";

export const SubscribePage = () => {
  return (
    <>
      <ControlNavbar />

      {/* ảnh */}
      <div className="container mx-auto my-10 w-full">
        <h5 className="text-3xl text-center font-bold w-full">
          Thông tin đất đã thuê
        </h5>
      </div>

      <div className="container mx-auto my-10 w-full">
        <SubscribeTable />
      </div>

      <Footer />
    </>
  );
};
