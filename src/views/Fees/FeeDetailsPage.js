/* eslint-disable */
import React, { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  ButtonBase,
  Chip,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Typography,
} from "@mui/material";
import { useGetSingleStudent } from "../../hooks/useGetSingleStudent";
import { useParams } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { Subtitles } from "@mui/icons-material";
import Mainbreadcrumbs from "contants/Mainbreadcrumbs";
import moment from "moment";
import axios from "axios";
import { useRecoilState } from "recoil";
import { profile } from "../../atoms/authAtoms";
import MainCard from "ui-component/cards/MainCard";

function FeeDetailsPage() {
  const { studentId } = useParams();
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const { data, refetch } = useGetSingleStudent(studentId);
  const [feeDetails, setFeeDetails] = useState({});
  const [installments, setInstallments] = useState([]);
  const [totalAmount, setTotalAmount] = useState();
  const [remainingAmount, setRemainingAmount] = useState();
  const [selectedValue, setSelectedValue] = useState("");
  const [profileData, setProfileData] = useRecoilState(profile);

  const handleEditClick = (row) => {
    setSelectedRow(row);
    setOpenDialog(true);
    setSelectedValue(row.status);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const handleSaveUpdate = async () => {
    const finalObject = {
      status: selectedValue,
    };
    try {
      const apiEndpoint = `${process.env.REACT_APP_API_URL}${profileData.company_id}/student/${studentId}/fee-detail/${selectedRow.id}`;
      const response = await axios.put(apiEndpoint, finalObject);

      setOpenDialog(false);
      if (response.status === 200) {
        refetch();
      }
    } catch (error) {
      console.error("API Error:", error);
    }
  };


  useEffect(() => {
    refetch();
  }, []);

  const handlePaymentStatusChange = (event) => {
    // setPaymentStatus(event.target.value);
    setSelectedValue(event.target.value);
  };

  const columns = [
    { field: "srNo", headerName: "Sr No", width: 250 },
    { field: "installment_date", headerName: "Installment Date", width: 250 },
    {
      field: "amount",
      headerName: "Installment Amount",
      width: 250,
    },
    { field: "payment_date", headerName: "Payment Date", width: 250 },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      renderCell: (params) => {
        let color;
        switch (params.value) {
          case "Paid":
            color = "green";
            break;
          case "Unpaid":
            color = "red";
            break;
          case "Pending":
            color = "blue";
            break;
          default:
            color = "blue";
        }
        return (
          <>
            <Chip
              label={
                params.value == "" || params.value == undefined
                  ? "Pending"
                  : params.value
              }
              style={{
                backgroundColor: color,
                color: "white",
                size: "small",
              }}
            />
          </>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 250,
      sortable: false,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <Button
          variant="outlined"
          sx={{ color: "#5559ce", border: "1px solid #5559CE" }}
          size="md"
          onClick={() => handleEditClick(params.row)}
        >
          Edit
        </Button>
      ),
    },
  ];

  const rows = data?.fees_info?.installments
    ? data.fees_info.installments.map((item, index) => ({
        srNo: index + 1,
        id: item._id,
        installment_date: moment(item.installment_date).format("DD/MM/YYYY"),
        payment_date: item.payment_date ? moment(item.payment_date).format("DD/MM/YYYY") : "--",
        amount: item.amount,
        status: item.status || "Pending",
      }))
    : [];

  return (
    <>
     <Mainbreadcrumbs title={'Fees'} subtitle={'Fees Detsils'}/>
      <Paper>
        <Typography
          variant="h4"
          style={{ textAlign: "right", padding: "10px" }}
        >
          {/* Total Amount: {data.fees_info.total_amount} INR */}
        </Typography>
        <Grid container sx={{ margin: "0.5rem" }} spacing={2}>
          <Grid item>
            <Avatar
              alt="Remy Sharp"
              src="/static/images/avatar/1.jpg"
              sx={{ width: 128, height: 128 }}
            />
          </Grid>
          <Grid item xs={12} sm container>
            <Grid
              item
              xs
              container
              sx={{ padding: "1rem", letterSpacing: "0.6px" }}
              direction="column"
              spacing={2}
            >
              <Grid item xs>
                <Typography variant="h4" component="div">
                  {data?.personal_info?.firstName}{" "}
                  {data?.personal_info?.lastName}
                </Typography>
                <Typography variant="body2">
                  {data?.personal_info?.course}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Mobile No: {data?.personal_info?.contact}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Email: {data?.personal_info?.email}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

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
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 5 },
                },
              }}
              disableRowSelectionOnClick
              hideFooter={true}
              pageSizeOptions={[5, 10]}
              checkboxSelection
              sx={{
                "& .MuiDataGrid-columnHeaders": {
                  backgroundColor: "#ede7f6",
                  fontSize: 14,
                  color: "#262626",
                },
                "& .MuiDataGrid-root .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-root .MuiDataGrid-cell:focus":
                  {
                    outline: "none",
                  },
              }}
            />
          </div>
        </MainCard>

        <Typography
          variant="h4"
          style={{ textAlign: "right", padding: "10px" }}
        >
          <span style={{ fontWeight: 300 }}>Amount Paid:</span>
          {data?.fees_info?.amount_paid} INR
        </Typography>

        {/* Status Dauilog Box */}
        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          sx={{
            "& .MuiDialog-container": {
              "& .MuiPaper-root": {
                width: "100%",
              },
            },
          }}
        >
          <DialogTitle>
            <Typography
              sx={{
                "@media (min-width:600px)": {
                  fontSize: "14px",
                  color: "#5559CE",
                  fontWeight: "600",
                },
                "@media (min-width:1024px)": {
                  fontSize: "16px",
                  color: "#5559CE",
                  fontWeight: "600",
                },
              }}
            >
              Payment Status
            </Typography>
          </DialogTitle>
          <DialogContent>
            <FormControl item={true} fullWidth variant="outlined">
              <InputLabel id="status-label" style={{ color: "#5559ce" }}>
                Status
              </InputLabel>
              <Select
                value={selectedValue}
                labelId="status-label"
                id="status"
                name="status"
                label="status"
                onChange={handlePaymentStatusChange}
                fullWidth
                InputLabelProps={{
                  style: { color: "#5559CE" },
                }}
              >
                <MenuItem value="Paid">Paid</MenuItem>
                <MenuItem value="Unpaid">Unpaid</MenuItem>
                <MenuItem value="Pending">Pending</MenuItem>
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleSaveUpdate}
              variant="contained"
              style={{
                width: { xs: "150px" },
                marginLeft: "10px",
                display: "block",
                backgroundColor: "#5559CE",
                color: "#ede7f6",
              }}
            >
              Save
            </Button>
            <Button
              onClick={handleCloseDialog}
              style={{
                width: { xs: "150px" },
                marginLeft: "10px",
                display: "block",
                backgroundColor: "#ede7f6",
                color: "#5559CE",
              }}
            >
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </Paper>
    </>
  );
}

export default FeeDetailsPage;
