import React from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  InputAdornment,
  InputLabel,
  ListItemText,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import "react-phone-input-2/lib/style.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import countrystatecity from "Countrystatecity.json";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers";
import { useNavigate } from "react-router-dom";
import MainCard from "ui-component/cards/MainCard";
import PhoneInput from "react-phone-input-2";
import { useDispatch } from "react-redux";
import { useRecoilState } from "recoil";
import { profile } from "../../atoms/authAtoms";
import Mainbreadcrumbs from "contants/Mainbreadcrumbs";
import { notification } from "antd";
import axios from 'axios';

function Inquiryform() {
  const [profileData, setProfileData] = useRecoilState(profile);

  const validationSchema = Yup.object({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    contact: Yup.string().required("Contact no is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required")
      .matches(
        /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/,
        "Invalid email format"
      ),
  });
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      occupation: "",
      dob: null,
      contact: "",
      email: "",
      education: "",
      address_line1: "",
      address_line2: "",
      city: "",
      state: "",
      country: "",
      zip_code: "",
      reference_by: "",
      fatherName: "",
      father_contact: "",
      father_occupation: "",
      interested_in: [],
      suggested_by: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      const companyId = profileData.company_id;
      submitForm(values, resetForm, companyId);
    },
  });

  const submitForm = async (values, { resetForm }) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}${profileData?.company_id}/inquiry`,
        values
      );
      resetForm();
      navigate("/inquiry");
      openNotificationWithIcon("success", response.payload.data.message);
    } catch (error) {
      console.log(error);
      openNotificationWithIcon("error", error.response.data.message);
    }
  };

  const InterestedOptions = [
    "Web Designing",
    "Web Development",
    "iOS Development",
    "Full - Stack Development",
    "Android App",
    "Game Development",
    "Flutter",
    "React Native",
    "UI / UX",
    "Other",
  ];

  const handleCheckboxChange = (event) => {
    const selectedOptions = [...formik.values.interested_in];

    if (event.target.checked) {
      if (selectedOptions) {
        selectedOptions.push(event.target.value);
      }
    } else {
      const index = selectedOptions.indexOf(event.target.value);
      if (index !== -1) {
        selectedOptions.splice(index, 1);
      }
    }
    formik.setFieldValue("interested_in", selectedOptions);
  };

  //notification
  const openNotificationWithIcon = (type, message) => {
    notification[type]({
      message: message,
    });
  };

  return (
    <>
      <Mainbreadcrumbs title={"Inquiry"} subtitle={"Inquiry Add"} />
      <MainCard>
        <form className="inquiry-form" action="" onSubmit={formik.handleSubmit}>
          <div className="container">
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
                    borderWidth: "2px",
                  },
                },
                size: "small",
              }}
            >
              {/* Personal Details */}
              <Grid>
                <Typography
                  sx={{
                    marginBottom: "20px",
                    color: "#5559CE",
                    fontWeight: "500",
                    fontSize: "18px",
                  }}
                >
                  Personal Details:
                </Typography>
                <Grid container spacing={2} sx={{ marginBottom: "20px" }}>
                  <Grid item xl={4} lg={6} md={6} sm={6} xs={12}>
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
                      onChange={formik.handleChange}
                      fullWidth
                      InputLabelProps={{
                        style: { color: "#5559CE" },
                      }}
                    />
                  </Grid>
                  <Grid item xl={4} lg={6} md={6} sm={6} xs={12}>
                    <TextField
                      id="outlined-basic"
                      label="Last Name"
                      name="lastName"
                      value={formik.values.lastName}
                      error={
                        formik.touched.lastName &&
                        Boolean(formik.errors.lastName)
                      }
                      onChange={formik.handleChange}
                      fullWidth
                      variant="outlined"
                      InputLabelProps={{
                        style: { color: "#5559CE" },
                      }}
                    />
                  </Grid>
                  <Grid item xl={4} lg={6} md={6} sm={6} xs={12}>
                    <PhoneInput
                      country={"in"}
                      value={formik.values.contact}
                      onChange={(value, country, e, formattedValue) => {
                        formik.setFieldValue("contact", formattedValue);
                      }}
                    />
                    {formik.touched.contact && formik.errors.contact && (
                      <FormHelperText>{formik.errors.contact}</FormHelperText>
                    )}
                  </Grid>
                  <Grid item xl={4} lg={6} md={6} sm={6} xs={12}>
                    <TextField
                      id="outlined-basic"
                      label="Email id"
                      name="email"
                      variant="outlined"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      error={formik.touched.email && !!formik.errors.email}
                      helperText={formik.touched.email && formik.errors.email}
                      fullWidth
                      InputLabelProps={{
                        style: { color: "#5559CE" },
                      }}
                    />
                  </Grid>
                  <Grid item xl={4} lg={6} md={6} sm={6} xs={12}>
                    <LocalizationProvider
                      dateAdapter={AdapterDateFns}
                      fullWidth
                    >
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
                  <Grid item xl={4} lg={6} md={6} sm={6} xs={12}>
                    <TextField
                      id="outlined-basic"
                      label="Education"
                      variant="outlined"
                      name="education"
                      value={formik.values.education}
                      onChange={formik.handleChange}
                      fullWidth
                      InputLabelProps={{
                        style: { color: "#5559CE" },
                      }}
                    />
                  </Grid>
                  <Grid item xl={4} lg={6} md={6} sm={6} xs={12}>
                    <TextField
                      id="outlined-basic"
                      label="Occupation"
                      variant="outlined"
                      name="occupation"
                      value={formik.values.occupation}
                      onChange={formik.handleChange}
                      fullWidth
                      InputLabelProps={{
                        style: { color: "#5559CE" },
                      }}
                    />
                  </Grid>
                </Grid>
              </Grid>
              {/* Adress Details */}
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
                      name="address_line1"
                      value={formik.values.address_line1}
                      onChange={formik.handleChange}
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
                      name="address_line2"
                      fullWidth
                      variant="outlined"
                      value={formik.values.address_line2}
                      onChange={formik.handleChange}
                      InputLabelProps={{
                        style: { color: "#5559CE" },
                      }}
                    />
                  </Grid>
                  <Grid item xl={4} lg={6} md={6} sm={6} xs={12}>
                    <FormControl item={true} fullWidth>
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
                    </FormControl>
                  </Grid>

                  <Grid item xl={4} lg={6} md={6} sm={6} xs={12}>
                    <FormControl item={true} fullWidth>
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
                    </FormControl>
                  </Grid>

                  <Grid item xl={4} lg={6} md={6} sm={6} xs={12}>
                    <FormControl item={true} fullWidth>
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
                    </FormControl>
                  </Grid>
                  <Grid item xl={4} lg={6} md={6} sm={6} xs={12}>
                    <TextField
                      id="outlined-basic"
                      label="Zip Code"
                      name="zip_code"
                      inputProps={{ maxLength: 6 }}
                      variant="outlined"
                      fullWidth
                      value={formik.values.zip_code}
                      onChange={formik.handleChange}
                      InputLabelProps={{
                        style: { color: "#5559CE" },
                      }}
                    />
                  </Grid>
                </Grid>
              </Grid>
              {/* Father"s Details */}
              <Grid>
                <Typography
                  sx={{
                    marginBottom: "20px",
                    color: "#5559CE",
                    fontWeight: "500",
                    fontSize: "18px",
                  }}
                >
                  Father Details:
                </Typography>
                <Grid container spacing={2} sx={{ marginBottom: "20px" }}>
                  <Grid item xl={4} lg={6} md={6} sm={6} xs={12}>
                    <TextField
                      id="outlined-basic"
                      label="Father's Name"
                      name="fatherName"
                      variant="outlined"
                      fullWidth
                      value={formik.values.fatherName}
                      onChange={formik.handleChange}
                      InputLabelProps={{
                        style: { color: "#5559CE" },
                      }}
                    />
                  </Grid>
                  <Grid item xl={4} lg={6} md={6} sm={6} xs={12}>
                    <PhoneInput
                      country={"in"}
                      value={formik.values.father_contact}
                      onChange={(value, country, e, formattedValue) => {
                        formik.setFieldValue("father_contact", formattedValue);
                      }}
                    />
                  </Grid>
                  <Grid item xl={4} lg={6} md={6} sm={6} xs={12}>
                    <TextField
                      id="outlined-basic"
                      label="Father’s Occupation"
                      name="father_occupation"
                      variant="outlined"
                      fullWidth
                      value={formik.values.father_occupation}
                      onChange={formik.handleChange}
                      InputLabelProps={{
                        style: { color: "#5559CE" },
                      }}
                    />
                  </Grid>
                </Grid>
              </Grid>
              {/* ERefrence By */}
              <Grid>
                <Box
                  container
                  spacing={2}
                  sx={{ justifyContent: "space-between" }}
                >
                  <Typography
                    sx={{
                      marginBottom: "10px",
                      color: "#5559CE",
                      fontSize: "18px",
                      fontWeight: "bold",
                    }}
                  >
                    Reference By :
                  </Typography>
                  <Typography
                    sx={{
                      marginBottom: "10px",
                      color: "#1B1D28",
                      fontSize: "12px",
                      fontWeight: "normal",
                    }}
                  >
                    How did you come to know about JBS IT ?
                  </Typography>
                  <Grid
                    container
                    spacing={2}
                    sx={{
                      justifyContent: "flex-start",
                      alignItems: "center",
                      marginLeft: "0",
                    }}
                  >
                    <RadioGroup
                      row
                      name="reference_by"
                      value={formik.values.reference_by}
                      onChange={formik.handleChange}
                    >
                      <FormControlLabel
                        value="Google"
                        control={<Radio />}
                        label="Google"
                      />
                      <FormControlLabel
                        value="Just Dial"
                        control={<Radio />}
                        label="Just Dial"
                      />
                      <FormControlLabel
                        value="Social Media"
                        control={<Radio />}
                        label="Social Media"
                      />
                      <FormControlLabel
                        value="Board Banner"
                        control={<Radio />}
                        label="Board Banner"
                      />
                      <FormControlLabel
                        value="Brochure"
                        control={<Radio />}
                        label="Brochure"
                      />
                      <FormControlLabel
                        value="Other"
                        control={<Radio />}
                        label="Other"
                      />
                    </RadioGroup>
                  </Grid>
                </Box>
              </Grid>
              {/* Interested In */}
              <Grid container spacing={2} sx={{ marginBottom: "20px" }}>
                <Grid item xl={3} lg={3} md={6} sm={12} xs={12}>
                  <Typography
                    sx={{
                      marginBottom: "10px",
                      color: "#5559CE",
                      fontSize: "18px",
                      fontWeight: "bold",
                    }}
                  >
                    Select Interested Options:
                  </Typography>
                  <Grid>
                    <FormControl item={true} fullWidth>
                      <InputLabel id="interested-in-label">
                        Interested In
                      </InputLabel>
                      <Select
                        labelId="interested-in-label"
                        id="interested-in"
                        label="interestedin"
                        multiple
                        value={formik.values.interested_in || "interested"}
                        onChange={handleCheckboxChange}
                        renderValue={(selected) => selected.join(", ")}
                      >
                        <MenuItem disabled value={"interested"}>
                          -----Interested in----
                        </MenuItem>
                        {InterestedOptions.map((option) => (
                          <MenuItem key={option} value={option}>
                            <Checkbox
                              checked={formik.values.interested_in.includes(
                                option
                              )}
                              onChange={handleCheckboxChange}
                              value={option}
                            />
                            <ListItemText primary={option} />
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>
              {/* Why Choose */}
              <Grid>
                <Typography
                  sx={{
                    marginBottom: "10px",
                    color: "#5559CE",
                    fontSize: "18px",
                    fontWeight: "bold",
                  }}
                >
                  Why you choose this Course ?
                </Typography>
                <RadioGroup
                  row
                  name="suggested_by"
                  value={formik.values.suggested_by}
                  onChange={formik.handleChange}
                >
                  <FormControlLabel
                    value="Self Interested"
                    control={<Radio />}
                    label="Self Interested"
                  />
                  <FormControlLabel
                    value="Suggested by someone"
                    control={<Radio />}
                    label="Suggested by someone"
                  />
                </RadioGroup>
              </Grid>

              <Grid container>
                <Grid item xl={3} lg={3} md={3} sm={6} xs={12}>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    fullWidth
                    disabled={
                      formik.values.firstName === "" ||
                      formik.values.lastName === "" ||
                      formik.values.contact === "" ||
                      formik.values.email === ""
                    }
                    style={
                      formik.values.firstName === "" ||
                      formik.values.lastName === "" ||
                      formik.values.contact === "" ||
                      formik.values.email === ""
                        ? {
                            backgroundColor: "rgba(0, 0, 0, 0.12)",
                            color: "rgba(0, 0, 0, 0.26)",
                            width: "150px",
                            boxShadow: "none",
                          }
                        : {
                            background: "#5559ce",
                            color: "#fff",
                            width: "150px",
                            boxShadow: "none",
                          }
                    }
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </FormControl>
          </div>
        </form>
      </MainCard>
    </>
  );
}

export default Inquiryform;
