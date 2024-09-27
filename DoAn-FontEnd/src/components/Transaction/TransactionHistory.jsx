import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTransactionByUserIdAction } from "../../redux/actions/transactionAction";
import {
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
import convertMoney from "../../utils/convertMoney";
import convertTime from "../../utils/ConvertTime";

export const TransactionHistory = () => {
  const dispatch = useDispatch();
  const [queryParams, setQueryParams] = useState({
    page: 1,
    pageSize: 10,
    sortBy: "CreatedAt",
    sortType: "desc",
    userId: localStorage.getItem("userId"),
  });
  const transactionPagination = useSelector(
    (state) => state.transaction.transactions
  );

  useEffect(() => {
    // const userId = localStorage.getItem("userId");
    dispatch(getAllTransactionByUserIdAction(queryParams));
  }, [dispatch, queryParams]);

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
      {transactionPagination.data && (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Mã giao dịch</StyledTableCell>
                <StyledTableCell>Chủ sở hữu</StyledTableCell>
                <StyledTableCell>Số tiền</StyledTableCell>
                <StyledTableCell>Trạng thái</StyledTableCell>
                <StyledTableCell>Ngày giao dịch</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactionPagination.totalCount !== 0 ? (
                transactionPagination.data.map((item) => (
                  <StyledTableRow key={item.id} hover>
                    <StyledTableCell className="truncate ">
                      {item.id}
                    </StyledTableCell>
                    <StyledTableCell className="truncate ">
                      {item.user && item.user.name}
                    </StyledTableCell>
                    <StyledTableCell>
                      {convertMoney(item.money)}
                    </StyledTableCell>

                    <StyledTableCell>
                      <div
                        className={`flex justify-center border-2 rounded p-2 ${
                          item.status === 1
                            ? "bg-green-100 text-green-800 border-emerald-200"
                            : "bg-red-100 text-red-800 border-red-200"
                        }`}
                      >
                        {item.status === 1 ? "Thành công" : "Xảy ra lỗi"}
                      </div>
                    </StyledTableCell>
                    <StyledTableCell>
                      {convertTime(item.createdAt)}
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
                  count={transactionPagination.totalCount}
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
