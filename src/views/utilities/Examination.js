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
import { useTheme } from "@mui/material/styles";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import TablePagination from "@mui/material/TablePagination";
import Mainbreadcrumbs from "contants/Mainbreadcrumbs";

const Examination = () => {
  const theme = useTheme();
  const [examData, setexamData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const user = JSON.parse(localStorage.getItem("user"));
  const fetchDemo = async () => {
    const apiEndpoint = `${process.env.REACT_APP_API_URL}${user.company_id}/student?limit=${rowsPerPage}&page=${page + 1}`;
    try {
      const response = await axios.get(apiEndpoint);
      setexamData(response.data.data.students);
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

  function Row(props) {
    const { row } = props;
    const [opendrop, setOpendrop] = React.useState(false);

    return (
      <>
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
          {row?.personal_info.firstName} {row.personal_info.lastName}

          </TableCell>
          <TableCell align="center">{row?.personal_info.contact}</TableCell>
          <TableCell align="center">{row?.personal_info.email}</TableCell>
          <TableCell align="center">{row?.personal_info.course}</TableCell>
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
                  <b style={{ fontSize: "22px" }}>Exam Details</b>
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">
                        <b>Sr No</b>
                      </TableCell>
                      <TableCell align="center">
                        <b>Title</b>
                      </TableCell>
                      <TableCell align="center">
                        <b>Conduct by</b>
                      </TableCell>
                      <TableCell align="center">
                        <b>Total Marks</b>
                      </TableCell>
                      <TableCell align="center">
                        <b>Obtain Marks</b>
                      </TableCell>
                      <TableCell align="center">
                        <b>Description</b>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row.exam_info.map((entry, index) => (
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
                          {entry?.title}
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
                          {entry?.conducted_by}
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
                          {entry?.total_marks}
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
                          {entry?.obtained_marks}
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{
                            width: "100%",
                            fontWeight: 600,
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
                          {entry?.desc}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </>
    );
  }
  Row.propTypes = {
    row: PropTypes.object.isRequired,
  };

  return (
    <>
      <Mainbreadcrumbs title={"Examination"} />
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
                    <b>Course</b>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {examData.map((data, index) => (
                  <Row key={index} row={data} index={index} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={examData?.length || 0}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Box>
      </MainCard>
    </>
  );
};
export default Examination;