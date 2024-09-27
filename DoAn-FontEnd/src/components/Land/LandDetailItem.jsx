import { Alert, Button, CardContent } from "@mui/material";
import { Card } from "react-bootstrap";
import { API_BASE } from "../../services/api.config";
import { useDispatch, useSelector } from "react-redux";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { createSubscribeAction } from "../../redux/actions/subscribeAction";
import convertMoney from "../../utils/convertMoney";
import { useParams } from "react-router-dom";
import { getLandByIdAction } from "../../redux/actions/landAction";

export const LandDetailItem = ({ item }) => {
  const dispatch = useDispatch();
  const { landId } = useParams();

  const user = useSelector((state) => state.auth.user);

  const MySwal = withReactContent(Swal);

  const handleRent = () => {
    MySwal.fire({
      title: "Thông tin thuê",
      html: `
      <div class="flex justify-center items-center">
        <h5 class="w-1/5">Mô tả:</h5>
        <input id="description" class="w-4/5 swal2-input" placeholder="Mô tả">
      </div>
      <div class="flex justify-center items-center">
        <h5 class="w-1/5">Số tháng thuê:</h5>
        <input id="durationTime" class="w-4/5 swal2-input" type="number" placeholder="Số tháng thuê">
      </div>
        
      `,
      focusConfirm: false,
      preConfirm: () => {
        const description = document.getElementById("description").value;
        const durationTime = parseInt(
          document.getElementById("durationTime").value
        );

        if (!description || isNaN(durationTime)) {
          Swal.showValidationMessage("Hãy nhập đủ thông tin");
          return null;
        }

        if (!description || durationTime < 1) {
          Swal.showValidationMessage("Số tháng phải dương");
          return null;
        }

        return { description, durationTime };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const { description, durationTime } = result.value;
        const totalPrice = durationTime * item.landManagement.pricePerMonth;
        Swal.fire({
          title: "Bạn có đồng ý?",
          text:
            "Bạn thuê đất " +
            durationTime +
            " tháng với số tiền " +
            convertMoney(totalPrice),
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Đồng ý",
          cancelButtonText: "Hủy",
        }).then((result) => {
          if (result.isConfirmed) {
            const userId = localStorage.getItem("userId");
            const landManagementId = item.landManagement.id;
            dispatch(
              createSubscribeAction({
                description: description,
                durationTime: durationTime,
                totalPrice: totalPrice,
                userId: userId,
                landManagementId: landManagementId,
              })
            )
              .unwrap()
              .then(() => {
                MySwal.fire({
                  title: "Thành công!",
                  text: "Thuê đất thành công",
                  icon: "success",
                });
                dispatch(getLandByIdAction({ id: landId }));
              })
              .catch((error) => {
                MySwal.fire({
                  title: "Lỗi!",
                  text: error.message || "Đã xảy ra lỗi khi thuê đất",
                  icon: "error",
                });
              });
          }
        });
      }
    });
  };

  return (
    <>
      <div className="container mx-auto my-10 w-full">
        <div className="relative">
          <div className="relative bg-black h-12 flex items-center justify-center px-4">
            <h1 className="text-white text-lg text-center">
              Thông tin của mảnh đất
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
                  <img src={`${API_BASE}${item.photos}`} alt="" />
                </div>
                <div className="w-3/5">
                  <div className="ml-5">
                    <div className="flex items-center">
                      <h5 className="font-bold mr-2">Tên mảnh đất: </h5>
                      <span>{item.name}</span>
                    </div>
                    <div className="flex items-center">
                      <h5 className="font-bold mr-2">Chủ sở hữu: </h5>
                      <span>{item.user.name}</span>
                    </div>
                    <div className="flex items-center">
                      <h5 className="font-bold mr-2">Số điện thoại: </h5>
                      <span>{item.user.phoneNumber}</span>
                    </div>
                    <div className="flex items-center">
                      <h5 className="font-bold mr-2">Địa điểm: </h5>
                      <span>{item.province}</span>
                    </div>
                    <div className="flex items-center">
                      <h5 className="font-bold mr-2">Diện tích: </h5>
                      <span>{item.size} m2</span>
                    </div>
                    <div className="flex items-center">
                      <h5 className="font-bold mr-2">Nồng độ N-P-K: </h5>
                      <span>
                        {item.n}-{item.p}-{item.k}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <h5 className="font-bold mr-2">Độ PH: </h5>
                      <span>{item.pH}</span>
                    </div>
                    <div className="flex items-center">
                      <h5 className="font-bold mr-2">Trạng thái thuê: </h5>
                      <span>
                        {item.landManagement.isRented === true
                          ? "Đã có người thuê"
                          : "Chưa thuê"}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <h5 className="font-bold mr-2">
                        Đất trồng cây lâu năm:{" "}
                      </h5>
                      <span>
                        {item.landManagement.isPerennialTree === true
                          ? "Có"
                          : "Không"}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <h5 className="font-bold mr-2">Giá thuê: </h5>
                      <span>{item.landManagement.pricePerMonth} đ</span>
                    </div>
                    {/* nếu có cây thì phải có thông tin cây */}
                    {/* {item.landManagemants.isPerennialTree == false && } */}
                    {user && user.role != "farmer" && (
                      <div className="flex">
                        <Button
                          variant="contained"
                          onClick={handleRent}
                          disabled={item.landManagement.isRented === true}
                        >
                          Thuê ngay
                        </Button>
                        {item.landManagement.isRented === true && (
                          <Alert className="ml-4" severity="info">
                            Chú ý: Đã có người thuê mảnh đất này!
                          </Alert>
                        )}
                      </div>
                    )}
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
