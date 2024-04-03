import React, { useState } from "react";
import { Avatar, Button, Grid, TextField, Typography } from "@mui/material";
import { Formik } from "formik";
import * as Yup from "yup";
import { Box } from "@mui/system";
import MainCard from "ui-component/cards/MainCard";

function EditCompanyProfile() {
  const [profilePic, setProfilePic] = useState("");
  const [profilePicError, setProfilePicError] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setProfilePic(URL.createObjectURL(file));
    setProfilePicError(null); // Clear any previous errors when a new file is selected
  };

  const saveProfile = async (values) => {
    if (profilePic !== "") {
      // Your save profile logic here
      const formData = {
        ...values,
        profilePic: profilePic,
      };
      console.log(formData);
    } else {
      setProfilePicError("Please upload a profile picture");
    }
  };

  return (
    <div>
      <Formik
        initialValues={{
          companyName: "",
          address: "", // Add address field
        }}
        validationSchema={Yup.object({
          companyName: Yup.string().required("Company name is required"),
          address: Yup.string().required("Address is required"),
        })}
        onSubmit={(values, { setSubmitting }) => {
          saveProfile(values);
          setSubmitting(false);
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
                      {profilePicError && (
                        <Typography
                          variant="body2"
                          color="error"
                          align="center"
                        >
                          {profilePicError}
                        </Typography>
                      )}
                      <Typography
                        sx={{
                          fontSize: "22px",
                          textAlign: "center",
                          fontWeight: "600",
                          marginBottom: "8px",
                        }}
                      >
                       Jbs It INstitute
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "16px",
                          textAlign: "center",
                          fontWeight: "500",
                        }}
                      >
                       F-38, Yogi Chowk, Yogi Chowk Ground, Chikuwadi, Varachha, Surat, Gujarat 395010
                      </Typography>
                    </MainCard>
                  </Grid>
                </Grid>
                <Grid item xs={12} lg={6} md={6}>
                  <MainCard>
                    <Grid container spacing={2}>
                      <Grid
                        xl={12}
                        lg={12}
                        sx={{
                          borderBottom: "1px solid #e1e1e1",
                          padding: "14px",
                        }}
                      >
                        <Typography sx={{ fontSize: "24px", color: "#673ab7" }}>
                          Company Profile
                        </Typography>
                        <Typography sx={{ fontSize: "14px" }}>
                          The information can be edited!
                        </Typography>
                      </Grid>
                      <Grid item xl={12} lg={12} sm={12} xs={12}>
                        <TextField
                          label="Company Name"
                          id="company-name"
                          name="companyName"
                          variant="outlined"
                          fullWidth
                          InputLabelProps={{
                            style: { color: "#5559CE" },
                          }}
                          {...formikProps.getFieldProps("companyName")}
                        />
                        {formikProps.touched.companyName &&
                        formikProps.errors.companyName ? (
                          <div>{formikProps.errors.companyName}</div>
                        ) : null}
                      </Grid>
                      <Grid item xl={12} lg={12} sm={12} xs={12}>
                        <TextField
                          label="Address"
                          id="address"
                          name="address"
                          variant="outlined"
                          fullWidth
                          InputLabelProps={{
                            style: { color: "#5559CE" },
                          }}
                          {...formikProps.getFieldProps("address")}
                        />
                        {formikProps.touched.address &&
                        formikProps.errors.address ? (
                          <div>{formikProps.errors.address}</div>
                        ) : null}
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

export default EditCompanyProfile;
