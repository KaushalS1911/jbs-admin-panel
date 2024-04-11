import { Avatar, Grid, Typography } from "@mui/material";
import React from "react";
import { gridSpacing } from "store/constant";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useGetSingleStudent } from "hooks/useGetSingleStudent";

const StudentAvater = () => {
  // const [selectedFile, setSelectedFile] = useState(null);
  const navigate=useNavigate();
  const { studentId } = useParams();

  const { data: student, refetch } = useGetSingleStudent(studentId);

  useEffect(() => {
    refetch();
  }, []);

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    const apiEndpoint = `${process.env.REACT_APP_API_URL}student/${studentId}/profile-pic`;

    if (file) {
      const formData = new FormData();
      formData.append("profile-pic", file);

      axios
        .put(apiEndpoint, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(() => {
          refetch();
        })
        .catch((error) => {
          console.error("Upload error:", error);
        });
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
          alignItems={"center"}
          justifyContent={{
            xs: "normal",
            sm: "space-between",
            md: "space-between",
            lg: "space-between",
          }}
        >
          <Grid sx={{ display: "flex", alignItems: "center" }}>
            <input
              id="file-input"
              type="file"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
            <Avatar
              alt="Avatar"
              src= {student?.personal_info?.profile_pic}
              onClick={handleAvatarClick}
              style={{ cursor: "pointer", width: 126, height: 126 }}
            />

            <Grid
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

export default StudentAvater;
