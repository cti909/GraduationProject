import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import { TableFooter, TablePagination } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getAllPlantDiseaseAction } from "../../redux/actions/plantDiseaseAction";
import { API_BASE } from "../../services/api.config";
import convertTime from "../../utils/ConvertTime";

export default function PlantDiseaseTable() {
  const dispatch = useDispatch();
  const [queryParams, setQueryParams] = useState({
    page: 1,
    pageSize: 5,
    sortBy: "CreatedAt",
    sortType: "desc",
    userId: localStorage.getItem("userId"),
  });
  const plantDiseasePagination = useSelector(
    (state) => state.plantDisease.plantDiseases
  );

  useEffect(() => {
    dispatch(getAllPlantDiseaseAction(queryParams));
  }, [dispatch, queryParams]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [plantDiseasePagination]);

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
      {plantDiseasePagination.data && (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Ảnh lá cây</StyledTableCell>
                <StyledTableCell>Dự đoán bệnh</StyledTableCell>
                <StyledTableCell>Ngày tạo</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {plantDiseasePagination.data &&
                plantDiseasePagination.data.map((item) => (
                  <StyledTableRow key={item.id}>
                    <StyledTableCell component="th" scope="row">
                      <img
                        className="max-w-md border w-60"
                        src={`${API_BASE}${item.photo}`}
                        alt="..."
                      />
                    </StyledTableCell>
                    <StyledTableCell>{item.name}</StyledTableCell>
                    <StyledTableCell>
                      {convertTime(item.createdAt)}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  colSpan={3}
                  count={plantDiseasePagination.totalCount}
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
                  //   ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      )}
    </>
  );
}

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
