import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import TablePagination from "@mui/material/TablePagination";
import { useState } from "react";
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
} from "@mui/material";
import "flatpickr/dist/themes/material_green.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { profile } from "../../../atoms/authAtoms";
import { useEffect } from "react";
import moment from "moment";
import noDataImg from "../../../assets/images/no data found.png";
import { useGetAllStudents } from "hooks/useGetAllStudents";
import axios from "axios";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { notification } from "antd";

const StudentList = ({ searchText, onSelectRow }) => {
  // eslint-disable-next-line
  const [profileData, setProfileData] = useRecoilState(profile);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const navigate = useNavigate();
  const location = useLocation();
  const options = ["Running", "Completed", "Leave / Placed"];
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [singleStudent, setSingleStudent] = useState({});
  const [additionalState, setAdditionalState] = useState();
  const [selectedRows, setSelectedRows] = useState([]);
  const [addDialogOpen, setAddDialogOpen] = useState(false);

  const { data, refetch } = useGetAllStudents(
    page + 1,
    rowsPerPage,
    searchText
  );

  const openNotificationWithIcon = (type, message) => {
    notification[type]({
      message: message,
    });
  };

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
        return err.response;
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

  async function handleUpdate() {
    const payload = { ...singleStudent, status: additionalState };
    await axios
      .put(
        `${process.env.REACT_APP_API_URL}${profileData.company_id}/${selectedStudentId}/updateStudent`,
        payload
      )
      .then(() => {
        refetch(page + 1, rowsPerPage, searchText);
        openNotificationWithIcon(
          "success",
          "Student status updated successfully."
        );
      })
      .catch((error) => {
        openNotificationWithIcon("error", error.response.data.message);
      });
    setAddDialogOpen(false);
  }

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
      width: 70,
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
      field: "studentName",
      headerName: "Student Name",
      width: 225,
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
    // {
    //   field: "email",
    //   headerName: "Email",
    //   width: 225,
    //   sortable: false,
    //   headerAlign: "center",
    //   align: "center",
    // },
    {
      field: "moreDetails",
      headerName: "More Details",
      width: 225,
      sortable: false,
      headerAlign: "center",
      align: "center",
      renderCell: () => (
        <Chip
          label="View More"
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
    ? data?.students.map((item, index) => ({
        id: item._id,
        srNo: index + 1,
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
        // email: item.personal_info?.email,
        moreDetails: "view more",
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
            checkboxSelection
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
            </div>
          </>
        )}
      </div>
      <TablePagination
        rowsPerPageOptions={[10, 20, 50, 100]}
        component="div"
        count={data?.totalStudents}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

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
            style={{
              width: { xs: "150px" },
              marginLeft: "10px",
              display: "block",
              backgroundColor: "#EDE7F6",
              color: "#5559CE",
            }}
            onClick={handleUpdate}
          >
            Yes
          </Button>
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
            No
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default StudentList;
