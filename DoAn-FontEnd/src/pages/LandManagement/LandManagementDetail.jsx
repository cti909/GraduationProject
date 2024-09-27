import { useDispatch, useSelector } from "react-redux";
import Footer from "../Layouts/Footer";
import ControlNavbar from "../Layouts/Header";
import { useNavigate, useParams } from "react-router-dom";
import { API_BASE } from "../../services/api.config";
import {
  Alert,
  Button,
  Card,
  CardContent,
  CardMedia,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import {
  getAllLandManagementsByIdAction,
  updateLandManagementsFinishPlantAction,
} from "../../redux/actions/landManagementAction";
import {
  getLandManagementLogDetailBySubscribeAction,
  updateLandManagementLogAction,
} from "../../redux/actions/landManagementLogAction";
import convertTime from "../../utils/ConvertTime";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleXmark,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { LandManagementPlant } from "../../components/LandManagement/LandManagementPlant";
import { getAllRecommendPlantAction } from "../../redux/actions/recommendPlantAction";

export const LandManagementDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { landManagementId } = useParams();
  const landManagementDetail = useSelector(
    (state) => state.landManagement.landManagement
  );
  const landManagementLogDetail = useSelector(
    (state) => state.landManagementLog.landManagementLogs
  );
  const recommendPlantList = useSelector(
    (state) => state.recommendPlant.recommendPlants
  );

  const allStatusOne = landManagementLogDetail.every(
    (item) => item.status === 1
  );
  const isLoading = useSelector((state) => state.landManagementLog.isLoading);
  const [showPlantForm, setShowPlantForm] = useState(false);

  useEffect(() => {
    dispatch(getAllLandManagementsByIdAction({ id: landManagementId }));
  }, [dispatch, landManagementId]);

  useEffect(() => {
    dispatch(
      getLandManagementLogDetailBySubscribeAction({
        landManagementId: landManagementId,
        customerId: localStorage.getItem("userId"),
      })
    );
  }, [dispatch, landManagementId]);

  useEffect(() => {
    dispatch(
      getAllRecommendPlantAction({ landManagementId: landManagementId })
    );
    // console.log(recommendPlantList);
  }, [dispatch, landManagementId]);

  // function
  const handleToPlantDetail = () => {
    navigate("/plant/" + landManagementDetail.plant.id);
  };

  const handleUpdateLandManagement = (e) => {
    e.preventDefault();
    if (e.target.content.value === "") {
      Swal.fire({
        title: "Lỗi!",
        text: "Bạn cần nhập thông tin",
        icon: "error",
      });
      return;
    }
    Swal.fire({
      title: "Bạn có đồng ý?",
      text: `Bạn chắc chắn tạo mới ghi chú không?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Đồng ý",
      cancelButtonText: "Hủy",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(
          updateLandManagementLogAction({
            id: e.target.id.value,
            content: e.target.content.value,
          })
        )
          .unwrap()
          .then(() => {
            Swal.fire({
              title: "Thành công!",
              text: "Tạo mới thành công",
              icon: "success",
            });
            dispatch(
              getLandManagementLogDetailBySubscribeAction({
                landManagementId: landManagementId,
                customerId: localStorage.getItem("userId"),
              })
            );
          })
          .catch((error) => {
            console.log(error);
            Swal.fire({
              title: "Lỗi!",
              text: error.message || "Bạn cần nhập tất cả các thông tin",
              icon: "error",
            });
          });
      }
    });
  };

  const handleFinishPlant = () => {
    Swal.fire({
      title: "Bạn có đồng ý?",
      text: `Bạn chắc chắn hoàn thành trồng cây không?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Đồng ý",
      cancelButtonText: "Hủy",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(
          updateLandManagementsFinishPlantAction({
            id: landManagementId,
          })
        )
          .unwrap()
          .then(() => {
            Swal.fire({
              title: "Thành công!",
              text: "Cập nhật thành công",
              icon: "success",
            });
            // dispatch(getAllLandManagementsByIdAction({ id: landManagementId }));
          })
          .catch((error) => {
            console.log(error);
            Swal.fire({
              title: "Lỗi!",
              text: error.message || "Bạn cần nhập tất cả các thông tin",
              icon: "error",
            });
          });
      }
    });
  };

  return (
    <div className="relative">
      <ControlNavbar />

      <div className="container mx-auto my-10 w-full">
        <h5 className="text-3xl text-center font-bold w-full">
          Cập nhật trạng thái cây trồng
        </h5>
      </div>

      <div className="container mx-auto my-10 w-full">
        <div className="d-flex relative w-full border-2 border-black p-3">
          <div className="w-2/5 border-r-2 border-black p-2">
            {/* Plant */}
            {landManagementDetail && (
              <div>
                <div className="mb-3">
                  <h5 className="font-bold text-2xl text-center">
                    Thông tin cây trồng
                  </h5>
                </div>
                {landManagementDetail.plant == null ? (
                  <div className="">
                    <Alert severity="info" className="mb-2">
                      Hiện tại khách hàng chưa chọn cây để trồng!
                    </Alert>
                    {landManagementDetail.isRented == true && (
                      <>
                        <div className="flex items-center">
                          <h5 className="text-lg font-bold mr-2">
                            Hãy chọn cây gợi ý cho khách hàng:
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
                        <div className="mt-3 w-full">
                          <div className="">
                            {recommendPlantList &&
                              recommendPlantList.length > 0 &&
                              recommendPlantList.map((item) => (
                                <div
                                  key={item.plant.id}
                                  className="w-full my-2"
                                >
                                  <Card>
                                    <CardContent className="flex p-0">
                                      <CardMedia
                                        className="w-1/4"
                                        component="img"
                                        sx={{ width: 100, height: 100 }}
                                        image={`${API_BASE}${item.plant.photos}`}
                                        alt={item.plant.name}
                                      />
                                      <div className="flex justify-between w-3/4 ml-2">
                                        <div className="w-full">
                                          <h5 className="w-full text-lg font-bold">
                                            {item.plant.name}
                                          </h5>
                                          <p className="w-full text-lg font-medium">
                                            Số ngày trưởng thành:{" "}
                                            {item.plant.growthTimeDay}
                                          </p>
                                          <p className="w-full text-lg font-medium">
                                            Cây lâu năm:{" "}
                                            {item.plant.isPerennialTree === true
                                              ? "Có"
                                              : "Không"}
                                          </p>
                                        </div>
                                      </div>
                                    </CardContent>
                                  </Card>
                                  {/* <PlantItem item={item} /> */}
                                </div>
                              ))}
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                ) : (
                  <div>
                    <div className="">
                      <div className=" mb-4">
                        <img
                          className="max-h-96 w-full"
                          src={`${API_BASE}${landManagementDetail.plant.photos}`}
                          alt=""
                        />
                      </div>
                      <div className="flex items-center">
                        <h5 className="font-bold mr-2 text-lg">
                          Tên cây trồng:{" "}
                        </h5>
                        <span className="text-lg">
                          {landManagementDetail.plant.name}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <h5 className="font-bold mr-2 text-lg">
                          Số ngày cần để trưởng thành:{" "}
                        </h5>
                        <span className="text-lg">
                          {landManagementDetail.plant.growthTimeDay} ngày
                        </span>
                      </div>
                      <div className="flex items-center">
                        <h5 className="font-bold mr-2 text-lg">Mô tả: </h5>
                        <span className="text-lg">
                          {landManagementDetail.plant.description}
                        </span>
                      </div>
                    </div>
                    <Button variant="contained" onClick={handleToPlantDetail}>
                      Xem chi tiết
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="w-3/5 p-2">
            <div className="">
              <div className="mb-3">
                <h5 className="font-bold text-2xl text-center">
                  Cập nhật trạng thái trồng cây
                </h5>
              </div>
              <ol className="relative border-s border-gray-200 dark:border-gray-700">
                {isLoading == false &&
                  landManagementLogDetail.length !== 0 &&
                  (() => {
                    let firstStatusZeroDisplayed = false;
                    return landManagementLogDetail.map((item) => {
                      // Check if the current item is the first one with status=0
                      const isFirstStatusZero =
                        !firstStatusZeroDisplayed && item.status === 0;
                      if (isFirstStatusZero) {
                        firstStatusZeroDisplayed = true;
                      }

                      return (
                        <li
                          className={`mb-10 ms-4 ${
                            item.status === 1 ? "bg-green-100" : ""
                          }`}
                          key={item.id}
                        >
                          <div
                            className={`absolute w-3 h-3 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 ${
                              item.status === 1 ? "bg-green-400" : "bg-gray-200"
                            }`}
                          ></div>
                          <time className="mb-1 text-sm font-bold leading-none text-gray-400 dark:text-gray-500">
                            {item.completionTime === null
                              ? "???"
                              : convertTime(item.completionTime)}
                          </time>
                          <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                            {item.action}
                          </h3>
                          {item.content != null && (
                            <p className="mb-2 text-base font-normal text-gray-500 dark:text-gray-400">
                              <span className="font-bold mr-2">Ghi chú:</span>
                              {item.content}
                            </p>
                          )}
                          {isFirstStatusZero && (
                            <form onSubmit={handleUpdateLandManagement}>
                              <>
                                <TextField
                                  name="content"
                                  id="outlined-basic"
                                  label="Ghi chú"
                                  variant="outlined"
                                  size="small"
                                  className="w-full mb-2"
                                  multiline
                                />
                                <input
                                  type="hidden"
                                  name="id"
                                  value={item.id}
                                />
                                <Button
                                  variant="contained"
                                  size="small"
                                  type="submit"
                                >
                                  Xác nhận
                                </Button>
                              </>
                            </form>
                          )}
                        </li>
                      );
                    });
                  })()}
              </ol>
              {/* check all status=1 -> display */}
              {landManagementDetail.isTree === false ? (
                <>
                  {landManagementDetail.plant != null && allStatusOne && (
                    <Button
                      variant="contained"
                      color="primary"
                      className="mt-2"
                      onClick={handleFinishPlant}
                    >
                      Hoàn thành
                    </Button>
                  )}
                </>
              ) : (
                <>
                  <div className="flex items-center">
                    <h5 className="font-bold mr-2">Thu hoạch vào tháng: </h5>
                    <span>{landManagementDetail.harvestMonthTime}</span>
                  </div>
                </>
              )}
            </div>
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
            <LandManagementPlant setShowPlantForm={setShowPlantForm} />
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};
