import React, { useState } from "react";
import { Avatar, Button, Grid } from "@mui/material";
import { Box } from "@mui/system";
import MainCard from "ui-component/cards/MainCard";
import axios from "axios";
import { notification } from "antd";

function EditCompanyProfile() {
  const [profilePic, setProfilePic] = useState(null); 


  //Notification
  const openNotificationWithIcon = (type, message) => {
    notification[type]({
      message: message,
    });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0]; 
    setProfilePic(file);
  };

  const saveProfile = async (event) => {
    event.preventDefault();
    const user = JSON.parse(localStorage.getItem("user"));
    const apiEndpoint = `${process.env.REACT_APP_API_URL}${user?.company_id}/company-logo`;
  
    if (profilePic) {
      const formData = new FormData();
      formData.append("logo_url", profilePic, profilePic.name); // Include file name
      formData.append("quality", 1); // Set quality to 1 for highest quality (optional)
  
      window.location = "/";
      try {
        const response = await axios.put(apiEndpoint, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        openNotificationWithIcon("success", response.data.data.message);
        const Companylogo = response.data.data.company.logo_url;
        localStorage.setItem('Companylogo', Companylogo);
      } catch (error) {
        console.error("Upload error:", error);
      }
    } else {
      console.error("No profile picture selected");
    }
  };
  

  return (
    <div>
      <form onSubmit={saveProfile}>
        <Box sx={{ maxWidth: "1200px" }}>
          <Grid container spacing={3} rowSpacing={3} alignItems={"start"}>
            <Grid item xs={12} lg={4} md={6} sm={12}>
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
                    src={profilePic ? URL.createObjectURL(profilePic) : ""} 
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
                <Grid container spacing={3}>
                  <Grid item xs={12}>
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
    </div>
  );
}

export default EditCompanyProfile;
