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

import Iconify from 'src/components/iconify';

import convertTime from 'src/utils/ConvertTime';
import convertMoney from 'src/utils/convertMoney';
import { API_BASE } from 'src/_mock/api.config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboard, faTrash } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import landService from '../../_mock/landManagement';

export const LandTableRow = ({
  item,
  openDetailForm,
  handleCloseDetailForm,
  handleOpenDetailForm,
}) => {
  const [open, setOpen] = useState(null);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleSetStatusLand = async (id, status) => {
    try {
      await landService.updateLandManagementStatusAsync(id, status);
      Swal.fire({
        title: 'Thành công!',
        text: 'Xác minh thành công',
        icon: 'success',
      });
      handleCloseDetailForm(); // Đóng form sau khi thành công
    } catch (error) {
      console.error('Error creating plant:', error);
      Swal.fire({
        title: 'Lỗi!',
        text: error.message || 'Đã có lỗi xảy ra',
        icon: 'error',
      });
    }
  };

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox">
        <TableCell component="th" scope="row" padding="normal">
          <Stack direction="row" alignItems="left" spacing={2}>
            <Typography variant="subtitle2" noWrap>
              {item.land && item.land.name}
            </Typography>
          </Stack>
        </TableCell>
        <TableCell align="left">
          {/* <img src={`${API_BASE}${item.photos}`} alt={item.name} className="" /> */}
          <CardMedia
            component="img"
            alt="green iguana"
            sx={{ height: '150px' }}
            image={`${API_BASE}${item.land.photos}`}
          />
        </TableCell>
        <TableCell>{item.pricePerMonth && convertMoney(item.pricePerMonth)}</TableCell>
        <TableCell align="left">{item.land && item.land.province}</TableCell>
        <TableCell align="left">{item.user && item.user.name}</TableCell>
        <TableCell align="left">{item.user && item.user.phoneNumber}</TableCell>
        <TableCell align="left">{item.user && item.user.email}</TableCell>
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
        <MenuItem onClick={handleOpenDetailForm}>
          <FontAwesomeIcon icon={faClipboard} className="mr-2" />
          Thông tin
        </MenuItem>
        <Dialog open={openDetailForm} fullWidth onClose={handleCloseDetailForm}>
          <DialogTitle className="text-center">Thông tin chi tiết mảnh đất</DialogTitle>
          <DialogContent>
            <div className="flex items-center">
              <h5 className="font-bold mr-2">Tên mảnh đất: </h5>
              <span>{item.land && item.land.name}</span>
            </div>
            <div className="flex items-center">
              <h5 className="font-bold mr-2">Chủ sở hữu: </h5>
              <span>{item.user.name}</span>
            </div>
            <div className="flex items-center">
              <h5 className="font-bold mr-2">Số điện thoại: </h5>
              <span>{item.user.phoneNumber}</span>
            </div>
            <div className="flex items-center">
              <h5 className="font-bold mr-2">Email: </h5>
              <span>{item.user && item.user.email}</span>
            </div>
            <div className="flex items-center">
              <h5 className="font-bold mr-2">Địa điểm: </h5>
              <span>{item.land.province}</span>
            </div>
            <div className="flex items-center">
              <h5 className="font-bold mr-2">Diện tích: </h5>
              <span>{item.land.size} m2</span>
            </div>
            <div className="flex items-center">
              <h5 className="font-bold mr-2">Nồng độ N-P-K: </h5>
              <span>
                {item.land.n}-{item.land.p}-{item.land.k}
              </span>
            </div>
            <div className="flex items-center">
              <h5 className="font-bold mr-2">Độ PH: </h5>
              <span>{item.land.pH}</span>
            </div>

            <div className="flex items-center">
              <h5 className="font-bold mr-2">Đất trồng cây lâu năm: </h5>
              <span>{item.isPerennialTree === true ? 'Có' : 'Không'}</span>
            </div>
            <div className="flex items-center">
              <h5 className="font-bold mr-2">Giá thuê: </h5>
              <span>{item.pricePerMonth && convertMoney(item.pricePerMonth)}</span>
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => handleSetStatusLand(item.id, 2)} color="success">
              Xác minh
            </Button>
            <Button onClick={() => handleSetStatusLand(item.id, 3)} color="error">
              Từ chối
            </Button>
            <Button onClick={handleCloseDetailForm}>Hủy</Button>
          </DialogActions>
        </Dialog>
      </Popover>
    </>
  );
};

LandTableRow.propTypes = {
  item: PropTypes.any,
  openDetailForm: PropTypes.bool.isRequired,
  handleCloseDetailForm: PropTypes.func,
  handleOpenDetailForm: PropTypes.func,
};
