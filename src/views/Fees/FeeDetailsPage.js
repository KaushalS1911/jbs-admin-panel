import React, { useEffect, useState } from "react";
import {
  Avatar,
  Button,
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
import moment from "moment";
import axios from "axios";
import { useRecoilState } from "recoil";
import { profile } from "../../atoms/authAtoms";
import MainCard from "../../ui-component/cards/MainCard";
import { Edit as EditIcon, Print as PrintIcon } from "@mui/icons-material";
import "../../assets/scss/FeesReceipt.css";
import Mainbreadcrumbs from "contants/Mainbreadcrumbs";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import "jspdf-autotable";

function FeeDetailsPage() {
  const { studentId } = useParams();
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const { data, refetch } = useGetSingleStudent(studentId);
  const [selectedValue, setSelectedValue] = useState("");
  /* eslint-disable */
  const [profileData, setProfileData] = useRecoilState(profile);
  const [studentData, setStudentData] = useState(null);

  useEffect(() => {
    if (data) {
      setStudentData(data);
    }
  }, [data]);

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
    setSelectedValue(event.target.value);
  };

  const handlePrintClick = (row) => {
    const printReceipt = {
      ReceiptNo: "0011",
      PaymentMode: "Cash",
      Name:
        studentData.personal_info.firstName +
        " " +
        studentData.personal_info.lastName,
      StudentID: studentData._id,
      Course: studentData.personal_info.course,
      Contact: studentData.personal_info.contact,
      Email: studentData.personal_info.email,
      SrNo: row.srNo,
      paid: row.amount,
      InstallmentDate: row.installment_date,
      PaymentDate: row.payment_date,
      Status: row.status,
      Date: new Date().toDateString(),
    };

    if (printReceipt.Status === "Paid") {
      const receiptDiv = document.createElement("div");
      receiptDiv.style.width = "800px";
      receiptDiv.innerHTML = `
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Document</title>
        <style>
          .main {
            max-width: 800px;
            margin: auto;
            background-position: center;
            background-blend-mode: overlay;
            background-repeat: no-repeat;
            background-size: contain;
            height: 842px;
            background-color: #fff;
          }
          .header {
            padding: 2rem;
          }
          .top {
            margin-bottom: 1rem;
            display: flex;
            justify-content: space-between;
          }
          .desc table {
            padding: 12px 0;
            border-radius: 4px;
            width: 100%;
            font-size: 14px;
            font-weight: 500;
          }
          .desc td {
            padding: 10px;
            border-bottom: 1px solid rgb(206, 205, 205);
          }
          .payment-section {
            margin-top: 3rem;
          }
          .payment-section table {
            width: 100%;
          }
          .payment-section th, .payment-section td {
            padding: 8px;
            font-size: 14px;
            text-align: center;
            border-bottom: 1px solid rgb(206, 205, 205);
          }
          .payment-section th {
            font-weight: 500;
          }
          .signature {
            padding-right: 7rem;
            margin-top: 14rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          .signature p {
            font-size: 17px;
            font-weight: 500;
            color: rgb(111, 62, 146);
          }
          .footer {
            border-top: 1px solid black;
            padding-top: 12px;
            display: flex;
            margin-top: 2rem;
            font-size: 13px;
            justify-content: space-between;
          }
        </style>
      </head>
      <body>
        <div class="main">
          <div class="header">
            <div class="top">
              <div class="logo">
              </div>
              <p><b>Date: ${printReceipt.Date}</b></p>
            </div>
            <hr />
            <div class="desc">
              <table>
                <tr>
                  <td>Receipt No: ${printReceipt.ReceiptNo}</td>
                  <td>Student Id: ${printReceipt.StudentID}</td>
                </tr>
                <tr>
                  <td colspan="2">Name: ${printReceipt.Name}</td>
                </tr>
                <tr>
                  <td colspan="2">Course: ${printReceipt.Course}</td>
                </tr>
                <tr>
                  <td>Contact: ${printReceipt.Contact}</td>
                  <td>Email: ${printReceipt.Email}</td>
                </tr>
              </table>
            </div>
            <div class="payment-section">
              <table cellspacing="4">
                <tr>
                  <th>Sr No.</th>
                  <th>Invoice Date</th>
                  <th>Payment Date</th>
                  <th>Payment Mode</th>
                  <th>Amount</th>
                </tr>
                <tbody>
                  <tr>
                    <td>${printReceipt.SrNo}</td>
                    <td>${printReceipt.InstallmentDate}</td>
                    <td>${printReceipt.PaymentDate}</td>
                    <td>${printReceipt.PaymentMode}</td>
                    <td>${printReceipt.paid}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="signature">
              <p>Authority Sign:-</p>
              <p>Student Sign:-</p>
            </div>
            <div class="footer">
              <p>+91 9726806634</p>
              <p>monilkakadiya0096@gmail.com</p>
              <p>www.jbsitinstitute.com</p>
            </div>
          </div>
        </div>
      </body>
      </html>`;

      document.body.appendChild(receiptDiv);

      html2canvas(receiptDiv, { scale: 2 }).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdfWidth = 400;
        const pdfHeight = (canvas.height / canvas.width) * pdfWidth;
        const pdf = new jsPDF("p", "pt", [pdfWidth, pdfHeight]);
        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save("receipt.pdf");
        document.body.removeChild(receiptDiv);
      });
    } else if (printReceipt.Status === "Unpaid") {
      alert("Status is not Paid. Cannot print receipt.");
    } else if (printReceipt.Status === "Pending") {
      alert("Status is not Paid. Cannot print receipt.");
    }
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
            color = "#4f9753";
            break;
          case "Unpaid":
            color = "#e04f44";
            break;
          case "Pending":
            color = "#f98364";
            break;
          default:
            color = "blue";
        }
        return (
          <>
            <Chip
              label={
                params.value === "" || params.value === undefined
                  ? "Pending"
                  : params.value
              }
              size="small"
              style={{
                backgroundColor: color,
                color: "white",
                size: "small",
                padding: "0",
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
        <>
          <EditIcon
            variant="outlined"
            sx={{
              color: "#b0b2e8",
              height: "35px",
              lineHeight: "35px",
              margin: "0 20px",
              cursor: "pointer",
              fontSize: "30px",
            }}
            onClick={() => handleEditClick(params.row)}
          />
          <PrintIcon
            variant="outlined"
            sx={{
              color: "#b0b2e8",
              height: "35px",
              lineHeight: "35px",
              margin: "0 20px",
              cursor: "pointer",
              fontSize: "30px",
            }}
            onClick={() => handlePrintClick(params.row)}
          />
        </>
      ),
    },
  ];

  const rows = data?.fees_info?.installments
    ? data.fees_info.installments.map((item, index) => ({
        srNo: index + 1,
        id: item._id,
        installment_date: moment(item.installment_date).format("DD/MM/YYYY"),
        payment_date: item.payment_date
          ? moment(item.payment_date).format("DD/MM/YYYY")
          : "--",
        amount: item.amount,
        status: item.status || "Pending",
      }))
    : [];

  return (
    <>
      <Mainbreadcrumbs title={"Fees"} subtitle={"Fees Details"} />
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
                <Typography variant="h3" component="div">
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
          {data?.fees_info?.amount_paid + data?.fees_info?.admission_amount } INR
        </Typography>

        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          sx={{
            "& .MuiDialog-container": {
              "& .MuiPaper-root": {
                width: "40%",
                maxWidth: "300px",
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
                  textAlign: "center",
                  borderBottom: "1px solid #e1e1e1",
                  padding: "10px",
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
            <Grid
              item
              xl={12}
              lg={12}
              md={12}
              sm={12}
              xs={12}
              sx={{ marginBottom: "10px" }}
            >
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
                      borderWidth: "1px",
                    },
                  },
                  size: "small",
                }}
              >
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
            </Grid>
          </DialogContent>
          <DialogActions sx={{ justifyContent: "center" }}>
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
