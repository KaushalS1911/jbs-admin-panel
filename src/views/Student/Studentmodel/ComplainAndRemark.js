import { Box, Button, FormControl, Grid, TextField } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import React from "react";
import { useState } from "react";
import instance from "helpers/axios";
import { notification } from "antd";
import { useParams } from "react-router-dom";

const initialValues = {
  complaints: "",
  remarks: "",
};
const ComplainAndRemark = ({ studentData }) => {
  const { studentId, companyId } = useParams();
  const [remark, setRemark] = useState([]);
  const [complain, setComplain] = useState([]);
  const loginUser = localStorage.getItem("user");
  const { role } = JSON.parse(loginUser);

  //notification
  const openNotificationWithIcon = (type, message) => {
    notification[type]({
      message: message,
    });
  };
  let validationSchema;
  role === "Admin"
    ? (validationSchema = Yup.object({
        complaints: Yup.string().required("Complain is required"),
        remarks: Yup.string().required("Remark is required"),
      }))
    : (validationSchema = Yup.object({
        complaints: Yup.string().required("Complain is required")
      })); 
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      remark.push(values.remarks);
      complain.push(values.complaints);
      const payload = {
        ...studentData,
        remarks: remark,
        complaints: complain,
      };
      console.log(payload);
      await instance({
        method: "PUT",
        url: `company/${companyId}/${studentId}/updateStudent`,
        data: payload,
      })
        .then((response) => {
          console.log(response);
          openNotificationWithIcon("success", response.data.data.message);
          resetForm();
        })
        .catch((error) => {
          openNotificationWithIcon("error", error.response.data.message);
        });
    },
  });

  return (
    <>
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
              <Grid item xl={4} lg={4} md={6} sm={6} xs={12}>
                <TextField
                  id="outlined-basic"
                  label="Complain"
                  name="complaints"
                  multiline
                  rows={3}
                  value={formik.values.complaints}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.complaints && !!formik.errors.complaints
                  }
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
                <Grid item xl={4} lg={4} md={6} sm={6} xs={12}>
                  <TextField
                    id="outlined-basic"
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
                type="submit"
              >
                Submit
              </Button>
            </Box>
          </FormControl>
        </form>
      </Box>
    </>
  );
};

export default ComplainAndRemark;