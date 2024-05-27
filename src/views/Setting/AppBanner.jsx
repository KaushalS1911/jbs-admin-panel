import React, { useState, useEffect } from "react";
import { Avatar, Grid } from "@mui/material";
import { Box } from "@mui/system";
import MainCard from "ui-component/cards/MainCard";
import axios from "axios";
import { notification } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getConfigs } from "./SettingSlice";
import PageTitle from "../../contants/PageTitle";

function AppBanner() {
  const [banners, setBanners] = useState({ logo: "" });
  const [banner, setBanner] = useState(null);
  const { configs } = useSelector((state) => state.configs);
  console.log(configs.company_id);
  const dispatch = useDispatch();

  const openNotificationWithIcon = (type, message) => {
    notification[type]({
      message: message,
    });
  };

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const apiEndpoint = `${process.env.REACT_APP_LOGIN_URL}v1/company/${configs?.company_id}/app-banner`;
        const response = await axios.get(apiEndpoint);
        setBanners({ logo: response.data.banner_image });
      } catch (error) {
        console.error("Error fetching banner image:", error);
      }
    };

    if (configs?.company_id) {
      fetchBanner();
    }
  }, [configs]);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    setBanner(file);

    try {
      const apiEndpoint = `${process.env.REACT_APP_LOGIN_URL}v1/company/${configs?.company_id}/app-banner`;
      const formData = new FormData();
      formData.append("banner-image", file, file.name);

      const response = await axios.post(apiEndpoint, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response);
      openNotificationWithIcon("success", response.data.message);
      dispatch(getConfigs());
    } catch (error) {
      console.error("Upload error:", error);
    }
  };

  return (
    <div>
      <PageTitle title="App Banner" />
      <Box sx={{ maxWidth: "1200px" }}>
        <Grid container spacing={3} rowSpacing={3} alignItems="start">
          <Grid item xs={12} lg={4} md={6} sm={12}>
            <MainCard sx={{ padding: "10px" }}>
              <Box sx={{ marginBottom: "20px" }}>
                <input
                  id="file-input"
                  type="file"
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />
                <Avatar
                  alt="Avatar"
                  src={banners?.logo || ""}
                  onClick={() => document.getElementById("file-input").click()}
                  style={{
                    cursor: "pointer",
                    width: 96,
                    height: 100,
                    margin: "auto",
                    fontSize: "10px",
                  }}
                >
                  {!banner && "Upload Banner Image"}
                </Avatar>
              </Box>
            </MainCard>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default AppBanner;
