import React, { useEffect } from "react";
import PropTypes from "prop-types";
import {
  Button,
  CardActions,
  Avatar,
  CardContent,
  Divider,
  Grid,
  Table,
  TableBody,
  Typography,
} from "@mui/material";
import MainCard from "ui-component/cards/MainCard";
import SkeletonPopularCard from "ui-component/cards/Skeleton/PopularCard";
import { gridSpacing } from "store/constant";
import { Box } from "@mui/system";
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";
import { useGetUpcomingDemo } from "../../../hooks/useGetUpcomingDemo";
import { useNavigate } from "react-router-dom";
import { profile } from "../../../atoms/authAtoms";
import { useRecoilState } from "recoil";

const UpcomingDemo = ({ isLoading }) => {
  const navigate = useNavigate();
  const { data, refetch } = useGetUpcomingDemo();
  const [profileData, setProfileData] = useRecoilState(profile);
  console.log(profileData);

  const ViewAllDemo = () => {
    navigate("/demo");

    if (profileData.role == "Student") {
      navigate("/");
    } else {
    }
  };

  useEffect(() => {
    refetch();
  }, []);

  //Show Only Pending demo status
  const filteredData = data?.filter(
    (e) => e.status !== "Completed" && e.status !== "Cancelled"
  );

  return (
    <>
      {isLoading ? (
        <SkeletonPopularCard />
      ) : (
        <MainCard content={false}>
          <CardContent
            style={{ height: "410px", overflowY: "scroll", padding: "10px" }}
          >
            <Grid container spacing={gridSpacing}>
              <Grid item xs={12}>
                <Grid
                  container
                  alignContent="center"
                  justifyContent="space-between"
                >
                  <Grid item>
                    <Typography
                      variant="h4"
                      style={{ fontSize: "18px", color: "#5559CE" }}
                    >
                      Upcoming Demo
                    </Typography>
                  </Grid>
                </Grid>
                <Divider sx={{ my: 1.5 }} />
              </Grid>
              <Grid
                item
                xs={12}
                sx={{
                  overflow: "hidden",
                  overflowY: "scroll",
                  maxHeight: "350px",
                }}
              >
                <Table aria-label="table with ellipsis texts" noWrap>
                  <TableBody style={{ cursor: "pointer" }}>
                    {filteredData &&
                      filteredData.length !== 0 &&
                      filteredData.map((entry, index) => {
                        const faculty_name = entry.faculty_name.split(" ")[0];
                        const avatarPhotoUrl = `https://api.adorable.io/avatars/100/${faculty_name}.png`;
                        return (
                          <tr
                            key={index}
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              padding: "10px 0",
                              borderBottom: "1px solid #E5EBF0",
                            }}
                          >
                            <td>
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 1.5,
                                }}
                              >
                                <Box
                                  sx={{ minWidth: 0 }}
                                  display={"flex"}
                                  alignItems={"center"}
                                >
                                  <Typography
                                    noWrap
                                    fontWeight="lg"
                                    sx={{
                                      fontSize: "14px",
                                      color: "#1B1D28",
                                      fontWeight: "500",
                                    }}
                                  >
                                    <Avatar
                                      alt={entry.faculty_name}
                                      src={avatarPhotoUrl}
                                    />
                                  </Typography>
                                  <Typography
                                    noWrap
                                    fontWeight="lg"
                                    sx={{
                                      padding: "0px 0px 0px 10px",
                                      fontSize: "14px",
                                      color: "#5559CE",
                                      fontWeight: "600",
                                    }}
                                  >
                                    {entry.faculty_name}
                                  </Typography>
                                </Box>
                              </Box>
                            </td>
                            <td>
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 1.5,
                                }}
                              >
                                <Box sx={{ minWidth: 0 }}>
                                  <Typography
                                    noWrap
                                    fontWeight="lg"
                                    sx={{
                                      textAlign: "end",
                                      fontSize: "14px",
                                      color: "#5559CE",
                                      fontWeight: "600",
                                    }}
                                  >
                                    {entry.firstName}
                                  </Typography>
                                  <Typography
                                    noWrap
                                    level="body-sm"
                                    sx={{
                                      fontSize: "10px",
                                      textAlign: "right",
                                      color: "#96A0B5",
                                      fontWeight: "400",
                                    }}
                                  >
                                    {new Date(entry.date).toLocaleDateString()}-{" "}
                                    {entry.time}
                                  </Typography>
                                  <Typography
                                    noWrap
                                    fontWeight="lg"
                                    sx={{
                                      textAlign: "end",
                                      fontSize: "12px",
                                      color: "#1B1D28",
                                      fontWeight: "400",
                                      lineHeight: "10px 0",
                                    }}
                                  >
                                    Note: {entry.note}
                                  </Typography>
                                </Box>
                              </Box>
                            </td>
                          </tr>
                        );
                      })}
                  </TableBody>
                </Table>
              </Grid>
            </Grid>
          </CardContent>
          <CardActions sx={{ padding: "20px 0", justifyContent: "center" }}>
            <Button
              size="small"
              disableElevation
              sx={{
                fontSize: "14px",
                backgroundColor: "#5559CE",
                opacity:0.9,
                padding: "0",
                color: "#fff!important",
                p: 1,
                fontWeight: "500",
                cursor: profileData.role === "Student" ? "not-allowed" : "pointer",
                "&:hover": {
                  backgroundColor: "#e1e1e1",
                  color: "#FFF",
                },
              }}
              onClick={ViewAllDemo}
              disabled={profileData.role === "Student"}
            >
              View All
              <ChevronRightOutlinedIcon />
            </Button>
          </CardActions>
        </MainCard>
      )}
    </>
  );
};

UpcomingDemo.propTypes = {
  isLoading: PropTypes.bool,
};

export default UpcomingDemo;
