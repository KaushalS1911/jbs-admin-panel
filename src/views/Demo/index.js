import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import MainCard from "ui-component/cards/MainCard";
import { EditNoteTwoTone, RestoreFromTrashTwoTone } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import moment from "moment";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import EditDemo from "./EditDemo";
import { Modal, notification } from "antd";
import ConfirmationDialog from "Extracomponent/ConfirmationDialog";
import TablePagination from "@mui/material/TablePagination";

const Index = () => {
  //notification
  const openNotificationWithIcon = (type, message) => {
    notification[type]({
      message: message,
    });
  };
  const theme = useTheme();
  const [demoData, setDemoData] = useState([]);
  const [Seletedrow, setSelectedrow] = useState(null);
  const [editOpen, setEditOpen] = useState(false);
  const [myRowId, setMyRowId] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const followModal = () => {
    setEditOpen(true);
  };
  const followOk = () => {
    setEditOpen(false);
  };
  const followCancel = () => {
    setEditOpen(false);
  };
  function handleAddDemo(value, rowId) {
    setSelectedrow(value);
    setMyRowId(rowId);
  }

  // delete model
  const [open, setOpen] = useState(false);
  const [deleteRowData, setDeleteRowData] = useState(null);

  const handleOpenDialog = (row, entryId) => {
    setDeleteRowData({ demoId: row._id, entryId });
    setOpen(true);
  };
  const handleCloseDialog = () => {
    setOpen(false);
  };

  const user = JSON.parse(localStorage.getItem("user"));
  const fetchDemo = async () => {
    const apiEndpoint = `${process.env.REACT_APP_API_URL}${user.company_id}/demo?limit=${rowsPerPage}&page=${page + 1}`;
    try {
      const response = await axios.get(apiEndpoint);
      console.log(response);
      setDemoData(response.data.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchDemo();
  }, [page, rowsPerPage]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDelete = async () => {
    if (!deleteRowData) return;
    const { demoId, entryId } = deleteRowData;
    const apiEndpoint = `${process.env.REACT_APP_API_URL}${user.company_id}/${demoId}/${entryId}/deleteDemo`;
    try {
      const response = await axios.delete(apiEndpoint);
      fetchDemo();
      openNotificationWithIcon("success", response.data.message);
    } catch (error) {
      console.error("Error deleting student data:", error);
      openNotificationWithIcon("error", error.response.data.message);
    } finally {
      handleCloseDialog();
    }
  };
  function Row(props) {
    const { row } = props;
    const [opendrop, setOpendrop] = React.useState(false);

    return (
      <React.Fragment>
        <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => {
                setOpendrop(!opendrop);
              }}
            >
              {opendrop ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell align="center" component="th" scope="row">
            {row.fullName}
          </TableCell>
          <TableCell align="center">{row.contact}</TableCell>
          <TableCell align="center">{row.email}</TableCell>
          <TableCell align="center">{row.interested_in.join(", ")}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={opendrop} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography
                  variant="h6"
                  gutterBottom
                  component="div"
                  sx={{ margin: "10px 0" }}
                >
                  <b style={{ fontSize: "22px" }}>Demo Details</b>
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">
                        <b>Sr No</b>
                      </TableCell>
                      <TableCell align="center">
                        <b>Faculty Name</b>
                      </TableCell>
                      <TableCell align="center">
                        <b>Date</b>
                      </TableCell>
                      <TableCell align="center">
                        <b>Time</b>
                      </TableCell>
                      <TableCell align="center">
                        <b>Note</b>
                      </TableCell>
                      <TableCell align="center">
                        <b>Status</b>
                      </TableCell>
                      <TableCell align="center">
                        <b>Action</b>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row.entries.map((entry, index) => (
                      <TableRow key={entry._id}>
                        <TableCell
                          align="center"
                          sx={{
                            width: "100%",
                            [theme.breakpoints.up("sm")]: {
                              width: "150px",
                            },
                            [theme.breakpoints.up("md")]: {
                              width: "200px",
                            },
                            [theme.breakpoints.up("lg")]: {
                              width: "250px",
                            },
                            [theme.breakpoints.up("xl")]: {
                              width: "300px",
                            },
                          }}
                        >
                          {index + 1}
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{
                            width: "100%",
                            [theme.breakpoints.up("sm")]: {
                              width: "150px",
                            },
                            [theme.breakpoints.up("md")]: {
                              width: "200px",
                            },
                            [theme.breakpoints.up("lg")]: {
                              width: "250px",
                            },
                            [theme.breakpoints.up("xl")]: {
                              width: "300px",
                            },
                          }}
                        >
                          {entry.faculty_name}
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{
                            width: "100%",
                            [theme.breakpoints.up("sm")]: {
                              width: "150px",
                            },
                            [theme.breakpoints.up("md")]: {
                              width: "200px",
                            },
                            [theme.breakpoints.up("lg")]: {
                              width: "250px",
                            },
                            [theme.breakpoints.up("xl")]: {
                              width: "300px",
                            },
                          }}
                        >
                          {moment(entry.date).format("DD-MM-YYYY")}
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{
                            width: "100%",
                            [theme.breakpoints.up("sm")]: {
                              width: "150px",
                            },
                            [theme.breakpoints.up("md")]: {
                              width: "200px",
                            },
                            [theme.breakpoints.up("lg")]: {
                              width: "250px",
                            },
                            [theme.breakpoints.up("xl")]: {
                              width: "300px",
                            },
                          }}
                        >
                          {entry.time}
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{
                            width: "100%",
                            [theme.breakpoints.up("sm")]: {
                              width: "150px",
                            },
                            [theme.breakpoints.up("md")]: {
                              width: "200px",
                            },
                            [theme.breakpoints.up("lg")]: {
                              width: "250px",
                            },
                            [theme.breakpoints.up("xl")]: {
                              width: "300px",
                            },
                          }}
                        >
                          {entry.note}
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{
                            width: "100%",
                            fontWeight: 600,
                            color:
                              entry.status === "Completed"
                                ? "green"
                                : entry.status === "Pending"
                                  ? "skyblue"
                                  : "red",
                            [theme.breakpoints.up("sm")]: {
                              width: "150px",
                            },
                            [theme.breakpoints.up("md")]: {
                              width: "200px",
                            },
                            [theme.breakpoints.up("lg")]: {
                              width: "250px",
                            },
                            [theme.breakpoints.up("xl")]: {
                              width: "300px",
                            },
                          }}
                        >
                          {entry.status}
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{
                            width: "100%",
                            [theme.breakpoints.up("sm")]: {
                              width: "150px",
                            },
                            [theme.breakpoints.up("md")]: {
                              width: "200px",
                            },
                            [theme.breakpoints.up("lg")]: {
                              width: "250px",
                            },
                            [theme.breakpoints.up("xl")]: {
                              width: "300px",
                            },
                          }}
                        >
                          <EditNoteTwoTone
                            sx={{
                              color: "#5559CE",
                              marginRight: "10px",
                              height: "30px",
                              lineHeight: "30px",
                              cursor: "pointer",
                            }}
                            onClick={() => {
                              handleAddDemo(entry, row._id);
                              followModal();
                            }}
                          />
                          <RestoreFromTrashTwoTone
                            sx={{
                              color: "#5559CE",
                              marginRight: "10px",
                              height: "30px",
                              lineHeight: "30px",
                              cursor: "pointer",
                            }}
                            onClick={() => {
                              handleOpenDialog(row, entry._id);
                            }}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
        <Modal
          visible={editOpen}
          onOk={followOk}
          onCancel={followCancel}
          maskClosable={false}
          footer={false}
          width={300}
          className="Follow_modal"
        >
          {Seletedrow && (
            <EditDemo
              myRowId={myRowId}
              entryData={Seletedrow}
              setEditOpen={setEditOpen}
              fetchDemo={fetchDemo}
            />
          )}
        </Modal>
        <ConfirmationDialog
          open={open}
          handleClose={handleCloseDialog}
          title={"Demo"}
          handleDelete={handleDelete}
        />
      </React.Fragment>
    );
  }
  Row.propTypes = {
    row: PropTypes.object.isRequired,
  };

  return (
    <>
      <MainCard className="main_card">
        <Box
          sx={{ border: "1px solid rgb(225, 225, 225)", borderRadius: "10px" }}
        >
          <TableContainer
            component={Paper}
            style={{ maxHeight: "100%", height: "578px", overflow: "auto" }}
          >
            <Table aria-label="collapsible table">
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell align="center">
                    <b>FullName</b>
                  </TableCell>
                  <TableCell align="center">
                    <b>Contact</b>
                  </TableCell>
                  <TableCell align="center">
                    <b>Email</b>
                  </TableCell>
                  <TableCell align="center">
                    <b>Interested In</b>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {demoData.map((data, index) => (
                  <Row key={index} row={data} index={index} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            component="div"
            rowsPerPageOptions={[5, 10, 25]}
            count={demoData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            nextIconButtonProps={{ style: { visibility: "hidden" } }}
            backIconButtonProps={{ style: { visibility: "hidden" } }}
          />
        </Box>
      </MainCard>
    </>
  );
};
export default Index;
