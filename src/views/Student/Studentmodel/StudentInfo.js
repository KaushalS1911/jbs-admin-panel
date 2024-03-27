import React from "react";
import * as yup from "yup";
import {
  Box,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import { gridSpacing } from "store/constant";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useFormik } from "formik";
import FormStepButtons from "../../../ui-component/FormStepButtons";
import { courses } from "../../../contants/courseConstants";
import { useDispatch } from "react-redux";
import { settingPersonalDetails } from "../StudentSlice";
import { useParams } from "react-router";
import { Button } from "antd";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_green.css";
// import { useSelector } from 'react-redux'

// // import axios from 'axios';
//
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
    },
  },
};

const initialValues = {
  firstName: "",
  lastName: "",
  contact: "",
  email: "",
  dob: "",
  education: "",
  college: "",
  blood_group: "",
  gender: "",
  course: "",
  joining_date: null,
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

const StudentInfo = ({
  activeStep,
  steps,
  handleNext,
  handleBack,
  handleReset,
  formData,
}) => {
  const dispatch = useDispatch();
  const { studentId } = useParams();

  // const {personalDetails} = useSelector((state) => state.student)

  // const [fileList, setFileList] = useState([]);
  // const [previewOpen, setPreviewOpen] = useState(false);
  // const [previewImage, setPreviewImage] = useState('');
  // const [previewTitle, setPreviewTitle] = useState('');

  // const handlePreview = async (file) => {
  //   if (!file.url && !file.preview) {
  //     file.preview = await getBase64(file.originFileObj);
  //   }
  //
  //   setPreviewImage(file.url || file.preview);
  //   setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
  //   setPreviewOpen(true);
  // };

  // const handleCancel = () => setPreviewOpen(false);

  // const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

  // const uploadButton = (
  //   <button
  //     style={{
  //       border: 0,
  //       background: 'none',
  //     }}
  //     type="button"
  //   >
  //     <AddIcon />
  //     <div
  //       style={{
  //         marginTop: 8,
  //       }}
  //     >
  //       Upload Profile
  //     </div>
  //   </button>
  // );

  // function formatDate(inputDate) {
  //   const originalDate = new Date(inputDate);
  //   const day = originalDate.getDate();
  //   const month = originalDate.getMonth() + 1;
  //   const year = originalDate.getFullYear();
  //   const formattedDay = (day < 10) ? `0${day}` : day;
  //   const formattedMonth = (month < 10) ? `0${month}` : month;
  //   return `${year}-${formattedMonth}-${formattedDay}`;
  // }

  const onDateChange = (selectedDates) => {
    formik.setFieldValue("dob", selectedDates[0]);
  };

  const onJoiningDateChange = (selectedDates) => {
    formik.setFieldValue("joining_date", selectedDates[0]);
  };

  const formik = useFormik({
    initialValues: studentId
      ? {
          ...formData,
          dob: new Date(formData.dob),
          joining_date: new Date(formData.joining_date),
        }
      : initialValues,
    validationSchema: validationSchema,
    enableReinitialize: true,
    onSubmit: (values, { resetForm }) => {
      const updatedValues = {
        ...values,
        dob: values.dob.toISOString(),
        joining_date: values.joining_date.toISOString(),
        assignmentCompleted: []
      };
      dispatch(settingPersonalDetails(updatedValues));
      handleNext();
      resetForm();
    },
  });

  return (
    <>
      <div className="form-outer">
        <form action="">
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
                    // formik.setFieldValue('contactCountry', country);
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
                  }}
                />
              </Grid>
              <Grid item xl={4} lg={4} md={6} sm={6} xs={12}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel
                    id="demo-simple-select-label"
                    style={{ color: "#5559ce" }}
                  >
                    Gender
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select-label"
                    name="gender"
                    value={formik.values?.gender}
                    onChange={formik.handleChange}
                    label="Gender"
                    error={
                      formik.touched.gender && Boolean(formik.errors.gender)
                    }
                    helperText={formik.touched.gender && formik.errors.gender}
                    InputLabelProps={{
                      style: { color: "#5559CE" },
                    }}
                  >
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                    <MenuItem value="other">Other</MenuItem>
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
                    value={formik.values.dob}
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
                    value={formik.values?.course}
                    error={
                      formik.touched.course &&
                      Boolean((<formik className="errors"></formik>).course)
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
                    value={formik.values.joining_date}
                    onChange={(selectedDates) => onJoiningDateChange(selectedDates)}
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
                  }}
                />
              </Grid>

              {!studentId ? (
                <Grid
                  container
                  justifyContent="flex-end"
                  sx={{ padding: "30px 20px " }}
                >
                  <Stack spacing={2} direction="row">
                    <FormStepButtons
                      activeStep={activeStep}
                      steps={steps}
                      handleBack={handleBack}
                      handleNext={formik.handleSubmit}
                      handleReset={handleReset}
                    />
                  </Stack>
                </Grid>
              ) : (
                <Button
                  variant="outlined"
                  size={"large"}
                  style={{ position: "absolute", bottom: "-40%", right: "0%" }}
                >
                  Save
                </Button>
              )}
            </Grid>
          </FormControl>
        </form>
      </div>
    </>
  );
};

export default StudentInfo;
