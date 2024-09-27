import { Button } from "@mui/material";
import { LandSlide } from "../../components/HomePage/LandSlide";
import Footer from "../Layouts/Footer";
import ControlNavbar from "../Layouts/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleRight } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { PlantSlide } from "../../components/HomePage/PlantSlide";
import { HomePageSlide } from "../../components/HomePage/HomePageSlide";

const HomePage = () => {
  const navigate = useNavigate();

  const handleToPlant = () => {
    navigate("/plant");
  };

  const handleToLand = () => {
    navigate("/land");
  };

  return (
    <>
      <ControlNavbar />
      {/* slide introduce */}
      <HomePageSlide />

      {/* thống kê? */}

      {/* hiển thị list cây */}
      <div className="container mx-auto my-20 w-full">
        <div className="relative w-full border-2 border-black p-3 ">
          <div className="bg-black h-24 flex items-center justify-between px-4 mb-3">
            <h1 className="text-white text-lg">Danh mục các loại cây</h1>
            <Button
              variant="contained"
              style={{ backgroundColor: "white", color: "black" }}
              endIcon={<FontAwesomeIcon icon={faCircleRight} />}
              onClick={handleToPlant}
            >
              Xem thêm
            </Button>
          </div>
          <PlantSlide />
        </div>
      </div>

      {/* hiện thị list đất */}
      <div className="container mx-auto my-20 w-full">
        <div className="relative w-full border-2 border-black p-3">
          <div className="bg-black h-24 flex items-center justify-between px-4 mb-3">
            <h1 className="text-white text-lg">Danh mục các mảnh đất</h1>
            <Button
              variant="contained"
              style={{ backgroundColor: "white", color: "black" }}
              endIcon={<FontAwesomeIcon icon={faCircleRight} />}
              onClick={handleToLand}
            >
              Xem thêm
            </Button>
          </div>
          <LandSlide />
        </div>
      </div>

      <Footer />
    </>
  );
};

export default HomePage;
