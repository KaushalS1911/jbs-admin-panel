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
import { useState } from "react";
import { useEffect } from "react";
import dayjs from "dayjs";
import axios from "axios";
import moment from "moment";
import { notification } from "antd";
const initialValues = {
  faculty_name: "",
  note: "",
  date: null,
  time: null,
};
const validationSchema = Yup.object({
  faculty_name: Yup.string().required("Faculty name is required"),
  note: Yup.string().required("Note is required"),
});
const EditDemo = ({ entryData, myRowId, setEditOpen, fetchDemo }) => {
  const [formData, setFormData] = useState("");
  const openNotificationWithIcon = (type, message) => {
    notification[type]({
      message: message,
    });
  };
  useEffect(() => {
    if (entryData && entryData._id) {
      setFormData(entryData);
    } else {
      setFormData(initialValues);
    }
  }, [formData]);
  function formatDate(inputDate) {
    const originalDate = moment(inputDate);
    return originalDate.format("YYYY-MM-DD");
  }
  function formatTime(inputTime) {
    const originalTime = moment(inputTime, "HH:mm:ss");
    return originalTime.format("hh:mm A");
  }
  const HandleSubmit = async (values) => {
    const formattedDate = formatDate(values.date);
    const formattedTime = formatTime(values.time);
    const finalObject = {
      faculty_name: values.faculty_name,
      note: values.note,
      date: formattedDate,
      time: formattedTime,
    };
    const user = JSON.parse(localStorage.getItem("user"));
    try {
      const apiEndpoint = `${process.env.REACT_APP_API_URL}${user.company_id}/${myRowId}/${entryData._id}/updateDemo`;
      const response = await axios.put(apiEndpoint, finalObject);
      setEditOpen(false);
      if (response.status === 200) {
        fetchDemo();
        setEditOpen(false);
        openNotificationWithIcon("success", "Demo Update Successfully!");
      }
    } catch (error) {
      console.error("API Error:", error);
    }
  };
  const formik = useFormik({
    initialValues: entryData,
    validationSchema: validationSchema,
    enableReinitialize: true,
    onSubmit: HandleSubmit,
  });
  return (
    <>
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
            sx={{ padding: "20px 30px " }}
          >
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
              <FormControl
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
                  <div style={{ color: "red" }}>
                    {formik.errors.faculty_name}
                  </div>
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
                  value={dayjs(formik.values.date, formik.values.time)}
                  onChange={(newValue) => {
                    formik.setFieldValue("date", newValue.toDate());
                    formik.setFieldValue("time", newValue.toDate());
                  }}
                  onBlur={formik.handleBlur}
                  renderInput={(props) => <TextField {...props} />}
                  InputLabelProps={{ style: { color: "#5559CE" } }}
                />
              </LocalizationProvider>
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
                Save
              </Button>
            </Grid>
          </Grid>
        </FormControl>
      </form>
    </>
  );
};
export default EditDemo;
