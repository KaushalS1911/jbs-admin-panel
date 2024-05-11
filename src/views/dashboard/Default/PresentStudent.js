import { styled } from "@mui/material/styles";
import { Box, Grid, Typography } from "@mui/material";
import MainCard from "ui-component/cards/MainCard";
import { useEffect, useState } from "react";
import { useGetAttendanceLogs } from "hooks/useGetAttendanceLogs";
import PASStudent from "../../../assets/images/icone deshbord/vector6.png";
import { useGetSingleStudent } from "hooks/useGetSingleStudent";
import { useGetAllStudents } from "hooks/useGetAllStudents";

const CardWrapper = styled(MainCard)(() => ({
  backgroundColor: "#fff",
  color: "#1B1D28",
  boxShadow:
    "rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;",
}));

const PresentStudent = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedType, setSelectedType] = useState(["Present"]);
  const [totalPresent, setTotalPresent] = useState(0);
  const [totalAbsent, setTotalAbsent] = useState(0);
  const { data, refetch } = useGetAttendanceLogs(selectedDate, selectedType);
  const { data:student } = useGetAllStudents();
  const TotalStudent=student?.totalStudents;

  useEffect(() => {
    refetch();
  }, [selectedDate, selectedType, refetch]);
  
  useEffect(() => {
    if (data && Array.isArray(data)) {
      const filterStudents = data.filter(
        (entry, index, arr) =>
          arr.findIndex((e) => e.studentId === entry.studentId) === index
      );
      const presentCount = filterStudents.filter(
        (entry) => entry.status === "Present"
      ).length;
  
      const absentCount = TotalStudent-presentCount

      setTotalPresent(presentCount);
      setTotalAbsent(absentCount);
    }
  }, [data]);
  

  return (
    <CardWrapper border={true} content={false}>
      <Box sx={{ p: 2.25 }}>
        <Grid
          container
          direction="row"
          justifyContent="space-around"
          alignItems="center"
        >
          <Grid item>
            <img
              src={PASStudent}
              alt="P/A Student"
              style={{
                marginTop: "8px",
                width: "40px",
                height: "40px",
                lineHeight: "40px",
              }}
            />
          </Grid>
          <Grid item>
            <Grid container direction="column">
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: 500,
                  color: "#1B1D28",
                }}
              >
                P/A Student
              </Typography>
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
      </Box>
    </CardWrapper>
  );
};

export default PresentStudent;
