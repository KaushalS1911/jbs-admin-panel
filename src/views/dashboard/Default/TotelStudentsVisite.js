import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { Divider, Grid, MenuItem, TextField, Typography } from "@mui/material";
import SkeletonTotalGrowthBarChart from "ui-component/cards/Skeleton/TotalGrowthBarChart";
import MainCard from "ui-component/cards/MainCard";
import { gridSpacing } from "store/constant";
import ReactApexChart from "react-apexcharts";
import axios from "axios";
const status = [
  {
    value: "today",
    label: "Today",
  },
  {
    value: "month",
    label: "Month",
  },
  {
    value: "year",
    label: "Year",
  },
];

const TotelStudentsVisite = ({ isLoading }) => {
  const [value, setValue] = useState("today");
  const [selectedOption, setSelectedOption] = useState("today");
  const [inquiryData, setInquiryData] = useState([]);
  const [totalVisit, setTotalVisit] = useState(0);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const url = `${process.env.REACT_APP_API_URL}${user.company_id}/inquiry`;
    axios
      .get(url)
      .then((response) => {
        setTotalVisit(response.data.data.totalStudents);
        setInquiryData(response.data.data.inquiry);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  const today = new Date();
  const filteredData = inquiryData.filter((item) => {
    const date = new Date(item.created_at);
  
    switch (selectedOption) {
      case 'today':
        return date.getDate() === today.getDate() &&
               date.getMonth() === today.getMonth() &&
               date.getFullYear() === today.getFullYear();
      case 'month':
        return date.getMonth() === today.getMonth() &&
               date.getFullYear() === today.getFullYear();
      case 'year':
        return date.getFullYear() === today.getFullYear();
      default:
        return true;
    }
  });
  
  const filterDate = filteredData.map((row) => {
    switch (selectedOption) {
      case 'today':
        return new Date(row.created_at).toLocaleDateString();
      case 'month':
        return new Date(row.created_at).toLocaleString('default', { month: 'long' });
      case 'year':
        return new Date(row.created_at).getFullYear().toString();
      default:
        return '';
    }
  });

  const chartData = filteredData.reduce((acc, item) => {
    const date = new Date(item.created_at);
    const key =
      selectedOption === "today"
        ? date.getHours().toString()
        : selectedOption === "month"
          ? date.getDate().toString()
          : date.getMonth().toString();
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});

  const TotalStudent= Object.values(chartData);
  
  let options;
  if (selectedOption === "today") {
    options = {
      chart: {
        type: "bar",
      },
      series: [
        {
          name: "student",
          data: TotalStudent
        },
      ],
      xaxis: { categories: filterDate },
      plotOptions: {
        bar: {
          columnWidth: "10%",
          borderRadius: 7,
          colors: {
            ranges: [
              {
                from: 0,
                to: 100,
                color: "#5E35B1",
              },
            ],
          },
        },
      },
      fill: {
        colors: ["#5E35B1"],
      },
      dataLabels: {
        enabled: false,
      },
    };
  } else if (selectedOption === "month") {
    options = {
      chart: {
        type: "bar",
      },
      series: [
        {
          name: "Student",
          data: TotalStudent
        },
      ],
      xaxis: {
        categories: filterDate,
      },
      plotOptions: {
        bar: {
          columnWidth: "10%",
          borderRadius: 7,
          colors: {
            ranges: [
              {
                from: 0,
                to: 100,
                color: "#5E35B1",
              },
            ],
          },
        },
      },
      fill: {
        colors: ["#5E35B1"],
      },
      dataLabels: {
        enabled: false,
      },
    };
  } else if (selectedOption === "year") {
    options = {
      chart: {
        type: "bar",
      },
      series: [
        {
          name: "Student",
          data: TotalStudent
        },
      ],
      xaxis: {
        categories: filterDate,
      },
      plotOptions: {
        bar: {
          columnWidth: "20%",
          borderRadius: 7,
          colors: {
            ranges: [
              {
                from: 0,
                to: 100,
                color: "#5E35B1",
              },
            ],
          },
        },
      },
      fill: {
        colors: ["#5E35B1"],
      },
      dataLabels: {
        enabled: false,
      },
    };
  } else {
    options = null;
  }


  return (
    <>
      {isLoading ? (
        <SkeletonTotalGrowthBarChart />
      ) : (
        <MainCard>
          <Grid container spacing={gridSpacing}>
            <Grid item xs={12} sx={{ p: 0 }}>
              <Grid
                container
                alignItems="center"
                justifyContent="space-between"
              >
                <Grid item>
                  <Grid container direction="column">
                    <Grid item>
                      <Typography variant="h3" style={{ fontSize: "18px" }}>
                        Student Visit
                      </Typography>
                      <h3 style={{ color: '#5559CE' }}>{totalVisit}</h3>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <TextField
                    id="standard-select-currency"
                    select
                    value={selectedOption}
                    onChange={(e) => setSelectedOption(e.target.value)}
                    sx={{
                      width: "120px",
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: "transparent",
                        },
                        "&:hover fieldset": {
                          borderColor: "transparent",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "transparent",
                          borderWidth: "2px",
                        },
                      },
                    }}
                  >
                   {status.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
              </Grid>
              <Divider sx={{ my: 1.5 }} />
            </Grid>
            <Grid item xs={12}>
              <ReactApexChart
                options={options}
                series={options.series}
                type="bar"
                height={350}
              />
            </Grid>
          </Grid>
        </MainCard>
      )}
    </>
  );
};

TotelStudentsVisite.propTypes = {
  isLoading: PropTypes.bool,
};
export default TotelStudentsVisite;
