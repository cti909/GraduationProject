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
import { LandTableRow } from '../land-table-row';
import landService from '../../../_mock/landManagement';

// ----------------------------------------------------------------------

export const LandView = () => {
  const [loading, setLoading] = useState(true);
  const [landManagements, setLandManagements] = useState([]);
  const [openDetailForm, setOpenDetailForm] = useState(false);

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
      const landManagementPagination = await landService.getAllLandManagementAsync(params);
      console.log(landManagementPagination);
      setLandManagements(landManagementPagination);
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

  const handleCloseDetailForm = () => {
    setOpenDetailForm(false);
    fetchData();
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
        <Typography variant="h4">Danh sách mảnh đất cần xác thực</Typography>
      </Stack>
      {/* {loading && (
        <Grid container justifyContent="center" alignItems="center" style={{ height: '70vh' }}>
          <CircularProgress size={100} />
        </Grid>
      )} */}
      <Card>
        {/* <div className="p-5">
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
        </div> */}
        {/* table */}
        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <TableHead>
                <TableRow>
                  <TableCell align="left">Tên mảnh đất</TableCell>
                  <TableCell align="left">Ảnh minh họa</TableCell>
                  <TableCell align="left">Giá thuê</TableCell>
                  <TableCell align="left">Tỉnh thành</TableCell>
                  <TableCell align="left">Người tạo</TableCell>
                  <TableCell align="left">Số điện thoại</TableCell>
                  <TableCell align="left">Email</TableCell>
                  <TableCell align="left">Ngày tạo</TableCell>
                  <TableCell align="center"> </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {!loading &&
                  landManagements.data.map((item) => (
                    <LandTableRow
                      key={item.id}
                      item={item}
                      openDetailForm={openDetailForm}
                      handleCloseDetailForm={handleCloseDetailForm}
                      handleOpenDetailForm={() => setOpenDetailForm(true)}
                    />
                  ))}

                {!loading && landManagements && landManagements.totalCount === 0 && (
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
          count={landManagements.length !== 0 ? landManagements.totalCount : 0}
          rowsPerPage={queryParams.pageSize}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
  );
};
