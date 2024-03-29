import { useState } from "react";
import MainCard from "ui-component/cards/MainCard";
import {
  Button,
  FormControl,
  Grid,
  TablePagination,
  TextField,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import "flatpickr/dist/themes/material_green.css";
import { gridSpacing } from "store/constant";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { DataGrid } from "@mui/x-data-grid";
import { Chip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import moment from "moment";
import Batchform from "./Batchform";
import { Modal, notification } from "antd";
import BatchEdit from "./BatchEdit";
import ConfirmationDialog from "Extracomponent/ConfirmationDialog";
import Mainbreadcrumbs from "contants/Mainbreadcrumbs";
import { EditNoteTwoTone, RestoreFromTrashTwoTone } from "@mui/icons-material";
import noDataImg from "../../assets/images/no data found.png";


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
  const [selectedRows, setSelectedRows] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalBatches, setTotalBatches] = useState(0);
  const openNotificationWithIcon = (type, message) => {
    notification[type]({
      message: message,
    });
  };
  function handleChangePage(event, newPage) {
    setPage(newPage);
  }
  function handleChangeRowsPerPage(event) {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }
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
    const searchParam = searchText
      ? `?page=${page + 1}&limit=${rowsPerPage}&searchKey=${searchText}`
      : `?page=${page + 1}&limit=${rowsPerPage}`;
    const apiEndpoint = `${process.env.REACT_APP_API_URL}${user.company_id}/batch${searchParam}`;
    try {
      const response = await axios.get(apiEndpoint);
      setBatches(response.data.data.batches);
      setTotalBatches(response.data.data.total);
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
  }, [searchText, page, rowsPerPage]);

  //Single Batch Delete
  const handleDelete = async () => {
    const apiEndpoint = `${process.env.REACT_APP_API_URL}${user.company_id}/${batchId}/deleteBatch`;
    try {
      const response = await axios.delete(apiEndpoint);
      if (response.status === 200) {
        fetchData();
        openNotificationWithIcon("success", response.data.data.message);
      } else {
        console.error("Deletion failed");
      }
    } catch (error) {
      console.error("Error deleting data:", error);
    } finally {
      handleCloseConfirmationDialog();
    }
  };

  const rows = batches
    ? batches.map((item, index) => ({
        id: item._id,
        srNo: index + 1,
        technology: item.technology,
        batch_time: item.batch_time,
        note: item.note,
        lab_name: item.lab_name,
        batch_members: item.batch_members,
      }))
    : [];

  const columns = [
    {
      field: "srNo",
      headerName: "srNo",
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
            Batchview(params.row.id);
          }}
          icon={<KeyboardDoubleArrowRightIcon />}
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
              handleOpenConfirmationDialog(params.row.id); // Assuming rowId should be id
            }}
          />
        </div>
      ),
    },
  ];

  //Multiple  Delete Batch
  const handleSelectionModelChange = (selectionModel) => {
    setSelectedRows(selectionModel);
  };

  const deleteallbatch = async () => {
    if (selectedRows.length > 0) {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const apiEndpoint = `${process.env.REACT_APP_API_URL}${user?.company_id}/batches/delete-members`;
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
                  onClick={deleteallbatch}
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
              hideFooterSelectedRowCount={true}
              hideFooterPagination={true}
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
                  style={{ maxWidth: "600px", width: "100%" }}
                />
              </div>
            </>
          )}
        </div>
        <TablePagination
          rowsPerPageOptions={[10, 20, 50, 100]}
          component="div"
          count={totalBatches}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </MainCard>
      {/* Batch Add Modal */}
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
      {/* Batch Edit Modal */}
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
      {/* Batch Delete Modal */}
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
