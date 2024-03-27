import React from "react";
import Flatpickr from "react-flatpickr";
import { Box, margin, width } from "@mui/system";
import { useState } from "react";
// import studentsImage from "../../assets/images/Account/studentsImage.svg";
// import { HiOutlineUsers } from "react-icons/hi2";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import ReceiptIcon from "@mui/icons-material/Receipt";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import {
  CardContent,
  Grid,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { gridSpacing } from "store/constant";
import MainCard from "ui-component/cards/MainCard";
import { Divider, List } from "antd";
const MainAccount = () => {
  const [selectedDates, setSelectedDates] = useState([]);


  // const data = {
  //   message: "Account details retrieved successfully.",
  //     data: {
  //         expenses: {
  //             _id: null,
  //             expensesByType: [
  //                 {
  //                     type: "Stationary",
  //                     totalAmount: 576945,
  //                 },
  //                 {
  //                     type: "Maintanance",
  //                     totalAmount: 1575855,
  //                 },
  //                 {
  //                     type: "Salary",
  //                     totalAmount: 5610465,
  //                 },
  //                 {
  //                     type: "Office expense",
  //                     totalAmount: 5766712566,
  //                 },
  //                 {
  //                     type: "Rent",
  //                     totalAmount: 13289,
  //                 },
  //                 {
  //                     type: "Elecricity bill",
  //                     totalAmount: 107418496,
  //                 }
  //             ],
  //             totalExpense: 5881907616,
  //         },
  //         students: {
  //             existingAdmissions: 4,
  //             newAdmissions: 0,
  //             courseCompleted: 2,
  //             leavedStudents: 0
  //         },
  //         feesInfo: [],
  //         otherInfo: {
  //             openingCash: 100,
  //             cashInvestment: 100,
  //             feesReceived: 10000,
  //             totalExpense: 5881907616,
  //             withdrawal: 100
  //         },
  //         nextMonth: {
  //             admissions: 4,
  //             cash: -5881897516,
  //             pending_fee: 0
  //         }
  //     }
  // }

  const onDateChange = (dates) => {
    setSelectedDates(dates);
  };
  return (
    <>
      <Box
        className="flatpicker"
        style={{
          outline: "none",
          margin: "15px 0 30px 10px",
          whiteSpace: "nowrap",
        }}
      >
        <label
          htmlFor="rows-per-page"
          style={{ minWidth: "fit-content", marginRight: "5px" }}
        >
          Date Range:
        </label>
        <Flatpickr
          placeholder="Select Date"
          style={{ minWidth: "220px" }}
          onChange={(selectedDates) => onDateChange(selectedDates)}
          className="form-control"
          options={{
            dateFormat: "Y-m-d",
            mode: "range",
          }}
        />
      </Box>
      <Grid container spacing={gridSpacing} sx={{"justifyContent": "center"}}>
        <Grid item lg={6} sm={10} sx={{ width: "100%" }}>
          <MainCard content={false}>
            <CardContent style={{ height: "100%", padding: "28px" }}>
              <Grid container spacing={gridSpacing}>
                <Grid item xs={12} sx={{ margin: "0px" }}>
                  <Grid container alignContent="center">
                    <Grid
                      item
                      xs={12}
                      sx={{
                        position: "relative",
                      }}
                    >
                      <Typography
                        variant="h5"
                        style={{ fontSize: "20px", padding: "0" }}
                      >
                        Student Details
                      </Typography>
                      <Typography
                        variant="span"
                        sx={{
                          margin: "3px 0 20px 0",
                          display: "block",
                          color: "#16A34A",
                        }}
                      >
                        Paid on March 8, 2024
                      </Typography>
                      <Grid container>
                        <Grid item xs={6} >
                          <Typography variant="span">New Addmision</Typography>
                          <Typography
                            variant="h5"
                            sx={{ fontSize: "30px", marginTop: "2px" }}
                          >
                            500
                          </Typography>
                        </Grid>
                        <Grid item xs={6} >
                          <Typography variant="span">
                            Existing Addmision
                          </Typography>
                          <Typography
                            variant="h5"
                            sx={{ fontSize: "30px", marginTop: "2px" }}
                          >
                            769
                          </Typography>
                        </Grid>
                        <Grid item xs={6}  sx={{ marginTop: "14px" }}>
                          <Typography variant="span">
                            Leave Addmision
                          </Typography>
                          <Typography
                            variant="h5"
                            sx={{ fontSize: "30px", marginTop: "2px" }}
                          >
                            287
                          </Typography>
                        </Grid>
                        <Grid item xs={6}  sx={{ marginTop: "14px" }}>
                          <Typography variant="span">
                            Course Completed
                          </Typography>
                          <Typography
                            variant="h5"
                            sx={{ fontSize: "30px", marginTop: "2px" }}
                          >
                            127
                          </Typography>
                        </Grid>
                        <PeopleOutlineIcon
                          sx={{
                            fontSize: "110px",
                            opacity: "0.6",
                            position: "absolute",
                            right: "-4%",
                            bottom: "-22%",
                            color: "#16A34A",
                          }}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>
          </MainCard>
        </Grid>
        <Grid item lg={6} sm={10} sx={{ width: "100%" }}>
          <MainCard content={false}>
            <CardContent style={{ height: "260px", padding: "28px" }}>
              <Grid container spacing={gridSpacing}>
                <Grid item xs={12} sx={{ margin: "0px" }}>
                  <Grid container alignContent="center">
                    <Grid
                      item
                      xs={12}
                      sx={{
                        position: "relative",
                      }}
                    >
                      <Typography
                        variant="h5"
                        style={{ fontSize: "20px", padding: "0" }}
                      >
                        Revenue Details
                      </Typography>
                      <Typography
                        variant="span"
                        sx={{
                          margin: "3px 0 20px 0",
                          display: "block",
                          color: "#DC2626",
                        }}
                      >
                        Paid on March 8, 2024
                      </Typography>
                      <Grid container>
                        <Grid item xs={6}>
                          <Typography variant="span">
                            Opning Pending Fee
                          </Typography>
                          <Typography
                            variant="h5"
                            sx={{ fontSize: "30px", marginTop: "2px" }}
                          >
                            500
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="span">
                            Fees Receivable
                          </Typography>
                          <Typography
                            variant="h5"
                            sx={{ fontSize: "30px", marginTop: "2px" }}
                          >
                            769
                          </Typography>
                        </Grid>
                        <Grid item xs={6} sx={{ marginTop: "14px" }}>
                          <Typography variant="span">
                            Fees Received <br /> (Till <i>7th Day</i>)
                          </Typography>
                          <Typography
                            variant="h5"
                            sx={{ fontSize: "30px", marginTop: "2px" }}
                          >
                            287
                          </Typography>
                        </Grid>
                        <Grid item xs={6} sx={{ marginTop: "14px" }}>
                          <Typography variant="span">
                            Other Revenue <br/> (cash)
                          </Typography>
                          <Typography
                            variant="h5"
                            sx={{ fontSize: "30px", marginTop: "2px" }}
                          >
                            127
                          </Typography>
                        </Grid>
                        <ReceiptIcon
                          sx={{
                            fontSize: "100px",
                            opacity: "0.6",
                            position: "absolute",
                            right: "-6%",
                            bottom: "-16%",
                            color: "#DC2626",
                          }}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>
          </MainCard>
        </Grid>
        <Grid item lg={6} sm={10} sx={{ width: "100%" }}>
          <MainCard content={false}>
            <CardContent style={{ height: "410px", padding: "28px" }}>
              <Grid container spacing={gridSpacing}>
                <Grid item xs={12} sx={{ margin: "0px" }}>
                  <Grid container alignContent="center">
                    <Grid
                      item
                      xs={12}
                      sx={{
                        //   backgroundImage: `url(${studentsImage})`,
                        //   backgroundRepeat: "no-repeat"
                        position: "relative",
                      }}
                    >
                      <Typography
                        variant="h5"
                        style={{ fontSize: "20px", padding: "0" }}
                      >
                        Expense Details
                      </Typography>
                      <Typography
                        variant="span"
                        sx={{
                          margin: "3px 0 20px 0",
                          display: "block",
                          color: "#F59E0B",
                        }}
                      >
                        Paid on March 8, 2024
                      </Typography>
                      <Grid container>
                        <Grid item xs={6} sx={{ marginTop: "14px" }}>
                          <Typography variant="span">Rent</Typography>
                          <Typography
                            variant="h5"
                            sx={{ fontSize: "30px", marginTop: "2px" }}
                          >
                            500
                          </Typography>
                        </Grid>
                        <Grid item xs={6} sx={{ marginTop: "14px" }}>
                          <Typography variant="span">
                            Electricity Bill
                          </Typography>
                          <Typography
                            variant="h5"
                            sx={{ fontSize: "30px", marginTop: "2px" }}
                          >
                            769
                          </Typography>
                        </Grid>
                        <Grid item xs={6} sx={{ marginTop: "14px" }}>
                          <Typography variant="span">Salary</Typography>
                          <Typography
                            variant="h5"
                            sx={{ fontSize: "30px", marginTop: "2px" }}
                          >
                            287
                          </Typography>
                        </Grid>
                        <Grid item xs={6} sx={{ marginTop: "14px" }}>
                          <Typography variant="span">Stationery</Typography>
                          <Typography
                            variant="h5"
                            sx={{ fontSize: "30px", marginTop: "2px" }}
                          >
                            127
                          </Typography>
                        </Grid>
                        <Grid item xs={6} sx={{ marginTop: "14px" }}>
                          <Typography variant="span">
                            Maintenance (AC/Computer)
                          </Typography>
                          <Typography
                            variant="h5"
                            sx={{ fontSize: "30px", marginTop: "2px" }}
                          >
                            127
                          </Typography>
                        </Grid>
                        <Grid item xs={6} sx={{ marginTop: "14px" }}>
                          <Typography variant="span">
                            New Asset Purchase
                          </Typography>
                          <Typography
                            variant="h5"
                            sx={{ fontSize: "30px", marginTop: "2px" }}
                          >
                            127
                          </Typography>
                        </Grid>
                        <Grid item xs={6} sx={{ marginTop: "14px" }}>
                          <Typography variant="span">Office Expense</Typography>
                          <Typography
                            variant="h5"
                            sx={{ fontSize: "30px", marginTop: "2px" }}
                          >
                            127
                          </Typography>
                        </Grid>
                        <CurrencyRupeeIcon
                          sx={{
                            fontSize: "112px",
                            opacity: "0.6",
                            position: "absolute",
                            right: "-7%",
                            bottom: "-3%",
                            color: "#F59E0B",
                          }}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>
          </MainCard>
        </Grid>
        <Grid item lg={6} sm={10} sx={{ width: "100%" }}>
          <MainCard content={false}>
            <CardContent style={{ height: "410px", padding: "28px" }}>
              <Grid container spacing={gridSpacing}>
                <Grid item xs={12} sx={{ margin: "0px" }}>
                  <Grid container alignContent="center">
                    <Grid
                      item
                      xs={12}
                      sx={{
                        position: "relative",
                      }}
                    >
                      <Typography
                        variant="h5"
                        style={{ fontSize: "20px", padding: "0" }}
                      >
                        Cash/Bank Tally
                      </Typography>
                      <Typography
                        variant="span"
                        sx={{
                          margin: "3px 0 20px 0",
                          display: "block",
                          color: "#5559CE",
                        }}
                      >
                        Paid on March 8, 2024
                      </Typography>
                      <Grid container>
                        <Grid item xs={6} sx={{ marginTop: "14px" }}>
                          <Typography variant="span">Opning Cash</Typography>
                          <Typography
                            variant="h5"
                            sx={{ fontSize: "30px", marginTop: "2px" }}
                          >
                            500
                          </Typography>
                        </Grid>
                        <Grid item xs={6} sx={{ marginTop: "14px" }}>
                          <Typography variant="span">Fees Received</Typography>
                          <Typography
                            variant="h5"
                            sx={{ fontSize: "30px", marginTop: "2px" }}
                          >
                            769
                          </Typography>
                        </Grid>
                        <Grid item xs={6} sx={{ marginTop: "14px" }}>
                          <Typography variant="span">
                            Cash Investment
                          </Typography>
                          <Typography
                            variant="h5"
                            sx={{ fontSize: "30px", marginTop: "2px" }}
                          >
                            287
                          </Typography>
                        </Grid>
                        <Grid item xs={6} sx={{ marginTop: "14px" }}>
                          <Typography variant="span">Total Expense</Typography>
                          <Typography
                            variant="h5"
                            sx={{ fontSize: "30px", marginTop: "2px" }}
                          >
                            127
                          </Typography>
                        </Grid>
                        <Grid item xs={6} sx={{ marginTop: "14px" }}>
                          <Typography variant="span">Withdrawal</Typography>
                          <Typography
                            variant="h5"
                            sx={{ fontSize: "30px", marginTop: "2px" }}
                          >
                            127
                          </Typography>
                        </Grid>
                        <AccountBalanceIcon
                          sx={{
                            fontSize: "110px",
                            opacity: "0.6",
                            position: "absolute",
                            right: "-4%",
                            bottom: "-26%",
                            color: "#5559CE",
                          }}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>
          </MainCard>
        </Grid>
      </Grid>
    </>
  );
};
export default MainAccount;
