import React, { useState } from "react";
import { Avatar, Button, Grid, TextField, Typography } from "@mui/material";
import PhoneInput from "react-phone-input-2";
import { Formik } from "formik";
import * as Yup from "yup";
import "react-phone-input-2/lib/style.css";
import { Box } from "@mui/system";
import MainCard from "ui-component/cards/MainCard";
import axios from "axios";

function EditAdminProfile() {
  const [profilePic, setProfilePic] = useState("");

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    const user = JSON.parse(localStorage.getItem("user"));
    const apiEndpoint = `${process.env.REACT_APP_LOGIN_URL}users/${user?._id}/profile-pic`;

    if (file) {
      const formData = new FormData();
      formData.append("profile-pic", file);

      try {
        await axios.put(apiEndpoint, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        console.log("Profile picture uploaded successfully");
      } catch (error) {
        console.error("Upload error:", error);
      }
    }
  };

  const saveProfile = async (values, setSubmitting) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const apiEndpoint = `${process.env.REACT_APP_LOGIN_URL}users/${user?._id}`;

    try {
      const response=await axios.put(apiEndpoint, values);
      console.log("Profile saved successfully",response);
    } catch (error) {
      console.error("Error saving profile:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
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
        onSubmit={(values, { setSubmitting }) => {
          saveProfile(values, setSubmitting);
        }}
      >
        {(formikProps) => (
          <form onSubmit={formikProps.handleSubmit}>
            <Box sx={{ maxWidth: "1200px" }}>
              <Grid container spacing={2} rowSpacing={3} alignItems={"start"}>
                <Grid item xs={12} lg={4} md={6} sx={{ padding: "20px" }}>
                  <Grid sx={{ textAlign: "center" }}>
                    <MainCard
                      sx={{
                        height: {
                          xs: "auto",
                          sm: "auto",
                          md: "auto",
                          lg: "80vh",
                          xl: "80vh",
                        },
                      }}
                    >
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
                        Monil Kakadiya {/* You might want to dynamically change this */}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "16px",
                          textAlign: "center",
                          fontWeight: "500",
                        }}
                      >
                        Admin
                      </Typography>
                    </MainCard>
                  </Grid>
                </Grid>
                <Grid item xs={12} lg={6} md={6}>
                  <MainCard>
                    <Grid container spacing={3}>
                      <Grid item xl={6} lg={6} sm={12} xs={12}>
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
                            <div>{formikProps.errors.firstName}</div>
                          )}
                      </Grid>
                      <Grid item xl={6} lg={6} sm={12} xs={12}>
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
                            <div>{formikProps.errors.lastName}</div>
                          )}
                      </Grid>
                      <Grid item xl={6} lg={6} sm={12} xs={12}>
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
                            <div>{formikProps.errors.email}</div>
                          )}
                      </Grid>
                      <Grid item xl={6} lg={6} sm={12} xs={12}>
                        <PhoneInput
                          country={"in"}
                          value={formikProps.values.contact}
                          onChange={(value, country, e, formattedValue) => {
                            formikProps.setFieldValue(
                              "contact",
                              formattedValue
                            );
                          }}
                        />
                        {formikProps.touched.contact &&
                          formikProps.errors.contact && (
                            <div>{formikProps.errors.contact}</div>
                          )}
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
            </Box>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default EditAdminProfile;
