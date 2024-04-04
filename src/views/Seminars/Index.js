import React, { useEffect } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  Paper,
  Radio,
  RadioGroup,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import MainCard from "ui-component/cards/MainCard";
import AddSeminar from "./AddSeminar";
import { TablePagination } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useRecoilValue } from "recoil";
import { profile } from "../../atoms/authAtoms";
import { useState } from "react";
import { useGetSeminar } from "hooks/useGetSeminar";
import moment from "moment";
import axios from "axios";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import CloseIcon from "@mui/icons-material/Close";
import { green, red } from "@mui/material/colors";
import AirplayIcon from "@mui/icons-material/Airplay";
import Mainbreadcrumbs from "contants/Mainbreadcrumbs";
import noDataImg from "../../assets/images/no data found.png";

const Index = () => {
  const [openAddTaskDialog, setOpenAddTaskDialog] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchText, setSearchText] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState("");
  const [openHowToRegDialog, setOpenHowToRegDialog] = useState(false);
  const [attendanceData, setAttendanceData] = useState([]);
  const [editAttendanceId, setEditAttendanceId] = useState("");
  const [seminarOverData, setSeminarOverData] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);

  const user = useRecoilValue(profile);

  const handleTaskClick = () => {
    setOpenAddTaskDialog(true);
  };

  const { data: seminar, refetch } = useGetSeminar(
    page + 1,
    rowsPerPage,
    searchText
  );

  function handleChangePage(event, newPage) {
    setPage(newPage);
  }
  function handleChangeRowsPerPage(event) {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }

  useEffect(() => {
    if (searchText !== "") {
      const delayDebounceFn = setTimeout(() => {
        refetch();
      }, 1000);
      return () => clearTimeout(delayDebounceFn);
    } else {
      refetch();
    }
  }, [searchText, page, rowsPerPage]);

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 70,
      disableColumnMenu: true,
      sortable: false,
      headerAlign: "start",
      align: "start",
      cursor: "pointer",
    },
    {
      field: "schedule_by",
      headerName: "Schedule By",
      width: 250,
      disableColumnMenu: true,
      sortable: false,
      headerAlign: "start",
      align: "start",
    },
    {
      field: "title",
      headerName: "Title",
      width: 500,
      disableColumnMenu: true,
      sortable: false,
      headerAlign: "start",
      align: "start",
    },
    {
      field: "date",
      headerName: "Date",
      width: 225,
      disableColumnMenu: true,
      sortable: false,
      headerAlign: "start",
      align: "start",
    },
    {
      field: "time",
      headerName: "Time",
      width: 150,
      disableColumnMenu: true,
      sortable: false,
      headerAlign: "start",
      align: "start",
    },
    {
      field: "attendance",
      headerName: "Attendance",
      width: 150,
      disableColumnMenu: true,
      sortable: false,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <HowToRegIcon
          size="small"
          onClick={() => handleHowToRegClick(params)}
        />
      ),
    },
  ];

  const rows = seminar
    ? seminar.seminars.map((item, index) => ({
        id: index + 1,
        assigned: item.fullName,
        date: moment(item.date_time).format("YYYY-MM-DD"),
        time: moment(item.date_time).format("hh:mm A"),
        title: item.title,
        schedule_by: item.schedule_by,
        status: item.status,
        role: item.role,
        _id: item._id,
      }))
    : [];

  const handleSelectionModelChange = (selectionModel) => {
    const selectedRowIds = selectionModel
      .map((selectedIndex) => rows[selectedIndex]?._id)
      .filter((id) => id !== undefined);

    setSelectedRows(selectedRowIds);
  };

  const handleRowIdlick = (params) => {
    setEditId(params.row._id);
    setOpenAddTaskDialog(true);
    setIsEdit(true);
  };

  const handleDeleteButtonClick = async () => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_URL}${user.company_id}/delete/multipleSeminar`,
        {
          data: { ids: selectedRows },
        }
      );

      if (response.status === 200) {
        refetch();
        const remainingRows = selectedRows.filter(
          (id) => !rows.find((row) => row._id === id)
        );
        setSelectedRows(remainingRows);
      }
    } catch (error) {
      console.error("Error deleting multiple tasks:", error);
    }
  };

  const handleHowToRegClick = (params) => {
    setOpenHowToRegDialog(true);
    const myRes = seminar?.seminars?.find(
      (item) => item?._id === params?.row?._id
    );
    setAttendanceData(myRes?.attended_by);
    setEditAttendanceId(params?.row?._id);
  };

  const handleSaveAttendance = async () => {
    try {
      const seminarToUpdate = {
        ...seminar.data,
        attended_by: attendanceData,
      };
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}${user.company_id}/${editAttendanceId}/updateseminar`,
        seminarToUpdate
      );

      if (response.status === 200) {
        setOpenHowToRegDialog(false);
        refetch();
      }
    } catch (error) {
      console.error("Error updating attendance:", error);
    }
  };

  const handleAttendanceStatusChange = (index, status) => {
    const updatedAttendanceData = [...attendanceData];
    updatedAttendanceData[index].attended_status = status;
    setAttendanceData(updatedAttendanceData);
  };

  const handleOverViewClick = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}${user.company_id}/seminarOverView`
      );

      if (response.status === 200) {
        const formattedData = response.data.data.map((seminar) => ({
          ...seminar,
          date_time: moment(seminar.date_time).format("DD-MM-YYYY"),
        }));
        setSeminarOverData(formattedData);
        setOpenDialog(true);
      } else {
        console.error(
          "Error fetching seminar overview. Status:",
          response.status
        );
      }
    } catch (error) {
      console.error("Error fetching seminar overview:", error);
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSeminarOverData([]);
  };

  return (
    <>
      <Mainbreadcrumbs title={"Seminar"} />
      <MainCard>
        <FormControl
          sx={{
            m: 1,
            p: 0,
            minWidth: 120,
            width: "100%",
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#5559CE",
              },
              "&:hover fieldset": {
                borderColor: "#5559CE",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#5559CE",
                borderWidth: "2px",
              },
            },

            size: "small",
          }}
        >
          <Grid
            container
            direction="row"
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Grid item lg={4} md={12} xs={12} sm={6}>
              <Grid item>
                <TextField
                  type="text"
                  fullWidth
                  size="small"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
              </Grid>
            </Grid>

            <Grid
              sx={{
                display: "flex",
                justifyContent: "end",
                alignItems: "center",
              }}
              item
              lg={6}
              md={6}
              xs={12}
              sm={6}
            >
              <Grid style={{ marginLeft: "4px" }}>
                {user.role === "Admin" && (
                  <>
                    <Button
                      sx={{
                        backgroundColor: "#5559CE",
                        color: "#fff",
                        marginRight: "10px",
                        height: "35px",
                        lineHeight: "35px",
                        "&:hover": {
                          color: "#5559CE",
                          backgroundColor: "#fff",
                        },
                        "&:disabled": {
                          color: "#5559CE",
                          backgroundColor: "#fff",
                        },
                      }}
                      onClick={handleOverViewClick}
                      style={{
                        color: "#000",
                        border: "none",
                        lineHeight: "35px",
                        height: "35px",
                        backgroundColor: "#D9DAF9",
                        margin: " 0px 10px 0px 10px ",
                      }}
                    >
                      <AirplayIcon
                        style={{ fontSize: "22px", marginRight: "5px" }}
                      />
                      Over view
                    </Button>
                    <Button
                      variant="outlined"
                      style={{
                        color: "#000",
                        border: "none",
                        lineHeight: "35px",
                        height: "35px",
                        backgroundColor: "#D9DAF9",
                        margin: " 0px 10px 0px 10px ",
                      }}
                      onClick={handleTaskClick}
                      startIcon={
                        <AddCircleOutlineIcon
                          style={{ fontSize: "22px", marginRight: "3px" }}
                        />
                      }
                    >
                      Add Seminar
                    </Button>
                    <Button
                      sx={{
                        backgroundColor: "#5559CE",
                        color: "#fff",
                        marginRight: "10px",
                        height: "35px",
                        lineHeight: "35px",
                        "&:hover": {
                          color: "#5559CE",
                          backgroundColor: "#fff",
                        },
                        "&:disabled": {
                          color: "#5559CE",
                          backgroundColor: "#fff",
                        },
                      }}
                      onClick={handleDeleteButtonClick}
                      disabled={selectedRows.length < 2}
                    >
                      Delete
                    </Button>
                  </>
                )}
              </Grid>
            </Grid>
          </Grid>
        </FormControl>
        <AddSeminar
          openAddTaskDialog={openAddTaskDialog}
          setOpenAddTaskDialog={setOpenAddTaskDialog}
          refetch={refetch}
          setIsEdit={setIsEdit}
          isEdit={isEdit}
          editId={editId}
          setEditId={setEditId}
        />
      </MainCard>
      <MainCard sx={{ margin: "20px 0" }}>
        <>
          <div style={{ width: "100%", height: "570px", maxHeight: "100%" }}>
            {rows.length > 0 ? (
              <DataGrid
                rows={rows}
                columns={columns}
                pagination
                pageSize={rowsPerPage}
                onPageChange={handleChangePage}
                onRowSelectionModelChange={handleSelectionModelChange}
                rowCount={rows.length}
                checkboxSelection
                disableRowSelectionOnClick
                disableColumnMenu
                hideFooter={true}
                onCellClick={(params) => {
                  const clickedField = params.field;
                  if (
                    ["id", "schedule_by", "title", "date", "time"].includes(
                      clickedField
                    )
                  ) {
                    handleRowIdlick(params);
                  }
                }}
                sx={{
                  "& .MuiDataGrid-columnHeaders": {
                    backgroundColor: "#ede7f6",
                    fontSize: 14,
                    color: "#262626",
                  },
                }}
              />
            ) : (
              <>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <img
                    src={noDataImg}
                    alt="no data"
                    loading="lazy"
                    style={{ maxWidth: "600px" }}
                  />
                </div>
              </>
            )}
          </div>
          <TablePagination
            component="div"
            count={seminar?.totalData}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[10, 15, 25, 50]}
          />
        </>
      </MainCard>
      <Dialog
        open={openHowToRegDialog}
        maxWidth={"xs"}
        onClose={() => setOpenHowToRegDialog(false)}
      >
        <DialogTitle style={{ fontSize: "20px" }}>Attendance</DialogTitle>
        <IconButton
          aria-label="close"
          onClick={() => setOpenHowToRegDialog(false)}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent>
          <div style={{ width: "300px" }}>
            <TableContainer component={Paper}>
              <Table>
                <TableBody>
                  {Array.isArray(attendanceData) &&
                    attendanceData.map((user, index) => {
                      return (
                        <TableRow key={user.attended_id}>
                          <TableCell style={{ padding: "10px" }}>
                            {user
                              ? `${user.firstName} ${user.lastName}`
                              : "User not found"}
                          </TableCell>
                          <TableCell align="right" style={{ padding: "10px" }}>
                            <FormControl>
                              <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                              >
                                <FormControlLabel
                                  value="absent"
                                  control={
                                    <Radio
                                      sx={{
                                        color: green[800],
                                        "&.Mui-checked": {
                                          color: green[600],
                                        },
                                      }}
                                    />
                                  }
                                  checked={user.attended_status === "present"}
                                  onChange={() =>
                                    handleAttendanceStatusChange(
                                      index,
                                      "present"
                                    )
                                  }
                                />
                                <FormControlLabel
                                  value="present"
                                  control={
                                    <Radio
                                      sx={{
                                        color: red[800],
                                        "&.Mui-checked": {
                                          color: red[600],
                                        },
                                      }}
                                    />
                                  }
                                  checked={user.attended_status === "absent"}
                                  onChange={() =>
                                    handleAttendanceStatusChange(
                                      index,
                                      "absent"
                                    )
                                  }
                                />
                              </RadioGroup>
                            </FormControl>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenHowToRegDialog(false)} color="error">
            Close
          </Button>
          <Button onClick={handleSaveAttendance} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle style={{ fontSize: "20px" }}>Seminar Overview</DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleCloseDialog}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent>
          {seminarOverData && (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Title</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Present</TableCell>
                  <TableCell>Absent </TableCell>
                  <TableCell>Total</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {seminarOverData.map((seminar) => (
                  <TableRow key={seminar.seminar_id}>
                    <TableCell>{seminar.title}</TableCell>
                    <TableCell>{seminar.date_time}</TableCell>
                    <TableCell>{seminar.present_count}</TableCell>
                    <TableCell>{seminar.absent_count}</TableCell>
                    <TableCell>{seminar.totel}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} style={{ color: "#5559ce" }}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Index;
