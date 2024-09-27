import ControlNavbar from "../Layouts/Header";
import Footer from "../Layouts/Footer";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import { getAllPlantsAction } from "../../redux/actions/plantAction";
import { PlantItem } from "../../components/Plant/PlantItem";
import { Pagination, TextField } from "@mui/material";
import { debounce } from "lodash";

export const PlantPage = () => {
  const dispatch = useDispatch();
  const plantPagination = useSelector((state) => state.plant.plants);
  const [queryParams, setQueryParams] = useState({
    page: 1,
    pageSize: 8,
    searchValue: "",
    sortBy: "CreatedAt",
    sortType: "desc",
  });
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [plantPagination]);

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
        page: 1, // Reset to first page when filters change
      }));
    }, 500), // Đặt thời gian debounce là 500ms
    []
  );

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setSearchValue(value);
    debouncedFilterChange(name, value);
  };

  const handleSortByChange = (value) => {
    setQueryParams((prevParams) => ({
      ...prevParams,
      sortBy: value,
      page: 1, // Reset to first page when filters change
    }));
  };

  const handleSortTypeChange = (value) => {
    setQueryParams((prevParams) => ({
      ...prevParams,
      sortType: value,
      page: 1, // Reset to first page when filters change
    }));
  };

  const sortField = [
    {
      id: 1,
      field: "CreatedAt",
      value: "Ngày tạo",
    },
    {
      id: 2,
      field: "Name",
      value: "Tên cây",
    },
    {
      id: 3,
      field: "GrowthTimeDay",
      value: "Ngày trưởng thành",
    },
  ];

  const sortType = [
    {
      id: 1,
      field: "desc",
      value: "Giảm dần",
    },
    {
      id: 2,
      field: "asc",
      value: "Tăng dần",
    },
  ];

  return (
    <>
      <ControlNavbar />

      <div className="container mx-auto my-10 w-full">
        <div className="relative w-full border-2 border-black p-3">
          {/* <h5 className="text-3xl text-center font-bold w-full">
            Tìm kiếm và sắp xếp
          </h5> */}

          {/* filter */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center">
              <h2 className="text-xl w-1/6">Tìm kiếm theo tên</h2>
              <TextField
                className="w-5/6"
                label="Tên cây"
                name="searchValue"
                // value={queryParams.searchValue}
                value={searchValue}
                onChange={handleFilterChange}
                variant="outlined"
              />
            </div>
            <div className="flex items-center">
              <h2 className="text-xl w-1/6">Sắp xếp theo</h2>
              <div className="flex gap-2 w-5/6">
                {sortField.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => handleSortByChange(item.field)}
                    className={`cursor-pointer p-2 min-w-20 border rounded text-center ${
                      queryParams.sortBy === item.field
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200"
                    }`}
                  >
                    {item.value}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center">
              <h2 className="text-xl w-1/6">Thứ tự</h2>
              <div className="flex gap-2">
                {sortType.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => handleSortTypeChange(item.field)}
                    className={`cursor-pointer p-2 min-w-20 border rounded text-center ${
                      queryParams.sortType === item.field
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200"
                    }`}
                  >
                    {item.value}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto my-10 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {plantPagination.data &&
            plantPagination.data.map((item) => (
              <div key={item.id}>
                <PlantItem item={item} />
              </div>
            ))}
        </div>
      </div>

      <div className="container mx-auto my-10 w-full">
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

      <Footer />
    </>
  );
};
