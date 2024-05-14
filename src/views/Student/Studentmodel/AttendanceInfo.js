import { Chip, TablePagination, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useGetAllAttendance } from "hooks/useGetAttendance";
import moment from "moment";
import { Box } from "@mui/system";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import DatePicker from "react-datepicker";

const AttendanceInfo = ({ formData }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const { data, refetch } = useGetAllAttendance(
    page + 1,
    rowsPerPage,
    formData._id,
    startDate,
    endDate
  );

  useEffect(() => {
    refetch();
  }, [page, rowsPerPage]);

  useEffect(() => {
    if (startDate && endDate) {
      refetch(page + 1, rowsPerPage, formData._id, startDate, endDate);
    }
  }, [startDate, endDate]);

  function handleChangePage(newPage) {
    setPage(newPage);
  }

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }

  const rows = data?.attendance
    ? data?.attendance.map((item, index) => ({
        id: index + 1,
        status: item.status,
        studentId: item._Id,
        date: moment(item.date).format("DD/MM/YYYY"),
      }))
    : [];

  const columns = [
    {
      field: "id",
      headerName: "Sr No",
      width: 200,
      disableColumnMenu: true,
      sortable: false,
      headerAlign: "center",
      align: "center",
    },

    {
      field: "date",
      headerName: "Date",
      width: 350,
      sortable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "status",
      headerName: "Status",
      width: 350,
      sortable: false,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        let color;
        switch (params.value) {
          case "Present":
            color = "green";
            break;
          case "Absent":
            color = "red";
            break;
          case "Late":
            color = "orange";
            break;
          default:
            color = "skyblue";
        }
        return (
          <>
            <Typography
              style={{
                color: color,
                fontSize: 14,
                fontWeight: 500,
              }}
            >
              {params.value}
            </Typography>
          </>
        );
      },
    },
  ];

  return (
    <>
      <Box
        sx={{
          display: "flex",
          gap: "20px",
          alignItems: "center",
          marginBottom: "20px",
          justifyContent: "end",
        }}
      >
        <Box className="flatpicker">
          <label
            htmlFor="rows-per-page"
            style={{
              minWidth: "fit-content",
              marginRight: "5px",
              fontSize: "1rem",
              fontWeight: 600,
            }}
          >
            From :
          </label>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
          />
        </Box>
        <Box className="flatpicker">
          <label
            htmlFor="rows-per-page"
            style={{
              minWidth: "fit-content",
              marginRight: "5px",
              fontSize: "1rem",
              fontWeight: 600,
            }}
          >
            To :
          </label>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
          />
        </Box>
      </Box>
      <div style={{ width: "100%", height: "450px", maxHeight: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pagination
          pageSize={rowsPerPage}
          onPageChange={handleChangePage}
          rowCount={rows.length}
          disableRowSelectionOnClick
          disableColumnMenu
          hideFooter={true}
          headerClassName="custom-header-class"
          sx={{
            "& .MuiDataGrid-columnHeaders": {
              fontSize: 14,
              color: "#262626",
            },
            "&.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
              outline: "none !important",
            },
          }}
        />
        <TablePagination
          component="div"
          count={data?.total}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          backIconButtonProps={{
            "aria-label": "Previous Page",
          }}
          nextIconButtonProps={{
            "aria-label": "Next Page",
          }}
          rowsPerPageOptions={[10, 20, 50, 100]}
        />
      </div>
    </>
  );
};

export default AttendanceInfo;
