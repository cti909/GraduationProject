import {
  Button,
  Paper,
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSubscribesByUserAction } from "../../redux/actions/subscribeAction";
import convertTime from "../../utils/ConvertTime";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import convertMoney from "../../utils/convertMoney";

export const SubscribeTable = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const [page, setPage] = useState(0);
  // const [rowsPerPage, setRowsPerPage] = useState(1);
  const [queryParams, setQueryParams] = useState({
    page: 1,
    pageSize: 10,
    sortBy: "CreatedAt",
    sortType: "desc",
    userId: localStorage.getItem("userId"),
  });

  const subscribePagination = useSelector(
    (state) => state.subscribe.subscribes
  );

  useEffect(() => {
    dispatch(getAllSubscribesByUserAction(queryParams));
  }, [dispatch, queryParams]);

  const handleToSubscribeDetail = (subscribeId) => {
    navigate("/subscribe/" + subscribeId);
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

  return (
    <>
      {subscribePagination.data && (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Mã</StyledTableCell>
                <StyledTableCell>Mô tả</StyledTableCell>
                <StyledTableCell>Thời gian thuê</StyledTableCell>
                <StyledTableCell>Giá tiền</StyledTableCell>
                <StyledTableCell>Trạng thái</StyledTableCell>
                <StyledTableCell>Ngày hết hạn</StyledTableCell>
                <StyledTableCell>Sử dụng</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {subscribePagination.totalCount !== 0 ? (
                subscribePagination.data.map((item) => (
                  <StyledTableRow key={item.id}>
                    <StyledTableCell>{item.id}</StyledTableCell>
                    <StyledTableCell>{item.description}</StyledTableCell>
                    <StyledTableCell>{item.durationTime}</StyledTableCell>
                    <StyledTableCell>
                      {item.totalPrice && convertMoney(item.totalPrice)}
                    </StyledTableCell>
                    <StyledTableCell>
                      <div
                        className={`flex justify-center border-2 rounded p-2 ${
                          item.status == 1
                            ? "bg-green-100 text-green-800 border-emerald-200"
                            : "bg-red-100 text-red-800 border-red-200"
                        }`}
                      >
                        {item.status == 1 ? "Còn hạn" : "Hết hạn"}
                      </div>
                    </StyledTableCell>
                    <StyledTableCell>
                      {convertTime(item.rentedEndTime)}
                    </StyledTableCell>
                    <StyledTableCell>
                      <Button
                        variant="outlined"
                        sx={{ padding: "10px", minWidth: 0, minHeight: 0 }}
                        onClick={() => handleToSubscribeDetail(item.id)}
                      >
                        <FontAwesomeIcon icon={faEye} />
                      </Button>
                    </StyledTableCell>
                  </StyledTableRow>
                ))
              ) : (
                <StyledTableRow>
                  <StyledTableCell colSpan={12}>
                    <h5 className="text-center">Không có bản ghi nào</h5>
                  </StyledTableCell>
                </StyledTableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]} // [5, 10, 25, { label: "All", value: -1 }]
                  colSpan={12}
                  count={subscribePagination.totalCount}
                  rowsPerPage={queryParams.pageSize}
                  page={queryParams.page - 1}
                  slotProps={{
                    select: {
                      inputProps: {
                        "aria-label": "rows per page",
                      },
                      native: true,
                    },
                  }}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  // ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      )}
    </>
  );
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
