import React from "react";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import {
  Button,
  CircularProgress,
  FormControl,
  InputAdornment,
  InputLabel,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { Select, MenuItem } from "@mui/material";
import FormHelperText from "@mui/material/FormHelperText";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers";
import { useFormik } from "formik";
import * as yup from "yup";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import countrystatecity from "Countrystatecity.json";
import { notification } from "antd";
import MainCard from "ui-component/cards/MainCard";
import { useRecoilState } from "recoil";
import { profile } from "../../atoms/authAtoms";
import axios from "axios";
import Mainbreadcrumbs from "contants/Mainbreadcrumbs";
import { useSelector } from "react-redux";
import { useState } from "react";

const EmployeeAdd = () => {
  //notification
  const openNotificationWithIcon = (type, message) => {
    notification[type]({
      message: message,
    });
  };

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      },
    },
  };

  /* eslint-disable */
  const [profileData, setProfileData] = useRecoilState(profile);
  const [loading, setLoading] = useState(false);
  const { configs } = useSelector((state) => state.configs);
  const { emp_type, developer_type } = configs;
  const navigate = useNavigate();
  const validationSchema = yup.object({
    firstName: yup.string().required("First Name is required"),
    lastName: yup.string().required("Last Name is required"),
    contact: yup.string().required("Contact no is required"),
    email: yup
      .string()
      .email("Please Valid Email")
      .required("Email is required"),
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

  const formik = useFormik({
    initialValues: {
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
    onSubmit: async (values, { resetForm }) => {
      setLoading(true);
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}${profileData?.company_id}/employee`,
          values
        );
        resetForm();
        navigate("/employee");
        setLoading(false);
        openNotificationWithIcon("success", response.data.message);
      } catch (error) {
        openNotificationWithIcon("error", error.response.data.message);
      }
    },
  });

  return (
    <>
      <Mainbreadcrumbs title={"Employee"} subtitle={"Add Employee"} />
      <MainCard className="form-outer">
        <Grid>
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
              <Grid>
                <Grid item>
                  <Typography
                    variant="h4"
                    sx={{
                      color: "#5559CE",
                      fontSize: "18px",
                      fontWeight: "bold",
                      margin: "20px 8px 20px 0px",
                    }}
                  >
                    Personal Details:
                  </Typography>
                </Grid>
              </Grid>
              <Grid container spacing={2} sx={{ marginBottom: "20px",padding:"20px" }}>
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
                        formik.touched.lastName &&
                        Boolean(formik.errors.lastName)
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
                      error={
                        formik.touched.email && Boolean(formik.errors.email)
                      }
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
                    <FormControl item={true} fullWidth variant="outlined">
                      <InputLabel
                        id="gender-label"
                        style={{ color: "#5559ce" }}
                      >
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
                        helperText={
                          formik.touched.gender && formik.errors.gender
                        }
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
                    <FormControl item={true} fullWidth variant="outlined">
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
                        error={
                          formik.touched.role && Boolean(formik.errors.role)
                        }
                        helperText={formik.touched.role && formik.errors.role}
                        InputLabelProps={{
                          style: { color: "#5559CE" },
                        }}
                      >
                        {emp_type &&
                          emp_type?.length !== 0 &&
                          emp_type.map((e) => {
                            return <MenuItem value={e}>{e}</MenuItem>;
                          })}
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
                    <FormControl item={true} fullWidth variant="outlined">
                      <InputLabel
                        id="developer-label"
                        style={{ color: "#5559ce" }}
                      >
                        Developer
                      </InputLabel>
                      <Select
                        labelId="developer-label"
                        id="developer"
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
                        {developer_type &&
                          developer_type?.length !== 0 &&
                          developer_type.map((e) => {
                            return <MenuItem value={e}>{e}</MenuItem>;
                          })}
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
                        label="Date of Birth"
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
                        label="Joining Date"
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
                <Grid item>
                  <Typography
                    variant="h4"
                    sx={{
                      color: "#5559CE",
                      fontWeight: "500",
                      fontSize: "18px",
                      margin: "20px 8px 20px 0px",
                    }}
                  >
                    Address Details:
                  </Typography>
                </Grid>
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
                        MenuProps={MenuProps}
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
                    <FormControl item={true} fullWidth>
                      <InputLabel id="state-label" style={{ color: "#5559CE" }}>
                        State
                      </InputLabel>
                      <Select
                        labelId="state-label"
                        MenuProps={MenuProps}
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
                    <FormControl item={true} fullWidth>
                      <InputLabel id="city-label" style={{ color: "#5559CE" }}>
                        City
                      </InputLabel>
                      <Select
                        labelId="city-label"
                        label="city"
                        MenuProps={MenuProps}
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
              <Grid
                item
                xl={12}
                lg={12}
                md={12}
                sm={12}
                xs={12}
                sx={{ marginBottom: "20px" }}
                container
                justifyContent="start"
                alignItems="center"
              >
                <Grid item xl={2}>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    fullWidth
                    disabled={
                      loading ||
                      Object.values(formik.values).some(
                        (value) => value === "" || value === null
                      )
                    }
                    style={
                      loading
                        ? {
                            color: "rgba(0, 0, 0, 0.26)",
                            boxShadow: "none",
                            backgroundColor: "rgba(0, 0, 0, 0.12)",
                          }
                        : {
                            background: "#5559ce",
                            color: "#fff",
                          }
                    }
                  >
                    {loading ? <CircularProgress size={24} /> : "Submit"}
                  </Button>
                </Grid>
              </Grid>
            </FormControl>
          </form>
        </Grid>
      </MainCard>
    </>
  );
};
export default EmployeeAdd;
