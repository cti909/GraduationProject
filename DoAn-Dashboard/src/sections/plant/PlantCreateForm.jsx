import Swal from 'sweetalert2';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

import {
  Stack,
  Button,
  Dialog,
  Select,
  MenuItem,
  TextField,
  InputLabel,
  DialogTitle,
  FormControl,
  DialogActions,
  DialogContent,
} from '@mui/material';

import plantService from '../../_mock/plant';

export const PlantCreateForm = ({ openCreateForm, handleCloseCreateForm }) => {
  const [formData, setFormData] = useState({
    name: '',
    growthTimeDay: '',
    description: '',
    isPerennialTree: false,
    photos: null,
  });
  const [previewImages, setPreviewImages] = useState('');
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));
    if (name === 'isPerennialTree') {
      setFormData({
        ...formData,
        [name]: value === 'true',
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log(e.target.files);
    if (file) {
      setPreviewImages(URL.createObjectURL(file));
    }
    setFormData((prevData) => ({
      ...prevData,
      photos: file,
    }));
  };

  const validate = () => {
    const tempErrors = {};
    if (!formData.name) tempErrors.name = 'Tên cây trồng là bắt buộc';
    if (!formData.growthTimeDay) tempErrors.growthTimeDay = 'Số ngày trưởng thành là bắt buộc';
    if (!formData.description) tempErrors.description = 'Mô tả là bắt buộc';
    if (!formData.photos) tempErrors.photo = 'Ảnh là bắt buộc';
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    const formDataObj = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      formDataObj.append(key, value);
    });
    try {
      await plantService.createPlantAsync(formDataObj);
      Swal.fire({
        title: 'Thành công!',
        text: 'Tạo mới thành công',
        icon: 'success',
      });
      handleCloseCreateForm(); // Đóng form sau khi thành công
    } catch (error) {
      console.error('Error creating plant:', error);
      Swal.fire({
        title: 'Lỗi!',
        text: error.message || 'Bạn cần nhập tất cả các thông tin',
        icon: 'error',
      });
    }
  };

  return (
    <Dialog open={openCreateForm} onClose={handleCloseCreateForm} fullWidth className="z-10">
      <DialogTitle>Tạo cây trồng mới </DialogTitle>
      <DialogContent>
        <Stack spacing={2} margin={2}>
          <TextField
            name="name"
            label="Tên cây trồng"
            value={formData.name}
            onChange={handleChange}
            error={!!errors.name}
            helperText={errors.name}
          />
          <TextField
            name="growthTimeDay"
            label="Số ngày trưởng thành"
            value={formData.growthTimeDay}
            onChange={handleChange}
            type="number"
            error={!!errors.growthTimeDay}
            helperText={errors.growthTimeDay}
          />
          <TextField
            name="description"
            label="Mô tả"
            value={formData.description}
            onChange={handleChange}
            error={!!errors.description}
            helperText={errors.description}
          />
          <FormControl fullWidth>
            <InputLabel
              id="isPerennialTree-label"
              sx={{ position: 'absolute', zIndex: 1, bgcolor: 'background.paper', px: 1 }}
            >
              Loại cây
            </InputLabel>
            <Select
              labelId="isPerennialTree-label"
              name="isPerennialTree"
              value={formData.isPerennialTree}
              onChange={handleChange}
            >
              <MenuItem value="false" selected>
                Cây ngắn ngày
              </MenuItem>
              <MenuItem value="true">Cây lâu năm</MenuItem>
            </Select>
          </FormControl>
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
          {formData.photos === null && errors.photo && (
            <p style={{ color: 'red' }}>{errors.photo}</p>
          )}
          <div className="flex space-x-4 mt-4">
            {previewImages && (
              <img src={previewImages} alt={`Preview `} className="w-64 h-64 object-cover" />
            )}
          </div>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSubmit}>Tạo mới</Button>
        <Button onClick={handleCloseCreateForm}>Hủy</Button>
      </DialogActions>
    </Dialog>
  );
};
PlantCreateForm.propTypes = {
  openCreateForm: PropTypes.bool.isRequired,
  handleCloseCreateForm: PropTypes.func,
};
