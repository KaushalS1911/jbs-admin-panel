import { Button, FormControl, Grid, TextField } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import ConfirmationDialog from "Extracomponent/ConfirmationDialog";
import axios from "axios";
import moment from "moment";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import MainCard from "ui-component/cards/MainCard";
import { notification } from "antd";
import { gridSpacing } from "store/constant";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { RestoreFromTrashTwoTone } from "@mui/icons-material";
import Mainbreadcrumbs from "contants/Mainbreadcrumbs";

const BatchView = () => {
  //notification
  const openNotificationWithIcon = (type, message) => {
    notification[type]({
      message: message,
    });
  };

  var columns;
  const { id } = useParams();
  const [batchview, setBatchviewData] = useState([]);
  const [entryId, setentryId] = useState("");
  const [open, setOpen] = useState(false);

  // delete model
  const handleOpenConfirmationDialog = (id) => {
    setentryId(id);
    console.log("object====>", id);
    setOpen(true);
  };
  const handleCloseConfirmationDialog = () => {
    setOpen(false);
  };
  const user = JSON.parse(localStorage.getItem("user"));

  const fetchData = async () => {
    const apiEndpoint = `${process.env.REACT_APP_API_URL}${user.company_id}/${id}/batch`;
    try {
      const response = await axios.get(apiEndpoint);
      setBatchviewData(response.data.data.batch.batch_members.batch_members);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDelete = async () => {
    const apiEndpoint = `${process.env.REACT_APP_API_URL}${user.company_id}/${id}/${entryId}/deleteBatch`;
    try {
      const response = await axios.delete(apiEndpoint);
      openNotificationWithIcon("success", response.data.data.message);
      fetchData();
      handleCloseConfirmationDialog();
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const rows = batchview
    ? batchview.map((item, index) => ({
        rowId: item._id,
        id: index + 1,
        firstName: item.firstName,
        lastName: item.lastName,
        contact: item.contact,
        couRse: item.course,
        joiningDate: moment(item.joining_date).format("DD-MM-YYYY"),
      }))
    : [];

  columns = [
    {
      field: "id",
      headerName: "ID",
      width: 70,
      disableColumnMenu: true,
      sortable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "firstName",
      headerName: "First Name",
      width: 250,
      sortable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "lastName",
      headerName: "Last Name",
      width: 250,
      sortable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "contact",
      headerName: "Contact",
      width: 250,
      sortable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "couRse",
      headerName: "Course",
      width: 250,
      sortable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "joiningDate",
      headerName: "Joining Date",
      width: 250,
      sortable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      sortable: false,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <RestoreFromTrashTwoTone
          sx={{
            color: "#5559CE",
            height: "35px",
            lineHeight: "35px",
            margin: "0 20px",
            cursor: "pointer",
            fontSize: "30px",
          }}
          onClick={() => {
            handleOpenConfirmationDialog(params.row.rowId);
            console.log("=>>>", params.row.rowId);
          }}
        />
      ),
    },
  ];

  return (
    <>
    <Mainbreadcrumbs title={'Batch'} subtitle={'All Batch Student'}/>

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
                  startIcon={
                    <DeleteOutlineIcon
                      style={{
                        fontSize: "22px",
                        marginRight: "3px",
                        color: "#ede7f6",
                      }}
                    />
                  }
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
          <DataGrid
            rows={rows}
            columns={columns}
            checkboxSelection
            disableRowSelectionOnClick
            disableColumnMenu
            hideFooterSelectedRowCount={true}
            hideFooterPagination={true}
            sx={{
                  ".MuiDataGrid-cell:focus": {
                    outline: "none",
                  },
                  "& .MuiDataGrid-row:hover": {
                    cursor: "pointer",
                  },
                  "& .MuiDataGrid-columnHeaders": {
                    backgroundColor: "#ede7f6",
                    fontSize: 14,
                    color: "#262626",
                  },
                }}
          />
        </div>
      </MainCard>

      <ConfirmationDialog
        open={open}
        handleClose={handleCloseConfirmationDialog}
        title={"student Name"}
        handleDelete={handleDelete}
      />
    </>
  );
};

export default BatchView;
