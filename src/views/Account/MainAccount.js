import React from "react";
import Flatpickr from "react-flatpickr";
import { Box } from "@mui/system";
import { useState } from "react";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import ReceiptIcon from "@mui/icons-material/Receipt";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import { Grid, Typography } from "@mui/material";
import MainCard from "ui-component/cards/MainCard";
import axios from "axios";
import { useEffect } from "react";
import {useRecoilState} from "recoil";
import {profile} from "../../atoms/authAtoms";
import moment from "moment";
import { notification } from "antd";

const MainAccount = () => {
  const openNotificationWithIcon = (type, message) => {
    notification[type]({
      message: message,
    });
  };
  const [selectedDates, setSelectedDates] = useState([]);
  const [accountData, setAccountData] = useState([]);
  const [profileData, setProfileData] = useRecoilState(profile)

  useEffect(() => {
    fetchData();
  }, []);

  const onDateChange = (selectedDates) => {
    setSelectedDates(selectedDates);
    selectedDates && selectedDates.length === 2 && fetchData()
  };

  const fetchData = async () => {
    let startDate, endDate;

    if (selectedDates.length === 2) {
      startDate = moment(selectedDates[0]).format("YYYY-MM-DD");
      endDate = moment(selectedDates[1]).format("YYYY-MM-DD");
    } else {
      const today = moment();
      startDate = today.startOf('month').format("YYYY-MM-DD");
      endDate = today.endOf('month').format("YYYY-MM-DD");
    }
    const apiEndpoint = `${process.env.REACT_APP_API_URL}${profileData.company_id}/account?startDate=${startDate}&endDate=${endDate}`;
    try {
      const response = await axios.get(apiEndpoint);
      setAccountData(response.data.data.data);
      
    } catch (error) {
      console.error("Error fetching data:", error);
      openNotificationWithIcon("error", error.response.data.message);

    }
  };

  const {expenses, students, otherInfo, feesInfo} = accountData
  return (
    <>
      <MainCard>
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
            onChange={onDateChange}
            className="form-control"
            options={{
              dateFormat: "Y-m-d",
              mode: "range",
            }}
          />
        </Box>
      </MainCard>

    
      <Box sx={{ width: "100%", marginTop: "16px" }}>
        <Grid
          container
          spacing={2}
          rowSpacing={3}
          columnSpacing={{ xs: 2, sm: 2, md: 4 }}
        >
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <Grid
              sx={{
                boxShadow: 1,
                padding: "14px",
                borderRadius: "14px",
                backgroundColor: "#fff",
              }}
            >
              <Box>
                <Typography
                  sx={{
                    fontSize: "16px",
                    fontWeight: "600",
                    padding: "14px"
                  }}
                >
                  Student Details
                </Typography>
              </Box>
              <Grid container direction="row" >
                <Grid lg={11} md={12} sm={12}>
                  <Grid container spacing={1} sx={{ padding: "0px 20px" }}>
                    <Grid xs={6} sm={6} md={6} lg={6} sx={{ padding: "8px 0" }}>
                      <Typography
                        sx={{ fontSize: "16px", marginBottom: "4px" }}
                      >
                        New Admissions
                      </Typography>
                      <Typography sx={{ fontSize: "30px", fontWeight: "500" }}>
                        {students?.newAdmissions}
                      </Typography>
                    </Grid>
                    <Grid xs={6} sm={6} md={6} lg={6} sx={{ padding: "8px 0" }}>
                      <Typography
                        sx={{ fontSize: "16px", marginBottom: "4px" }}
                      >
                        Existing Admissions
                      </Typography>
                      <Typography sx={{ fontSize: "30px", fontWeight: "500" }}>
                        {students?.existingAdmissions}
                      </Typography>
                    </Grid>
                    <Grid xs={6} sm={6} md={6} lg={6} sx={{ padding: "8px 0" }}>
                      <Typography
                        sx={{ fontSize: "16px", marginBottom: "4px" }}
                      >
                        Leave Admissions
                      </Typography>
                      <Typography sx={{ fontSize: "30px", fontWeight: "500" }}>
                        {students?.leavedStudents}
                      </Typography>
                    </Grid>
                    <Grid xs={6} sm={6} md={6} lg={6} sx={{ padding: "8px 0" }}>
                      <Typography
                        sx={{ fontSize: "16px", marginBottom: "4px" }}
                      >
                        Course Completed
                      </Typography>
                      <Typography sx={{ fontSize: "30px", fontWeight: "500" }}>
                        {students?.courseCompleted}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid lg={1} md={12} sm={12}>
                  <Grid
                    container
                    direction="column"
                    justifyContent="flex-end"
                    alignItems="center"
                    sx={{ height: "100%" }}
                  >
                    <PeopleOutlineIcon
                      sx={{
                        fontSize: "35px",
                        opacity: "0.6",
                        color: "#16A34A",
                      }}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <Grid
                sx={{
                  boxShadow: 1,
                  padding: "14px",
                  borderRadius: "14px",
                  backgroundColor: "#fff",
                }}
            >
              <Box>
                <Typography
                    sx={{
                      fontSize: "16px",
                      fontWeight: "600",
                      padding: "14px"
                    }}
                >
                  Next month opening
                </Typography>
              </Box>
              <Grid container direction="row">
                <Grid lg={11} md={12} sm={12}>
                  <Grid container spacing={1} sx={{ padding: "0px 20px" }}>
                    <Grid xs={6} sm={6} md={6} lg={6} sx={{ padding: "8px 0" }}>
                      <Typography
                          sx={{ fontSize: "16px", marginBottom: "4px" }}
                      >
                        Existing Admissions
                      </Typography>
                      <Typography sx={{ fontSize: "30px", fontWeight: "500" }}>
                        {students?.existingAdmissions}
                      </Typography>
                    </Grid>
                    <Grid xs={6} sm={6} md={6} lg={6} sx={{ padding: "8px 0" }}>
                      <Typography
                          sx={{ fontSize: "16px", marginBottom: "4px" }}
                      >
                        Opening pending fees
                      </Typography>
                      <Typography sx={{ fontSize: "30px", fontWeight: "500" }}>
                        {otherInfo?.feesReceived?.totalAmount - otherInfo?.totalExpense}
                      </Typography>
                    </Grid>
                    <Grid xs={6} sm={6} md={6} lg={6} sx={{ padding: "8px 0" }}>
                      <Typography
                          sx={{ fontSize: "16px", marginBottom: "4px" }}
                      >
                        Opening Cash
                      </Typography>
                      <Typography sx={{ fontSize: "30px", fontWeight: "500" }}>
                        {otherInfo?.feesReceived?.totalAmount - otherInfo?.totalExpense}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid lg={1} md={12} sm={12}>
                  <Grid
                      container
                      direction="column"
                      justifyContent="flex-end"
                      alignItems="center"
                      sx={{ height: "100%" }}
                  >
                    <PeopleOutlineIcon
                        sx={{
                          fontSize: "40px",
                          opacity: "0.6",
                          color: "#16A34A",
                        }}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <Grid
              sx={{
                boxShadow: 1,
                padding: "14px",
                borderRadius: "14px",
                backgroundColor: "#fff",
              }}
            >
              <Box>
                <Typography
                  sx={{
                    fontSize: "16px",
                    fontWeight: "600",
                    marginBottom: "4px",
                    padding: "14px"
                  }}
                >
                  Revenue Details
                </Typography>
              </Box>
              <Grid container direction="row">
                <Grid lg={11} md={11} sm={12}>
                  <Grid container spacing={1} sx={{ padding: "0px 20px" }}>
                    <Grid xs={6} sm={6} md={6} lg={6} sx={{ padding: "8px 0" }}>
                      <Typography
                        sx={{ fontSize: "16px", marginBottom: "4px" }}
                      >
                        Opening Pending Fees
                      </Typography>
                      <Typography sx={{ fontSize: "30px", fontWeight: "500" }}>
                        {feesInfo?.openingPendingFees?.totalAmount}
                      </Typography>
                    </Grid>
                    <Grid xs={6} sm={6} md={6} lg={6} sx={{ padding: "8px 0" }}>
                      <Typography
                        sx={{ fontSize: "16px", marginBottom: "4px" }}
                      >
                        Fees receivable
                      </Typography>
                      <Typography sx={{ fontSize: "30px", fontWeight: "500" }}>
                        {feesInfo?.feesReceivable?.totalAmount}
                      </Typography>
                    </Grid>
                    <Grid xs={6} sm={6} md={6} lg={6} sx={{ padding: "8px 0" }}>
                      <Typography
                        sx={{ fontSize: "16px", marginBottom: "4px" }}
                      >
                        Fees Received
                      </Typography>
                      <div>
                        <i>(Till 7th Day)</i>
                      </div>
                      <Typography sx={{ fontSize: "30px", fontWeight: "500" }}>
                        {feesInfo?.feesReceived?.totalAmount}
                      </Typography>
                    </Grid>
                    <Grid xs={6} sm={6} md={6} lg={6} sx={{ padding: "8px 0" }}>
                      <Typography
                        sx={{ fontSize: "16px", marginBottom: "4px" }}
                      >
                        Office Revenue
                      </Typography>
                      <div>
                        <i>(Cash)</i>
                      </div>
                      <Typography sx={{ fontSize: "30px", fontWeight: "500" }}>
                        0
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid lg={1} md={12} sm={12} sx={{ padding: "6px" }}>
                  <Grid
                    container
                    direction="column"
                    justifyContent="flex-end"
                    alignItems="center"
                    sx={{ height: "100%" }}
                  >
                    <ReceiptIcon
                      sx={{
                        fontSize: "40px",
                        opacity: "0.6",
                        color: "#DC2626",
                      }}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <Grid
              sx={{
                boxShadow: 1,
                padding: "14px",
                borderRadius: "14px",
                backgroundColor: "#fff",
              }}
            >
              <Box>
                <Typography
                  sx={{
                    fontSize: "16px",
                    fontWeight: "600",
                    padding:"14px"
                  }}
                >
                  Expense Details
                </Typography>
              </Box>
              <Grid container direction="row">
                <Grid lg={11} md={11} sm={12}>
                  <Grid container spacing={1} sx={{ padding: "0px 20px" }}>
                    { expenses?.expensesByType && expenses.expensesByType.length !== 0 && expenses.expensesByType.map((e) => {
                      return (
                          <Grid xs={6} sm={6} md={6} lg={6} sx={{ padding: "8px 0" }}>
                            <Typography
                                sx={{ fontSize: "16px", marginBottom: "4px" }}
                            >
                              {e?.type}
                            </Typography>
                            <Typography sx={{ fontSize: "30px", fontWeight: "500" }}>
                              {e?.totalAmount}
                            </Typography>
                          </Grid>
                      )
                    })}
                  </Grid>
                </Grid>
                <Grid lg={1} md={12} sm={12} sx={{ padding: "6px" }}>
                  <Grid
                    container
                    direction="column"
                    justifyContent="flex-end"
                    alignItems="center"
                    sx={{ height: "100%" }}
                  >
                    <CurrencyRupeeIcon
                      sx={{
                        fontSize: "45px",
                        opacity: "0.6",
                        color: "#F59E0B",
                      }}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <Grid
              sx={{
                boxShadow: 1,
                padding: "14px",
                borderRadius: "14px",
                backgroundColor: "#fff",
              }}
            >
              <Box>
                <Typography
                  sx={{
                    fontSize: "16px",
                    fontWeight: "600",
                    padding: "14px"
                  }}
                >
                  Cash/Bank Tally
                </Typography>
              </Box>
              <Grid container direction="row">
                <Grid lg={11} md={11} sm={12}>
                  <Grid container spacing={1} sx={{ padding: "0px 20px" }}>
                    <Grid xs={6} sm={6} md={6} lg={6} sx={{ padding: "8px 0" }}>
                      <Typography
                        sx={{ fontSize: "16px", marginBottom: "4px" }}
                      >
                        Opening Cash
                      </Typography>
                      <Typography sx={{ fontSize: "30px", fontWeight: "500" }}>
                        {otherInfo?.openingCash}
                      </Typography>
                    </Grid>
                    <Grid xs={6} sm={6} md={6} lg={6} sx={{ padding: "8px 0" }}>
                      <Typography
                        sx={{ fontSize: "16px", marginBottom: "4px" }}
                      >
                        Fees Received
                      </Typography>
                      <Typography sx={{ fontSize: "30px", fontWeight: "500" }}>
                        {otherInfo?.feesReceived?.totalAmount}
                      </Typography>
                    </Grid>
                    <Grid xs={6} sm={6} md={6} lg={6} sx={{ padding: "8px 0" }}>
                      <Typography
                        sx={{ fontSize: "16px", marginBottom: "4px" }}
                      >
                        Cash Investment
                      </Typography>
                      <Typography sx={{ fontSize: "30px", fontWeight: "500" }}>
                        {otherInfo?.cashInvestment}
                      </Typography>
                    </Grid>
                    <Grid xs={6} sm={6} md={6} lg={6} sx={{ padding: "8px 0" }}>
                      <Typography
                        sx={{ fontSize: "16px", marginBottom: "4px" }}
                      >
                        Total Expense
                      </Typography>
                      <Typography sx={{ fontSize: "30px", fontWeight: "500" }}>
                        {otherInfo?.totalExpense}
                      </Typography>
                    </Grid>
                    <Grid xs={6} sm={6} md={6} lg={6} sx={{ padding: "8px 0" }}>
                      <Typography
                        sx={{ fontSize: "16px", marginBottom: "4px" }}
                      >
                        Withdrawal
                      </Typography>
                      <Typography sx={{ fontSize: "30px", fontWeight: "500" }}>
                        {otherInfo?.withdrawal}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid lg={1} md={12} sm={12} sx={{ padding: "6px" }}>
                  <Grid
                    container
                    direction="column"
                    justifyContent="flex-end"
                    alignItems="center"
                    sx={{ height: "100%" }}
                  >
                    <AccountBalanceIcon
                      sx={{
                        fontSize: "35px",
                        opacity: "0.6",
                        color: "#5559CE",
                      }}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
export default MainAccount;