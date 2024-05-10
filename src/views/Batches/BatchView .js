import React, { useEffect, useState } from "react";
import { Button, FormControl, Grid, TextField } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useParams } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import { notification } from "antd";
import {
  DeleteOutline as DeleteOutlineIcon,
  RestoreFromTrashTwoTone,
} from "@mui/icons-material";
import MainCard from "ui-component/cards/MainCard";
import ConfirmationDialog from "Extracomponent/ConfirmationDialog";
import { gridSpacing } from "store/constant";
import Mainbreadcrumbs from "contants/Mainbreadcrumbs";
import noDataImg from "../../assets/images/no data found.png";

const BatchView = () => {
  const { id } = useParams();
  const [batchview, setBatchviewData] = useState([]);
  const [batchData, setBatchdata] = useState([]);
  const [entryId, setentryId] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const apiEndpoint = `${process.env.REACT_APP_API_URL}${user.company_id}/${id}/batch`;
      const response = await axios.get(apiEndpoint);
      setBatchdata(response.data.data.batch.batch_members);
      setBatchviewData(response.data.data.batch.batch_members.batch_members);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleOpenConfirmationDialog = (id) => {
    setentryId(id);
    setOpen(true);
  };

  const handleCloseConfirmationDialog = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const apiEndpoint = `${process.env.REACT_APP_API_URL}${user.company_id}/${id}/${entryId}/deleteBatch`;
      const response = await axios.delete(apiEndpoint);
      openNotificationWithIcon("success", response.data.data.message);
      fetchData();
      handleCloseConfirmationDialog();
    } catch (error) {
      console.error("Error deleting data:", error);
      openNotificationWithIcon("error", error.response.data.message);

    }
  };

  const openNotificationWithIcon = (type, message) => {
    notification[type]({
      message: message,
    });
  };

  const handleSelectionModelChange = (selectionModel) => {
    setSelectedRows(selectionModel);
  };

  const deleteAllbatchstudent = async () => {
    if (selectedRows.length > 0) {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const apiEndpoint = `${process.env.REACT_APP_API_URL}${user.company_id}/${id}/delete-members`;
        const response = await axios.delete(apiEndpoint, {
          data: { entryIds: selectedRows },
        });
        openNotificationWithIcon("success", response.data.data.message);
        fetchData();
      } catch (error) {
        console.log("Error deleting employees:", error);
        openNotificationWithIcon("error", error.response.data.message);

      }
    }
  };

  const rows = batchview.map((item, index) => ({
    rowId: item._id,
    id: item._id,
    srNo: index + 1,
    firstName: item.firstName,
    lastName: item.lastName,
    contact: item.contact,
    couRse: item.course,
    joiningDate: moment(item.joining_date).format("DD-MM-YYYY"),
  }));

  const columns = [
    {
      field: "srNo",
      headerName: "srNo",
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
          onClick={() => handleOpenConfirmationDialog(params.row.id)}
        />
      ),
    },
  ];

  return (
    <>
      <Mainbreadcrumbs
        title={
          batchData.technology +
          " " +
          "(" +
          moment(batchData.batch_time).format("LL") +
          ")"
        }
        subtitle={"batch-members"}
      />
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
                  onClick={deleteAllbatchstudent}
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
              checkboxSelection
              disableRowSelectionOnClick
              disableColumnMenu
              hideFooterSelectedRowCount={true}
              hideFooterPagination={false}
              onRowSelectionModelChange={handleSelectionModelChange}
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
