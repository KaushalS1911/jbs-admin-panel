import React from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import {
  TextField,
  Grid,
  MenuItem,
  Select,
  FormHelperText,
  FormControl,
  InputLabel,
  Button,
  Box,
} from "@mui/material";
import PhoneInput from "react-phone-input-2";
import { gridSpacing } from "store/constant";
import { courses } from "../../../contants/courseConstants";
import { gender } from "../../../contants/genderConstants";
import instance from "../../../helpers/axios";
import { useParams } from "react-router-dom";
import { Stack } from "@mui/system";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_green.css";
import { notification } from "antd";
import { useDispatch } from 'react-redux';
import { settingPersonalDetails } from '../StudentSlice';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
    },
  },
};

const validationSchema = yup.object({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  contact: yup.string().required("Contact is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  dob: yup.date().required("Date of Birth is required"),
  education: yup.string().required("Education is required"),
  college: yup.string().required("College is required"),
  blood_group: yup.string().required("Blood group is required"),
  gender: yup.string().required("Gender is required"),
  course: yup.string().required("Course is required"),
  joining_date: yup.date().required("Joining Date is required"),
});

function PersonalInfo({ formData, studentData, refetch }) {
    const dispatch = useDispatch()

   const openNotificationWithIcon = (type, message) => {
    notification[type]({
      message: message,
    });
  };

  const { studentId, companyId } = useParams();

  const onDateChange = (selectedDates) => {
    formik.setFieldValue("dob", selectedDates[0]);
  };

  const onJoiningDateChange = (selectedDates) => {
    formik.setFieldValue("joining_date", selectedDates[0]);
  };

  const formik = useFormik({
    initialValues: formData,
    validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      handleUpdateStudent(values);
    },
  });

  async function handleUpdateStudent(values) {
    const payload = {
      ...studentData,
      personal_info: {
        ...studentData.personal_info,
        firstName: values.firstName || "",
        lastName: values.lastName || "",
        contact: values.contact || "",
        email: values.email || "",
        dob: values.dob || "",
        education: values.education || "",
        college: values.college || "",
        blood_group: values.blood_group || "",
        gender: values.gender || "",
        course: values.course || "",
        joining_date: values.joining_date || "",
      },
    };
    await instance({
      method: "PUT",
      url: `company/${companyId}/${studentId}/updateStudent`,
      data: payload,
    })
      .then((response) => {
        dispatch(settingPersonalDetails(response.data.data.student.personal_info))
        openNotificationWithIcon("success", response.data.data.message);
        refetch()
      })
      .catch((error) => {
        openNotificationWithIcon("error", error.response.data.message);

      });
  }

  return (
    <>
      <form action="" className="form-outer">
        <div>
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
            <Grid container spacing={gridSpacing} sx={{ padding: "30px" }}>
              <Grid item xl={4} lg={4} md={6} sm={6} xs={12}>
                <TextField
                  label="First Name"
                  id="firstname"
                  name="firstName"
                  variant="outlined"
                  value={formik.values?.firstName}
                  error={
                    formik.touched.firstName && Boolean(formik.errors.firstName)
                  }
                  helperText={
                    formik.touched.firstName && formik.errors.firstName
                  }
                  onChange={formik.handleChange}
                  fullWidth
                  InputLabelProps={{
                    style: { color: "#5559CE" },
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xl={4} lg={4} md={6} sm={6} xs={12}>
                <TextField
                  label="Last Name"
                  variant="outlined"
                  name="lastName"
                  value={formik.values?.lastName}
                  error={
                    formik.touched.lastName && Boolean(formik.errors.lastName)
                  }
                  helperText={formik.touched.lastName && formik.errors.lastName}
                  onChange={formik.handleChange}
                  fullWidth
                  InputLabelProps={{
                    style: { color: "#5559CE" },
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xl={4} lg={4} md={6} sm={6} xs={12}>
                <PhoneInput
                  country={"in"}
                  fullWidth
                  value={formik.values?.contact}
                  onChange={(value, country, e, formattedValue) => {
                    formik.setFieldValue("contact", formattedValue);
                  }}
                />
                {formik.touched.contact && formik.errors.contact && (
                  <FormHelperText style={{ color: "red" }}>
                    {formik.errors.contact}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xl={4} lg={4} md={6} sm={6} xs={12}>
                <TextField
                  label="Email"
                  name="email"
                  variant="outlined"
                  value={formik.values?.email}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                  onChange={formik.handleChange}
                  fullWidth
                  InputLabelProps={{
                    style: { color: "#5559CE" },
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xl={4} lg={4} md={6} sm={6} xs={12}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel id="gender-label" style={{ color: "#5559ce" }}>
                    Gender
                  </InputLabel>
                  <Select
                    labelId="gender-label"
                    id="gender-select"
                    name="gender"
                    value={formik.values?.gender || ""}
                    onChange={formik.handleChange}
                    label="Gender"
                    error={
                      formik.touched.gender && Boolean(formik.errors.gender)
                    }
                    helperText={formik.touched.gender && formik.errors.gender}
                    InputLabelProps={{
                      style: { color: "#5559CE" },
                      shrink: true,
                    }}
                  >
                    {gender.map((genderItem) => (
                      <MenuItem key={genderItem.value} value={genderItem.value}>
                        {genderItem.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xl={4} lg={4} md={6} sm={6} xs={12}>
                <Box
                  className="flatpicker-input"
                  style={{ outline: "none", whiteSpace: "nowrap" }}
                >
                  <Flatpickr
                    placeholder="Date Of Birth"
                    name="dob"
                    value={formik.values?.dob}
                    onChange={(selectedDates) => onDateChange(selectedDates)}
                    className="form-control"
                    options={{
                      dateFormat: "Y-m-d ",
                      mode: "single",
                    }}
                  />
                </Box>
              </Grid>
              <Grid item xl={4} lg={4} md={6} sm={6} xs={12}>
                <TextField
                  id="outlined-basic"
                  label="Education"
                  variant="outlined"
                  fullWidth
                  name="education"
                  value={formik.values?.education}
                  error={
                    formik.touched.education && Boolean(formik.errors.education)
                  }
                  helperText={
                    formik.touched.education && formik.errors.education
                  }
                  onChange={formik.handleChange}
                  InputLabelProps={{
                    style: { color: "#5559CE" },
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xl={4} lg={4} md={6} sm={6} xs={12}>
                <TextField
                  id="outlined-basic"
                  label="School / College"
                  variant="outlined"
                  fullWidth
                  name="college"
                  value={formik.values?.college}
                  error={
                    formik.touched.college && Boolean(formik.errors.college)
                  }
                  helperText={formik.touched.college && formik.errors.college}
                  onChange={formik.handleChange}
                  InputLabelProps={{
                    style: { color: "#5559CE" },
                    shrink: true,
                  }}
                />
              </Grid>

              <Grid item xl={4} lg={4} md={6} sm={6} xs={12}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel id="demo-simple-select-label">Course</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select-label"
                    name="course"
                    value={formik.values?.course || ""}
                    error={
                      formik.touched.course && Boolean(formik.errors.course)
                    }
                    helperText={formik.touched.course && formik.errors.course}
                    MenuProps={MenuProps}
                    onChange={formik.handleChange}
                    label="Course"
                    InputLabelProps={{
                      style: { color: "#5559CE" },
                    }}
                  >
                    {courses.map((courseItem) => (
                      <MenuItem key={courseItem.value} value={courseItem.value}>
                        {courseItem.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xl={4} lg={4} md={6} sm={6} xs={12}>
                <Box
                  className="flatpicker-input"
                  style={{ outline: "none", whiteSpace: "nowrap" }}
                >
                  <Flatpickr
                    placeholder="Joining Date"
                    name="joining_date"
                    value={formik.values?.joining_date}
                    onChange={(selectedDates) =>
                      onJoiningDateChange(selectedDates)
                    }
                    className="form-control"
                    options={{
                      dateFormat: "Y-m-d ",
                      mode: "single",
                    }}
                  />
                </Box>
              </Grid>
              <Grid item xl={4} lg={4} md={6} sm={6} xs={12}>
                <TextField
                  id="outlined-basic"
                  label="Blood group "
                  variant="outlined"
                  fullWidth
                  name="blood_group"
                  value={formik.values?.blood_group}
                  error={
                    formik.touched.blood_group &&
                    Boolean(formik.errors.blood_group)
                  }
                  helperText={
                    formik.touched.blood_group && formik.errors.blood_group
                  }
                  onChange={formik.handleChange}
                  InputLabelProps={{
                    style: { color: "#5559CE" },
                    shrink: true,
                  }}
                />
              </Grid>
            </Grid>
            <Grid
              style={{ display: "flex", justifyContent: "flex-end" }}
              sx={{
                margin: { xs: "10px 0" },
              }}
            >
              <Stack direction="row" spacing={2}>
                <Button
                  variant="contained"
                  type="submit"
                  onClick={formik.handleSubmit}
                  sx={{
                    backgroundColor: "#5559CE",
                    color: "#fff",
                    marginRight: "10px",
                    height: "35px",
                    lineHeight: "35px",
                    "&:hover": { Color: "#5559CE", backgroundColor: "#5559CE" },
                  }}
                >
                  Save
                </Button>
              </Stack>
            </Grid>
          </FormControl>
        </div>
      </form>
    </>
  );
}

export default PersonalInfo;
