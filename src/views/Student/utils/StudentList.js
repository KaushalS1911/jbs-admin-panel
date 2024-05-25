import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
    Avatar,
    Chip,
    Dialog,
    DialogActions,
    DialogContent,
    FormControl,
    Grid,
    ListItemText,
    MenuItem,
    Select,
    Typography,
    Button,
    TablePagination,
} from "@mui/material";
import { Modal } from "antd";
import "flatpickr/dist/themes/material_green.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import moment from "moment";
import axios from "axios";

import { profile } from "../../../atoms/authAtoms";
import noDataImg from "../../../assets/images/no data found.png";
import { useGetAllStudents } from "hooks/useGetAllStudents";
import { useGetSingleStudent } from "../../../hooks/useGetSingleStudent";
import useNotification from "../../../hooks/useNotification";
import ExamForm from "./ExamForm";

const StudentList = ({ searchText, onSelectRow }) => {
    const user = useRecoilValue(profile);
    const [selectedRow, setSelectedRow] = useState(null);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const navigate = useNavigate();
    const location = useLocation();
    const options = ["Running", "Completed", "Leave / Placed"];
    const [selectedStudentId, setSelectedStudentId] = useState(null);
    const [additionalState, setAdditionalState] = useState("");
    const [selectedRows, setSelectedRows] = useState([]);
    const [addDialogOpen, setAddDialogOpen] = useState(false);
    const [examinationOpen, setExaminationOpen] = useState(false);
    const { data, refetch } = useGetAllStudents(page + 1, rowsPerPage, searchText);
    const { data: singleStudent, refetch: refetchSingleStudent } = useGetSingleStudent(selectedStudentId);
    const openNotificationWithIcon = useNotification();

    useEffect(() => {
        if (selectedStudentId) {
            refetchSingleStudent(selectedStudentId);
        }
    }, [selectedStudentId]);

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            refetch();
        }, searchText ? 1000 : 0);
        return () => clearTimeout(delayDebounceFn);
    }, [searchText, rowsPerPage, page]);

    const handlePageChange = (event, newPage) => {
        setPage(newPage);
    };

    const handleRowsPerPageChange = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleRowClick = (id) => {
        const path = location.pathname.includes("fees")
            ? `/fee-details/${id}`
            : `/company/${user.company_id}/edit-student/${id}`;
        navigate(path);
    };

    const handleSelectChange = (params, value) => {
        setAddDialogOpen(true);
        setSelectedStudentId(params.id);
        setAdditionalState(value);
    };

    const handleDialogClose = () => {
        setAdditionalState("");
        setAddDialogOpen(false);
        refetchSingleStudent(selectedStudentId);
    };

    const handleUpdate = async () => {
        const payload = { ...singleStudent, status: additionalState };
        try {
            await axios.put(`${process.env.REACT_APP_API_URL}${user.company_id}/${selectedStudentId}/updateStudent`, payload);
            refetch(page + 1, rowsPerPage, searchText);
            openNotificationWithIcon("success", "Student status updated successfully.");
            setAddDialogOpen(false);
        } catch (error) {
            openNotificationWithIcon("error", error.response.data.message);
        }
    };

    const columns = [
        {
            field: "srNo",
            headerName: "Sr No",
            width: 70,
            disableColumnMenu: true,
            sortable: false,
            headerAlign: "center",
            align: "center",
        },
        {
            field: "profile",
            headerName: "Profile",
            sortable: false,
            width: 60,
            renderCell: (params) => (
                <Avatar src={params.row.profile || "assets/images/JBS-IT-Institute-logo.png"} style={{ width: "36px", height: "36px", borderRadius: "50%" }} />
            ),
        },
        {
            field: "EnrollNo",
            headerName: "Enroll No",
            width: 70,
            disableColumnMenu: true,
            sortable: false,
            headerAlign: "center",
            align: "center",
        },
        {
            field: "studentName",
            headerName: "Student Name",
            width: 300,
            sortable: false,
            headerAlign: "center",
            align: "center",
            renderCell: (params) => (
                <Grid style={{ color: "#5559CE", cursor: "pointer", fontSize: "16px", fontWeight: 500 }} onClick={() => handleRowClick(params.row.id)}>
                    {params.row.studentName}
                </Grid>
            ),
        },
        {
            field: "course",
            headerName: "Course",
            width: 225,
            sortable: false,
            headerAlign: "center",
            align: "center",
        },
        {
            field: "joiningDate",
            headerName: "Joining Date",
            width: 170,
            sortable: false,
            headerAlign: "center",
            align: "center",
            renderCell: (params) => moment(params.row.joiningDate).format("YYYY-MM-DD"),
        },
        {
            field: "contact",
            headerName: "Contact",
            width: 170,
            sortable: false,
            headerAlign: "center",
            align: "center",
        },
        {
            field: "moreDetails",
            headerName: "More Details",
            width: 120,
            sortable: false,
            headerAlign: "center",
            align: "center",
            renderCell: (params) => (
                <Chip label="View More" style={{ backgroundColor: "#d7d7d7" }} size="small" onClick={() => navigate(`/company/${user.company_id}/viewmore-student/${params.row.id}`)} />
            ),
        },
        {
            field: "Exams",
            headerName: "Exams",
            width: 100,
            sortable: false,
            headerAlign: "center",
            align: "center",
            renderCell: (item) => (
                <Chip label="Exams" style={{ backgroundColor: "#d7d7d7" }} size="small" onClick={() => handleAddExam(item.row.id)} />
            ),
        },
        {
            field: "status",
            headerName: "Status",
            width: 225,
            sortable: false,
            headerAlign: "center",
            align: "center",
            renderCell: (params) => (
                <FormControl fullWidth>
                    <Select id="type" name="type" value={params.row.status} style={{ height: "35px", padding: "0px" }} onChange={(e) => handleSelectChange(params, e.target.value)}>
                        {options.map((option) => (
                            <MenuItem key={option} value={option}>
                                <ListItemText primary={option} />
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            ),
        },
    ];

    const rows = data?.students
        ? data.students
            .filter((item) => item.status !== "Completed")
            .map((item, index) => ({
                id: item._id,
                srNo: index + 1,
                EnrollNo: item?.enrollment_no,
                profile: item?.personal_info?.profile_pic,
                status: item.status,
                studentName: `${item.personal_info?.firstName} ${item.personal_info?.lastName}`,
                course: item.personal_info?.course,
                joiningDate: item.personal_info?.joining_date,
                contact: item.personal_info?.contact,
                moreDetails: "view more",
                Exams: "Exam",
            }))
        : [];

    const handleSelectionModelChange = (selectionModel) => {
        setSelectedRows(selectionModel);
        onSelectRow(selectionModel);
    };

    const handleAddExam = (id) => {
        setSelectedRow(id);
        setExaminationOpen(true);
    };

  useEffect(() => {
    if (selectedStudentId) {
      fetchSingleStudent();
    }
  }, []);

  function handleChangePage(event, newPage) {
    setPage(newPage);
  }

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }

  const handleClick = (id) => {
    location.pathname.includes("fees")
      ? navigate(`/fee-details/${id}`)
      : navigate(`/company/${profileData.company_id}/edit-student/${id}`);
  };

  //Vire-more-student
  function handleViewmoreStudent(id) {
    navigate(`/company/${profileData.company_id}/viewmore-student/${id}`);
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
  }, [searchText, rowsPerPage, page]);

  const columns = [
    {
      field: "srNo",
      headerName: "Sr No",
      width: 70,
      disableColumnMenu: true,
      sortable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "profile",
      headerName: "Profile",
      sortable: false,
      width: 100,
      renderCell: (params) => {
        const avatarSrc = params?.row?.profile
          ? `${params?.row?.profile}`
          : "assets/images/JBS-IT-Institute-logo.png";
        return (
          <Avatar
            src={avatarSrc}
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "50%",
            }}
          />
        );
      },
    },
    {
      field: "EnrollNo",
      headerName: "Enroll No",
      width: 100,
      disableColumnMenu: false,
      headerAlign: "center",
      align: "center",
      sortable: true,
      filterable: false, 
    },
    {
      field: "studentName",
      headerName: "Student Name",
      width: 300,
      sortable: false,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <Grid
          style={{
            color: "#5559CE",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: 500,
          }}
        >
          {params.row.studentName}
        </Grid>
      ),
    },
    {
      field: "course",
      headerName: "course",
      width: 225,
      sortable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "joiningDate",
      headerName: "Joining Date",
      width: 170,
      sortable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "contact",
      headerName: "Contact",
      width: 170,
      sortable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "moreDetails",
      headerName: "More Details",
      width: 120,
      sortable: false,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <Chip
          label="View More"
          STYLE={{ backgroundColor: "#262626" }}
          size="small"
          onClick={() => handleViewmoreStudent(params.row.id)}
        />
      ),
    },
    {
      field: "Exams",
      headerName: "Exams",
      width: 100,
      sortable: false,
      headerAlign: "center",
      align: "center",
      renderCell: (item) => (
        <Chip
          label="Exams"
          onClick={() => {
            handleAddExam(item.row.id);
            examModalOpen();
          }}
          STYLE={{ backgroundColor: "#262626" }}
          size="small"
        />
      ),
    },
    {
      field: "status",
      headerName: "Status",
      width: 225,
      sortable: false,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <FormControl fullWidth>
          <Select
            id="type"
            name="type"
            value={params?.row?.status}
            style={{ height: "35px", padding: "0px" }}
            InputLabelProps={{
              style: { color: "#5559CE" },
            }}
            onChange={(e) => handleSelectChange(params, e.target.value)}
          >
            {options.map((option) => (
              <MenuItem key={option} value={option}>
                <ListItemText primary={option} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      ),
    },
  ];

  const rows = data?.students
  ? data.students
      .filter((item) => item.status !== "Completed")
      .sort((a, b) => a.enrollment_no - b.enrollment_no)
      .map((item, index) => ({
        id: item._id,
        srNo: index + 1,
        EnrollNo: item?.enrollment_no,
        profile: item?.personal_info?.profile_pic,
        status: item.status,
        studentName: (
          <Grid
            style={{ cursor: "pointer", textDecoration: "none" }}
            onClick={() => handleClick(item._id)}
          >
            {item.personal_info?.firstName} {item.personal_info?.lastName}
          </Grid>
        ),
        course: item.personal_info?.course,
        joiningDate: moment(item.personal_info?.joining_date).format(
          "YYYY-MM-DD"
        ),
        contact: item.personal_info?.contact,
        moreDetails: "view more",
        Exams: "Exam",
      }))
  : [];


  function handleSelectionModelChange(selectionModel) {
    setSelectedRows(selectionModel);
    onSelectRow(selectionModel);
  }


  return (
    <>
      <div
        style={{
          width: "100%",
          height: "578px",
          maxHeight: "100%",
        }}
      >
        {rows.length > 0 ? (
          <DataGrid
            rows={rows}
            columns={columns}
            pagination
            pageSize={rowsPerPage}
            onPageChange={handleChangePage}
            rowCount={rows.length}
            checkboxSelection={profileData.role !== "Student"}
            disableRowSelectionOnClick
            disableColumnMenu
            onRowSelectionModelChange={handleSelectionModelChange}
            hideFooter={true}
            sx={{
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: "#ede7f6",
                fontSize: 14,
                color: "#262626",
              },
              overflow: "scroll",
              height: "100%",
              "&::-webkit-scrollbar": {
                width: "0.4em",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#888",
              },
              "&::-webkit-scrollbar-thumb:hover": {
                background: "#555",
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
                style={{ maxWidth: "600px", width: "100%" }}
              />
    return (
        <>
            <div style={{ width: "100%", height: "578px", maxHeight: "100%" }}>
                {rows.length > 0 ? (
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pagination
                        pageSize={rowsPerPage}
                        onPageChange={handlePageChange}
                        rowCount={rows.length}
                        checkboxSelection={user.role !== "Student"}
                        disableRowSelectionOnClick
                        disableColumnMenu
                        onRowSelectionModelChange={handleSelectionModelChange}
                        hideFooter
                        sx={{
                            "& .MuiDataGrid-columnHeaders": {
                                backgroundColor: "#ede7f6",
                                fontSize: 14,
                                color: "#262626",
                            },
                            overflow: "scroll",
                            height: "100%",
                            "&::-webkit-scrollbar": {
                                width: "0.4em",
                            },
                            "&::-webkit-scrollbar-thumb": {
                                backgroundColor: "#888",
                            },
                            "&::-webkit-scrollbar-thumb:hover": {
                                background: "#555",
                            },
                        }}
                    />
                ) : (
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <img src={noDataImg} alt="no data" loading="lazy" style={{ maxWidth: "600px", width: "100%" }} />
                    </div>
                )}
            </div>
            <TablePagination
                rowsPerPageOptions={[10, 20, 50, 100]}
                component="div"
                count={data?.totalStudents - data?.students?.filter((student) => student.status === "Completed").length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
            />

            <Dialog open={addDialogOpen} onClose={handleDialogClose} sx={{ width: "300px" }}>
                <DialogContent sx={{ fontSize: "18px" }}>
                    <Typography sx={{ textAlign: "center" }}>Are you sure you want to change status?</Typography>
                </DialogContent>
                <DialogActions sx={{ textAlign: "center", justifyContent: "center", alignItems: "center" }}>
                    <Button style={{ width: "150px", marginLeft: "10px", display: "block", backgroundColor: "#EDE7F6", color: "#5559CE" }} onClick={handleUpdate}>
                        Yes
                    </Button>
                    <Button onClick={handleDialogClose} variant="contained" style={{ width: "150px", marginLeft: "10px", display: "block", backgroundColor: "#5559CE", color: "#EDE7F6" }}>
                        No
                    </Button>
                </DialogActions>
            </Dialog>

            <Modal open={examinationOpen} onCancel={() => setExaminationOpen(false)} maskClosable={false} footer={false} width={400}>
                <Typography sx={{ fontSize: "1.5rem", color: "#5559CE", textAlign: "center", paddingBottom: "20px" }} variant="h4">
                    Exam Information
                </Typography>
                <ExamForm id={selectedRow} setExaminationOpen={setExaminationOpen} />
            </Modal>
        </>
    );
};

export default StudentList;
