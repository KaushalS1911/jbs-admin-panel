import { TablePagination, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useGetAllAttendance } from "hooks/useGetAttendance";
import moment from "moment";
import { Box } from "@mui/system";
import React, { useState, useEffect } from "react";
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

  function handleChangePage(event, newPage) {
    setPage(newPage);
  }

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }

  const rows = data?.attendance
    ? Object.values(
        data.attendance.reduce((acc, item) => {
          const date = moment(item.date).format("DD/MM/YYYY");
          if (!acc[date]) {
            acc[date] = {
              id: date,
              date: date,
              status: new Set([item.status]),
            };
          } else {
            acc[date].status.add(item.status);
          }
          return acc;
        }, {})
      ).map((item, index) => ({
        id: index + 1,
        date: item.date,
        status: Array.from(item.status).join(", "),
      }))
    : [];

  const columns = [
    {
      field: "id",
      headerName: "Sr No",
      width: 100,
      disableColumnMenu: true,
      sortable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "date",
      headerName: "Date",
      width: 200,
      sortable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "status",
      headerName: "Status",
      width: 300,
      sortable: false,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        const statusColors = {
          Present: "green",
          Absent: "red",
          Late: "orange",
          Default: "skyblue",
        };
        const statusArray = params.value.split(", ");
        return (
          <>
            {statusArray.map((status, index) => (
              <Typography
                key={index}
                style={{
                  color: statusColors[status] || statusColors.Default,
                  fontSize: 14,
                  fontWeight: 500,
                }}
              >
                {status}
              </Typography>
            ))}
          </>
        );
      },
    },
  ];

  console.log(rows);
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
          rowCount={data?.total}
          disableRowSelectionOnClick
          disableColumnMenu
          hideFooter={true}
          headerClassName="custom-header-class"
        />
        <TablePagination
          component="div"
          count={data?.total}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[10, 20, 50, 100]}
        />
      </div>
    </>
  );
};

export default AttendanceInfo;
