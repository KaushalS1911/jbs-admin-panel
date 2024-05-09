import { styled } from "@mui/material/styles";
import { Box, Grid, Typography } from "@mui/material";
import MainCard from "ui-component/cards/MainCard";
import { useEffect } from "react";
import { useState } from "react";
import { useGetAttendanceLogs } from "hooks/useGetAttendanceLogs";
import PASStudent from "../../../assets/images/icone deshbord/vector6.png";


const CardWrapper = styled(MainCard)(() => ({
  backgroundColor: "#fff",
  color: "#fff",
  boxShadow:
    "rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;",
}));

const PresentStudent = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedType, setSelectedType] = useState("Present");

  const { data, refetch } = useGetAttendanceLogs(selectedDate, selectedType);

  useEffect(() => {
    refetch();
  }, [selectedDate, selectedType, refetch]);

  const totalPresent = data
    ? data.filter((entry) => entry.status === "Present").length
    : 0;
  const totalAbsent = data
    ? data.filter((entry) => entry.status === "Absent").length
    : 0;

  return (
    <>
      <CardWrapper border={true} content={false}>
        <Box sx={{ p: 2.25 }}>
          <Grid
            container
            direction="row"
            sx={{ justifyContent: "space-around" }}
          >
            <Grid item>
              <Grid container alignItems="center">
                <Grid item>
                  <img
                    src={PASStudent}
                    alt={PASStudent}
                    style={{
                      marginTop: "8px",
                      width: "40px",
                      height: "40px",
                      lineHeight: "40px",
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid container direction="column">
                <Grid>
                  <Typography
                    sx={{
                      fontSize: "14px",
                      fontWeight: 500,
                      color: "#1B1D28",
                    }}
                  >
                    P/A Student
                  </Typography>
                </Grid>
                <Grid>
                  <Typography
                    sx={{
                      fontSize: "26px",
                      fontWeight: 500,
                      textAlign: "center",
                      color: "#1B1D28",
                    }}
                  >
                    {totalPresent} / {totalAbsent}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </CardWrapper>
    </>
  );
};

export default PresentStudent;
