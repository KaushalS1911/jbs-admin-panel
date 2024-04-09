import React from "react";
import Grid from "@mui/material/Grid";
import * as Yup from "yup";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { renderTimeViewClock } from "@mui/x-date-pickers/timeViewRenderers";
import { useFormik } from "formik";
import axios from "axios";
import {notification } from "antd";


function Follow({ id, setIsFollowOpen }) {
  //notification
  const openNotificationWithIcon = (type, message) => {
    notification[type]({
      message: message,
    });
  };
  const validationSchema = Yup.object({
    faculty_name: Yup.string().required("Faculty name is required"),
    note: Yup.string().required("Note is required"),
    date: Yup.date().required("Date is required"),
    time: Yup.date().required("Time is required"),
  });
  function formatDate(inputDate) {
    const originalDate = new Date(inputDate);
    const day = originalDate.getDate();
    const month = originalDate.getMonth() + 1;
    const year = originalDate.getFullYear();
    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;
    return `${year}-${formattedMonth}-${formattedDay}`;
  }
  function formatTime(inputTime) {
    const originalTime = new Date(inputTime);
    const hours = originalTime.getHours();
    const minutes = originalTime.getMinutes();
    const amPM = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${formattedHours}:${formattedMinutes} ${amPM}`;
  }
  const HandleSubmit = async (values, { resetForm }) => {
    const formattedDate = formatDate(values.date);
    const formattedTime = formatTime(values.time);
    const finalObject = {
      entries: [
        {
          faculty_name: values.faculty_name,
          note: values.note,
          date: formattedDate,
          time: formattedTime,
        },
      ],
      inquiry_id: id,
    };
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const apiEndpoint = `${process.env.REACT_APP_API_URL}${user.company_id}/demo`;
      const response = await axios.post(apiEndpoint, finalObject);
      openNotificationWithIcon("success", response.data.message);
      setIsFollowOpen(false)
      resetForm();
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };
  const formik = useFormik({
    initialValues: {
      faculty_name: "",
      note: "",
      date: null,
      time: null,
    },
    validationSchema: validationSchema,
    onSubmit: HandleSubmit,
  });
  return (
    <form action="" method="POST" onSubmit={HandleSubmit}>
      <FormControl
        defaultValue=""
        required
        sx={{
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
              borderWidth: "2px",
            },
          },
        }}
        size="small"
      >
        <Grid
          container
          spacing={2}
          justifyContent={"flex-end"}
          sx={{ padding: "20px 0 " }}
        >
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
            <FormControl
              item={true}
              fullWidth
              error={
                formik.touched.faculty_name &&
                Boolean(formik.errors.faculty_name)
              }
            >
              <InputLabel
                id="demo-simple-select-label"
                style={{ color: "#5559CE" }}
              >
                Faculty Name
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="faculty_name"
                label="Faculty Name"
                value={formik.values.faculty_name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                inputProps={{ style: { color: "#5559CE" } }}
              >
                <MenuItem value={"Arshil sir"}>Arshil sir</MenuItem>
                <MenuItem value={"Ariyan sir"}>Ariyan sir</MenuItem>
                <MenuItem value={"Abhishek sir"}>Abhishek sir</MenuItem>
                <MenuItem value={"Rutvik sir"}>Rutvik sir</MenuItem>
                <MenuItem value={"Jay sir"}>Jay sir</MenuItem>
              </Select>
              {formik.touched.faculty_name && formik.errors.faculty_name && (
                <div style={{ color: "red" }}>{formik.errors.faculty_name}</div>
              )}
            </FormControl>
          </Grid>
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                label="Date and Time"
                viewRenderers={{
                  hours: renderTimeViewClock,
                  minutes: renderTimeViewClock,
                  seconds: renderTimeViewClock,
                }}
                value={formik.values.date}
                onChange={(newValue) => {
                  formik.setFieldValue("date", newValue);
                  formik.setFieldValue("time", newValue);
                }}
                onBlur={formik.handleBlur}
                renderInput={(props) => <TextField {...props} />}
                InputLabelProps={{ style: { color: "#5559CE" } }}
              />
            </LocalizationProvider>
            {formik.touched.date && formik.errors.date && (
              <div style={{ color: "red" }}>{formik.errors.date}</div>
            )}
            {formik.touched.time && formik.errors.time && (
              <div style={{ color: "red" }}>{formik.errors.time}</div>
            )}
          </Grid>
          <Grid item fullWidth xl={12} lg={12} md={12} sm={12} xs={12}>
            <textarea
              className="text-Note"
              id="w3review"
              name="note"
              placeholder="Notes"
              rows="4"
              cols="50"
              value={formik.values.note}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.note && formik.errors.note && (
              <div style={{ color: "red" }}>{formik.errors.note}</div>
            )}
          </Grid>
          <Grid>
            <Button
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: "#5559CE",
                color: "#fff",
                marginRight: "10px",
                marginTop: "15px",
                height: "35px",
                lineHeight: "35px",
                "&:hover": { backgroundColor: "#5559CE" },
              }}
              onClick={formik.handleSubmit}
            >
              Add Demo
            </Button>
          </Grid>
        </Grid>
      </FormControl>
    </form>
  );
}
export default Follow;
