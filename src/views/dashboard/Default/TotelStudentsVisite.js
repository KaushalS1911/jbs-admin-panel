import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { Divider, Grid, MenuItem, TextField, Typography } from "@mui/material";
import SkeletonTotalGrowthBarChart from "ui-component/cards/Skeleton/TotalGrowthBarChart";
import MainCard from "ui-component/cards/MainCard";
import { gridSpacing } from "store/constant";
import ReactApexChart from "react-apexcharts";
import axios from "axios";
import { useMemo } from "react";

const optionsList = [
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

const commonOptions = {
  chart: {
    type: "bar",
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

const TotelStudentsVisite = ({ isLoading }) => {
  const [selectedOption, setSelectedOption] = useState("today");
  const [inquiryData, setInquiryData] = useState([]);
  const [totalVisit, setTotalVisit] = useState(0);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const url = `${process.env.REACT_APP_API_URL}${user?.company_id}/inquiry`;
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

  const filteredData = useMemo(() => {
    const today = new Date();
    return inquiryData.filter((item) => {
      const date = new Date(item.created_at);
      switch (selectedOption) {
        case "today":
          return (
            date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear()
          );
        // case "month":
        // const isFirstDayOfMonth = date.getDate() === 1;
        // const isCurrentOrPreviousMonth =
        //   date.getMonth() === today.getMonth() ||
        //   (isFirstDayOfMonth && date.getMonth() === today.getMonth() - 1);
        // return (
        //   isCurrentOrPreviousMonth &&
        //   date.getFullYear() === today.getFullYear()
        // );
        case "month":
          const isFirstFewDaysOfMonth = date.getDate() <= 5;
          const isCurrentOrPreviousMonth =
            date.getMonth() === today.getMonth() ||
            (isFirstFewDaysOfMonth && date.getMonth() === today.getMonth() - 1);
          return (
            isCurrentOrPreviousMonth &&
            date.getFullYear() === today.getFullYear()
          );
        case "year":
          return date.getFullYear() === today.getFullYear();
        default:
          return true;
      }
    });
  }, [inquiryData, selectedOption]);

  const { filterDate, TotalStudent } = useMemo(() => {
    const today = new Date();
    let filterDate = [];
    let TotalStudent = {};
    switch (selectedOption) {
      case "today":
        const todayStart = new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate(),
          0,
          0,
          0
        );
        const todayEnd = new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate(),
          23,
          59,
          59
        );
        const prevDays = 2;
        const nextDays = 2;
        const filterDates = [];
        for (let i = prevDays; i > 0; i--) {
          const prevDate = new Date(todayStart);
          prevDate.setDate(todayStart.getDate() - i);
          filterDates.push(prevDate.toLocaleDateString());
        }
        filterDates.push(today.toLocaleDateString());
        for (let i = 1; i <= nextDays; i++) {
          const nextDate = new Date(todayStart);
          nextDate.setDate(todayStart.getDate() + i);
          filterDates.push(nextDate.toLocaleDateString());
        }
        const todayFilteredData = filteredData.filter((item) => {
          const itemDate = new Date(item.created_at);
          return itemDate >= todayStart && itemDate <= todayEnd;
        });
        for (const date of filterDates) {
          const count = todayFilteredData.filter(
            (item) => new Date(item.created_at).toLocaleDateString() === date
          ).length;
          TotalStudent[date] = count;
        }
        filterDate = filterDates;
        break;

      case "month":
        const currentYear = today.getFullYear();
        const monthsData = Array.from({ length: 12 }, (_, index) => {
          const monthStartDate = new Date(currentYear, index, 1);
          const monthName = monthStartDate.toLocaleString("default", {
            month: "long",
          });
          const monthFilteredData = filteredData.filter((item) => {
            const itemDate = new Date(item.created_at);
            return (
              itemDate.getMonth() === index &&
              itemDate.getFullYear() === currentYear
            );
          });
          const studentCount = monthFilteredData.length;
          TotalStudent[monthName] = studentCount;
          return { month: monthName, studentCount };
        });
        filterDate = monthsData.map((data) => data.month);
        break;

      case "year":
        const earliestDate = new Date(
          Math.min(...filteredData.map((item) => new Date(item.created_at)))
        );
        const latestDate = new Date(
          Math.max(...filteredData.map((item) => new Date(item.created_at)))
        );
        const earliestYear = earliestDate.getFullYear();
        const latestYear = latestDate.getFullYear();
        const yearRange = latestYear - earliestYear + 1;
        filterDate = Array.from({ length: yearRange }, (_, index) =>
          (earliestYear + index).toString()
        );
        TotalStudent = filteredData.reduce((acc, item) => {
          const date = new Date(item.created_at);
          const year = date.getFullYear().toString();
          acc[year] = (acc[year] || 0) + 1;
          return acc;
        }, {});
        break;

      default:
        break;
    }
    return { filterDate, TotalStudent };
  }, [filteredData, selectedOption]);



  const options = useMemo(
    () => ({
      ...commonOptions,
      series: [{ name: "Student", data: Object.values(TotalStudent) }],
      xaxis: { categories: filterDate },
    }
    ),
    [TotalStudent, filterDate]
  );
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
                      <h3 style={{ color: "#5559CE" }}>{totalVisit}</h3>
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
                    {optionsList.map((option) => (
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
                height={335}
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

// export default TotelStudentsVisite;
// import PropTypes from "prop-types";
// import { useState, useEffect } from "react";
// import { Divider, Grid, MenuItem, TextField, Typography } from "@mui/material";
// import SkeletonTotalGrowthBarChart from "ui-component/cards/Skeleton/TotalGrowthBarChart";
// import MainCard from "ui-component/cards/MainCard";
// import { gridSpacing } from "store/constant";
// import ReactApexChart from "react-apexcharts";
// import axios from "axios";
// import { useMemo } from "react";

// const optionsList = [
//   {
//     value: "today",
//     label: "Today",
//   },
//   {
//     value: "month",
//     label: "Month",
//   },
//   {
//     value: "year",
//     label: "Year",
//   },
// ];

// const commonOptions = {
//   chart: {
//     type: "bar",
//   },
//   plotOptions: {
//     bar: {
//       columnWidth: "10%",
//       borderRadius: 7,
//       colors: {
//         ranges: [
//           {
//             from: 0,
//             to: 100,
//             color: "#5E35B1",
//           },
//         ],
//       },
//     },
//   },
//   fill: {
//     colors: ["#5E35B1"],
//   },
//   dataLabels: {
//     enabled: false,
//   },
// };

// const TotelStudentsVisite = ({ isLoading }) => {
//   const [selectedOption, setSelectedOption] = useState("today");
//   const [inquiryData, setInquiryData] = useState([]);
//   const [totalVisit, setTotalVisit] = useState(0);

//   useEffect(() => {
//     const user = JSON.parse(localStorage.getItem("user"));
//     const url = `${process.env.REACT_APP_API_URL}${user?.company_id}/inquiry`;
//     axios
//       .get(url)
//       .then((response) => {
//         setTotalVisit(response.data.data.totalStudents);
//         setInquiryData(response.data.data.inquiry);
//       })
//       .catch((error) => {
//         console.error("Error fetching data: ", error);
//       });
//   }, []);

//   const filteredData = useMemo(() => {
//     const today = new Date();
//     return inquiryData.filter((item) => {
//       const date = new Date(item.created_at);
//       switch (selectedOption) {
//         case "today":
//           return (
//             date.getDate() === today.getDate() &&
//             date.getMonth() === today.getMonth() &&
//             date.getFullYear() === today.getFullYear()
//           );
//         case "month":
//           return (
//             date.getMonth() === today.getMonth() &&
//             date.getFullYear() === today.getFullYear()
//           );
//         case "year":
//           return (
//             date.getFullYear() === today.getFullYear() &&
//             !(
//               date.getMonth() === today.getMonth() &&
//               date.getFullYear() === today.getFullYear()
//             )
//           );
//         default:
//           return true;
//       }
//     });
//   }, [inquiryData, selectedOption]);

//   const { filterDate, TotalStudent } = useMemo(() => {
//     const today = new Date();
//     let filterDate = [];
//     let TotalStudent = {};
//     switch (selectedOption) {
//       case "today":
//         filterDate = [today.toLocaleDateString()];
//         TotalStudent = {
//           [today.toLocaleDateString()]: filteredData.length,
//         };
//         break;
//       case "month":
//         const currentMonth = today.getMonth();
//         const currentYear = today.getFullYear();
//         const daysInMonth = new Date(
//           currentYear,
//           currentMonth + 1,
//           0
//         ).getDate();
//         filterDate = Array.from({ length: daysInMonth }, (_, index) =>
//           new Date(currentYear, currentMonth, index + 1).toLocaleDateString()
//         );
//         filterDate = filterDate.filter((date) => new Date(date) <= today);
//         filterDate = filterDate.map((date) =>
//           new Date(date).toLocaleDateString()
//         );
//         filterDate.forEach((date) => {
//           const count = filteredData.filter(
//             (item) => new Date(item.created_at).toLocaleDateString() === date
//           ).length;
//           TotalStudent[date] = count;
//         });
//         break;
//       case "year":
//         const currentYearData = {};
//         inquiryData.forEach((item) => {
//           const date = new Date(item.created_at).toLocaleDateString();
//           if (date.includes(today.getFullYear())) {
//             if (!currentYearData[date]) {
//               currentYearData[date] = 0;
//             }
//             currentYearData[date]++;
//           }
//         });
//         filterDate = Object.keys(currentYearData);
//         TotalStudent = currentYearData;
//         break;
//       default:
//         break;
//     }
//     return { filterDate, TotalStudent };
//   }, [filteredData, inquiryData, selectedOption]);

//   const options = useMemo(
//     () => ({
//       ...commonOptions,
//       series: [{ name: "Student", data: Object.values(TotalStudent) }],
//       xaxis: { categories: filterDate },
//     }),
//     [TotalStudent, filterDate]
//   );

//   return (
//     <>
//       {isLoading ? (
//         <SkeletonTotalGrowthBarChart />
//       ) : (
//         <MainCard>
//           <Grid container spacing={gridSpacing}>
//             <Grid item xs={12} sx={{ p: 0 }}>
//               <Grid
//                 container
//                 alignItems="center"
//                 justifyContent="space-between"
//               >
//                 <Grid item>
//                   <Grid container direction="column">
//                     <Grid item>
//                       <Typography variant="h3" style={{ fontSize: "18px" }}>
//                         Student Visit
//                       </Typography>
//                       <h3 style={{ color: "#5559CE" }}>{totalVisit}</h3>
//                     </Grid>
//                   </Grid>
//                 </Grid>
//                 <Grid item>
//                   <TextField
//                     id="standard-select-currency"
//                     select
//                     value={selectedOption}
//                     onChange={(e) => setSelectedOption(e.target.value)}
//                     sx={{
//                       width: "120px",
//                       "& .MuiOutlinedInput-root": {
//                         "& fieldset": {
//                           borderColor: "transparent",
//                         },
//                         "&:hover fieldset": {
//                           borderColor: "transparent",
//                         },
//                         "&.Mui-focused fieldset": {
//                           borderColor: "transparent",
//                           borderWidth: "2px",
//                         },
//                       },
//                     }}
//                   >
//                     {optionsList.map((option) => (
//                       <MenuItem key={option.value} value={option.value}>
//                         {option.label}
//                       </MenuItem>
//                     ))}
//                   </TextField>
//                 </Grid>
//               </Grid>
//               <Divider sx={{ my: 1.5 }} />
//             </Grid>
//             <Grid item xs={12}>
//               <ReactApexChart
//                 options={options}
//                 series={options.series}
//                 type="bar"
//                 height={350}
//               />
//             </Grid>
//           </Grid>
//         </MainCard>
//       )}
//     </>
//   );
// };

// TotelStudentsVisite.propTypes = {
//   isLoading: PropTypes.bool,
// };

export default TotelStudentsVisite;
