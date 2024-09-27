import { useDispatch, useSelector } from "react-redux";
import Footer from "../Layouts/Footer";
import ControlNavbar from "../Layouts/Header";
import { useNavigate, useParams } from "react-router-dom";
import { API_BASE } from "../../services/api.config";
import { Alert, Button } from "@mui/material";
import { useEffect } from "react";
import { getAllLandManagementsByIdAction } from "../../redux/actions/landManagementAction";
import convertMoney from "../../utils/convertMoney";
import convertTime from "../../utils/ConvertTime";
import { cancelSubscribeAction } from "../../redux/actions/subscribeAction";

export const LandManagementInfor = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { landManagementId } = useParams();
  const landManagementDetail = useSelector(
    (state) => state.landManagement.landManagement
  );

  useEffect(() => {
    dispatch(getAllLandManagementsByIdAction({ id: landManagementId }));
  }, [dispatch, landManagementId]);

  const handleToLandDetail = () => {
    navigate("/land/" + landManagementDetail.land.id);
  };

  const handleCancelSubscribe = (subscribeId, landManagementId) => {
    dispatch(
      cancelSubscribeAction({
        subscribeId: subscribeId,
        landManagementId: landManagementId,
      })
    );
    dispatch(getAllLandManagementsByIdAction({ id: landManagementId }));
  };

  const isDateInFuture = (date) => {
    const currentDate = new Date();
    const inputDate = new Date(date);
    return inputDate > currentDate;
  };

  return (
    <div className="relative">
      <ControlNavbar />
      <div className="container mx-auto my-10 w-full">
        <h5 className="text-3xl text-center font-bold w-full">
          Thông tin chi tiết mảnh đất
        </h5>
      </div>
      <div className="container mx-auto my-10 w-full">
        <div className="d-flex relative w-full border-2 border-black p-3">
          <div className="w-1/2 border-r-2 border-black p-2">
            {/* land */}
            {landManagementDetail && landManagementDetail.land && (
              <div>
                <div className="w-1/2">
                  <img
                    src={`${API_BASE}${landManagementDetail.land.photos}`}
                    alt=""
                  />
                </div>
                <div className="">
                  <div className="flex items-center">
                    <h5 className="font-bold mr-2">Tên mảnh đất: </h5>
                    <span>{landManagementDetail.land.name}</span>
                  </div>
                  <div className="flex items-center">
                    <h5 className="font-bold mr-2">Chủ sở hữu: </h5>
                    <span>{landManagementDetail.user.name}</span>
                  </div>
                  <div className="flex items-center">
                    <h5 className="font-bold mr-2">Số điện thoại: </h5>
                    <span>{landManagementDetail.user.phoneNumber}</span>
                  </div>
                  <div className="flex items-center">
                    <h5 className="font-bold mr-2">Địa điểm: </h5>
                    <span>{landManagementDetail.land.province}</span>
                  </div>
                  <div className="flex items-center">
                    <h5 className="font-bold mr-2">Diện tích: </h5>
                    <span>{landManagementDetail.land.size} m2</span>
                  </div>
                  <div className="flex items-center">
                    <h5 className="font-bold mr-2">Nồng độ N-P-K: </h5>
                    <span>
                      {landManagementDetail.land.n}-
                      {landManagementDetail.land.p}-
                      {landManagementDetail.land.k}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <h5 className="font-bold mr-2">Độ PH: </h5>
                    <span>{landManagementDetail.land.pH}</span>
                  </div>
                  <div className="flex items-center">
                    <h5 className="font-bold mr-2">Giá tiền: </h5>
                    <span>
                      {convertMoney(landManagementDetail.pricePerMonth)}
                    </span>
                  </div>
                </div>

                <Button variant="contained" onClick={handleToLandDetail}>
                  Xem chi tiết
                </Button>
              </div>
            )}
          </div>
          <div className="w-1/2 p-2">
            {/* Plant */}
            {landManagementDetail && (
              <div>
                <div className="mb-3">
                  <h5 className="font-bold text-2xl text-center">
                    Thông tin cho thuê hiện tại
                  </h5>
                </div>
                {landManagementDetail.isRented == true &&
                landManagementDetail.subscribes &&
                landManagementDetail.subscribes.length != 0 ? (
                  <div>
                    <div className="">
                      <div className="flex items-center">
                        <h5 className="font-bold mr-2">Tên người thuê: </h5>
                        <span>
                          {landManagementDetail.subscribes[0].user.name ??
                            "Không có"}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <h5 className="font-bold mr-2">Email: </h5>
                        <span>
                          {landManagementDetail.subscribes[0].user.email ??
                            "Không có"}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <h5 className="font-bold mr-2">Số điện thoại: </h5>
                        <span>
                          {landManagementDetail.subscribes[0].user
                            .phoneNumber ?? "Không có"}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <h5 className="font-bold mr-2">Ngày hết hạn:</h5>
                        <span>
                          {convertTime(
                            landManagementDetail.subscribes[0].rentedEndTime
                          )}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <h5 className="font-bold mr-2">Mô tả: </h5>
                        <span>
                          {landManagementDetail.subscribes[0].description}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <h5 className="font-bold mr-2">Trạng thái: </h5>
                        <span>
                          <div
                            className={`flex justify-center border-2 rounded p-2 ${
                              isDateInFuture(
                                landManagementDetail.subscribes[0].rentedEndTime
                              )
                                ? "bg-green-100 text-green-800 border-emerald-200"
                                : "bg-red-100 text-red-800 border-red-200"
                            }`}
                          >
                            {isDateInFuture(
                              landManagementDetail.subscribes[0].rentedEndTime
                            )
                              ? "Còn hạn"
                              : "Hết hạn"}
                          </div>
                        </span>
                      </div>
                    </div>
                    {!isDateInFuture(
                      landManagementDetail.subscribes[0].rentedEndTime
                    ) && (
                      <Button
                        className="mt-2"
                        variant="contained"
                        color="error"
                        onClick={() =>
                          handleCancelSubscribe(
                            landManagementDetail.subscribes[0].id,
                            landManagementDetail.id
                          )
                        }
                      >
                        Hủy cho thuê
                      </Button>
                    )}
                  </div>
                ) : (
                  <div className="">
                    <Alert severity="info" className="mb-2">
                      Hiện tại chưa có khách hàng thuê!
                    </Alert>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
