import React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { useEffect } from "react";
import MainCard from "ui-component/cards/MainCard";
import axios from "axios";
import { useState } from "react";
import { gridSpacing } from "store/constant";
import { FormControl, Grid, InputLabel, MenuItem, Select } from "@mui/material";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AttendanceView from "./AttendanceView";

// ==============================|| TYPOGRAPHY ||============================== //

const Attendance = () => {
  const [value, setValue] = useState("1");
  const [batches, setBatches] = useState([]);
  const [select, setSelect] = useState("");
  const [option, setOption] = useState({});
  const [startDate, setStartDate] = useState(new Date());

  const user = JSON.parse(localStorage.getItem("user"));

  const fetchData = async () => {
    const apiEndpoint = `${process.env.REACT_APP_API_URL}${user.company_id}/batch`;
    try {
      const response = await axios.get(apiEndpoint);
      setBatches(response.data.data.batches);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleChange = (_, newValue) => {
    setValue(newValue);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const rows = batches
    ? batches.map((item, index) => ({
        rowId: item._id,
        id: index + 1,
        technology: item.technology,
        batch_time: moment(item.batch_time).format("hh:mm A"),
        note: item.note,
        lab_name: item.lab_name,

        batch_members: item.batch_members,
      }))
    : [];

  function handleSelectChange(e) {
    let { value } = e.target;
    setSelect(value);
  }

  function selectItem(option) {
    setOption(option);
  }

  return (
    <>
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={value}>
          <MainCard>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
                style={{color:'#0b8e8d'}}
              >
                <Tab label="Students" value="1"  style={{color:'#0b8e8d'}}/>
                <Tab label="Employees" value="2"  style={{color:'#0b8e8d'}}/>
              </TabList>
            </Box>

            <TabPanel value="1">
              <MainCard>
                <FormControl
                  sx={{
                    m: 1,
                    p: 0,
                    minWidth: 120,
                    width: "100%",
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "#0b8e8d",
                      },
                      "&:hover fieldset": {
                        borderColor: "#0b8e8d",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#0b8e8d",
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
                        <FormControl item={true} fullWidth>
                          <InputLabel id="interested-in-label" style={{ color: "#0b8e8d" }}>
                            Interested In
                          </InputLabel>
                          <Select
                            labelId="interested-in-label"
                            id="interested-in"
                            label="interestedin"
                            onChange={handleSelectChange}
                          >
                            {rows?.map((option) => (
                              <MenuItem
                                key={option}
                                value={option.technology}
                                onClick={() => selectItem(option)}
                              >
                                {option.technology}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>
                    </Grid>
                    <Grid
                      item
                      display={{
                        xs: "flex",
                        sm: "flex",
                        md: "flex",
                        lg: "flex",
                      }}
                      justifyContent={{
                        xs: "normal",
                        sm: "space-between",
                        md: "space-between",
                        lg: "flex-end",
                      }}
                      flexDirection={{
                        xs: "column",
                        sm: "row",
                        md: "row",
                        lg: "row",
                      }}
                      alignItems={"center"}
                      lg={8}
                      md={12}
                      xs={12}
                      sm={12}
                    >
                      <Box
                        className="flatpicker"
                        style={{
                          outline: "none",
                          margin: "10px",
                          whiteSpace: "nowrap",
                        }}
                      >
                        <label
                          htmlFor="rows-per-page"
                          style={{
                            minWidth: "fit-content",
                            marginRight: "5px",
                          }}
                        >
                          Date :
                        </label>
                        <DatePicker
                          selected={startDate}
                          onChange={(date) => setStartDate(date)}
                        />
                      </Box>
                    </Grid>
                  </Grid>
                </FormControl>
              </MainCard>

              <AttendanceView
                option={option}
                handleSelectChange={handleSelectChange}
              />
            </TabPanel>
            <TabPanel value="2"></TabPanel>
          </MainCard>
        </TabContext>
      </Box>
    </>
  );
};

export default Attendance;
