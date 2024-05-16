import { Box, Button, FormControl, Grid, TextField } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import React, { useState } from "react";
import { notification } from "antd";
import { useParams } from "react-router-dom";
import instance from "helpers/axios";

const initialValues = {
  complaints: "",
  remarks: "",
};

const ComplainAndRemark = ({ studentData }) => {
  const { studentId, companyId } = useParams();
  const [remarks, setRemarks] = useState([]);
  const [complaints, setComplaints] = useState([]);
  const loginUser = localStorage.getItem("user");
  const { role } = JSON.parse(loginUser);

  const openNotificationWithIcon = (type, message) => {
    notification[type]({
      message: message,
    });
  };

  const validationSchema = Yup.object().shape({
    complaints: Yup.string().required("Complaint is required"),
    remarks:
      role === "Admin"
        ? Yup.string().required("Remark is required")
        : Yup.string(),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      setComplaints([...complaints, values.complaints]);
      setRemarks([...remarks, values.remarks]);

      const payload = {
        ...studentData,
        remarks: remarks,
        complaints: complaints,
      };

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
          <Grid container spacing={10}>
            <Grid item xs={12} md={6}>
              <TextField
                id="complaints"
                label="Complaint"
                name="complaints"
                multiline
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
            </Grid>
            {role === "Admin" && (
              <Grid item xs={12} md={6}>
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
              </Grid>
            )}
          </Grid>
          <Box>
            <Button
              type="submit"
              variant="outlined"
              style={{ float: "right" }}
              sx={{
                mt: "15px",
                backgroundColor: "#5559CE",
                color: "#fff",
                marginRight: "10px",
                height: "35px",
                lineHeight: "35px",
                "&:hover": { Color: "#5559CE", backgroundColor: "#5559CE" },
              }}
            >
              Submit
            </Button>
          </Box>
        </FormControl>
      </form>
    </Box>
  );
};

export default ComplainAndRemark;
