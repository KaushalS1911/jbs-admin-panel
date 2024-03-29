import React from "react";
import Flatpickr from "react-flatpickr";
import { Box } from "@mui/system";
import { useState } from "react";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import ReceiptIcon from "@mui/icons-material/Receipt";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import { Button, Grid, Typography } from "@mui/material";
import MainCard from "ui-component/cards/MainCard";
import axios from "axios";
import { useEffect } from "react";

const MainAccount = () => {
  const [selectedDates, setSelectedDates] = useState([]);
  const [accountData, setAccountData] = useState([]);

  useEffect(() => {
    fetchData();
  }, [selectedDates]);

  const onDateChange = (selectedDates) => {
    setSelectedDates(selectedDates);
  };

  const fetchData = async () => {
    if (selectedDates.length === 2) {
      const startDate = selectedDates[0].toISOString().split("T")[0];
      const endDate = selectedDates[1].toISOString().split("T")[0];
      const apiEndpoint = `https://admin-api-tc8e.onrender.com/api/company/65cdca53216caf4d8d009023/account?startDate=${startDate}&endDate=${endDate}`;
      try {
        const response = await axios.get(apiEndpoint);
        const data = response.data.data.data;
        setAccountData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };


  console.log("accountData",accountData)

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
          <Button
            onClick={fetchData}
            sx={{
              backgroundColor: "#5559CE",
              color: "#EDE7F6",
              margin: "0 15px",
            }}
          >
            View
          </Button>
        </Box>
      </MainCard>

    
      <Box sx={{ width: "100%", marginTop: "10px" }}>
        <Grid
          container
          spacing={2}
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 4 }}
        >
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <Grid
              sx={{
                boxShadow: 1,
                padding: "10px",
                borderRadius: "10px",
                backgroundColor: "#fff",
              }}
            >
              <Box>
                <Typography
                  sx={{
                    fontSize: "16px",
                    fontWeight: "600",
                    marginBottom: "6px",
                  }}
                >
                  Student Details
                </Typography>
                <Typography sx={{ color: "#16A34A" }}>
                  Paid on march 8,2024
                </Typography>
              </Box>
              <Grid container direction="row">
                <Grid lg={11} md={11} sm={12}>
                  <Grid container spacing={1} sx={{ padding: "20px 10px" }}>
                    <Grid xs={6} sm={6} md={6} lg={6} sx={{ padding: "8px 0" }}>
                      <Typography
                        sx={{ fontSize: "16px", marginBottom: "4px" }}
                      >
                        New Addmision
                      </Typography>
                      <Typography sx={{ fontSize: "30px", fontWeight: "500" }}>
                        500
                      </Typography>
                    </Grid>
                    <Grid xs={6} sm={6} md={6} lg={6} sx={{ padding: "8px 0" }}>
                      <Typography
                        sx={{ fontSize: "16px", marginBottom: "4px" }}
                      >
                        Existing Addmision
                      </Typography>
                      <Typography sx={{ fontSize: "30px", fontWeight: "500" }}>
                        769
                      </Typography>
                    </Grid>
                    <Grid xs={6} sm={6} md={6} lg={6} sx={{ padding: "8px 0" }}>
                      <Typography
                        sx={{ fontSize: "16px", marginBottom: "4px" }}
                      >
                        Leave Addmision
                      </Typography>
                      <Typography sx={{ fontSize: "30px", fontWeight: "500" }}>
                        287
                      </Typography>
                    </Grid>
                    <Grid xs={6} sm={6} md={6} lg={6} sx={{ padding: "8px 0" }}>
                      <Typography
                        sx={{ fontSize: "16px", marginBottom: "4px" }}
                      >
                        Couse Completed
                      </Typography>
                      <Typography sx={{ fontSize: "30px", fontWeight: "500" }}>
                        127
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid lg={1} md={1} sm={12} sx={{ padding: "6px" }}>
                  <Grid
                    container
                    direction="column"
                    justifyContent="flex-end"
                    alignItems="center"
                    sx={{ height: "100%" }}
                  >
                    <PeopleOutlineIcon
                      sx={{
                        fontSize: "50px",
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
                padding: "10px",
                borderRadius: "10px",
                backgroundColor: "#fff",
              }}
            >
              <Box>
                <Typography
                  sx={{
                    fontSize: "16px",
                    fontWeight: "600",
                    marginBottom: "6px",
                  }}
                >
                  Revenue Details
                </Typography>
                <Typography sx={{ color: "#DC2626" }}>
                  Paid on march 8,2024
                </Typography>
              </Box>
              <Grid container direction="row">
                <Grid lg={11} md={11} sm={12}>
                  <Grid container spacing={1} sx={{ padding: "20px 10px" }}>
                    <Grid xs={6} sm={6} md={6} lg={6} sx={{ padding: "8px 0" }}>
                      <Typography
                        sx={{ fontSize: "16px", marginBottom: "4px" }}
                      >
                        Opening Pending Fees
                      </Typography>
                      <Typography sx={{ fontSize: "30px", fontWeight: "500" }}>
                        500
                      </Typography>
                    </Grid>
                    <Grid xs={6} sm={6} md={6} lg={6} sx={{ padding: "8px 0" }}>
                      <Typography
                        sx={{ fontSize: "16px", marginBottom: "4px" }}
                      >
                        Fees receivable
                      </Typography>
                      <Typography sx={{ fontSize: "30px", fontWeight: "500" }}>
                        769
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
                        287
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
                        127
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid lg={1} md={1} sm={12} sx={{ padding: "6px" }}>
                  <Grid
                    container
                    direction="column"
                    justifyContent="flex-end"
                    alignItems="center"
                    sx={{ height: "100%" }}
                  >
                    <ReceiptIcon
                      sx={{
                        fontSize: "50px",
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
                padding: "10px",
                borderRadius: "10px",
                backgroundColor: "#fff",
              }}
            >
              <Box>
                <Typography
                  sx={{
                    fontSize: "16px",
                    fontWeight: "600",
                    marginBottom: "6px",
                  }}
                >
                  Expense Details
                </Typography>
                <Typography sx={{ color: "#F59E0B" }}>
                  Paid on march 8,2024
                </Typography>
              </Box>
              <Grid container direction="row">
                <Grid lg={11} md={11} sm={12}>
                  <Grid container spacing={1} sx={{ padding: "20px 10px" }}>
                    <Grid xs={6} sm={6} md={6} lg={6} sx={{ padding: "8px 0" }}>
                      <Typography
                        sx={{ fontSize: "16px", marginBottom: "4px" }}
                      >
                        Rent
                      </Typography>
                      <Typography sx={{ fontSize: "30px", fontWeight: "500" }}>
                        500
                      </Typography>
                    </Grid>
                    <Grid xs={6} sm={6} md={6} lg={6} sx={{ padding: "8px 0" }}>
                      <Typography
                        sx={{ fontSize: "16px", marginBottom: "4px" }}
                      >
                        Electricity bill
                      </Typography>
                      <Typography sx={{ fontSize: "30px", fontWeight: "500" }}>
                        769
                      </Typography>
                    </Grid>
                    <Grid xs={6} sm={6} md={6} lg={6} sx={{ padding: "8px 0" }}>
                      <Typography
                        sx={{ fontSize: "16px", marginBottom: "4px" }}
                      >
                        Salary
                      </Typography>
                      <Typography sx={{ fontSize: "30px", fontWeight: "500" }}>
                        287
                      </Typography>
                    </Grid>
                    <Grid xs={6} sm={6} md={6} lg={6} sx={{ padding: "8px 0" }}>
                      <Typography
                        sx={{ fontSize: "16px", marginBottom: "4px" }}
                      >
                        Stationary
                      </Typography>
                      <Typography sx={{ fontSize: "30px", fontWeight: "500" }}>
                        127
                      </Typography>
                    </Grid>
                    <Grid xs={6} sm={6} md={6} lg={6} sx={{ padding: "8px 0" }}>
                      <Typography
                        sx={{ fontSize: "16px", marginBottom: "4px" }}
                      >
                        Maintenance(Ac /Computer)
                      </Typography>
                      <Typography sx={{ fontSize: "30px", fontWeight: "500" }}>
                        127
                      </Typography>
                    </Grid>
                    <Grid xs={6} sm={6} md={6} lg={6} sx={{ padding: "8px 0" }}>
                      <Typography
                        sx={{ fontSize: "16px", marginBottom: "4px" }}
                      >
                        New Assets Purchase
                      </Typography>

                      <Typography sx={{ fontSize: "30px", fontWeight: "500" }}>
                        127
                      </Typography>
                    </Grid>
                    <Grid xs={6} sm={6} md={6} lg={6} sx={{ padding: "8px 0" }}>
                      <Typography
                        sx={{ fontSize: "16px", marginBottom: "4px" }}
                      >
                        Office Expenses
                      </Typography>

                      <Typography sx={{ fontSize: "30px", fontWeight: "500" }}>
                        127
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid lg={1} md={1} sm={12} sx={{ padding: "6px" }}>
                  <Grid
                    container
                    direction="column"
                    justifyContent="flex-end"
                    alignItems="center"
                    sx={{ height: "100%" }}
                  >
                    <CurrencyRupeeIcon
                      sx={{
                        fontSize: "50px",
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
                padding: "10px",
                borderRadius: "10px",
                backgroundColor: "#fff",
              }}
            >
              <Box>
                <Typography
                  sx={{
                    fontSize: "16px",
                    fontWeight: "600",
                    marginBottom: "6px",
                  }}
                >
                  Cash/Bank Tally
                </Typography>
                <Typography sx={{ color: "#5559CE" }}>
                  Paid on march 8,2024
                </Typography>
              </Box>
              <Grid container direction="row">
                <Grid lg={11} md={11} sm={12}>
                  <Grid container spacing={1} sx={{ padding: "20px 10px" }}>
                    <Grid xs={6} sm={6} md={6} lg={6} sx={{ padding: "8px 0" }}>
                      <Typography
                        sx={{ fontSize: "16px", marginBottom: "4px" }}
                      >
                        Opening Cash
                      </Typography>
                      <Typography sx={{ fontSize: "30px", fontWeight: "500" }}>
                        500
                      </Typography>
                    </Grid>
                    <Grid xs={6} sm={6} md={6} lg={6} sx={{ padding: "8px 0" }}>
                      <Typography
                        sx={{ fontSize: "16px", marginBottom: "4px" }}
                      >
                        Fees Recived
                      </Typography>
                      <Typography sx={{ fontSize: "30px", fontWeight: "500" }}>
                        769
                      </Typography>
                    </Grid>
                    <Grid xs={6} sm={6} md={6} lg={6} sx={{ padding: "8px 0" }}>
                      <Typography
                        sx={{ fontSize: "16px", marginBottom: "4px" }}
                      >
                        Cash Investment
                      </Typography>
                      <Typography sx={{ fontSize: "30px", fontWeight: "500" }}>
                        287
                      </Typography>
                    </Grid>
                    <Grid xs={6} sm={6} md={6} lg={6} sx={{ padding: "8px 0" }}>
                      <Typography
                        sx={{ fontSize: "16px", marginBottom: "4px" }}
                      >
                        Total Expense
                      </Typography>
                      <Typography sx={{ fontSize: "30px", fontWeight: "500" }}>
                        127
                      </Typography>
                    </Grid>
                    <Grid xs={6} sm={6} md={6} lg={6} sx={{ padding: "8px 0" }}>
                      <Typography
                        sx={{ fontSize: "16px", marginBottom: "4px" }}
                      >
                        Withdrwal
                      </Typography>
                      <Typography sx={{ fontSize: "30px", fontWeight: "500" }}>
                        127
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid lg={1} md={1} sm={12} sx={{ padding: "6px" }}>
                  <Grid
                    container
                    direction="column"
                    justifyContent="flex-end"
                    alignItems="center"
                    sx={{ height: "100%" }}
                  >
                    <AccountBalanceIcon
                      sx={{
                        fontSize: "50px",
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
