import React, { useEffect, useState } from "react";
import { List, Button, Typography } from "@mui/material";
import { courseProgress } from "../../../contants/courseConstants";
import MainCard from "ui-component/cards/MainCard";
import { useTheme } from "@mui/material/styles";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Box from "@mui/material/Box";
import { useParams } from "react-router-dom";
import { useGetSingleStudent } from "../../../hooks/useGetSingleStudent";
import instance from "../../../helpers/axios";
import { notification } from "antd";

const StudentDetail = ({ course }) => {
  const { companyId, studentId } = useParams();
  const { data, refetch } = useGetSingleStudent(studentId);
  const theme = useTheme();
  const [completedCourses, setCompletedCourses] = useState([]);
  const [courses, setCourses] = useState([]);
  const [index, setIndex] = useState();
  const [dates, setDates] = useState([]);

  const one = () => {
    const selectedCourse = courseProgress(course);
    if (!selectedCourse) {
      return;
    }
    setCourses(selectedCourse);
    const initialDates = selectedCourse.map((course, index) =>
      data?.assignmentCompleted.some((item) => item.index === index)
        ? data?.assignmentCompleted.find((item) => item.index === index).date
        : "--"
    );
    setDates(initialDates);
  };

  useEffect(() => {
    one();
    refetch();

    if (data?.assignmentCompleted && data?.assignmentCompleted.length !== 0) {
      setCompletedCourses(data?.assignmentCompleted);
    }
  }, []);

  const openNotificationWithIcon = (type, message) => {
    notification[type]({
      message: message,
    });
  };

  const handleCourseCompletion = async (index) => {
    if (!completedCourses.includes(index)) {
      const completionDate = new Date().toLocaleDateString();

      setDates((prevDates) => {
        const newDates = [...prevDates];
        newDates[index] = completionDate;
        return newDates;
      });

      const payload = {
        ...data,
        assignmentCompleted: [
          ...completedCourses,
          { index, date: completionDate },
        ],
      };

      await instance({
        method: "PUT",
        url: `company/${companyId}/${studentId}/updateStudent`,
        data: payload,
      })
        .then((response) => {
          setCompletedCourses([
            ...completedCourses,
            { index, date: completionDate },
          ]);
          openNotificationWithIcon("success", response.data.data.message);
          refetch();
        })
        .catch((error) => {
          openNotificationWithIcon("error", error.response.data.message);
        });
    }
  };

  const isCourseCompleted = (index) => {
    return data?.assignmentCompleted.some((item) => item.index === index);
  };

  const handleReset = async () => {
    const payload = { ...data, assignmentCompleted: [] };

    await instance({
      method: "PUT",
      url: `company/${companyId}/${studentId}/updateStudent`,
      data: payload,
    })
      .then(() => {
        setCompletedCourses([]);
        openNotificationWithIcon("success", "Progress reset successfully.");
        refetch();
      })
      .catch((error) => {
        console.log(error);
        openNotificationWithIcon("error", error.response.data.message);
      });
  };

  return (
    <MainCard>
      <Box>
        <List>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              marginLeft: "5%",
              justifyContent: "center",
              alignItems: "center",
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
                      minWidth: "300px",
                    }}
                  >
                    {label}
                  </StepLabel>{" "}
                  <Typography
                    variant="h6"
                    sx={{
                      fontSize: "16px",
                      alignSelf: "center",
                      width: "200px",
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
                      fontSize: "14px",
                      padding: "0px 25px",
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
        <Box
          style={{
            display: "flex",
            margin: "20px 0",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography sx={{ fontSize: "20px", fontWeight: "600" }}>
            Progress : {completedCourses.length}/{courses.length}
          </Typography>

          <Typography>
            <Button
              variant="contained"
              color="secondary"
              disabled={completedCourses.length === 0}
              sx={{
                fontSize: "14px",
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
                fontSize: "14px",
                margin: "0px 10px",
              }}
            >
              Completed
            </Button>
          </Typography>
        </Box>
      </Box>
    </MainCard>
  );
};

export default StudentDetail;
