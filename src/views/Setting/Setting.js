import React from "react";
import {
  Grid,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

function Setting() {

  const backgroundImageUrl =
    "https://i.postimg.cc/DZR5bVtY/back-school-pattern-background-set-different-drawings-related-school-blue-color-153454-35.avif";
  const gridItemStyle = {
    backgroundImage: `url(${backgroundImageUrl})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };


  const navigate = useNavigate();
  const showExpenses = () => {
    navigate("/settings/expenses");
  };
  const showCompanyProfile = () => {
    navigate("/settings/editcompanyprofile");
  };



  return (
    <div>
      <Grid container spacing={2}>

        {/* Expenses */}
        <Grid item xs={12} sm={12} md={6} lg={4} onClick={showExpenses} sx={{cursor:'pointer'}}>
          <Grid
            style={gridItemStyle}
            boxShadow={1}
            sx={{
              padding: "20px",
              backgroundColor: "#fff",
              borderRadius: "10px",
              aspectRatio:'0.9/0.3'
            }}
          >
            <Typography
              sx={{
                fontSize: "25px",
                fontWeight: "500",
                color: "#989be1",
                marginBottom: "16px",
              }}
            >
              Expenses
            </Typography>
            <Typography
              sx={{ fontSize: "16px", color: "#fff", marginBottom: "16px" }}
            >
              Please Edit and Add Expenses according to personal Details.
            </Typography>
          </Grid>
        </Grid>

        {/* Profile */}
        <Grid item xs={12} sm={12} md={6} lg={4} onClick={showCompanyProfile} sx={{cursor:'pointer'}}>
          <Grid
            style={gridItemStyle}
            boxShadow={1}
            sx={{
              padding: "20px",
              backgroundColor: "#fff",
              borderRadius: "10px",
              aspectRatio:'0.9/0.3'
            }}
          >
            <Typography
              sx={{
                fontSize: "25px",
                fontWeight: "500",
                color: "#ac5926",
                marginBottom: "16px",
              }}
            >
              Company Profile
            </Typography>
            <Typography
              sx={{ fontSize: "16px", color: "#fff", marginBottom: "16px" }}
            >
              Please Edit and Add Profile according to Company Details.
            </Typography>
          </Grid>
        </Grid>
      </Grid>

  
    </div>
  );
}

export default Setting;
