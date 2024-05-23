import React, { useState, useEffect } from "react";
import MainCard from "ui-component/cards/MainCard";
import { DataGrid } from "@mui/x-data-grid";
import {
  Button,
  FormControl,
  Grid,
  TablePagination,
  TextField,
} from "@mui/material";
import { Modal, notification } from "antd";
import Chip from "@mui/material/Chip";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import Follow from "./Follow";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import "flatpickr/dist/themes/material_green.css";
import { gridSpacing } from "store/constant";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteAllInquiry } from "store/slices/inquiryslice";
import { profile } from "../../atoms/authAtoms";
import { useRecoilState } from "recoil";
import { RestoreFromTrashTwoTone } from "@mui/icons-material";
import { useGetAllInquiries } from "../../hooks/useGetAllinquiries";
import Mainbreadcrumbs from "contants/Mainbreadcrumbs";
import noDataImg from "../../assets/images/no data found.png";


const Inquiry = () => {



      //notification
      const openNotificationWithIcon = (type, message) => {
        notification[type]({
          message: message,
        });
      };

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState("");
  const [followOpen, setIsFollowOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [page, setPage] = useState(0);
  const [selectedRows, setSelectedRows] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  /* eslint-disable */
  const [profileData, setProfileData] = useRecoilState(profile);

  const followModal = () => {
    setIsFollowOpen(true);
  };

  const followCancel = () => {
    setIsFollowOpen(false);
  };

  //Inquiry Add
  const InquiryAdd = () => {
    navigate("/add-inquiry");
  };
  //Inquiry Add
  const InquiryEdit = (id) => {
    navigate(`/edit-inquiry/${id}`);
  };
  //Demo Modal
  function handleAddDemo(value) {
    setSelectedRow(value);
    followModal();
  }
  //Pagination Set
  function handleChangePage(event, newPage) {
    setPage(newPage);
  }
  function handleChangeRowsPerPage(event) {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }

  
  //Fetch Data
  const { data: inquiry, refetch } = useGetAllInquiries(
    page + 1,
    rowsPerPage,
    searchText
  );

  //Search Inquiry
  useEffect(() => {
      refetch();
  }, [page, rowsPerPage, searchText]);

  //Inquiry Column
  const columns = [
    {
      field: "srNo",
      headerName: "Sr No",
      width: 80,
      disableColumnMenu: true,
      sortable: false,
      headerAlign: "left",
      align: "left",
    },
    {
      field: "studentName",
      headerName: "Student Name",
      width: 175,
      sortable: false,
      headerAlign: "left",
      align: "left",
      renderCell: (params) => (
        <Grid style={{ color: "#5559CE", cursor: "pointer" }}>
          {params.row.studentName}
        </Grid>
      ),
    },
    {
      field: "technology",
      headerName: "Technology",
      width: 225,
      sortable: false,
      headerAlign: "left",
      align: "left",
    },
    {
      field: "appointment",
      headerName: "Appointment",
      width: 150,
      sortable: false,
      headerAlign: "left",
      align: "left",
    },
    {
      field: "contactNo",
      headerName: "Contact",
      width: 160,
      sortable: false,
      headerAlign: "left",
      align: "left",
    },
    {
      field: "email",
      headerName: "Email",
      width: 225,
      sortable: false,
      headerAlign: "left",
      align: "left",
    },
    {
      field: "Set Demo",
      headerName: "Follow Up",
      width: 225,
      headerAlign: "center",
      align: "center",
      renderCell: (item) => (
        <Chip
          label="Set Demo"
          STYLE={{ backgroundColor: "#262626" }}
          size="small"
          onClick={() => {
            handleAddDemo(item.row.id);
            followModal();
          }}
          KeyboardDoubleArrowRightIcon={<KeyboardDoubleArrowRightIcon />}
        />
      ),
      sortable: false,
    },
  ];
  //Inquiry Row
  const rows = inquiry
    ? inquiry.inquiry.map((item, index) => ({
        srNo: index + 1,
        id: item._id,
        studentName: (
          <Grid
            style={{ cursor: "pointer", textDecoration: "none" }}
            onClick={() => InquiryEdit(item._id)}
          >
            {item.firstName} {item.lastName}
          </Grid>
        ),
        technology: item.interested_in,
        appointment: moment(item.created_at).format("DD-MM-YYYY"),
        contactNo: item.contact,
        email: item.email,
        follow: "Set Demo",
      }))
    : [];

    
  //Multiple Delete Inquiry
  const handleSelectionModelChange = (selectionModel) => {
    setSelectedRows(selectionModel);
  };


  const deletedAllInquiry = async () => {
    if (selectedRows.length > 0) {
      try {
        const response = await dispatch(
          deleteAllInquiry({
            ids: selectedRows,
            companyId: profileData.company_id,
          })
        );
        openNotificationWithIcon("success", response.payload.data.message);
        refetch();
      } catch (error) {
        console.error("Error deleting inquiries:", error.message);
        openNotificationWithIcon("error", response.payload.data.message);
      }
    }
  };

  return (
    <>
      <Mainbreadcrumbs title={"Inquiry"} />

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
            spacing={gridSpacing}
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
              item
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
                  style={{
                    border: "none",
                    lineHeight: "35px",
                    height: "35px",
                    backgroundColor: "#D9DAF9",
                    margin: " 0px 10px 0px 10px ",
                    color: "#5e35b1",
                  }}
                  onClick={InquiryAdd}
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
                        marginRight: "3px",
                        color: "#ede7f6",
                      }}
                    />
                  }
                  onClick={deletedAllInquiry}
                  sx={{
                    backgroundColor: "#5559CE",
                    color: "#fff",
                    marginRight: "10px",
                    height: "35px",
                    lineHeight: "35px",
                    "&:hover": { Color: "#5559CE", backgroundColor: "#5559CE" },
                  }}
                >
                  Delete
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </FormControl>
      </MainCard>

      <MainCard style={{ marginTop: "20px" }}>
        <div
          style={{
            width: "100%",
            height: "570px",
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
              disableRowSelectionOnClick
              rowCount={rows.length}
              checkboxSelection
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
                  style={{ maxWidth: "600px",width:'100%' }}
                />
              </div>
            </>
          )}
        </div>
        <TablePagination
          component="div"
          count={inquiry?.totalStudents}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[10, 20, 50, 100]}
        />
      </MainCard>
      <Modal
        className={"InquiryDemoset"}
        open={followOpen}
        onCancel={followCancel}
        maskClosable={false}
        footer={false}
        width={300}
      >
        <Follow id={selectedRow} setIsFollowOpen={setIsFollowOpen} />
      </Modal>
    </>
  );
};
export default Inquiry;
