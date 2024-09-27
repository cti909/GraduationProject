import { useState, useEffect, useCallback } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import CircularProgress from '@mui/material/CircularProgress'; // Thêm CircularProgress
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
// import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import { TableHead, OutlinedInput, InputAdornment } from '@mui/material';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { debounce } from 'lodash';
import TableNoData from '../table-no-data';
import { UserTableRow } from '../user-table-row';
import UserTableHead from '../user-table-head';
import TableEmptyRows from '../table-empty-rows';
// import userService from '../service/userService';
import UserTableToolbar from '../user-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';
// import userService from '../service/userService';
import userService from '../../../_mock/user';

// ----------------------------------------------------------------------

export const UserView = () => {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [open, openChange] = useState(false);

  const [queryParams, setQueryParams] = useState({
    page: 1,
    pageSize: 5,
    searchValue: '',
    sortBy: 'CreatedAt',
    sortType: 'desc',
  });
  // const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    console.log(queryParams);
    fetchData(queryParams);
  }, [queryParams]);

  const fetchData = async (params) => {
    try {
      setLoading(true);
      const userPagination = await userService.getAllUserAsync(params);
      console.log(userPagination);
      setUsers(userPagination);
      // setCloneUsers(userPagination);
    } catch (error) {
      console.error('Error fetching data: ', error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    // setSearchValue(e.target.value);
    setQueryParams((prevParams) => ({
      ...prevParams,
      searchValue: e.target.value,
      page: 1, // Reset to first page when filters change
    }));
  };

  const handleChangePage = (event, newPage) => {
    console.log(newPage);
    setQueryParams((prevParams) => ({
      ...prevParams,
      // pageSize: parseInt(event.target.value, 10),
      page: newPage + 1,
    }));
  };

  const handleChangeRowsPerPage = (event) => {
    setQueryParams((prevParams) => ({
      ...prevParams,
      pageSize: parseInt(event.target.value, 10),
      page: 1,
    }));
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const onSubmitUpdateUser = async (formDataUpdate) => {
    toast
      .promise(userService.updateUser(formDataUpdate), {
        pending: 'Đang xử lý...',
        success: 'Cập nhật user thành công!',
        error: 'Đã xảy ra lỗi khi cập nhật user!',
      })
      .then(async () => {
        fetchData();
      });
  };
  const onDeleteUser = async (id) => {
    toast
      .promise(userService.deleteUser(id), {
        pending: 'Đang xử lý...',
        success: 'Cập nhật user thành công!',
        error: 'Đã xảy ra lỗi khi cập nhật user!',
      })
      .then(async () => {
        fetchData();
      });
  };

  return (
    <Container>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Danh sách người dùng</Typography>

        {/* <Button
          onClick={functionOpenPopup}
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="eva:plus-fill" />}
        >
          Tạo người dùng mới +
        </Button> */}
      </Stack>
      {/* {loading && (
        <Grid container justifyContent="center" alignItems="center" style={{ height: '70vh' }}>
          <CircularProgress size={100} />
        </Grid>
      )} */}
      <Card>
        {/* search name */}
        <div className="p-5">
          <OutlinedInput
            fullWidth
            value={queryParams.searchValue}
            onChange={handleFilterChange}
            placeholder="Tìm kiếm theo tên người dùng"
            startAdornment={
              <InputAdornment position="start">
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </InputAdornment>
            }
          />
        </div>
        {/* table */}
        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <TableHead>
                <TableRow>
                  <TableCell align="left">Họ tên</TableCell>
                  <TableCell align="left">Email</TableCell>
                  <TableCell align="left">Số điện thoại</TableCell>
                  <TableCell align="left">Địa chỉ</TableCell>
                  <TableCell align="left">Vai trò</TableCell>
                  <TableCell align="left">Số dư</TableCell>
                  <TableCell align="left">Ngày tạo</TableCell>
                  {/* <TableCell align="center">...</TableCell> */}
                </TableRow>
              </TableHead>

              <TableBody>
                {!loading &&
                  users.data.map((item) => (
                    <UserTableRow
                      item={item}
                      selected={selected.indexOf(item.name) !== -1}
                      handleClick={(event) => handleClick(event, item.name)}
                      onSubmitUpdateUser={onSubmitUpdateUser}
                      onDeleteUser={onDeleteUser}
                    />
                  ))}

                {!loading && users && users.totalCount === 0 && (
                  <TableCell colSpan={12}>
                    <h5 className="text-center">Không có bản ghi nào</h5>
                  </TableCell>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          component="div"
          rowsPerPageOptions={[5, 10, 25]}
          page={queryParams.page - 1}
          count={users.totalCount}
          rowsPerPage={queryParams.pageSize}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
  );
};
