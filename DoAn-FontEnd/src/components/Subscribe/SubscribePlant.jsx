import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllPlantsAction,
  getAllPlantsRecommendAction,
} from "../../redux/actions/plantAction";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Pagination,
  TextField,
} from "@mui/material";
import { debounce } from "lodash";
import { API_BASE } from "../../services/api.config";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import {
  getSubscribesByIdAction,
  updateSubscribePlantAction,
} from "../../redux/actions/subscribeAction";
import { getLandManagementLogDetailBySubscribeAction } from "../../redux/actions/landManagementLogAction";
import { getAllRecommendPlantAction } from "../../redux/actions/recommendPlantAction";

export const SubscribePlant = ({ setShowPlantForm }) => {
  const dispatch = useDispatch();
  const plantPagination = useSelector((state) => state.plant.plants);
  const subscribeDetail = useSelector((state) => state.subscribe.subscribe);
  const recommendPlantList = useSelector(
    (state) => state.recommendPlant.recommendPlants
  );

  const [queryParams, setQueryParams] = useState({
    page: 1,
    pageSize: 4,
    searchValue: "",
    sortBy: "CreatedAt",
    sortType: "desc",
    IsPerennialTree: false,
  });
  const [searchValue, setSearchValue] = useState("");
  const [tabSelect, setTabSelect] = useState(1);

  const MySwal = withReactContent(Swal);

  useEffect(() => {
    dispatch(getAllPlantsAction(queryParams));
  }, [dispatch, queryParams]);

  const handlePaginationChange = (event, value) => {
    setQueryParams((prevParams) => ({
      ...prevParams,
      page: value,
    }));
  };

  const debouncedFilterChange = useCallback(
    debounce((name, value) => {
      setQueryParams((prevParams) => ({
        ...prevParams,
        [name]: value,
        page: 1,
      }));
    }, 500), // 500ms
    []
  );

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setSearchValue(value);
    setTabSelect(1);
    debouncedFilterChange(name, value);
  };

  const handleSelectTabChange = (item) => {
    setTabSelect(item.id);
    switch (item.id) {
      case 1:
        setQueryParams((prevParams) => ({
          ...prevParams,
          sortBy: "CreatedAt",
          page: 1, // Reset to first page when filters change
        }));
        setSearchValue("");
        setQueryParams((prevParams) => ({
          ...prevParams,
          searchValue: "",
        }));
        break;
      case 2:
        if (
          subscribeDetail &&
          subscribeDetail.landManagement &&
          subscribeDetail.landManagement.land
        ) {
          dispatch(
            getAllPlantsRecommendAction({
              top_select: 4,
              N: subscribeDetail.landManagement.land.n,
              P: subscribeDetail.landManagement.land.p,
              K: subscribeDetail.landManagement.land.k,
              ph: subscribeDetail.landManagement.land.pH,
            })
          );
        }
        break;
      case 3:
        if (subscribeDetail) {
          dispatch(
            getAllRecommendPlantAction({
              subscribeId: subscribeDetail.id,
            })
          );
        }
        break;
      default:
        console.log("...");
    }
  };

  const selectTab = [
    {
      id: 1,
      value: "Tất cả",
    },
    {
      id: 2,
      value: "Gợi ý",
    },
    {
      id: 3,
      value: "ND",
    },
  ];

  const handleSelectPlant = (item) => {
    Swal.fire({
      title: "Bạn có đồng ý?",
      text: `Bạn chắc chắn chọn trồng cây ${item.name}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Đồng ý",
      cancelButtonText: "Hủy",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(
          updateSubscribePlantAction({
            subscribeId: subscribeDetail.id,
            landManagementId: subscribeDetail.landManagement.id,
            plantId: item.id,
            userId: localStorage.getItem("userId"),
          })
        )
          .unwrap()
          .then(() => {
            MySwal.fire({
              title: "Thành công!",
              text: "Chọn cây trồng thành công",
              icon: "success",
            }).then((result) => {
              if (result.isConfirmed) {
                setShowPlantForm(false);
                dispatch(getSubscribesByIdAction({ id: subscribeDetail.id }));
                dispatch(
                  getLandManagementLogDetailBySubscribeAction({
                    subscribeId: subscribeDetail.id,
                    customerId: localStorage.getItem("userId"),
                  })
                );
              }
            });
          })
          .catch((error) => {
            MySwal.fire({
              title: "Lỗi!",
              text: error.message || "Đã xảy ra lỗi khi chọn cây trồng",
              icon: "error",
            });
          });
      }
    });
  };

  return (
    <div className="" style={{ width: "550px" }}>
      <div className="flex mt-2">
        <div className="flex gap-2 w-1/2">
          {selectTab.map((item) => (
            <div
              key={item.id}
              onClick={() => handleSelectTabChange(item)}
              className={`cursor-pointer p-2 min-w-20 border rounded text-center ${
                tabSelect === item.id ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
            >
              {item.value}
            </div>
          ))}
        </div>
        <TextField
          className="w-1/2"
          label="Tên cây"
          name="searchValue"
          value={searchValue}
          onChange={handleFilterChange}
          variant="outlined"
          size="small"
        />
      </div>
      <div className="mt-3 w-full">
        <div className="" style={{ minHeight: "424px" }}>
          {plantPagination.data && tabSelect != 3
            ? plantPagination.data.map((item) => (
                <div key={item.id} className="w-full my-2">
                  <Card>
                    <CardContent className="flex p-0">
                      <CardMedia
                        className="w-1/4"
                        component="img"
                        sx={{ width: 100, height: 100 }}
                        image={`${API_BASE}${item.photos}`}
                        alt={item.name}
                      />
                      <div className="flex justify-between w-3/4 ml-2">
                        <div className="w-full">
                          <h5 className="w-full text-lg font-bold">
                            {item.name}
                          </h5>
                          <p className="w-full text-lg font-medium">
                            Số ngày trưởng thành: {item.growthTimeDay}
                          </p>
                          <p className="w-full text-lg font-medium">
                            Cây lâu năm:{" "}
                            {item.isPerennialTree === true ? "Có" : "Không"}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center mr-2">
                        <Button
                          variant="contained"
                          onClick={() => handleSelectPlant(item)}
                        >
                          Chọn
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                  {/* <PlantItem item={item} /> */}
                </div>
              ))
            : recommendPlantList.map((item) => (
                <div key={item.id} className="w-full my-2">
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
                            Số ngày trưởng thành: {item.plant.growthTimeDay}
                          </p>
                          <p className="w-full text-lg font-medium">
                            Cây lâu năm:{" "}
                            {item.plant.isPerennialTree === true
                              ? "Có"
                              : "Không"}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center mr-2">
                        <Button
                          variant="contained"
                          onClick={() => handleSelectPlant(item.plant)}
                        >
                          Chọn
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                  {/* <PlantItem item={item} /> */}
                </div>
              ))}
        </div>
      </div>

      <div className="container mx-auto my-3 w-full">
        <div className="flex justify-center">
          {plantPagination.data && (
            <Pagination
              count={Math.ceil(
                plantPagination.totalCount / plantPagination.pageSize
              )}
              page={queryParams.page}
              onChange={handlePaginationChange}
              variant="outlined"
              color="primary"
              shape="rounded"
            />
          )}
        </div>
      </div>
    </div>
  );
};
