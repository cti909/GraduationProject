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
import convertTime from "../../utils/ConvertTime";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboard, faEye } from "@fortawesome/free-solid-svg-icons";
import { getAllLandManagementsByUserAction } from "../../redux/actions/landManagementAction";
import convertMoney from "../../utils/convertMoney";
import { useNavigate } from "react-router-dom";

export const LandInformationTable = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(1);
  const landManagementList = useSelector(
    (state) => state.landManagement.landManagements
  );

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    dispatch(getAllLandManagementsByUserAction({ userId: userId }));
  }, [dispatch]);

  const handleChangePage = (event, newPage) => {
    console.log(newPage);
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleToLandManagementDetail = (landManagementId) => {
    navigate("/land-management/" + landManagementId);
  };

  const handleUpdateLand = (landManagementId, landId) => {
    console.log(landManagementId);
    navigate("/land-management/" + landManagementId + "/land/" + landId);
  };

  const isDateInFuture = (date) => {
    const currentDate = new Date();
    const inputDate = new Date(date);
    return inputDate > currentDate;
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Tên mảnh đất</StyledTableCell>
            <StyledTableCell>Giá cả</StyledTableCell>
            <StyledTableCell>Tỉnh</StyledTableCell>
            <StyledTableCell>Trạng thái thuê</StyledTableCell>
            <StyledTableCell>Cây trồng</StyledTableCell>
            <StyledTableCell>Hết hạn thuê</StyledTableCell>
            <StyledTableCell>Xác thực</StyledTableCell>
            <StyledTableCell>Hành động</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {landManagementList &&
            landManagementList.map((item) => (
              <StyledTableRow key={item.id}>
                <StyledTableCell className="truncate ">
                  {item.land.name}
                </StyledTableCell>
                <StyledTableCell>
                  {convertMoney(item.pricePerMonth)}
                </StyledTableCell>
                <StyledTableCell>{item.land.province}</StyledTableCell>

                <StyledTableCell>
                  <div
                    className={`flex justify-center border-2 rounded p-1 ${
                      item.isRented === true
                        ? "bg-green-100 text-green-700 border-emerald-200"
                        : "bg-red-100 text-red-700 border-red-200"
                    }`}
                  >
                    {item.isRented === true ? "Đã thuê" : "Chưa thuê"}
                  </div>
                </StyledTableCell>
                <StyledTableCell>
                  {item.plant !== null ? item.plant.name : "..."}
                </StyledTableCell>
                <StyledTableCell>
                  {item.isRented === true && (
                    <p
                      className={`max-w-24 ${
                        item.subscribes.length != 0 &&
                        isDateInFuture(item.subscribes[0].rentedEndTime)
                          ? ""
                          : "text-red-400"
                      }`}
                    >
                      {item.subscribes.length != 0 &&
                        convertTime(item.subscribes[0].rentedEndTime)}
                    </p>
                  )}
                </StyledTableCell>
                <StyledTableCell>
                  <div
                    className={`flex justify-center ${
                      item.status === 1
                        ? ""
                        : item.status === 2
                        ? "bg-green-100 text-green-700 border-emerald-200"
                        : "bg-red-100 text-red-700 border-red-200"
                    }`}
                  >
                    {item.status === 1
                      ? "..."
                      : item.status === 2
                      ? "Thành công"
                      : "Thất bại"}
                  </div>
                </StyledTableCell>
                <StyledTableCell>
                  <Button
                    variant="outlined"
                    sx={{ padding: "10px", minWidth: 0, minHeight: 0 }}
                    onClick={() => handleUpdateLand(item.id, item.land.id)}
                  >
                    <FontAwesomeIcon icon={faEye} />
                  </Button>
                  <Button
                    variant="outlined"
                    sx={{
                      paddingY: "10px",
                      paddingX: "12px",
                      minWidth: 0,
                      minHeight: 0,
                      marginLeft: "5px",
                    }}
                    onClick={() => handleToLandManagementDetail(item.id)}
                  >
                    <FontAwesomeIcon icon={faClipboard} />
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[]} // [5, 10, 25, { label: "All", value: -1 }]
              colSpan={12}
              count={landManagementList.length}
              rowsPerPage={rowsPerPage}
              page={page}
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
