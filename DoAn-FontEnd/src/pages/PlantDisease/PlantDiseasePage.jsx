import { useState } from "react";
import ControlNavbar from "../Layouts/Header";
import Footer from "../Layouts/Footer";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  createPlantDiseaseAction,
  getAllPlantDiseaseAction,
} from "../../redux/actions/plantDiseaseAction";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import PlantDiseaseTable from "../../components/PlantDisease/PlantDiseaseTable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileArrowUp,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";

export const PlantDiseasePage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  // const predictPlantDisease = useSelector(
  //   (state) => state.plantDisease.predictMessage
  // );
  const [preview, setPreview] = useState("");
  const MySwal = withReactContent(Swal);
  // MySwal.fire({
  //   title: "Đang xử lý...",
  //   allowOutsideClick: false,
  //   didOpen: () => {
  //     MySwal.showLoading();
  //   },
  // });

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    console.log(event.target.files);
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const file = event.target.photo.files[0];
    dispatch(createPlantDiseaseAction({ userId: user.id, photo: file }))
      .unwrap()
      .then((response) => {
        // Hành động thành công
        console.log(response);
        MySwal.fire({
          title: "Thành công!",
          text: response.predictMessage,
          icon: "success",
        });
        // cap nhat lai table
        dispatch(
          getAllPlantDiseaseAction({
            page: 1,
            pageSize: 10,
            sortBy: "CreatedAt",
            sortType: "desc",
            userId: localStorage.getItem("userId"),
          })
        );
      })
      .catch((error) => {
        // Hành động thất bại
        MySwal.fire({
          title: "Lỗi!",
          text: error.message || "Đã xảy ra lỗi khi dự đoán bệnh cây.",
          icon: "error",
        });
      });
  };

  return (
    <>
      <ControlNavbar />

      <div className="container mx-auto my-10 w-full">
        <div className="relative w-full border-2 border-black p-3">
          <h5 className="text-3xl text-center font-bold w-full">
            Nhận diện và dự đoán bệnh của cây
          </h5>

          <form
            onSubmit={handleSubmit}
            className="mt-10"
            encType="multipart/form-data"
          >
            <div className="flex items-center mt-5">
              <h5 className="text-xl mr-3">Tải ảnh lên tại đây: </h5>
              <Button
                variant="contained"
                component="label"
                endIcon={<FontAwesomeIcon icon={faFileArrowUp} />}
              >
                Upload File
                <input
                  name="photo"
                  type="file"
                  onChange={handleImageUpload}
                  multiple
                  hidden
                />
              </Button>
            </div>
            {preview && (
              <div className="mt-5">
                <h5 className="text-xl">Bản xem trước:</h5>
                <img
                  src={preview}
                  alt="Preview"
                  className="mt-3 w-full max-w-md border"
                />
              </div>
            )}
            <Button
              className="mt-2"
              type="submit"
              variant="contained"
              color="success"
              endIcon={<FontAwesomeIcon icon={faMagnifyingGlass} />}
              // style={{ background: "black" }}
            >
              Dự đoán
            </Button>
          </form>
        </div>
      </div>

      <div className="container mx-auto my-20 w-full">
        <h5 className="text-3xl text-center font-bold w-full mb-2">
          Lịch sử dự đoán
        </h5>
        <PlantDiseaseTable />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Bảng thông tin từ plantDisease */}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default PlantDiseasePage;
