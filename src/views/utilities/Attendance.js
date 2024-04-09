import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import MainCard from "ui-component/cards/MainCard";
import axios from "axios";
import moment from "moment";
import { Grid, MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AttendanceView from "./AttendanceView";
import { display } from "@mui/system";

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

  const handleSelectChange = (e) => {
    const value = e.target.value;
    const selectedOption = batches.find((batch) => batch.technology === value);
    setSelect(value);
    setOption(selectedOption);
  };

  const rows = option.batch_members
    ? option.batch_members.map((item, index) => ({
        id: index + 1,
        fullName: `${item.firstName} ${item.lastName}`,
        studentId: item.student_id,
      }))
    : [];

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <MainCard>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Students" value="1" />
              <Tab label="Employees" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <Grid item style={{padding:'10px'}}>
              <Grid container justifyContent="space-between" alignItems="center">
                <Grid item lg={6} md={6} sm={12} xs={12}>
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
                    <InputLabel
                      id="interested-in-label"
                      style={{ color: "#5559ce" }}
                    >
                      Interested In
                    </InputLabel>
                    <Select
                      labelId="interested-in-label"
                      id="interested-in"
                      value={select}
                      onChange={handleSelectChange}
                      label="interestedin"
                    >
                      {batches.map((option) => (
                        <MenuItem key={option._id} value={option.technology}>
                          {option.technology}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <Box
                    className="flatpicker"
                    sx={{
                      outline: "none",
                      margin: "10px 0",
                      whiteSpace: "nowrap",
                      display: "flex",
                      justifyContent: "end",
                      alignItems: "center",
                    }}
                  >
                    <label
                      htmlFor="rows-per-page"
                      style={{ minWidth: "fit-content", marginRight: "5px" }}
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
            </Grid>
            <AttendanceView option={option} startDate={startDate} />
          </TabPanel>
          <TabPanel value="2"></TabPanel>
        </MainCard>
      </TabContext>
    </Box>
  );
};

export default Attendance;
