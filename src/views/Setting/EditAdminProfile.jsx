import React, { useState } from "react";
import {
  Avatar,
  Button,
  Grid,
  TextField,
  Typography,
  FormControl,
} from "@mui/material";
import PhoneInput from "react-phone-input-2";
import { Formik } from "formik";
import * as Yup from "yup";
import "react-phone-input-2/lib/style.css";
import { Box } from "@mui/system";
import MainCard from "ui-component/cards/MainCard";
import instance from "helpers/axios";

function EditAdminProfile() {
    //notification
    const openNotificationWithIcon = (type, message) => {
      Notification[type]({
        message: message,
      });
    };
  const [profilePic, setProfilePic] = useState("");

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    const user = JSON.parse(localStorage.getItem("user"));
    const apiEndpoint = `${process.env.REACT_APP_LOGIN_URL}users/${user?._id}/profile-pic`;

    if (file) {
      const formData = new FormData();
      formData.append("profile-pic", file);

      try {
        const response = await instance({
          method: "PUT",
          url: apiEndpoint,
          data: formData,
        });
        setProfilePic(response.data.data.profilePicUrl);
        openNotificationWithIcon("success", response.data.data.message);
      } catch (error) {
        console.log("Error", error);
      }
    }
  };

  const saveProfile = async (values) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const apiEndpoint = `${process.env.REACT_APP_LOGIN_URL}users/${user?._id}`;
    const payload = {
      ...values,
    };
    try {
      const response = await instance({
        method: "PUT",
        url: apiEndpoint,
        data: payload,
      });
      console.log("Update_user", response.data);
      localStorage.setItem('user', JSON.stringify(response.data));
      window.location = "/";
    } catch (error) {
      console.log("Error", error);
    }
  };

  return (
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
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            contact: "",
          }}
          validationSchema={Yup.object({
            firstName: Yup.string().required("First name is required"),
            lastName: Yup.string().required("Last name is required"),
            email: Yup.string()
              .email("Invalid email address")
              .required("Email is required"),
            contact: Yup.string().required("Contact number is required"),
          })}
          onSubmit={(values) => {
            saveProfile(values);
          }}
        >
          {(formikProps) => (
            <form onSubmit={formikProps.handleSubmit}>
              <Box sx={{ maxWidth: "1200px" }}>
                <Grid container spacing={3} alignItems={"start"}>
                  <Grid item xs={12} lg={4} md={6} sx={{ padding: "20px" }}>
                    <Grid sx={{ textAlign: "center" }}>
                      <MainCard>
                        <Box sx={{ marginBottom: "20px" }}>
                          <input
                            id="file-input"
                            type="file"
                            style={{ display: "none" }}
                            onChange={handleFileChange}
                          />
                          <Avatar
                            alt="Avatar"
                            src={profilePic}
                            onClick={() =>
                              document.getElementById("file-input").click()
                            }
                            style={{
                              cursor: "pointer",
                              width: 96,
                              height: 100,
                              margin: "auto",
                            }}
                          />
                        </Box>
                        <Typography
                          sx={{
                            fontSize: "22px",
                            textAlign: "center",
                            fontWeight: "600",
                            marginBottom: "8px",
                          }}
                        >
                          Monil Kakadiya{" "}
                          {/* You might want to dynamically change this */}
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: "16px",
                            textAlign: "center",
                            fontWeight: "500",
                            marginBottom: "14px",
                          }}
                        >
                          Admin
                        </Typography>
                        <Grid container spacing={3}>
                          <Grid item xl={12} lg={12} sm={12} xs={12}>
                            <TextField
                              label="First Name"
                              id="first-name"
                              name="firstName"
                              variant="outlined"
                              fullWidth
                              InputLabelProps={{
                                style: { color: "#5559CE" },
                              }}
                              {...formikProps.getFieldProps("firstName")}
                            />
                            {formikProps.touched.firstName &&
                              formikProps.errors.firstName && (
                                <div style={{ color: "red" }}>
                                  {formikProps.errors.firstName}
                                </div>
                              )}
                          </Grid>
                          <Grid item xl={12} lg={12} sm={12} xs={12}>
                            <TextField
                              label="Last Name"
                              id="last-name"
                              name="lastName"
                              variant="outlined"
                              fullWidth
                              InputLabelProps={{
                                style: { color: "#5559CE" },
                              }}
                              {...formikProps.getFieldProps("lastName")}
                            />
                            {formikProps.touched.lastName &&
                              formikProps.errors.lastName && (
                                <div style={{ color: "red" }}>
                                  {formikProps.errors.lastName}
                                </div>
                              )}
                          </Grid>
                          <Grid item xl={12} lg={12} sm={12} xs={12}>
                            <TextField
                              label="Email"
                              id="email"
                              name="email"
                              type="email"
                              variant="outlined"
                              fullWidth
                              InputLabelProps={{
                                style: { color: "#5559CE" },
                              }}
                              {...formikProps.getFieldProps("email")}
                            />
                            {formikProps.touched.email &&
                              formikProps.errors.email && (
                                <div style={{ color: "red" }}>
                                  {formikProps.errors.email}
                                </div>
                              )}
                          </Grid>
                          <Grid item xl={12} lg={12} sm={12} xs={12}>
                            <PhoneInput
                              country={"in"}
                              value={formikProps.values.contact}
                              onChange={(value, country, e, formattedValue) => {
                                // Ensure formattedValue contains only numeric characters
                                const numericValue = formattedValue.replace(
                                  /\D/g,
                                  ""
                                );
                                if (!isNaN(numericValue)) {
                                  formikProps.setFieldValue(
                                    "contact",
                                    numericValue
                                  );
                                } else {
                                  console.error(
                                    "Error: 'contact' must be a number."
                                  );
                                }
                              }}
                            />
                          </Grid>

                          <Grid
                            item
                            xs={12}
                            sx={{
                              display: "flex",
                              justifyContent: "center",
                            }}
                          >
                            <Button
                              type="submit"
                              variant="contained"
                              sx={{ backgroundColor: "#5559CE", width: "100%" }}
                            >
                              Save
                            </Button>
                          </Grid>
                        </Grid>
                      </MainCard>
                    </Grid>
                  </Grid>
                </Grid>
              </Box>
            </form>
          )}
        </Formik>
      </FormControl>
    </div>
  );
}

export default EditAdminProfile;
