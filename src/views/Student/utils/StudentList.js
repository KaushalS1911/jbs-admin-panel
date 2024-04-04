import MainCard from "ui-component/cards/MainCard";
import SecondaryAction from "ui-component/cards/CardSecondaryAction";
import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import TablePagination from "@mui/material/TablePagination";
import { useState, useEffect } from "react"; // Added import for useEffect
import {
  Avatar,
  Button,
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
} from "@mui/material";
import "flatpickr/dist/themes/material_green.css";
import { useGetAllStudents } from "../../../hooks/useGetAllStudents";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { profile } from "../../../atoms/authAtoms";
import moment from "moment";
import axios from "axios";
import Index from "../Index";

const StudentList = ({ searchText }) => {
  const [profileData, setProfileData] = useRecoilState(profile);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const navigate = useNavigate();
  const location = useLocation();
  const options = ["Running", "Completed", "Leave / Placed"];
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [singleStudent, setSingleStudent] = useState({});
  const [additionalState, setAdditionalState] = useState("");
  const [addDialogOpen, setAddDialogOpen] = useState(false); // Changed variable name for consistency

  const { data, refetch } = useGetAllStudents(
    page + 1,
    rowsPerPage,
    searchText
  );

  useEffect(() => {
    if (selectedStudentId) {
      fetchSingleStudent();
    }
  }, [selectedStudentId]); // Added selectedStudentId to dependency array

  function fetchSingleStudent() {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}${profileData.company_id}/${selectedStudentId}/student`,
        {
          withCredentials: false,
        }
      )
      .then((res) => {
        if (res.status === 200) {
          setSingleStudent(res.data.data.student);
        }
      })
      .catch((err) => {
        console.error(err); // Changed return err.response to console.error
      });
  }

  const handleSelectChange = (params, value) => {
    setAddDialogOpen(true);
    setSelectedStudentId(params.id);
    setAdditionalState(value);
  };

  function handleCloseDialog() {
    setAdditionalState("");
    setAddDialogOpen(false);
    fetchSingleStudent();
  }

  function handleUpdate() {
    setAddDialogOpen(false);
    const payload = { ...singleStudent, status: additionalState };
    axios
      .put(
        `${process.env.REACT_APP_API_URL}${profileData.company_id}/${selectedStudentId}/updateStudent`,
        payload
      )
      .then(() => {
        fetchSingleStudent();
      })
      .catch((error) => {
        console.error(error); // Changed console.log to console.error
      });
  }

  function handleChangePage(event, newPage) {
    setPage(newPage);
  }

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }

  function handleSelectPage(rowsPerPage) {
    console.log(rowsPerPage);
  }

  const handleClick = (id) => {
    location.pathname.includes("fees")
      ? navigate(`/fee-details/${id}`)
      : navigate(`/company/${profileData.company_id}/edit-student/${id}`);
  };

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

  const handleViewClick=(Index)=>{
    console.log(Index);
  }

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
      width: 70,
      renderCell: (params) => {
        const avatarSrc = params?.row?.profile
          ? `${params?.row?.profile}`
          : "assets/images/JBS-IT-Institute-logo.png";
        return (
          <Avatar
            src={avatarSrc}
            style={{ width: "36px", height: "36px", borderRadius: "50%" }}
          />
        );
      },
    },
    {
      field: "studentName",
      headerName: "Student Name",
      width: 225,
      sortable: false,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <Grid
          style={{ color: "#5559CE", cursor: "pointer" }}
          onClick={() => handleClick(params.row.id)} // Changed to params.row.id
        >
          {params.row.studentName}
        </Grid>
      ),
    },
    {
      field: "course",
      headerName: "Course", // Fixed typo
      width: 225,
      sortable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "joiningDate",
      headerName: "Joining Date",
      width: 225,
      sortable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "contact",
      headerName: "Contact",
      width: 225,
      sortable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "email",
      headerName: "Email",
      width: 225,
      sortable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "moreDetails",
      headerName: "More Details",
      width: 225,
      sortable: false,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <Chip
          label="View More"
          style={{ backgroundColor: "#e1e1e1" }} 
          size="small"
          onClick={()=>handleViewClick(params.row)}
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
    ? data?.students.map((item, index) => ({
        id: item._id,
        srNo: index + 1,
        profile: item?.personal_info?.profile_pic,
        status: item.status,
        studentName: `${item.personal_info?.firstName} ${item.personal_info?.lastName}`,
        course: item.personal_info?.course, // Changed to item.personal_info?.course
        joiningDate: moment(item.personal_info?.joining_date).format(
          "YYYY-MM-DD"
        ),
        contact: item.personal_info?.contact,
        email: item.personal_info?.email,
        moreDetails: "view more",
      }))
    : [];

  return (
    <>
      <MainCard
        secondary={
          <SecondaryAction link="https://next.material-ui.com/system/typography/" />
        }
      >
        <>
          <div
            style={{
              width: "100%",
              height: "570px",
              maxHeight: "100%",
            }}
          >
            <DataGrid
              rows={rows}
              columns={columns}
              pagination
              pageSize={rowsPerPage}
              onPageChange={handleChangePage}
              rowCount={rows.length}
              checkboxSelection
              disableRowSelectionOnClick
              disableColumnMenu
              hideFooter={true}
              headerClassName="custom-header-class"
              sx={{
                "& .MuiDataGrid-columnHeaders": {
                  backgroundColor: "#ede7f6",
                  fontSize: 14,
                  color: "#262626",
                },
              }}
            />
          </div>
          <Dialog
            open={addDialogOpen}
            onClose={handleCloseDialog}
            sx={{ width: "300px" }}
          >
            <DialogContent sx={{ fontSize: "18px" }}>
              <Typography sx={{ textAlign: "center" }}>
                Are you sure you want to change status?
              </Typography>
            </DialogContent>
            <DialogActions
              sx={{
                textAlign: "center",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button
                onClick={handleCloseDialog}
                variant="contained"
                style={{
                  width: { xs: "150px" },
                  marginLeft: "10px",
                  display: "block",
                  backgroundColor: "#5559CE",
                  color: "#EDE7F6",
                }}
              >
                Cancel
              </Button>
              <Button
                style={{
                  width: { xs: "150px" },
                  marginLeft: "10px",
                  display: "block",
                  backgroundColor: "#EDE7F6",
                  color: "#5559CE",
                }}
                onClick={handleUpdate} // Removed unnecessary parameter
              >
                Update
              </Button>
            </DialogActions>
          </Dialog>
          <TablePagination
            component="div"
            count={data?.totalStudents}
            rowsPerPage={rowsPerPage}
            page={page}
            onChange={handleSelectPage}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[10, 20, 50, 100]}
          />
        </>
      </MainCard>
    </>
  );
};

export default StudentList;
