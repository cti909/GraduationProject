import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { createLandAction } from "../../redux/actions/landAction";
import provinces from "./../../data/provinces.json";
import { getAllPerennialBasicPlantsAction } from "../../redux/actions/plantAction";

export const CreateLandForm = () => {
  const dispatch = useDispatch();
  const plants = useSelector((state) => state.plant.plants);

  useEffect(() => {
    dispatch(getAllPerennialBasicPlantsAction());
  }, [dispatch]);

  const MySwal = withReactContent(Swal);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    province: "",
    size: 0,
    n: 0,
    p: 0,
    k: 0,
    pH: 0,
    pricePerMonth: 0,
    photos: null,
    isTree: false,
    plantId: "",
    harvestMonthTime: 0,
  });

  const [previewImages, setPreviewImages] = useState("");

  const handleChange = (e) => {
    console.log(formData);
    const { name, value, type, checked } = e.target;
    if (type !== "radio") {
      setFormData({
        ...formData,
        [name]: type === "checkbox" ? checked : value,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value === "true" ? true : false,
        plantId: "",
        harvestMonthTime: 0,
      });
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log(e.target.files);
    if (file) {
      setPreviewImages(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    console.log(e.target.photo.files[0]);

    MySwal.fire({
      title: "Bạn có đồng ý?",
      text: `Bạn chắc chắn tạo mới thông tin mảnh đất không?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Đồng ý",
      cancelButtonText: "Hủy",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(
          createLandAction({
            ...formData,
            photos: e.target.photo.files[0],
          })
        )
          .unwrap()
          .then(() => {
            MySwal.fire({
              title: "Thành công!",
              text: "Tạo mới thành công",
              icon: "success",
            });
          })
          .catch((error) => {
            console.log(error);
            MySwal.fire({
              title: "Lỗi!",
              text: error.message || "Bạn cần nhập tất cả các thông tin",
              icon: "error",
            });
          });
      }
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="border p-2 border-black space-y-4"
      encType="multipart/form-data"
    >
      <Typography component="h5" variant="h5" className="text-center">
        Tạo mới thông tin của mảnh đất
      </Typography>
      <TextField
        label="Tên mảnh đất"
        name="name"
        value={formData.name}
        onChange={handleChange}
        fullWidth
      />
      <TextField
        label="Mô tả"
        name="description"
        value={formData.description}
        onChange={handleChange}
        fullWidth
        multiline
        rows={4}
      />
      <FormControl fullWidth>
        <InputLabel id="province-label">Tỉnh thành</InputLabel>
        <Select
          labelId="province-label"
          name="province"
          value={formData.province}
          onChange={handleChange}
          label="Tỉnh thành"
        >
          {provinces.map((province) => (
            <MenuItem key={province.id} value={province.name}>
              {province.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        label="Diện tích đất"
        name="size"
        type="number"
        value={formData.size}
        onChange={handleChange}
        fullWidth
      />
      <TextField
        label="Nồng độ N"
        name="n"
        type="number"
        value={formData.n}
        onChange={handleChange}
        fullWidth
      />
      <TextField
        label="Nồng độ P"
        name="p"
        type="number"
        value={formData.p}
        onChange={handleChange}
        fullWidth
      />
      <TextField
        label="Nồng độ K"
        name="k"
        type="number"
        value={formData.k}
        onChange={handleChange}
        fullWidth
      />
      <TextField
        label="Độ pH của đất"
        name="pH"
        type="number"
        value={formData.pH}
        onChange={handleChange}
        fullWidth
      />
      <TextField
        label="Giá thuê mỗi tháng"
        name="pricePerMonth"
        type="number"
        value={formData.pricePerMonth}
        onChange={handleChange}
        fullWidth
      />
      <div className="flex items-center">
        <h5 className="mr-3">Chọn ảnh cho mảnh đất: </h5>
        <input
          name="photo"
          type="file"
          multiple
          onChange={handleFileChange}
          className="block text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
      </div>
      <div className="flex space-x-4 mt-4">
        {previewImages && (
          <img
            src={previewImages}
            alt={`Preview `}
            className="w-64 h-64 object-cover"
          />
        )}
      </div>
      <div className="flex space-x-4 mt-4">
        <FormControl component="fieldset">
          <FormLabel component="legend">Có cây trên đất</FormLabel>
          <RadioGroup
            row
            name="isTree"
            defaultValue="false"
            onChange={handleChange}
          >
            <FormControlLabel
              value="false"
              control={<Radio />}
              label="Không có"
            />
            <FormControlLabel value="true" control={<Radio />} label="Có" />
          </RadioGroup>
        </FormControl>
      </div>

      {formData.isTree === true && (
        <>
          <div className="flex space-x-4 mt-4">
            <FormControl fullWidth>
              <InputLabel id="plant-label">Tên cây lâu năm</InputLabel>
              <Select
                labelId="plant-label"
                name="plantId"
                value={formData.plantId}
                onChange={handleChange}
                label="Tên cây lâu năm"
              >
                {plants &&
                  plants.map((plant) => (
                    <MenuItem key={plant.id} value={plant.id}>
                      {plant.name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </div>
          <div className="flex space-x-4 mt-4">
            <TextField
              label="Tháng thu hoạch"
              name="harvestMonthTime"
              type="number"
              value={formData.harvestMonthTime}
              onChange={handleChange}
              fullWidth
            />
          </div>
        </>
      )}
      <Button
        className="mt-4"
        type="submit"
        variant="contained"
        color="primary"
      >
        Tạo mới
      </Button>
    </form>
  );
};
