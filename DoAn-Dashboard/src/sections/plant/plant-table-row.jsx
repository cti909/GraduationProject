import { useState } from 'react';
import PropTypes from 'prop-types';
// import { EyeOutlined, EyeInvisibleOutlined, } from '@ant-design/icons';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
// import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import {
  Stack,
  Dialog,
  TextField,
  DialogTitle,
  DialogActions,
  DialogContent,
  CardMedia,
  Checkbox,
} from '@mui/material';

import { schema } from 'src/utils/validation';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';

// import userService from '../../_mock/user';
import convertTime from 'src/utils/ConvertTime';
import convertMoney from 'src/utils/convertMoney';
import { API_BASE } from 'src/_mock/api.config';
// ----------------------------------------------------------------------

export const PlantTableRow = ({
  item,
  selected,
  handleClick,
  onSubmitUpdateUser,
  onDeleteUser,
}) => {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    gmail: '',
    username: '',
    phoneNumber: '',
    dateOfBirth: '',
    address: '',
  });
  const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false);
  const [openUpdateForm, setUpdateForm] = useState(false);
  // const [visible, setVisible] = useState(true);
  const [file, setFile] = useState(null);
  const [open, setOpen] = useState(null);
  const [errors, setErrors] = useState({});
  const [, setLoading] = useState(false);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const openDeletePopup = () => {
    setOpenDeleteConfirm(true);
  };
  const openUpdatePopup = async () => {
    try {
      setLoading(true);
      //   await findUserById(item.id);
    } catch (error) {
      console.error('Error fetching data: ', error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
    setUpdateForm(true);
  };

  const closeDeletePopup = () => {
    setOpenDeleteConfirm(false);
  };
  const handleDeleteUser = async () => {
    try {
      const f = onDeleteUser(item.id);
      closeDeletePopup();
      await f;
    } catch (error) {
      console.error('Đã xảy ra lỗi khi đăng ký sự kiện:', error);
    }
  };

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell component="th" scope="row" padding="normal">
          <Stack direction="row" alignItems="left" spacing={2}>
            <Typography variant="subtitle2" noWrap>
              {item.name}
            </Typography>
          </Stack>
        </TableCell>
        <TableCell align="left">
          {/* <img src={`${API_BASE}${item.photos}`} alt={item.name} className="" /> */}
          <CardMedia
            component="img"
            alt="green iguana"
            sx={{ height: '150px' }}
            image={`${API_BASE}${item.photos}`}
          />
        </TableCell>
        <TableCell
          align="left"
          sx={{
            maxWidth: '200px',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {item.description}
        </TableCell>
        <TableCell align="left">{item.growthTimeDay} ngày</TableCell>
        <TableCell align="left">
          <Label>{item.isPerennialTree ? 'Cây lâu năm' : 'Cây ngắn ngày'}</Label>
        </TableCell>
        <TableCell align="left">{convertTime(item.createdAt)}</TableCell>

        <TableCell align="right">
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { width: 140 },
        }}
      >
        <MenuItem onClick={openUpdatePopup}>
          <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
          Sửa
        </MenuItem>
        {/* <Dialog open={openUpdateForm} fullWidth onClose={closeUpdatePopup}>
          <DialogTitle>User Update </DialogTitle>
          <DialogContent>
            <Stack spacing={2} margin={2}>
              <TextField
                id="name"
                label="FullName"
                value={formData.name}
                onChange={handleChange}
                // error={!!errors.name}
                // helperText={errors.name}
              />
              <TextField
                id="gmail"
                type="email"
                label="Gmail"
                value={formData.gmail}
                onChange={handleChange}
                error={!!errors.gmail}
                helperText={errors.gmail}
              />
              <TextField
                id="username"
                label="UserName"
                value={formData.username}
                onChange={handleChange}
                error={!!errors.username}
                helperText={errors.username}
              />
              <TextField
                id="phoneNumber"
                type="number"
                label="Phone Number"
                value={formData.phoneNumber}
                onChange={handleChange}
                error={!!errors.phoneNumber}
                helperText={errors.phoneNumber}
              />
              <TextField
                id="dateOfBirth"
                type="date"
                label="Date of Birth"
                value={formData.dateOfBirth}
                onChange={handleDateChange}
                error={!!errors.dateOfBirth}
                helperText={errors.dateOfBirth}
                fullWidth
              />
              <div>
                <Label htmlFor="avatar" style={{ fontSize: '20px', height: '0px' }}>
                  Upload Avatar:
                </Label>
                <input type="file" label="Change Avatar" onChange={handleFileChange} />
              </div>
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleUpload}>Submit</Button>
            <Button onClick={closeUpdatePopup}>Close</Button>
          </DialogActions>
        </Dialog> */}
        <MenuItem onClick={openDeletePopup} sx={{ color: 'error.main' }}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          Xóa
        </MenuItem>
        <Dialog open={openDeleteConfirm} onClose={closeDeletePopup} fullWidth>
          <DialogTitle>Xác nhận xóa?</DialogTitle>
          <DialogContent>
            <Typography>Bạn có muốn xóa cây trồng?</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDeleteUser} color="secondary">
              Xóa
            </Button>
            <Button onClick={closeDeletePopup} color="primary">
              Hủy
            </Button>
          </DialogActions>
        </Dialog>
      </Popover>
    </>
  );
};

PlantTableRow.propTypes = {
  item: PropTypes.any,
  selected: PropTypes.any,
  handleClick: PropTypes.func,
  onSubmitUpdateUser: PropTypes.func,
  onDeleteUser: PropTypes.func,
};
