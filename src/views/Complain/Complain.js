import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination"; // Import TablePagination
import MainCard from "ui-component/cards/MainCard";
import moment from "moment";
import axios from "axios";
import { Button } from "antd";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton, // Import IconButton
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close"; // Import CloseIcon
import noDataImg from "../../assets/images/no data found.png";
import Mainbreadcrumbs from "contants/Mainbreadcrumbs";

const Complain = () => {
  const [demoData, setDemoData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [open, setOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));

  const fetchDemo = async () => {
    const apiEndpoint = `${process.env.REACT_APP_API_URL}${user.company_id}/student?page=${page}&limit=${rowsPerPage}`;
    try {
      const response = await axios.get(apiEndpoint);
      console.log("student", response.data.data.students);
      setDemoData(response.data.data.students);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchDemo();
  }, [page, rowsPerPage]);

  const handleClickOpen = (student) => {
    setSelectedStudent(student);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleStatusChange = (complaintId, status) => {
    console.log("Status changed to:", status, "for complaint:", complaintId);
    // Here you can add the API call to update the status of the complaint
    handleClose();
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <Mainbreadcrumbs title={"Student Complains"} />
      <MainCard className="main_card">
        <Box
          sx={{ border: "1px solid rgb(225, 225, 225)", borderRadius: "10px" }}
        >
          <TableContainer
            component={Paper}
            style={{ maxHeight: "100%", height: "578px", overflow: "auto" }}
          >
            <Table aria-label="simple table">
              <TableHead
                style={{
                  backgroundColor: "#ede7f6",
                  position: "sticky",
                  top: 0,
                  zIndex: 1,
                }}
              >
                <TableRow>
                  <TableCell align="center">
                    <b>Sr No.</b>
                  </TableCell>
                  <TableCell align="center">
                    <b>Enroll No.</b>
                  </TableCell>
                  <TableCell align="center">
                    <b>Student name</b>
                  </TableCell>
                  <TableCell align="center">
                    <b>Course</b>
                  </TableCell>
                  <TableCell align="center">
                    <b>Contact</b>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {demoData?.map((data, index) => (
                  <React.Fragment key={index}>
                    <TableRow>
                      <TableCell align="center" style={{ padding: "1" }}>
                        {page * rowsPerPage + index + 1}
                      </TableCell>
                      <TableCell align="center" style={{ padding: "1" }}>
                        {data.enrollment_no}
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{
                          cursor: "pointer",
                          color: "#5559CE",
                          padding: "0",
                        }}
                        onClick={() => handleClickOpen(data)}
                      >
                        {data.personal_info.firstName}{" "}
                        {data.personal_info.lastName}
                      </TableCell>
                      <TableCell align="center" style={{ padding: "1" }}>
                        {data.personal_info.course}
                      </TableCell>
                      <TableCell align="center" style={{ padding: "1" }}>
                        {data.personal_info.contact}
                      </TableCell>
                    </TableRow>
                  </React.Fragment>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={demoData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
          <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
            <DialogTitle>
              Complaints of {selectedStudent?.personal_info.firstName}{" "}
              {selectedStudent?.personal_info.lastName}
              <IconButton
                aria-label="close"
                onClick={handleClose}
                sx={{
                  position: "absolute",
                  right: 8,
                  top: 8,
                  color: (theme) => theme.palette.grey[500],
                }}
              >
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell style={{ padding: 4 }}>Sr No</TableCell>
                      <TableCell style={{ padding: 4 }}>Title</TableCell>
                      <TableCell style={{ padding: 4 }}>Date</TableCell>
                      <TableCell style={{ padding: 4 }}>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {selectedStudent?.complaints?.length > 0 ? (
                      selectedStudent.complaints.map((complaint, cIndex) => (
                        <TableRow key={complaint._id}>
                          <TableCell style={{ padding: 4 }}>
                            {cIndex + 1}
                          </TableCell>
                          <TableCell style={{ padding: 4 }}>
                            {complaint.title}
                          </TableCell>
                          <TableCell style={{ padding: 4 }}>
                            {moment(complaint.date).format("YYYY-MM-DD")}
                          </TableCell>
                          <TableCell style={{ padding: 4 }}>
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={() =>
                                handleStatusChange(complaint._id, "Done")
                              }
                              style={{ marginRight: "8px" }}
                            >
                              Done
                            </Button>
                            <Button
                              variant="contained"
                              color="secondary"
                              onClick={() =>
                                handleStatusChange(complaint._id, "In Process")
                              }
                            >
                              In Process
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <>
                        <Grid
                          container
                          justifyContent="center"
                          alignItems="center"
                          style={{ minHeight: "300px" }}
                        >
                          <img
                            src={noDataImg}
                            alt="no data"
                            style={{
                              maxWidth: "300px",
                              width: "100%",
                            }}
                          />
                        </Grid>
                      </>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </DialogContent>
          </Dialog>
        </Box>
      </MainCard>
    </>
  );
};

export default Complain;
