import { useState, useEffect } from 'react';
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
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import { TableHead, OutlinedInput, InputAdornment } from '@mui/material';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { debounce } from 'lodash';
// import TableNoData from '../table-no-data';
import { PlantTableRow } from '../plant-table-row';
// import UserTableHead from '../user-table-head';
// import TableEmptyRows from '../table-empty-rows';
// import userService from '../service/userService';
// import UserTableToolbar from '../user-table-toolbar';
// import UserRegistrationDialog from '../UserRegistrationDialog';
// import { emptyRows, applyFilter, getComparator } from '../utils';
// import userService from '../service/userService';
import plantService from '../../../_mock/plant';
import { PlantCreateForm } from '../PlantCreateForm';

// ----------------------------------------------------------------------

export const PlantView = () => {
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(true);
  const [plants, setPlants] = useState([]);
  const [openCreateForm, setOpenCreateForm] = useState(false);
  // const [open, setOpen] = useState(false);
  // const [open, openChange] = useState(false);
  // const [visible, setVisible] = useState(true);
  // const [formData, setFormData] = useState({
  //   name: '',
  //   gmail: '',
  //   username: '',
  //   password: '',
  //   phoneNumber: '',
  //   gender: '',
  // });

  const [queryParams, setQueryParams] = useState({
    page: 1,
    pageSize: 5,
    searchValue: '',
    sortBy: 'CreatedAt',
    sortType: 'desc',
  });

  useEffect(() => {
    console.log(queryParams);
    fetchData(queryParams);
  }, [queryParams]);

  const fetchData = async (params) => {
    try {
      setLoading(true);
      const plantPagination = await plantService.getAllPlantAsync(params);
      console.log(plantPagination);
      setPlants(plantPagination);
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

  const handleCloseCreateForm = () => {
    setOpenCreateForm(false);
  };

  // let notFound;
  // const functionOpenPopup = () => {
  //   openChange(true);
  // };
  // const closePopup = () => {
  //   openChange(false);
  // };

  // const handleSelectAllClick = (event) => {
  //   if (event.target.checked) {
  //     const newSelecteds = users.map((n) => n.name);
  //     setSelected(newSelecteds);
  //     return;
  //   }
  //   setSelected([]);
  // };

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

  // const onSubmitUser = async (form) => {
  //   const formAdd = new FormData();

  //   Object.entries(form).forEach(([key, value]) => {
  //     if (key === 'dateOfBirth') {
  //       value = formatDateTime(value);
  //     }
  //     formAdd.append(key, value);
  //   });
  //    toast
  //     .promise(userService.addUser(formAdd), {
  //       pending: 'Đang xử lý...',
  //       success: 'Thêm user đã được đăng ký thành công!',
  //       error: 'Đã xảy ra lỗi khi đăng ký user!',
  //     })
  //     .then(async () => {
  //       setUsers([]);
  //       const data = await userService.getAllUsers();
  //       setUsers(data);
  //       setCloneUsers(data);
  //     });
  // };

  // const handleChange = (e) => {
  //   setFormData({ ...formData, [e.taget.name]: e.target.value });
  //   //   setFormData((prevData) => ({
  //   //     ...prevData,
  //   //     [name]: value,
  //   //   }));
  // };

  const onSubmitUpdateUser = async (formDataUpdate) => {
    // toast
    //   .promise(userService.updateUser(formDataUpdate), {
    //     pending: 'Đang xử lý...',
    //     success: 'Cập nhật user thành công!',
    //     error: 'Đã xảy ra lỗi khi cập nhật user!',
    //   })
    //   .then(async () => {
    //     fetchData();
    //   });
  };
  const onDeleteUser = async (id) => {
    // toast
    //   .promise(userService.deleteUser(id), {
    //     pending: 'Đang xử lý...',
    //     success: 'Cập nhật user thành công!',
    //     error: 'Đã xảy ra lỗi khi cập nhật user!',
    //   })
    //   .then(async () => {
    //     fetchData();
    //   });
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
        <Typography variant="h4">Danh sách cây trồng</Typography>

        <Button
          onClick={() => {
            setOpenCreateForm(true);
          }}
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="eva:plus-fill" />}
        >
          Tạo cây trồng mới
        </Button>
        {openCreateForm && (
          <PlantCreateForm
            openCreateForm={openCreateForm}
            handleCloseCreateForm={handleCloseCreateForm}
          />
        )}
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
            placeholder="Tìm kiếm theo tên cây trồng"
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
                  <TableCell align="left">Tên cây trồng</TableCell>
                  <TableCell align="left">Ảnh minh họa</TableCell>
                  <TableCell align="left">Mô tả</TableCell>
                  <TableCell align="left">Ngày trưởng thành</TableCell>
                  <TableCell align="left">Loại cây</TableCell>
                  <TableCell align="left">Ngày tạo</TableCell>
                  <TableCell align="center"> </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {!loading &&
                  plants.data.map((item) => (
                    <PlantTableRow
                      key={item.id}
                      item={item}
                      selected={selected.indexOf(item.name) !== -1}
                      handleClick={(event) => handleClick(event, item.name)}
                      onSubmitUpdateUser={onSubmitUpdateUser}
                      onDeleteUser={onDeleteUser}
                    />
                  ))}

                {plants && plants.totalCount === 0 && (
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
          count={plants.length !== 0 ? plants.totalCount : 0}
          rowsPerPage={queryParams.pageSize}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
  );
};
