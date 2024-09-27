import ControlNavbar from "../Layouts/Header";
import Footer from "../Layouts/Footer";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSubscribesByIdAction } from "../../redux/actions/subscribeAction";
import { useNavigate, useParams } from "react-router-dom";
import { API_BASE } from "../../services/api.config";
import { Alert, Button } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleXmark,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { SubscribePlant } from "../../components/Subscribe/SubscribePlant";
import { getLandManagementLogDetailBySubscribeAction } from "../../redux/actions/landManagementLogAction";
import convertTime from "../../utils/ConvertTime";
import {
  LANDMANAGEMENTLOG_FINISH,
  SUBSCRIBE_ENDED,
  SUBSCRIBE_PROCESSING,
} from "../../constants/common";

export const SubscribeDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { subscribeId } = useParams();
  const [showPlantForm, setShowPlantForm] = useState(false);
  const subscribeDetail = useSelector((state) => state.subscribe.subscribe);
  const landManagementLogDetail = useSelector(
    (state) => state.landManagementLog.landManagementLogs
  );

  useEffect(() => {
    dispatch(getSubscribesByIdAction({ id: subscribeId }));
  }, [dispatch, subscribeId]);

  useEffect(() => {
    dispatch(
      getLandManagementLogDetailBySubscribeAction({
        subscribeId: subscribeId,
        customerId: localStorage.getItem("userId"),
      })
    );
  }, [dispatch, subscribeId]);

  const handleToLandDetail = () => {
    navigate("/land/" + subscribeDetail.landManagement.land.id);
  };

  const handleToPlantDetail = () => {
    navigate("/plant/" + subscribeDetail.landManagement.plant.id);
  };

  return (
    <div className="relative">
      <ControlNavbar />

      <div className="container mx-auto my-10 w-full">
        <h5 className="text-3xl text-center font-bold w-full">
          Quản lý mảnh đất đã thuê
        </h5>
      </div>

      <div className="container mx-auto my-10 w-full">
        <div className="d-flex relative w-full border-2 border-black p-3">
          <div className="w-2/5 border-r-2 border-black p-2">
            {/* land */}
            {subscribeDetail &&
              subscribeDetail.landManagement &&
              subscribeDetail.landManagement.land && (
                <div>
                  <div className="">
                    <img
                      src={`${API_BASE}${subscribeDetail.landManagement.land.photos}`}
                      alt=""
                    />
                  </div>
                  <div className="">
                    <div className="flex items-center">
                      <h5 className="font-bold mr-2">Tên mảnh đất: </h5>
                      <span>{subscribeDetail.landManagement.land.name}</span>
                    </div>
                    <div className="flex items-center">
                      <h5 className="font-bold mr-2">Chủ sở hữu: </h5>
                      <span>{subscribeDetail.landManagement.user.name}</span>
                    </div>
                    <div className="flex items-center">
                      <h5 className="font-bold mr-2">Số điện thoại: </h5>
                      <span>
                        {subscribeDetail.landManagement.user.phoneNumber}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <h5 className="font-bold mr-2">Địa điểm: </h5>
                      <span>
                        {subscribeDetail.landManagement.land.province}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <h5 className="font-bold mr-2">Diện tích: </h5>
                      <span>{subscribeDetail.landManagement.land.size} m2</span>
                    </div>
                    <div className="flex items-center">
                      <h5 className="font-bold mr-2">Nồng độ N-P-K: </h5>
                      <span>
                        {subscribeDetail.landManagement.land.n}-
                        {subscribeDetail.landManagement.land.p}-
                        {subscribeDetail.landManagement.land.k}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <h5 className="font-bold mr-2">Độ PH: </h5>
                      <span>{subscribeDetail.landManagement.land.pH}</span>
                    </div>
                  </div>
                  <Button variant="contained" onClick={handleToLandDetail}>
                    Xem chi tiết
                  </Button>
                </div>
              )}
          </div>
          <div className="w-3/5 p-2">
            {/* Plant */}
            {subscribeDetail && subscribeDetail.landManagement && (
              <div>
                <div className="mb-3">
                  <h5 className="font-bold text-2xl text-center">Cây trồng</h5>
                </div>

                {subscribeDetail.status === SUBSCRIBE_PROCESSING && (
                  <>
                    {subscribeDetail.landManagement.plant === null ? (
                      <div className="">
                        <Alert severity="info" className="mb-2">
                          Hiện tại mảnh đất chưa được trồng cây!
                        </Alert>
                        <div className="flex items-center">
                          <h5 className="text-lg font-bold mr-2">
                            Chọn cây trồng
                          </h5>
                          <Button
                            variant="contained"
                            onClick={() => setShowPlantForm(true)}
                            endIcon={
                              <FontAwesomeIcon icon={faMagnifyingGlass} />
                            }
                          >
                            Tìm kiếm
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div className="">
                          <div className="flex items-center">
                            <h5 className="font-bold mr-2">Tên cây trồng: </h5>
                            <span>
                              {subscribeDetail.landManagement.plant.name}
                            </span>
                          </div>
                          <div className="flex items-center">
                            <h5 className="font-bold mr-2">
                              Số ngày cần để trưởng thành:{" "}
                            </h5>
                            <span>
                              {
                                subscribeDetail.landManagement.plant
                                  .growthTimeDay
                              }{" "}
                              ngày
                            </span>
                          </div>
                          <div className="flex items-center">
                            <h5 className="font-bold mr-2">Mô tả: </h5>
                            <span>
                              {subscribeDetail.landManagement.plant.description}
                            </span>
                          </div>
                        </div>
                        <Button
                          variant="contained"
                          onClick={handleToPlantDetail}
                        >
                          Xem chi tiết
                        </Button>
                        <div className="mt-3">
                          <div className="border-2 border-b-gray-500"></div>
                          <div className="my-3">
                            <h5 className="font-bold text-2xl text-center">
                              Trạng thái trồng cây của nông dân
                            </h5>
                          </div>
                          {subscribeDetail &&
                          subscribeDetail.landManagement &&
                          subscribeDetail.landManagement.isTree === true ? (
                            <>
                              <div className="flex items-center">
                                <h5 className="font-bold mr-2">
                                  Đang chờ thời gian thu hoạch!
                                </h5>
                                {/* <span>{subscribeDetail.landManagement.harvestMonthTime}</span> */}
                              </div>
                            </>
                          ) : (
                            <>
                              <div className="container mx-auto my-10 w-full">
                                <ol className="relative border-s border-gray-200 dark:border-gray-700">
                                  {landManagementLogDetail.length != 0 &&
                                    landManagementLogDetail.map((item) => (
                                      <li
                                        className={`mb-10 ms-4 ${
                                          item.status ===
                                          LANDMANAGEMENTLOG_FINISH
                                            ? "bg-green-100"
                                            : ""
                                        }`}
                                        key={item.id}
                                      >
                                        <div
                                          className={`absolute w-3 h-3 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700 ${
                                            item.status === 1
                                              ? "bg-green-400"
                                              : "bg-gray-200"
                                          }`}
                                        ></div>
                                        <time className="mb-1 text-sm  leading-none text-gray-400 dark:text-gray-500 font-bold">
                                          {item.completionTime === null
                                            ? "???"
                                            : convertTime(item.completionTime)}
                                        </time>
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                          {item.action}
                                        </h3>
                                        <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
                                          <span className="font-bold mr-2">
                                            Ghi chú:
                                          </span>
                                          {item.content === null
                                            ? "..."
                                            : item.content}
                                        </p>
                                      </li>
                                    ))}
                                </ol>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    )}
                  </>
                )}

                {subscribeDetail.status === SUBSCRIBE_ENDED && (
                  <Alert severity="error" className="mb-2">
                    Hiện tại bạn không có quyền sử dụng mảnh đất này!
                  </Alert>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {showPlantForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 pt-2 rounded-lg shadow-lg relative">
            <div className="flex justify-end">
              <div
                className="border rounded flex p-2 cursor-pointer hover:bg-slate-400"
                onClick={() => setShowPlantForm(false)}
              >
                <FontAwesomeIcon icon={faCircleXmark} className="text-xl" />
              </div>
            </div>
            <SubscribePlant setShowPlantForm={setShowPlantForm} />
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};
