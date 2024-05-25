import React, { useEffect } from "react";
import { Avatar, Grid, Typography } from "@mui/material";
import axios from "axios";
import { useParams } from "react-router-dom";
import { gridSpacing } from "store/constant";
import { useGetSingleStudent } from "hooks/useGetSingleStudent";

const StudentAvatar = () => {
  const { studentId } = useParams();
  const { data: student, refetch } = useGetSingleStudent(studentId);

  useEffect(() => {
    refetch();
  }, []);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];

    if (file) {
      try {
        const formData = new FormData();
        formData.append("profile-pic", file);

        const apiEndpoint = `${process.env.REACT_APP_API_URL}student/${studentId}/profile-pic`;
        await axios.put(apiEndpoint, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        refetch();
      } catch (error) {
        console.error("Upload error:", error);
      }
    }
  };

  const handleAvatarClick = () => {
    document.getElementById("file-input").click();
  };

  return (
      <div>
        <Grid container spacing={gridSpacing} sx={{ padding: "30px" }}>
          <Grid
              container
              alignItems="center"
              justifyContent={{
                xs: "normal",
                sm: "space-between",
                md: "space-between",
                lg: "space-between",
              }}
          >
            <Grid item sx={{ display: "flex", alignItems: "center" }}>
              <input
                  id="file-input"
                  type="file"
                  style={{ display: "none" }}
                  onChange={handleFileChange}
              />
              <Avatar
                  alt="Avatar"
                  src={student?.personal_info?.profile_pic}
                  onClick={handleAvatarClick}
                  sx={{ cursor: "pointer", width: 126, height: 126 }}
              />

              <Grid
                  item
                  xl={8}
                  lg={8}
                  md={8}
                  sm={8}
                  xs={12}
                  sx={{ margin: " 0 10px" }}
              >
                <Typography variant="h2" gutterBottom>
                  {`${student?.personal_info?.firstName} ${student?.personal_info?.lastName}`}
                </Typography>
                <Typography variant="h5" gutterBottom>
                  {`${student?.personal_info?.course} `}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
  );
};

export default StudentAvatar;
