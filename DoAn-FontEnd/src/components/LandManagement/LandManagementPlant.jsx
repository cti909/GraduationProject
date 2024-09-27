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
  createRecommendPlantFromFarmerAction,
  getAllRecommendPlantAction,
} from "../../redux/actions/recommendPlantAction";

export const LandManagementPlant = ({ setShowPlantForm }) => {
  const dispatch = useDispatch();
  const plantPagination = useSelector((state) => state.plant.plants);
  const landManagementDetail = useSelector(
    (state) => state.landManagement.landManagement
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
        if (landManagementDetail && landManagementDetail.land) {
          dispatch(
            getAllPlantsRecommendAction({
              top_select: 4,
              N: landManagementDetail.land.n,
              P: landManagementDetail.land.p,
              K: landManagementDetail.land.k,
              ph: landManagementDetail.land.ph,
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
  ];

  const handleSelectPlant = (item) => {
    Swal.fire({
      title: "Bạn có đồng ý?",
      text: `Bạn chắc chắn gợi ý cây ${item.name} cho khách hàng không?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Đồng ý",
      cancelButtonText: "Hủy",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(
          createRecommendPlantFromFarmerAction({
            N: landManagementDetail.land.n,
            P: landManagementDetail.land.p,
            K: landManagementDetail.land.k,
            ph: landManagementDetail.land.pH,
            label: item.name,
            landManagementId: landManagementDetail.id,
            plantId: item.id,
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

                dispatch(
                  getAllRecommendPlantAction({
                    landManagementId: landManagementDetail.id,
                  })
                );
                // dispatch(getSubscribesByIdAction({ id: subscribeDetail.id }));
                // dispatch(
                //   getLandManagementLogDetailBySubscribeAction({
                //     subscribeId: subscribeDetail.id,
                //     customerId: localStorage.getItem("userId"),
                //   })
                // );
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
    <div className="" style={{ width: "500px" }}>
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
          {plantPagination.data &&
            plantPagination.data.map((item) => (
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
                        // disabled={item.isPerennialTree}
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
