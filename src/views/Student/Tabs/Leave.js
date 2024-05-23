import { useEffect } from "react";
import React from "react";
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { useFormik } from "formik";
import { string, object } from "yup";
import axios from "axios";
import { useGetEvents } from "hooks/useGetEvents";

const Leave = () => {
  const { refetch } = useGetEvents();
  const regularUserMenuItems = ["Sick Leave", "Personal Leave"];
  const data = localStorage.getItem("user");
  const { _id, role, company_id } = JSON.parse(data);
  const handleDateChange = (newDateRange) => {
    const startDate = newDateRange[0] ? newDateRange[0].toISOString() : null;
    const endDate = newDateRange[1] ? newDateRange[1].toISOString() : null;
    formik.setFieldValue("startDate", startDate);
    formik.setFieldValue("endDate", endDate);
  };

  useEffect(() => {
    refetch();
  }, []);

  const initialValue = {
    leave_type: "",
    endDate: null,
    startDate: null,
    event: "",
    leave_description: "",
  };
  const validationSchema = object({
    leave_type: string().required("Type is required"),
    leave_description: string().required("Description is required"),
    event: string().required("Event is required"),
    startDate: string().required("Date is required"),
    endDate: string().required("Date is required"),
  });
  const formik = useFormik({
    initialValues: initialValue,
    validationSchema: validationSchema,
    onSubmit: async (values, action) => {
      action.resetForm();
      let payload = { ...values, event_user_id: _id };
      if (role !== "Admin") {
        payload.leave_status = "Pending";
      } else {
        payload.leave_status = "Office";
      }
      try {
        await axios.post(
          `${process.env.REACT_APP_API_URL}${company_id}/event`,
          payload
        );
        refetch();  
      } catch (error) {
        console.error("Error:", error);
      }
    },
  });

  return (
    <Box>
      <form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
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
            "& label": {
              color: "#5559CE !important",
            },
          }}
          size="small"
        >
          <Grid container spacing={3}>
            <Grid item  xl={6} lg={12} xs={12}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DateRangePicker"]}>
                  <DateRangePicker
                    localeText={{ start: "To", end: "From" }}
                    value={[formik.values.startDate, formik.values.endDate]}
                    onChange={handleDateChange}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </Grid>
            <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
              <FormControl fullWidth sx={{ mt: "8px" }}>
                <InputLabel id="type">Type</InputLabel>
                <Select
                  labelId="Type"
                  id="type"
                  name="leave_type"
                  inputlabelprops={{
                    style: { color: "#5559CE" },
                  }}
                  label="Type"
                  value={formik?.values?.leave_type}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.leave_type &&
                    Boolean(formik.errors.leave_type)
                  }
                  helperText={
                    formik.touched.leave_type && formik.errors.leave_type
                  }
                >
                  {regularUserMenuItems.map((option) => (
                    <MenuItem key={option} value={option}>
                      <ListItemText primary={option} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
              <TextField
                label="Title"
                variant="outlined"
                name="event"
                value={formik.values?.event}
                onChange={formik.handleChange}
                multiline
                fullWidth
                inputlabelprops={{
                  style: { color: "#5559CE" },
                }}
                error={formik.touched.event && Boolean(formik.errors.event)}
                helperText={formik.touched.event && formik.errors.event}
              />
            </Grid>
            <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
              <TextField
                label="Description"
                variant="outlined"
                name="leave_description"
                value={formik.values?.leave_description}
                onChange={formik.handleChange}
                multiline
                rows={4}
                fullWidth
                inputlabelprops={{
                  style: { color: "#5559CE" },
                }}
                error={
                  formik.touched.leave_description &&
                  Boolean(formik.errors.leave_description)
                }
                helperText={
                  formik.touched.leave_description &&
                  formik.errors.leave_description
                }
              />
            </Grid>
          </Grid>

          <Box>
            <Button
              variant="outlined"
              type="submit"
              style={{ float: "right" }}
              sx={{
                backgroundColor: "#5559CE",
                color: "#fff",
                marginRight: "10px",
                height: "35px",
                lineHeight: "35px",
                my: "25px",

                "&:hover": {
                  Color: "#5559CE",
                  backgroundColor: "#5559CE",
                },
              }}
            >
              Add Leave
            </Button>
          </Box>
        </FormControl>
      </form>
    </Box>
  );
};

export default Leave;
