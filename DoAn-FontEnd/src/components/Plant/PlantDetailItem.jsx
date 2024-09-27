import { Card, CardContent } from "@mui/material";
import { API_BASE } from "../../services/api.config";

export const PlantDetailItem = ({ item }) => {
  return (
    <>
      <div className="container mx-auto my-10 w-full">
        <div className="relative">
          <div className="relative bg-black h-12 flex items-center justify-center px-4">
            <h1 className="text-white text-lg text-center">
              Thông tin của cây trồng
            </h1>
            <div
              className="absolute w-full -bottom-12 left-0 transform-translate-x-1/2"
              style={{ zIndex: -10 }}
            >
              <div className="border-l-[50px] border-l-transparent border-r-[50px] border-r-transparent border-t-[50px] border-t-gray-500"></div>
              {/* <div className="absolute w-[60px] h-[60px] bg-white top-[-30px] left-1/2 transform -translate-x-1/2 z-10"></div> */}
            </div>
          </div>
          <div className="z-100 px-5">
            <Card sx={{ minWidth: 275 }}>
              <CardContent className="flex">
                <div className="w-2/5">
                  <img
                    className="w-full"
                    src={`${API_BASE}${item.photos}`}
                    alt=""
                  />
                </div>
                <div className="w-3/5">
                  <div className="ml-5">
                    <div className="flex items-center">
                      <h5 className="font-bold mr-2">Tên cây trồng: </h5>
                      <span>{item.name}</span>
                    </div>
                    <div className="flex items-center">
                      <h5 className="font-bold mr-2">
                        Số ngày cần để trưởng thành:
                      </h5>
                      <span>{item.growthTimeDay} ngày</span>
                    </div>
                    <div className="flex items-center">
                      <h5 className="font-bold mr-2">Cây lâu năm:</h5>
                      <span>
                        {item.isPerennialTree === true ? "Có" : "Không"}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <h5 className="font-bold mr-2">
                        Mô tả:{" "}
                        <span className="font-normal">{item.description}</span>
                      </h5>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};
