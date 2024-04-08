import React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import MainCard from "ui-component/cards/MainCard";
import axios from "axios";
import { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  Chip,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import moment from "moment";
import { Button } from "antd";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_green.css";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import AttendanceView from "./AttendanceView";

// ==============================|| TYPOGRAPHY ||============================== //

const Attendance = () => {
  const [value, setValue] = useState("1");
  const [batches, setBatches] = useState([]);
  const [select, setSelect] = useState("");
  const [option, setOption] = useState({});
  // const navigate = useNavigate();
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
  const columns = [
    {
      field: "id",
      headerName: "ID",
      disableColumnMenu: true,
      sortable: false,
      width: 100,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "technology",
      headerName: "Technology",
      sortable: false,
      width: 310,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "batch_time",
      headerName: "Batch Time",
      sortable: false,
      width: 310,
      headerAlign: "center",
      align: "center",
    },
  ];

  function handleSelectChange(e) {
    let { value } = e.target;
    setSelect(value);
  }

  function selectItem(option) {
    console.log(option);
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
              >
                <Tab label="Students" value="1" />
                <Tab label="Employees" value="2" />
              </TabList>
            </Box>

            <TabPanel value="1">
              <Grid
                container
                justifyContent="space-between"
                alignItems="center"
              >
                <Grid lg={7}>
                  <FormControl item={true} fullWidth>
                    <InputLabel id="interested-in-label">
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

                <Grid lg={4}>
                  <Box
                    className="flatpicker"
                    style={{
                      outline: "none",
                      margin: "10px 0",
                      whiteSpace: "nowrap",
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
