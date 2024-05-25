import React, { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Chip,
  CircularProgress,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
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
import Mainbreadcrumbs from "contants/Mainbreadcrumbs";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import "jspdf-autotable";
import topImg from "../../assets/images/feesReciept/top.png";
import content from "../../assets/images/feesReciept/jbs-text.png";
import logo from "../../assets/images/feesReciept/logo.png";
import bottom from "../../assets/images/feesReciept/bottom.png";
import callIcon from "../../assets/images/feesReciept/call-icon.png";

function FeeDetailsPage() {
  const { studentId } = useParams();
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const { data, refetch } = useGetSingleStudent(studentId);
  const [selectedValue, setSelectedValue] = useState("");
  /* eslint-disable */
  const [profileData, setProfileData] = useRecoilState(profile);
  const [studentData, setStudentData] = useState(null);
  const [dueamount, setDueamount] = useState(0);
  const [paymentAmount, setPaymentAmount] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (data) {
      setStudentData(data);
    }
  }, [data]);

  useEffect(() => {
    if (data) {
      const totalFees = data?.fees_info?.amount_remaining;
      const due = totalFees - paymentAmount;
      setDueamount(due);
    }
  }, [data, paymentAmount]);

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
      payment_amount: paymentAmount,
    };
    console.log(finalObject);
    setLoading(true);
    try {
      const apiEndpoint = `${process.env.REACT_APP_API_URL}${profileData.company_id}/student/${studentId}/fee-detail/${selectedRow.id}`;
      const response = await axios.put(apiEndpoint, finalObject);
      if (response.status === 200) {
        console.log(response);
        setOpenDialog(false);
        refetch();
        setLoading(false);
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
      PaymentMode: row.status === "Paid" ? "Cash" : "-",
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
      Date: moment(new Date().toDateString()).format("DD/MM/YYYY"),
    };

    if (printReceipt.Status === "Paid") {
      const receiptDiv = document.createElement("div");
      receiptDiv.style.width = "842px";
      receiptDiv.innerHTML = `
      <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <link
      href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
      rel="stylesheet"
    />
    <style>
      body {
        font-family: "Roboto", sans-serif;
      }
      .main {
        display: inline-block;
        margin: auto;
      }
      .top {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 40px;
      }
      .title {
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .logo {
        height: 100px;
        width: 100px;
        margin-right: 20px;
      }
      .phNum {
        color: #221d54;
        font-weight: 800;
        margin-left: 8px;
      }
      .innerMain {
        padding-inline: 20px;
      }
      .fieldLine {
        margin-top: 20px;
        display: flex;
        align-items: center;
      }
      .field {
        border: none;
        margin-left: 15px;
        font-size: 15px;
      }
      .inputLabel {
        font-weight: 500;
        font-size: 17px;
        margin-left: 60px;
      }
    </style>
  </head>
  <body>
    <div class="main">
      <div><img src="${topImg}" alt="error" /></div>
         <div class="innerMain">
        <div class="top">
          <div class="title">
            <div class="logo"><img src="${logo}" alt="" /></div>
            <div class="content">
              <img src="${content}" alt="" width="400px" />
            </div>
          </div>
          <div class="title">
            <img src="${callIcon}" alt="" height="35px" />
            <span class="phNum">+9179844 43901</span>
          </div>
        </div>

        <div class="fieldLine">
          <label class="inputLabel">Date : </label>
          <div class="field">${printReceipt.Date}</div>
          <label class="inputLabel" style="margin-left: 210px;">Reciept No. : </label>
          <div class="field">${printReceipt.ReceiptNo}</div>
        </div>
        <div class="fieldLine">
          <label class="inputLabel">Student Id : </label>
          <div class="field">${printReceipt.StudentID}</div>
          <label class="inputLabel">Installment Date : </label>
          <div class="field">${printReceipt.InstallmentDate}</div>
        </div>
        <div class="fieldLine">
          <label class="inputLabel">Student Name : </label>
          <div class="field">${printReceipt.Name}</div>
        </div>
        <div class="fieldLine">
          <label class="inputLabel">Course :</label>
          <div class="field">${printReceipt.Course}</div>
          <label class="inputLabel" style="margin-left: 85px;">Payment Mode : </label>
          <div class="field">${printReceipt.PaymentMode}</div>
        </div>
        <div class="fieldLine">
          <label class="inputLabel">Payment Amount:</label>
          <div class="field">${printReceipt.paid}</div>
        </div>
        <div class="fieldLine">
          <label class="inputLabel">Email : </label>
          <div class="field">${printReceipt.Email}</div>
          <label class="inputLabel" style="margin-left: 158px;">Contact : </label>
          <div class="field">${printReceipt.Contact}</div>
        </div>
        <div class="fieldLine" style="margin-top: 100px;margin-bottom: 7px;">
            <label class="inputLabel">Recived By : </label>
            <div class="field"></div>
            <label class="inputLabel" style="margin-left: 242px;">Student Sign : </label>
            <div class="field"></div>
        </div>
                 <div class="fieldLine" style="margin-bottom: 14px">
          <label style="font-size:14px;margin-left: 60px;">*Fees will be not refundable</label>
        </div>
      </div>
      <div style="margin-bottom:4px"><img src="${bottom}" alt="error" /></div>
    </div>
  </body>
</html>
`;

      document.body.appendChild(receiptDiv);

      html2canvas(receiptDiv, { scale: 1.6 })
        .then((canvas) => {
          const imgData = canvas.toDataURL("image/png");
          const pdf = new jsPDF({
            orientation: "landscape",
          });
          const imgProps = pdf.getImageProperties(imgData);
          const pdfWidth = pdf.internal.pageSize.getWidth();
          const pdfHeight = (imgProps.height / imgProps.width) * pdfWidth;
          pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
          pdf.save("download.pdf");
          document.body.removeChild(receiptDiv);
        })
        .catch((error) => {
          console.error("Error generating PDF:", error);
        });
    } else if (printReceipt.Status === "Unpaid") {
      alert("Status is not Paid. Cannot print receipt.");
    } else if (printReceipt.Status === "Pending") {
      alert("Status is not Paid. Cannot print receipt.");
    }
  };

  // Student Image Show
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const apiEndpoint = `${process.env.REACT_APP_API_URL}student/${studentId}/profile-pic`;

    if (file) {
      const formData = new FormData();
      formData.append("profile-pic", file);

      axios
        .put(apiEndpoint, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(() => {
          refetch();
        })
        .catch((error) => {
          console.error("Upload error:", error);
        });
    }
  };

  const handleAvatarClick = () => {
    document.getElementById("file-input").click();
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
              visibility: (() => {
                if (
                  profileData.role === "Admin" &&
                  params.row.status === "Paid"
                ) {
                  return "visible";
                } else {
                  return params.row.status === "Paid" ? "hidden" : "visible";
                }
              })(),
            }}
            onClick={() => handleEditClick(params.row)}
            disabled={
              profileData.role === "Student" ||
              profileData.role === "Receptionist"
            }
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

  const rows =
    data?.fees_info?.installments?.map((item, index) => ({
      srNo: index + 1,
      id: item._id,
      installment_date: moment(item.installment_date).format("DD/MM/YYYY"),
      payment_date: item.payment_date
        ? moment(item.payment_date).format("DD/MM/YYYY")
        : "--",
      amount: item.amount,
      status: item.status || "Pending",
    })) || [];

  return (
    <>
      <Mainbreadcrumbs title={"Fees"} subtitle={"Fees Details"} />
      <Paper>
        <Typography
          variant="h4"
          style={{ textAlign: "right", padding: "10px" }}
        ></Typography>
        <Grid container sx={{ margin: "0.5rem" }} spacing={2}>
          <Grid item sx={{ display: "flex", alignItems: "center" }}>
            <input
              id="file-input"
              type="file"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
            <Avatar
              alt="Avatar"
              src={data?.personal_info?.profile_pic}
              onClick={handleAvatarClick}
              sx={{ cursor: "pointer", width: 126, height: 126 }}
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
              disableRowSelectionOnClick
              hideFooter={true}
              checkboxSelection={false}
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
          {data?.fees_info?.amount_paid + data?.fees_info?.admission_amount} INR
        </Typography>

        {/*Status CHanges Boxses */}
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
                <Grid sx={{ marginTop: "10px" }}>
                  <TextField
                    label="Amount"
                    id="payment_amount"
                    name="payment_amount"
                    value={paymentAmount}
                    onChange={(e) => setPaymentAmount(Number(e.target.value))}
                    variant="outlined"
                    fullWidth
                    InputLabelProps={{
                      style: { color: "#5559CE" },
                    }}
                  />
                </Grid>
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
              {loading ? <CircularProgress size={24} /> : "Save"}
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
