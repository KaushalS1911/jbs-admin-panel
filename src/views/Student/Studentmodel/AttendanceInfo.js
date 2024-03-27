import { Chip, TablePagination } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useGetAllAttendance } from "hooks/useGetAttendance";
import moment from "moment";
import { Box } from "@mui/system";
import React from "react";
import Flatpickr from "react-flatpickr";
import { useState } from "react";
import { useEffect } from "react";

const AttendanceInfo = ({ formData }) => {
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10); 
    const [selectedDates, setSelectedDates] = useState([]);
    
  const { data, refetch } = useGetAllAttendance(
    page + 1,
    rowsPerPage,
    searchText,
    formData._id
  );

  useEffect(() => {
    refetch();
  }, [page, rowsPerPage, searchText]);

  function handleChangePage(_, newPage) {
    setPage(newPage);
    }
    
      const onDateChange = (dates) => {
        setSelectedDates(dates);
      };

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
            color = "blue";
            break;
          default:
            color = "blue";
        }
        return (
          <>
            <Chip
              label={params.value}
              style={{
                backgroundColor: color,
                color: "white",
                size: "small",
              }}
            />
          </>
        );
      },
    },
  ];

  return (
    <>
      <Box
        className="flatpicker"
        style={{
          outline: "none",
          margin: "15px 0 30px 0",
          whiteSpace: "nowrap",
        }}
      >
        <label
          htmlFor="rows-per-page"
          style={{ minWidth: "fit-content", marginRight: "5px" }}
        >
          Date Range:
        </label>
        <Flatpickr
          placeholder="Select Date"
          style={{ minWidth: "220px" }}
          onChange={(selectedDates) => onDateChange(selectedDates)}
          className="form-control"
          options={{
            dateFormat: "Y-m-d",
            mode: "range",
          }}
        />
      </Box>
      <div style={{ width: '100%', height:'570px',maxHeight:'100%'}}>
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
