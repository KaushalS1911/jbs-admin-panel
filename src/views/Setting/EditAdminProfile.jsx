import React, { useState, useEffect } from "react";
import { notification } from "antd";
import { Formik } from "formik";
import {
  Avatar,
  Button,
  Grid,
  TextField,
  Typography,
  FormControl,
} from "@mui/material";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Box } from "@mui/system";
import MainCard from "ui-component/cards/MainCard";
import instance from "helpers/axios";
import PageTitle from "../../contants/PageTitle";

function EditAdminProfile() {
  const [profilePic, setProfilePic] = useState("");
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    contact: "",
  });
  const [isPhotoUploaded, setIsPhotoUploaded] = useState(false);

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
        setIsPhotoUploaded(true);
        openNotificationWithIcon("success", response.data.data.message);
      } catch (error) {
        console.log("Error", error);
      }
    }
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setUserData({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        contact: user.contact,
        role: user.role,
      });
      setProfilePic(user.avatar_url);
    }
  }, []);

  //notification
  const openNotificationWithIcon = (type, message) => {
    notification[type]({
      message: message,
    });
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
      localStorage.setItem("user", JSON.stringify(response.data));
      window.location = "/";
    } catch (error) {
      console.log("Error", error);
    }
  };

  return (
    <>
      <PageTitle title={"Settings"} subtitle={"Admin Profile"} />
      <Box>
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
            initialValues={userData}
            enableReinitialize
            onSubmit={(values) => saveProfile(values)}
          >
            {({ values, handleChange, handleSubmit, setFieldValue }) => (
              <form onSubmit={handleSubmit}>
                <Box sx={{ maxWidth: "1200px" }}>
                  <Grid container spacing={3} alignItems={"start"}>
                    <Grid item xs={12} lg={4} md={6}>
                      <Grid sx={{ textAlign: "center" }}>
                        <MainCard sx={{ padding: "20px" }}>
                          <Box>
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
                                width: 126,
                                height: 126,
                                margin: "0 auto 10px",
                              }}
                            ></Avatar>
                          </Box>
                          <span
                            style={{
                              fontSize: "14px",
                              color: "#5559CE",
                              fontWeight: "700",
                            }}
                          >
                            Upload your Photo
                          </span>
                          <Typography
                            variant="h6"
                            sx={{
                              fontSize: "20px",
                              textAlign: "center",
                              fontWeight: "600",
                              margin: "10px 0",
                            }}
                          >
                            {values.firstName} {values.lastName}{" "}
                            <Typography
                              sx={{ color: "#5559CE", fontWeight: "600" }}
                            >
                              ({values.role})
                            </Typography>
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
                                value={values.firstName}
                                onChange={handleChange}
                              />
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
                                value={values.lastName}
                                onChange={handleChange}
                              />
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
                                value={values.email}
                                onChange={handleChange}
                              />
                            </Grid>
                            <Grid item xl={12} lg={12} sm={12} xs={12}>
                              <PhoneInput
                                country={"in"}
                                value={values.contact}
                                onChange={(
                                  value,
                                  country,
                                  e,
                                  formattedValue
                                ) => {
                                  setFieldValue("contact", formattedValue);
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
                                sx={{
                                  backgroundColor: "#5559CE",
                                  width: "100%",
                                }}
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
      </Box>
    </>
  );
}

export default EditAdminProfile;
