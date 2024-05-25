import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputAdornment,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Typography, notification } from "antd";
import { useParams } from "react-router-dom";
import instance from "helpers/axios";
import { LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import ReportIcon from "@mui/icons-material/Report";
import PublishedWithChangesIcon from "@mui/icons-material/PublishedWithChanges";

const initialValues = {
  date: null,
  complaints: "",
  remarks: "",
};

const ComplainAndRemark = ({ studentData }) => {
  const { studentId, companyId } = useParams();
  const [complaints, setComplaints] = useState([]);
  const [remarks, setRemarks] = useState([]);
  const loginUser = localStorage.getItem("user");
  const { role } = JSON.parse(loginUser);

  const openNotificationWithIcon = (type, message) => {
    notification[type]({
      message: message,
    });
  };

  const validationSchema = Yup.object().shape({
    date: Yup.date().required("Date is required"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      const date = values.date ? values.date.toISOString() : null;

      let updatedComplaints = [...complaints];
      let updatedRemarks = [...remarks];

      if (values.complaints) {
        updatedComplaints = [
          ...complaints,
          { title: values.complaints, date, status: "Pending" },
        ];
        setComplaints(updatedComplaints);
      }

      if (values.remarks) {
        updatedRemarks = [...remarks, { title: values.remarks, date }];
        setRemarks(updatedRemarks);
      }

      const payload = {
        ...studentData,
        remarks: updatedRemarks,
        complaints: updatedComplaints,
      };
      console.log(payload);
      try {
        const response = await instance.put(
          `company/${companyId}/${studentId}/updateStudent`,
          payload
        );
        openNotificationWithIcon("success", response.data.data.message);
        resetForm();
      } catch (error) {
        openNotificationWithIcon("error", error.response.data.message);
      }
    },
  });

  return (
    <Box>
      <form onSubmit={formik.handleSubmit}>
        <FormControl
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
          <Grid container spacing={2} xs={8}>
            <Grid container item xs={12} md={12} lg={4}>
              <Grid>
                <Box
                  display="flex"
                  alignItems="center"
                  marginBottom="14px"
                  color="#5559CE"
                >
                  <ReportIcon
                    style={{
                      fontSize: "30px",
                      marginRight: "8px",
                      color: "#5e35b1",
                    }}
                  />
                  <Typography
                    style={{
                      fontWeight: "600",
                      fontSize: "18px",
                    }}
                  >
                    Complain & Remarks
                  </Typography>
                </Box>
              </Grid>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <MobileDatePicker
                  label="Date"
                  clearable
                  value={formik.values.date}
                  onChange={(date) => formik.setFieldValue("date", date)}
                  renderInput={(props) => (
                    <TextField
                      {...props}
                      fullWidth
                      label="Select Date"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start"></InputAdornment>
                        ),
                      }}
                      error={formik.touched.date && !!formik.errors.date}
                      helperText={formik.touched.date && formik.errors.date}
                    />
                  )}
                />
              </LocalizationProvider>
              <TextField
                id="complaints"
                label="Complaint"
                name="complaints"
                multiline
                sx={{ margin: "10px 0" }}
                rows={3}
                value={formik.values.complaints}
                onChange={formik.handleChange}
                error={formik.touched.complaints && !!formik.errors.complaints}
                helperText={
                  formik.touched.complaints && formik.errors.complaints
                }
                variant="outlined"
                fullWidth
                InputLabelProps={{
                  style: { color: "#5559CE" },
                }}
              />
              {role === "Admin" && (
                <TextField
                  id="remarks"
                  label="Remark"
                  name="remarks"
                  multiline
                  rows={3}
                  value={formik.values.remarks}
                  onChange={formik.handleChange}
                  error={formik.touched.remarks && !!formik.errors.remarks}
                  helperText={formik.touched.remarks && formik.errors.remarks}
                  variant="outlined"
                  fullWidth
                  InputLabelProps={{
                    style: { color: "#5559CE" },
                  }}
                />
              )}
            </Grid>
          </Grid>
          <Box>
            <Button
              type="submit"
              variant="outlined"
              sx={{
                mt: "15px",
                backgroundColor: "#5559CE",
                color: "#fff",
                marginRight: "10px",
                height: "35px",
                lineHeight: "35px",
                "&:hover": { color: "#5559CE", backgroundColor: "#fff" },
              }}
            >
              Submit
            </Button>
          </Box>
          <Grid item xs={4} md={4}></Grid>
        </FormControl>
      </form>
    </Box>
  );
};

export default ComplainAndRemark;
