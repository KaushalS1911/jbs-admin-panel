import { useState } from "react";
import MainCard from "ui-component/cards/MainCard";
import { Button, FormControl, Grid, TextField } from "@mui/material";
import { Box } from "@mui/system";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import "flatpickr/dist/themes/material_green.css";
import { gridSpacing } from "store/constant";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { DataGrid } from "@mui/x-data-grid";
import { Chip } from "@mui/material";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import axios from "axios";
import moment from "moment";
import Batchform from "./Batchform";
import { Modal, message } from "antd";
import BatchEdit from "./BatchEdit";
import ConfirmationDialog from "Extracomponent/ConfirmationDialog";
import Mainbreadcrumbs from "contants/Mainbreadcrumbs";
import { EditNoteTwoTone, RestoreFromTrashTwoTone } from "@mui/icons-material";

function Batch() {
  const navigate = useNavigate();
  /* eslint-disable */
  const [searchText, setSearchText] = useState("");
  const [batches, setBatches] = useState([]);
  const [batchId, setBatchId] = useState("");
  const [open, setOpen] = useState(false);
  const [showAddBatchDialog, setShowAddBatchDialog] = useState(false);
  const [showEditBatchDialog, setShowEditBatchDialog] = useState(false);
  const [batchData, setBatchData] = useState({});

  // add batch model open

  const handleCloseAddBatchDialog = () => {
    setShowAddBatchDialog(false);
  };

  const handleCloseEditBatchDialog = () => {
    setShowEditBatchDialog(false);
  };

  // edit batch model open

  function handleBatch(params) {
    setBatchData(params);
  }

  // delete model

  const handleOpenConfirmationDialog = (id) => {
    setBatchId(id);
    setOpen(true);
  };
  const handleCloseConfirmationDialog = () => {
    setOpen(false);
  };

  const Batchview = (id) => {
    navigate(`/batch-student/${id}`);
  };

  const user = JSON.parse(localStorage.getItem("user"));

  const fetchData = async () => {
    const searchParam = searchText ? `?searchKey=${searchText}` : "";
    const apiEndpoint = `${process.env.REACT_APP_API_URL}${user.company_id}/batch${searchParam}`;
    try {
      const response = await axios.get(apiEndpoint);

      setBatches(response.data.data.batches);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (searchText !== "") {
      const delayDebounceFn = setTimeout(() => {
        fetchData();
      }, 1000);
      return () => clearTimeout(delayDebounceFn);
    } else {
      fetchData();
    }
  }, [searchText]);

  const handleDelete = async () => {
    const apiEndpoint = `${process.env.REACT_APP_API_URL}${user.company_id}/${batchId}/deleteBatch`;
    let apiMessage;
    try {
      const response = await axios.delete(apiEndpoint);
      if (response.status === 200) {
        fetchData();
        message.success(apiMessage);
      } else {
        console.error("Deletion failed");
      }
    } catch (error) {
      console.error("Error deleting data:", error);
      message.error("Failed to delete batch. Please try again.");
    } finally {
      handleCloseConfirmationDialog();
    }
  };

  const rows = batches
    ? batches.map((item, index) => ({
      rowId: item._id,
      id: index + 1,
      technology: item.technology,
      batch_time: item.batch_time,
      note: item.note,
      lab_name: item.lab_name,
      batch_members: item.batch_members,
    }))
    : [];

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 40,
      disableColumnMenu: true,
      sortable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "technology",
      headerName: "Technology",
      width: 200,
      sortable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "batch_time",
      headerName: "Batch Time",
      width: 200,
      sortable: false,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        const formattedDate = moment(params.value).format("hh:mm A");
        return <div>{formattedDate}</div>;
      },
    },
    {
      field: "lab_name",
      headerName: "Lab Name",
      width: 200,
      sortable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "note",
      headerName: "Note",
      width: 200,
      sortable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "moreDetails",
      headerName: "More Details",
      width: 200,
      sortable: false,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <Chip
          label="View Student"
          size="small"
          onClick={() => {
            Batchview(params.row.rowId);
          }}
          KeyboardDoubleArrowRightIcon={<KeyboardDoubleArrowRightIcon />}
        />
      ),
    },
    {
      field: "action",
      headerName: "Action",
      width: 230,
      sortable: false,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <div>
          <EditNoteTwoTone
            sx={{
              color: "#b0b2e8",
              height: "35px",
              lineHeight: "35px",
              margin: "0 20px",
              cursor: "pointer",
              fontSize: "30px",
            }}
            onClick={() => {
              handleBatch(params.row);
              setShowEditBatchDialog(true);
            }}
          />
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
            }}
          />
        </div>
      ),
    },
  ];

  return (
    <>
      <Mainbreadcrumbs title={"Batches"} />
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
                    color: "#5e35b1",
                    border: "none",
                    lineHeight: "35px",
                    height: "35px",
                    backgroundColor: "#D9DAF9",
                    margin: " 0px 10px 0px 10px ",
                  }}
                  onClick={() => {
                    setShowAddBatchDialog(true);
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
                  sx={{
                    backgroundColor: "#5559CE",
                    color: "#fff",
                    marginRight: "10px",
                    height: "35px",
                    lineHeight: "35px",
                    "&:hover": { Color: "#5559CE", backgroundColor: "#5559CE" },
                  }}
                  startIcon={
                    <RestoreFromTrashTwoTone
                      style={{ fontSize: "22px", marginRight: "3px" }}
                    />
                  }
                >
                  Delete
                </Button>
              </Grid>
            </Grid>

          </Grid>

        </FormControl>
      </MainCard>
      <MainCard sx={{ margin: "20px 0" }}>
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
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: "#ede7f6",
                fontSize: 14,
                color: "#262626",
              },
            }}
          />
        </div>
      </MainCard>
      <Modal
        open={showAddBatchDialog}
        onCancel={handleCloseAddBatchDialog}
        maskClosable={false}
        footer={false}
        width={300}
        className="Follow_modal"
      >
        <Batchform
          setIsBatchOpen={setShowAddBatchDialog}
          fetchData={fetchData}
        />
      </Modal>
      <Modal
        open={showEditBatchDialog}
        onCancel={handleCloseEditBatchDialog}
        maskClosable={false}
        footer={false}
        width={300}
        className="Follow_modal"
      >
        <BatchEdit
          batchData={batchData}
          fetchData={fetchData}
          setIsBatcheditOpen={setShowEditBatchDialog}
          setShowEditBatchDialog={setShowEditBatchDialog}
        />
      </Modal>

      <ConfirmationDialog
        open={open}
        handleClose={handleCloseConfirmationDialog}
        title={"Batch"}
        handleDelete={handleDelete}
      />
    </>
  );
}

export default Batch;
