import React, { useState } from "react";
import { Avatar, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import MainCard from "ui-component/cards/MainCard";
import axios from "axios";
import { notification } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getConfigs } from "./SettingSlice";
import PageTitle from "../../contants/PageTitle";
import {useRecoilValue} from "recoil";
import {profile} from "../../atoms/authAtoms";

function EditCompanyProfile() {
<<<<<<< HEAD
  /* eslint-disable */
  const [profilePic, setProfilePic] = useState(null);
  const { configs } = useSelector((state) => state.configs);
  const dispatch = useDispatch();
=======
    const user = useRecoilValue(profile)
    const [profilePic, setProfilePic] = useState(null);
    const {configs} = useSelector((state) => state.configs)
    const dispatch = useDispatch()
>>>>>>> ea18914e1cbcce0ea64cf6abfa8533b7c0df5986

  const { company_details } = configs;

  //Notification
  const openNotificationWithIcon = (type, message) => {
    notification[type]({
      message: message,
    });
  };

<<<<<<< HEAD
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    setProfilePic(file);
    const apiEndpoint = `${process.env.REACT_APP_API_URL}${configs?.company_id}/company-logo`;
=======
    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        setProfilePic(file)
        const apiEndpoint = `${process.env.REACT_APP_API_URL}${user?.company_id}/company-logo`;
>>>>>>> ea18914e1cbcce0ea64cf6abfa8533b7c0df5986

    const formData = new FormData();
    formData.append("logo_url", file, file.name);

<<<<<<< HEAD
    try {
      const response = await axios.put(apiEndpoint, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      openNotificationWithIcon("success", response.data.data.message);
      dispatch(getConfigs());
    } catch (error) {
      console.error("Upload error:", error);
=======
        try {
            const response = await axios.put(apiEndpoint, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            openNotificationWithIcon("success", response.data.data.message);
            dispatch(getConfigs(user.company_id))
        } catch (error) {
            console.error("Upload error:", error);
        }
>>>>>>> ea18914e1cbcce0ea64cf6abfa8533b7c0df5986
    }
  };

  return (
    <div>
      <PageTitle title={"Settings"} subtitle={"Company Profile"} />
      <Box sx={{ maxWidth: "1200px" }}>
        <Grid container spacing={3} rowSpacing={3} alignItems={"start"}>
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
                  src={company_details?.logo ? company_details?.logo : "Upload Logo "}
                  onClick={() => document.getElementById("file-input").click()}
                  style={{
                    cursor: "pointer",
                    width: 96,
                    height: 100,
                    margin: "auto",
                    fontSize:'10px',
                  }}
                >
                        Upload Logo 
                </Avatar>
              </Box>
              <Typography
                sx={{
                  fontSize: "1.1rem",
                  fontWeight: 600,
                  textAlign: "center",
                }}
              >
                {company_details?.name}
              </Typography>
            </MainCard>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default EditCompanyProfile;
