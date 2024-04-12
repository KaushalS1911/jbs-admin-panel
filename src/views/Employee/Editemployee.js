import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Typography,
  Select,
  MenuItem,
  InputAdornment,
  Avatar,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import FormHelperText from "@mui/material/FormHelperText";
import { notification } from "antd";
import { useFormik } from "formik";
import * as yup from "yup";
import PhoneInput from "react-phone-input-2";
import countrystatecity from "Countrystatecity.json";
import "react-phone-input-2/lib/style.css";
import MainCard from "ui-component/cards/MainCard";
import { useDispatch } from "react-redux";
import {
  EditEmployee,
  deleteEmployee,
  updateEmployee,
} from "store/slices/employeeslice";
import ConfirmationDialog from "Extracomponent/ConfirmationDialog";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useRecoilState } from "recoil";
import { profile } from "../../atoms/authAtoms";
import { LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers";
import "react-datepicker/dist/react-datepicker.css";
import Mainbreadcrumbs from "contants/Mainbreadcrumbs";
import { gridSpacing } from "store/constant";
import axios from "axios";

const Editemployee = () => {
  //notification
  const openNotificationWithIcon = (type, message) => {
    notification[type]({
      message: message,
    });
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams(); /* eslint-disable */
  const [profileData, setProfileData] = useRecoilState(profile);
  const [profilePic, setProfilePic] = useState("");

  const [open, setOpen] = useState(false);

  const handleOpenDialog = () => {
    setOpen(true);
  };
  const handleCloseDialog = () => {
    setOpen(false);
  };

  const validationSchema = yup.object({
    firstName: yup.string().required("First Name is required"),
    lastName: yup.string().required("Last Name is required"),
    contact: yup.string().required("Contact No is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    gender: yup.string().required("Gender is required"),
    role: yup.string().required("Role is required"),
    qualification: yup.string().required("Qualification is required"),
    technology: yup.string().required("Developer is required"),
    experience: yup.string().required("Experience is required"),
    dob: yup.date().required("Date of Birth is required"),
    joining_date: yup.date().required("Joining Date is required"),
    address_1: yup.string().required("Address line1 is required"),
    country: yup.string().required("Country is required"),
    state: yup.string().required("State is required"),
    city: yup.string().required("City is required"),
    zipcode: yup.string().required("Zip Code is required"),
  });

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const apiUrl = `${process.env.REACT_APP_API_URL}${id}/employee/profile-pic`;
    if (file) {
      const formData = new FormData();
      formData.append("profile-pic", file);

      axios
        .put(apiUrl, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(() => {
          fetchEmployee();
        })
        .catch((error) => {
          console.error("Upload error:", error);
        });
    }
  };

  const handleAvatarClick = () => {
    document.getElementById("file-input").click();
  };

  const onSubmit = async (values) => {
    const experienceAsNumber = parseInt(values.experience, 10);
    const numericContact = values.contact.replace(/\D/g, "");
    const updatedEmployee = {
      firstName: values.firstName,
      lastName: values.lastName,
      contact: numericContact,
      email: values.email,
      role: values.role,
      gender: values.gender,
      qualification: values.qualification,
      technology: values.technology,
      experience: experienceAsNumber,
      dob: values.dob ? new Date(values.dob) : null,
      joining_date: values.joining_date ? new Date(values.joining_date) : null,
      address: {
        city: values.city,
        state: values.state,
        country: values.country,
        address_1: values.address_1,
        address_2: values.address_2,
        zipcode: values.zipcode,
      },
    };

    try {
      const response = await dispatch(
        updateEmployee({
          id: id,
          data: updatedEmployee,
          companyId: profileData.company_id,
        })
      );
      navigate("/employee");
      openNotificationWithIcon("success", response.payload.message);
    } catch (error) {
      console.error("Error updating data:", error);
      openNotificationWithIcon("error", error.response.data.message);

    }
  };

  const formik = useFormik({
    initialValues: {
      avatar_url: "",
      firstName: "",
      lastName: "",
      contact: "",
      email: "",
      gender: "",
      role: "",
      qualification: "",
      technology: "",
      experience: "",
      dob: null,
      joining_date: null,
      address_1: "",
      address_2: "",
      country: "",
      state: "",
      city: "",
      zipcode: "",
    },
    validationSchema: validationSchema,
    onSubmit: onSubmit,
  });

  const handleDelete = async () => {
    try {
      const response = await dispatch(
        deleteEmployee({ id, companyId: profileData.company_id })
      );
      setOpen(false);
      navigate("/employee");
      openNotificationWithIcon("success", response.payload.data.message);
    } catch (error) {
      openNotificationWithIcon("error", error.response.data.message);

    }
  };

  const populateFormWithData = (data) => {
    formik.setValues({
      firstName: data.firstName,
      lastName: data.lastName,
      contact: data.contact,
      email: data.email,
      gender: data.gender,
      role: data.role,
      qualification: data.qualification,
      technology: data.technology,
      experience: data.experience,
      dob: data.dob ? new Date(data.dob) : null,
      joining_date: data.joining_date ? new Date(data.joining_date) : null,
      address_1: data.address.address_1,
      address_2: data.address.address_2,
      country: data.address.country,
      state: data.address.state,
      city: data.address.city,
      zipcode: data.address.zipcode,
    });
  };

  useEffect(() => {
    fetchEmployee();
  }, [dispatch, id]);

  async function fetchEmployee() {
    try {
      const actionResult = await dispatch(
        EditEmployee({ companyId: profileData.company_id, id })
      );
      if (EditEmployee.fulfilled.match(actionResult)) {
        const employeeData = actionResult.payload;
        populateFormWithData(employeeData.data);
        setProfilePic(employeeData.data.avatar_url);
      }
    } catch (error) {
      console.error("Error fetching or populating data:", error);
    }
  }

  return (
    <>
      <Mainbreadcrumbs title={"Employee"} subtitle={"Edit Employee"} />
      <MainCard className="form-outer">
        <div>
          <form action="" onSubmit={formik.handleSubmit}>
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
              <Grid container className="Main-form-wrapper">
                <Grid container spacing={gridSpacing} sx={{ padding: "30px" }}>
                  <Grid
                    container
                    alignItems={"center"}
                    justifyContent={{
                      xs: "normal",
                      sm: "space-between",
                      md: "space-between",
                      lg: "space-between",
                    }}
                  >
                    <Grid
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "1rem",
                      }}
                    >
                      <input
                        id="file-input"
                        type="file"
                        style={{ display: "none" }}
                        onChange={handleFileChange}
                      />
                      <Avatar
                        alt="Avatar"
                        src={profilePic}
                        onClick={handleAvatarClick}
                        style={{ cursor: "pointer", width: 96, height: 96 }}
                      />
                      <Grid xl={8} lg={8} md={8} sm={8} xs={12}>
                        <Typography variant="h2" gutterBottom>
                          {formik.values.firstName} {formik.values.lastName}
                        </Typography>
                        <Typography variant="h5" gutterBottom>
                          {formik.values.technology}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid>
                      
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>

              <Typography
                variant="h4"
                sx={{
                  color: "#5559CE",
                  fontSize: "18px",
                  fontWeight: "bold",
                  margin: "10px 8px 10px 0px",
                }}
              >
                Personal Details:
              </Typography>

              <Grid container spacing={2}>
                <Grid
                  item
                  xl={4}
                  lg={4}
                  md={6}
                  sm={6}
                  xs={12}
                  sx={{ marginBottom: "10px" }}
                >
                  <TextField
                    label="First Name"
                    id="firstname"
                    name="firstName"
                    variant="outlined"
                    value={formik.values.firstName}
                    error={
                      formik.touched.firstName &&
                      Boolean(formik.errors.firstName)
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

                <Grid
                  item
                  xl={4}
                  lg={4}
                  md={6}
                  sm={6}
                  xs={12}
                  sx={{ marginBottom: "10px" }}
                >
                  <TextField
                    label="Last Name"
                    variant="outlined"
                    name="lastName"
                    value={formik.values.lastName}
                    error={
                      formik.touched.lastName && Boolean(formik.errors.lastName)
                    }
                    helperText={
                      formik.touched.lastName && formik.errors.lastName
                    }
                    onChange={formik.handleChange}
                    fullWidth
                    InputLabelProps={{
                      style: { color: "#5559CE" },
                    }}
                  />
                </Grid>

                <Grid
                  item
                  xl={4}
                  lg={4}
                  md={6}
                  sm={6}
                  xs={12}
                  sx={{ marginBottom: "10px" }}
                >
                  <PhoneInput
                    country={"in"}
                    value={formik.values.contact}
                    onChange={(value, country, e, formattedValue) => {
                      formik.setFieldValue("contact", formattedValue);
                      // formik.setFieldValue('contactCountry', country);
                    }}
                  />
                  {formik.touched.contact && formik.errors.contact && (
                    <FormHelperText>{formik.errors.contact}</FormHelperText>
                  )}
                </Grid>

                <Grid
                  item
                  xl={4}
                  lg={4}
                  md={6}
                  sm={6}
                  xs={12}
                  sx={{ marginBottom: "10px" }}
                >
                  <TextField
                    label="Email"
                    name="email"
                    variant="outlined"
                    value={formik.values.email}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                    onChange={formik.handleChange}
                    fullWidth
                    InputLabelProps={{
                      style: { color: "#5559CE" },
                    }}
                  />
                </Grid>

                <Grid
                  item
                  xl={4}
                  lg={4}
                  md={6}
                  sm={6}
                  xs={12}
                  sx={{ marginBottom: "10px" }}
                >
                  <FormControl fullWidth variant="outlined">
                    <InputLabel id="gender-label" style={{ color: "#5559ce" }}>
                      Gender
                    </InputLabel>
                    <Select
                      labelId="gender-label"
                      id="gender"
                      name="gender"
                      value={formik.values.gender}
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
                      <MenuItem value="Male">Male</MenuItem>
                      <MenuItem value="Female">Female</MenuItem>
                      <MenuItem value="Other">Other</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid
                  item
                  xl={4}
                  lg={4}
                  md={6}
                  sm={6}
                  xs={12}
                  sx={{ marginBottom: "10px" }}
                >
                  <FormControl fullWidth variant="outlined">
                    <InputLabel id="role-label" style={{ color: "#5559ce" }}>
                      Role
                    </InputLabel>
                    <Select
                      labelId="role-label"
                      id="role"
                      name="role"
                      value={formik.values.role}
                      onChange={formik.handleChange}
                      label="role"
                      error={formik.touched.role && Boolean(formik.errors.role)}
                      helperText={formik.touched.role && formik.errors.role}
                      InputLabelProps={{
                        style: { color: "#5559CE" },
                      }}
                    >
                      <MenuItem value="Employee">Employee</MenuItem>
                      <MenuItem value="Faculty">Faculty</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid
                  item
                  xl={4}
                  lg={4}
                  md={6}
                  sm={6}
                  xs={12}
                  sx={{ marginBottom: "10px" }}
                >
                  <TextField
                    label="qualification"
                    variant="outlined"
                    fullWidth
                    name="qualification"
                    value={formik.values.qualification}
                    error={
                      formik.touched.qualification &&
                      Boolean(formik.errors.qualification)
                    }
                    helperText={
                      formik.touched.qualification &&
                      formik.errors.qualification
                    }
                    onChange={formik.handleChange}
                    InputLabelProps={{
                      style: { color: "#5559CE" },
                    }}
                  />
                </Grid>

                <Grid
                  item
                  xl={4}
                  lg={4}
                  md={6}
                  sm={6}
                  xs={12}
                  sx={{ marginBottom: "10px" }}
                >
                  <FormControl fullWidth variant="outlined">
                    <InputLabel
                      id="developer-label"
                      style={{ color: "#5559ce" }}
                    >
                      Technology
                    </InputLabel>
                    <Select
                      labelId="developer-label"
                      id="technology"
                      name="technology"
                      value={formik.values.technology}
                      onChange={formik.handleChange}
                      label="Developer"
                      error={
                        formik.touched.technology &&
                        Boolean(formik.errors.technology)
                      }
                      helperText={
                        formik.touched.technology && formik.errors.technology
                      }
                      InputLabelProps={{
                        style: { color: "#5559CE" },
                      }}
                    >
                      <MenuItem value="Web Designer">Web Designer</MenuItem>
                      <MenuItem value="Web Developer">Web Developer</MenuItem>
                      <MenuItem value="Ui/ux Designer">Ui/ux Designer</MenuItem>
                      <MenuItem value="Flutter Developer">
                        Flutter Developer
                      </MenuItem>
                      <MenuItem value="Fullstack Devloper">
                        Fullstack Developer
                      </MenuItem>
                      <MenuItem value="Frontend Devloper">
                        Frontend Developer
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid
                  item
                  xl={4}
                  lg={4}
                  md={6}
                  sm={6}
                  xs={12}
                  sx={{ marginBottom: "10px" }}
                >
                  <TextField
                    label="Experience"
                    variant="outlined"
                    fullWidth
                    name="experience"
                    value={formik.values.experience}
                    error={
                      formik.touched.experience &&
                      Boolean(formik.errors.experience)
                    }
                    helperText={
                      formik.touched.experience && formik.errors.experience
                    }
                    onChange={formik.handleChange}
                    InputLabelProps={{
                      style: { color: "#5559CE" },
                    }}
                  />
                </Grid>
                <Grid
                  item
                  xl={4}
                  lg={4}
                  md={6}
                  sm={6}
                  xs={12}
                  sx={{ marginBottom: "10px" }}
                >
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <MobileDatePicker
                      fullWidth
                      label="Date Of Birth"
                      clearable
                      value={formik.values.dob}
                      onChange={(date) => formik.setFieldValue("dob", date)}
                      renderInput={(props) => (
                        <TextField
                          {...props}
                          fullWidth
                          label="Select Date"
                          error={
                            formik.touched.dob && Boolean(formik.errors.dob)
                          }
                          helperText={formik.touched.dob && formik.errors.dob}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start"></InputAdornment>
                            ),
                          }}
                        />
                      )}
                    />
                  </LocalizationProvider>
                </Grid>

                <Grid
                  item
                  xl={4}
                  lg={4}
                  md={6}
                  sm={6}
                  xs={12}
                  sx={{ marginBottom: "10px" }}
                >
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <MobileDatePicker
                      fullWidth
                      label="Joinning Date"
                      clearable
                      value={formik.values.joining_date}
                      onChange={(joining_date) =>
                        formik.setFieldValue("joining_date", joining_date)
                      }
                      renderInput={(props) => (
                        <TextField
                          {...props}
                          fullWidth
                          label="Select Joining date"
                          error={
                            formik.touched.joining_date &&
                            Boolean(formik.errors.joining_date)
                          }
                          helperText={
                            formik.touched.joining_date &&
                            formik.errors.joining_date
                          }
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start"></InputAdornment>
                            ),
                          }}
                        />
                      )}
                    />
                  </LocalizationProvider>
                </Grid>
              </Grid>

              <Grid>
                <Typography
                  sx={{
                    marginBottom: "20px",
                    color: "#5559CE",
                    fontWeight: "500",
                    fontSize: "18px",
                  }}
                >
                  Address Details:
                </Typography>
                <Grid container spacing={2} sx={{ marginBottom: "20px" }}>
                  <Grid item xl={4} lg={6} md={6} sm={6} xs={12}>
                    <TextField
                      id="outlined-basic"
                      label="Address line1"
                      name="address_1"
                      value={formik.values.address_1}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.address_1 && !!formik.errors.address_1
                      }
                      helperText={
                        formik.touched.address_1 && formik.errors.address_1
                      }
                      variant="outlined"
                      fullWidth
                      InputLabelProps={{
                        style: { color: "#5559CE" },
                      }}
                    />
                  </Grid>
                  <Grid item xl={4} lg={6} md={6} sm={6} xs={12}>
                    <TextField
                      id="outlined-basic"
                      label="Address line 2"
                      name="address_2"
                      variant="outlined"
                      value={formik.values.address_2}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.address_2 && !!formik.errors.address_2
                      }
                      helperText={
                        formik.touched.address_2 && formik.errors.address_2
                      }
                      fullWidth
                      InputLabelProps={{
                        style: { color: "#5559CE" },
                      }}
                    />
                  </Grid>
                  <Grid item xl={4} lg={6} md={6} sm={6} xs={12}>
                    <FormControl fullWidth>
                      <InputLabel
                        id="demo-simple-select-label"
                        style={{ color: "#5559CE" }}
                      >
                        Country
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Country"
                        name="country"
                        value={formik.values.country || "Default Country"}
                        onChange={(e) => formik.handleChange(e)}
                        variant="outlined"
                        InputLabelProps={{
                          style: { color: "#5559CE" },
                        }}
                      >
                        <MenuItem
                          disabled
                          value={"Default Country"}
                          style={{ color: "#5559CE" }}
                        >
                          -----Selected Country----
                        </MenuItem>
                        {countrystatecity.map((country) => (
                          <MenuItem key={country.id} value={country.name}>
                            {country.name}
                          </MenuItem>
                        ))}
                      </Select>
                      {formik.touched.country && formik.errors.country && (
                        <div>{formik.errors.country}</div>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xl={4} lg={6} md={6} sm={6} xs={12}>
                    <FormControl fullWidth>
                      <InputLabel id="state-label" style={{ color: "#5559CE" }}>
                        State
                      </InputLabel>
                      <Select
                        labelId="state-label"
                        name="state"
                        label="state"
                        value={formik.values.state || "Default State"}
                        onChange={formik.handleChange}
                      >
                        <MenuItem disabled value={"Default State"}>
                          -----Selected State----
                        </MenuItem>
                        {formik.values.country &&
                          countrystatecity
                            .find(
                              (country) =>
                                country.name === formik.values.country
                            )
                            ?.states.map((state) => (
                              <MenuItem key={state.id} value={state.name}>
                                {state.name}
                              </MenuItem>
                            ))}
                      </Select>
                      {formik.touched.state && formik.errors.state && (
                        <div>{formik.errors.state}</div>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xl={4} lg={6} md={6} sm={6} xs={12}>
                    <FormControl fullWidth>
                      <InputLabel id="city-label" style={{ color: "#5559CE" }}>
                        City
                      </InputLabel>
                      <Select
                        labelId="city-label"
                        label="city"
                        name="city"
                        value={formik.values.city || "Default City"}
                        onChange={formik.handleChange}
                      >
                        <MenuItem disabled value={"Default City"}>
                          -----Selected State----
                        </MenuItem>

                        {formik.values.state &&
                          countrystatecity
                            .find(
                              (country) =>
                                country.name === formik.values.country
                            )
                            ?.states.find(
                              (state) => state.name === formik.values.state
                            )
                            ?.cities.map((city) => (
                              <MenuItem key={city.id} value={city.name}>
                                {city.name}
                              </MenuItem>
                            ))}
                      </Select>
                      {formik.touched.city && formik.errors.city && (
                        <div>{formik.errors.city}</div>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xl={4} lg={6} md={6} sm={6} xs={12}>
                    <TextField
                      id="outlined-basic"
                      label="Zip Code"
                      name="zipcode"
                      variant="outlined"
                      fullWidth
                      inputProps={{ maxLength: 6 }}
                      value={formik.values.zipcode}
                      onChange={formik.handleChange}
                      error={formik.touched.zipcode && !!formik.errors.zipcode}
                      helperText={
                        formik.touched.zipcode && formik.errors.zipcode
                      }
                      InputLabelProps={{
                        style: { color: "#5559CE" },
                      }}
                    />
                  </Grid>
                </Grid>
              </Grid>

              <Grid>
                <Grid
                  container
                  direction="flex"
                  justifyContent="flex-end"
                  alignItems="flex-end"
                >
                  <Grid>
                    {" "}
                    <Button
                      variant="contained"
                      type="submit"
                      style={{
                        width: { xs: "150px" },
                        marginTop: "20px",
                        display: "block",
                        backgroundColor: "#5559CE",
                        color: "#fff",
                      }}
                    >
                      Save
                    </Button>
                  </Grid>
                  <Grid>
                    <Button
                      variant="contained"
                      onClick={handleOpenDialog}
                      style={{
                        width: { xs: "150px" },
                        marginTop: "20px",
                        marginLeft: "10px",
                        display: "block",
                        backgroundColor: "#ede7f6",
                        color: "#5559CE",
                      }}
                    >
                      Delete
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
              <ConfirmationDialog
                open={open}
                handleClose={handleCloseDialog}
                title={"Employee detail"}
                handleDelete={handleDelete}
              />
            </FormControl>
          </form>
        </div>
      </MainCard>
    </>
  );
};
export default Editemployee;
