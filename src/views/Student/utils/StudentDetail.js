import React, { useEffect, useState } from "react";
import { List, Button, Typography } from "@mui/material";
import { courseProgress } from "../../../contants/courseConstants";
import MainCard from "ui-component/cards/MainCard";
import { useTheme } from "@mui/material/styles";
import { styled } from "@mui/material/styles";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import Box from "@mui/material/Box";
// Define the full-stack development courses

const StudentDetail = ({ course }) => {
  const theme = useTheme();
  const [completedCourses, setCompletedCourses] = useState([]);
  const [courses, setCourses] = useState([]);
  const [index, setIndex] = useState();
  const [dates, setDates] = useState([]);

  const one = () => {
    const selectedCourse = courseProgress(course);
    setCourses(selectedCourse);
    setDates(Array(selectedCourse.length).fill("--"));
  };

  useEffect(() => {
    one();
  }, []);

  const handleCourseCompletion = (index) => {
    if (!completedCourses.includes(index)) {
      setCompletedCourses([...completedCourses, index]);
      setDates((prevDates) => {
        const newDates = [...prevDates];
        newDates[index] = new Date().toLocaleDateString();
        return newDates;
      });
    }
  };

  const isCourseCompleted = (index) => {
    return completedCourses.includes(index);
  };

  const handleReset = () => {
    setCompletedCourses([]);
  };


  return (
    <MainCard>
      <div className="progress">
        <List>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              marginLeft: "5%",
              // justifyContent: "center",
              // alignItems: "center",
            }}
          >
            <Stepper activeStep={index} disabled={index} orientation="vertical">
              {courses.map((label, index) => (
                <Step
                  key={label}
                  sx={{
                    display: "flex",
                  }}
                >
                  <StepLabel
                    sx={{
                      width: "300px",
                    }}
                  >
                    {label}
                  </StepLabel>{" "}
                  <Typography
                    variant="h6"
                    sx={{
                      fontSize: "16px",
                      margin: "0px 25px",
                      alignSelf: "center",
                      width: "150px",
                    }}
                    component="span"
                    color={isCourseCompleted(index) ? "grey" : "secondary"}
                  >
                    {dates[index]}
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{
                      ...theme.typography.commonAvatar,
                      transition: "all .2s ease-in-out",
                      fontSize: "16px",
                      margin: "0px 25px",
                      background: theme.palette.secondary.light,
                      color: theme.palette.secondary.dark,
                      "&:hover": isCourseCompleted(index)
                        ? ""
                        : {
                          background: theme.palette.secondary.dark,
                          color: theme.palette.secondary.light,
                        },
                    }}
                    disabled={isCourseCompleted(index)}
                    onClick={() => {
                      handleCourseCompletion(index);
                      setIndex(index + 1);
                    }}
                  >
                    Complete Course
                  </Button>
                </Step>
              ))}
            </Stepper>
          </Box>
        </List>
        <div
          style={{
            display: "flex",
            margin: "20px 0",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography sx={{ fontSize: "22px", fontWeight: "600" }}>
            Progress : {completedCourses.length}/{courses.length}
          </Typography>

          <Typography>
            <Button
              variant="contained"
              color="secondary"
              disabled={completedCourses.length === 0}
              sx={{
                fontSize: "16px",
              }}
              onClick={() => {
                handleReset();
                setIndex(0);
                // setDates(Array(selectedCourse.length).fill("--"));
                one();
              }}
            >
              Reset
            </Button>
            <Button
              variant="contained"
              color="secondary"
              disabled={completedCourses.length != courses.length}
              sx={{
                fontSize: "16px",
                margin: "0px 10px",
              }}
            >
              Completed
            </Button>
          </Typography>
        </div>
      </div>
    </MainCard>
  );
};

export default StudentDetail;
