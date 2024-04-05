import React, { useEffect } from "react";
import {
  Button,
  FormControl,
  Grid,
  TextField,
  TablePagination,
  Avatar,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import MainCard from "ui-component/cards/MainCard";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";
import { RestoreFromTrashTwoTone } from "@mui/icons-material";
import Mainbreadcrumbs from "contants/Mainbreadcrumbs";
import { useGetAllEmployees } from "../../hooks/useGetAllEmployees";
import axios from "axios";
import { useRecoilState } from "recoil";
import { profile } from "../../atoms/authAtoms";
import { notification } from "antd";
import noDataImg from "../../assets/images/no data found.png";


const Employee = () => {
  //notification
  const openNotificationWithIcon = (type, message) => {
    notification[type]({
      message: message,
    });
  };
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(0);
  const [selectedRows, setSelectedRows] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const user = useRecoilState(profile);
  //Employee Data Fetch
  const { data: Employees, refetch } = useGetAllEmployees(
    page + 1,
    rowsPerPage,
    searchText
  );
  //Emplooyee Add
  const EmployeeAdd = () => {
    navigate("/add-employee");
  };

  useEffect(() => {
    refetch();
  }, [page, rowsPerPage, searchText]);

  //Employee edit
  const EmployeeEdit = (id) => {
    navigate(`/edit-employee/${id}`);
  };
  
  //Per page pagination
  function handleChangePage(_, newPage) {
    setPage(newPage);
  }
  function handleChangeRowsPerPage(event) {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }
  //Employee Column
  const columns = [
    { field: "srNo", headerName: "Sr No", width: 65 },
    {
      field: "avatar_url",
      headerName: "Profile",
      sortable: false,
      width: 70,
      renderCell: (params) => {
        const avatarSrc = params.row.avatar_url
          ? `${params.row.avatar_url}`
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
      field: "employeeName",
      headerName: "Employee Name",
      width: 160,
      sortable: false,
      headerAlign: "left",
      align: "left",
      renderCell: (params) => (
        <Grid style={{ color: "#5559CE", cursor: "pointer" }}>
          {params.row.employeeName}
        </Grid>
      ),
    },
    { field: "contact", headerName: "Contact", width: 150 },
    { field: "email", headerName: "Email", width: 170 },
    { field: "gender", headerName: "Gender", width: 100 },
    { field: "role", headerName: "Role", width: 100 },
    { field: "qualification", headerName: "Qualification", width: 120 },
    { field: "technology", headerName: "Technology", width: 160 },
    { field: "experience", headerName: "Experience", width: 100 },
    { field: "dob", headerName: "Date of Birth", width: 150 },
    { field: "joiningDate", headerName: "Joining date", width: 150 },
  ];

  //Employee Row
  const rows = Employees
    ? Employees.employees.map((item, index) => {
        return {
          id: item._id,
          srNo: index + 1,
          avatar_url: item.avatar_url,
          employeeName: (
            <Grid
              style={{ cursor: "pointer", textDecoration: "none" }}
              onClick={() => EmployeeEdit(item._id)}
            >
              {item.firstName} {item.lastName}
            </Grid>
          ),
          contact: item.contact,
          email: item.email,
          gender: item.gender,
          role: item.role,
          qualification: item.qualification,
          technology: item.technology,
          experience: item.experience,
          dob: moment(item.dob).format("DD-MM-YYYY"),
          joiningDate: moment(item.joining_date).format("DD-MM-YYYY"),
        };
      })
    : [];

  //Delete EMployee
  const handleSelectionModelChange = (selectionModel) => {
    setSelectedRows(selectionModel);
  };

  const deletedAllEmployee = async () => {
    if (selectedRows.length > 0) {
      try {
        const apiEndpoint = `${process.env.REACT_APP_API_URL}${user?.company_id}/delete/all-employee`;
        const response = await axios.delete(apiEndpoint, {
          data: { ids: selectedRows },
        });
        openNotificationWithIcon("success", response.data.data.message);
        refetch();
      } catch (error) {
        console.log("Error deleting employees:", error);
      }
    }
  };

  return (
    <>
      <Mainbreadcrumbs title={"Employee"} />
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
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid item lg={4} md={12} xs={12} sm={12}>
              <Grid item>
                <TextField
                  item
                  label="Search"
                  fullWidth
                  size="small"
                  style={{ width: "100%", minWidth: "220px", margin: "auto" }}
                  variant="outlined"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  InputLabelProps={{
                    style: { color: "#5559CE", marginBottom: "0" },
                  }}
                />
              </Grid>
            </Grid>

            <Grid
            display={{ xs: "flex", sm: "flex", md: "flex", lg: "flex" }}
              justifyContent={{
                xs: "normal",
                sm: "space-between",
                md: "space-between",
                lg: "flex-end",
              }}
              flexDirection={{ xs: "column", sm: "row", md: "row", lg: "row" }}
              alignItems={"center"}
              lg={8}
              md={12}
              xs={12}
              sm={12}
            >
              <Grid style={{ marginLeft: "4px" }}>
                <Button
                  variant="outlined"
                  onClick={EmployeeAdd}
                  style={{
                    color: "#5e35b1",
                    border: "none",
                    lineHeight: "35px",
                    height: "35px",
                    backgroundColor: "#D9DAF9",
                    margin: " 0px 10px 0px 10px ",
                  }}
                  startIcon={
                    <AddCircleOutlineIcon
                      style={{
                        fontSize: "22px",
                        marginRight: "3px",
                        color: "#5e35b1",
                      }}
                    />
                  }
                >
                  Add 
                </Button>
                <Button
                  startIcon={
                    <RestoreFromTrashTwoTone
                      style={{
                        fontSize: "22px",
                        marginRight: "px",
                        color: "#ede7f6",
                      }}
                    />
                  }
                  onClick={deletedAllEmployee}
                  sx={{
                    backgroundColor: "#5559CE",
                    color: "#fff",
                    height: "35px",
                    lineHeight: "35px",
                    marginRight:"10px",
                    "&:hover": { color: "#ede7f6", backgroundColor: "#5559CE" },
                  }}
                >
                  Delete
                </Button>
              </Grid>
            </Grid>

          </Grid>

        </FormControl>
      </MainCard>

      <MainCard sx={{ margin: "20px 0" }}>
      <>
        {
          rows.length>0 ?(
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
            pageSizeOptions={[10, 15, 25, 50]}
            checkboxSelection
            disableRowSelectionOnClick
            disableColumnMenu
            rowCount={rows.length}
            onPageChange={handleChangePage}
            hideFooter={true}
            onRowSelectionModelChange={handleSelectionModelChange}
            sx={{
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: "#ede7f6",
                fontSize: 14,
                color: "#262626",
              },
            }}
          />
        </div>
          ):
          (
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
          )
        }
      </>
       
        <TablePagination
          component="div"
          count={Employees?.total}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[10, 20, 50, 100]}
        />
      </MainCard>
    </>
  );
};

export default Employee;
