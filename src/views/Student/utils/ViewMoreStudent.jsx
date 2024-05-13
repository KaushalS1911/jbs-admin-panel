import { useEffect, useState } from "react";
import { Avatar, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useGetSingleStudent } from "hooks/useGetSingleStudent";
import React from "react";
import { useParams } from "react-router-dom";
import MainCard from "ui-component/cards/MainCard";
import Table from "react-bootstrap/Table";
import axios from "axios";
import { useGetSeminar } from "hooks/useGetSeminar";
import { courseProgress } from "contants/courseConstants";
import { useGetEvents } from "hooks/useGetEvents";
import { useSelector } from "react-redux";

function ViewMoreStudent() {
  const { studentId } = useParams();
  const { data, refetch } = useGetSingleStudent(studentId);
  const { data: seminar } = useGetSeminar();
  const { data: events } = useGetEvents();
  const [completedCourses, setCompletedCourses] = useState([]);
  const [courses, setCourses] = useState([]);
  const [dates, setDates] = useState([]);
  const { configs } = useSelector((state) => state.configs);
  const [eventData, setEventData] = useState([]);
  const fetchCourseData = () => {
    const selectedCourse = courseProgress(data?.personal_info?.course);
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
    fetchCourseData();
    refetch();

    if (data?.assignmentCompleted && data?.assignmentCompleted.length !== 0) {
      setCompletedCourses(data?.assignmentCompleted);
    }
  }, [data, refetch]);

  const sameCourses = courses.map((course, index) => ({
    name: course,
    date: dates[index] || "--",
  }));
  const formatDate = (dateTimeString) => {
    const date = new Date(dateTimeString);
    return date.toLocaleDateString("en-US");
  };
  
  useEffect(() => {
    refetch();
    const studentEvents = events.filter(
      (item) => data.student_user_id === item.event_user_id
    );
    setEventData(studentEvents);
  }, []);

  const handleAvatarClick = () => {
    document.getElementById("file-input").click();
  };

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

  console.log(eventData);

  return (
    <>
      <MainCard>
        {/* Company Name */}
        <Typography
          variant="h1"
          sx={{ color: "#5559CE", textAlign: "center" }}
          py={1}
        >
          <span style={{ display: "inline", textTransform: "uppercase" }}>
            {configs?.company_details?.name}
          </span>
        </Typography>
        <Box
          sx={{
            backgroundColor: "#f0f0f0",
            padding: "10px",
            textAlign: "center",
            borderRadius: "5px",
            boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Typography
            variant="h3"
            sx={{ color: "#5559ce", margin: 0, textShadow: "1px 1px 2px #ccc" }}
          >
            -: Student Details :-
          </Typography>
        </Box>
        {/* Personal Details */}
        <Box py={2}>
          <Typography variant="h4" sx={{ color: "#5559ce" }}>
            PERSONAL DETAILS:-
          </Typography>
          <Grid container spacing={2} py={2}>
            <Grid item xs={12} sx={12} md={12} lg={2}>
              <input
                id="file-input"
                type="file"
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
              <Avatar
                alt="Avatar"
                src={data?.personal_info?.profile_pic}
                onClick={handleAvatarClick}
                style={{ cursor: "pointer", width: 126, height: 126 }}
              />
            </Grid>

            <Grid
              item
              xs={12}
              sx={12}
              md={12}
              lg={10}
              container
              alignItems="center"
            >
              <Grid container spacing={1}>
                <Grid item xs={12} sm={6} md={6}>
                  <Typography
                    variant="h4"
                    sx={{ fontWeight: 600, marginRight: 2 }}
                  >
                    Name:{" "}
                    <Typography
                      variant="h4"
                      component="span"
                      sx={{ fontWeight: 300, textTransform: "capitalize" }}
                    >
                      {data?.personal_info.firstName}{" "}
                      {data?.personal_info.lastName}
                    </Typography>
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <Typography
                    variant="h4"
                    sx={{ fontWeight: 600, marginRight: 2 }}
                  >
                    Course:
                    <Typography
                      variant="h5"
                      component="span"
                      sx={{ fontWeight: 300, textTransform: "capitalize" }}
                    >
                      {data?.personal_info.course}
                    </Typography>
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <Typography
                    variant="h4"
                    sx={{ fontWeight: 600, marginRight: 2 }}
                  >
                    Email:{" "}
                    <Typography
                      variant="h4"
                      component="span"
                      sx={{ fontWeight: 300 }}
                    >
                      {data?.personal_info.email}
                    </Typography>
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <Typography
                    variant="h4"
                    sx={{ fontWeight: 600, marginRight: 2 }}
                  >
                    Phone:{" "}
                    <Typography
                      variant="h4"
                      component="span"
                      sx={{ fontWeight: 300 }}
                    >
                      {data?.personal_info.contact}
                    </Typography>
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <Typography
                    variant="h4"
                    sx={{ fontWeight: 600, marginRight: 2 }}
                  >
                    Education:{" "}
                    <Typography
                      variant="h4"
                      component="span"
                      sx={{ fontWeight: 300 }}
                    >
                      {data?.personal_info.education}
                    </Typography>
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <Typography
                    variant="h4"
                    sx={{ fontWeight: 600, marginRight: 2 }}
                  >
                    College:{" "}
                    <Typography
                      variant="h4"
                      component="span"
                      sx={{ fontWeight: 300 }}
                    >
                      {data?.personal_info.college}
                    </Typography>
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <Typography
                    variant="h4"
                    sx={{ fontWeight: 600, marginRight: 2 }}
                  >
                    Blood_group:{" "}
                    <Typography
                      variant="h4"
                      component="span"
                      sx={{ fontWeight: 300 }}
                    >
                      {data?.personal_info.blood_group}
                    </Typography>
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <Typography
                    variant="h4"
                    sx={{ fontWeight: 600, marginRight: 2 }}
                  >
                    Gender:{" "}
                    <Typography
                      variant="h4"
                      component="span"
                      sx={{ fontWeight: 300 }}
                    >
                      {data?.personal_info.gender}
                    </Typography>
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={6}>
                  <Typography
                    variant="h4"
                    sx={{ fontWeight: 600, marginRight: 2 }}
                  >
                    DOB:{" "}
                    <Typography
                      variant="h4"
                      component="span"
                      sx={{ fontWeight: 300 }}
                    >
                      {formatDate(data?.personal_info.dob)}
                    </Typography>
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={6}>
                  <Typography
                    variant="h4"
                    sx={{ fontWeight: 600, marginRight: 2 }}
                  >
                    Address:{" "}
                    <Typography
                      variant="h4"
                      component="span"
                      sx={{ fontWeight: 300, textTransform: "capitalize" }}
                    >
                      {data?.address_info.address_1}{" "}
                      {data?.address_info.address_2 &&
                        `${data?.address_info.address_2} `}
                      {data?.address_info.city}, {data?.address_info.state}{" "}
                      {data?.address_info.country}. {data?.address_info.zipcode}
                    </Typography>
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
        {/* Gardian Detsils */}
        <Box py={2}>
          <Typography variant="h4" sx={{ color: "#5559ce" }}>
            GUARDIAN DETAILS:-
          </Typography>
          <Table className="table" striped bordered hover size="sm">
            <thead>
              <tr>
                <th>Relation</th>
                <th>Name</th>
                <th>Phone</th>
              </tr>
            </thead>
            <tbody>
              {data?.guardian_info.map((guardian, index) => (
                <tr key={index}>
                  <td style={{ textTransform: "capitalize" }}>
                    {guardian.relation_type}
                  </td>
                  <td
                    style={{ textTransform: "capitalize" }}
                  >{`${guardian.firstName} ${guardian.lastName}`}</td>
                  <td>{guardian.contact}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Box>
        {/* Fees Detaiils */}
        <Box py={2}>
          <Typography variant="h4" sx={{ color: "#5559ce" }}>
            FEES DETAILS:-
          </Typography>
          <Grid container spacing={1} py={1}>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Typography variant="h4" sx={{ fontWeight: 600, marginRight: 2 }}>
                Total Amount:
                <Typography
                  variant="h4"
                  component="span"
                  sx={{ fontWeight: 300 }}
                >
                  {data?.fees_info.total_amount}
                </Typography>
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Typography variant="h4" sx={{ fontWeight: 600, marginRight: 2 }}>
                Amount Paid:{" "}
                <Typography
                  variant="h4"
                  component="span"
                  sx={{ fontWeight: 300 }}
                >
                  {data?.fees_info.amount_paid}
                </Typography>
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Typography variant="h4" sx={{ fontWeight: 600, marginRight: 2 }}>
                Amount Remainig:{" "}
                <Typography
                  variant="h4"
                  component="span"
                  sx={{ fontWeight: 300 }}
                >
                  {data?.fees_info.amount_remaining}
                </Typography>
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Typography variant="h4" sx={{ fontWeight: 600, marginRight: 2 }}>
                Admission Amount:{" "}
                <Typography
                  variant="h4"
                  component="span"
                  sx={{ fontWeight: 300 }}
                >
                  {data?.fees_info.admission_amount}
                </Typography>
              </Typography>
            </Grid>
          </Grid>
          <Table className="table" striped bordered hover size="sm">
            <thead>
              <tr>
                <th>Date</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Payment Mode</th>
                <th>Payment Date</th>
              </tr>
            </thead>
            <tbody>
              {data?.fees_info.installments.map((item, index) => (
                <tr key={index}>
                  <td>{formatDate(item.installment_date)}</td>
                  <td>{item.amount}</td>
                  <td>{item.status}</td>
                  <td>{item.payment_mode}</td>
                  <td>
                    {item.payment_date ? formatDate(item.payment_date) : "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Box>
        {/* Examination Details */}
        <Box py={2}>
          <Typography variant="h4" sx={{ color: "#5559ce" }}>
            EXAMINATION DETAILS:-
          </Typography>
          <Table className="table" striped bordered hover size="sm">
            <thead>
              <tr>
                <th>No</th>
                <th>Title</th>
                <th>ConductBy</th>
                <th>Total Marks</th>
                <th>Obtain Marks</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {data?.exam_info.length > 0 ? (
                data.exam_info.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td style={{ textTransform: "capitalize" }}>
                      {item.title}
                    </td>
                    <td style={{ textTransform: "capitalize" }}>
                      {item.conducted_by}
                    </td>
                    <td>{item.total_marks}</td>
                    <td>{item.obtained_marks}</td>
                    <td>{item.desc}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" Align="center">
                    No exam records available
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Box>
        {/* Attandance Details */}
        <Box py={2}>
          <Typography variant="h4" sx={{ color: "#5559ce" }}>
            ATTANDENCE DETAILS:-
          </Typography>
          <Table className="table" striped bordered hover size="sm">
            <thead>
              <tr>
                <th>StartDate</th>
                <th>End Date</th>
                <th>Title</th>
                <th>Leave type</th>
                <th>Ststus</th>
              </tr>
            </thead>
            <tbody>
              {eventData?.map((item, index) => (
                <tr key={index}>
                  <td>{formatDate(item.start)}</td>
                  <td>{formatDate(item.end)}</td>
                  <td>{item.title}</td>
                  <td>{item.leave_type}</td>
                  <td>{item.leave_status}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Box>
        {/* Seminar Details */}
        <Box py={2}>
          <Typography variant="h4" sx={{ color: "#5559ce" }}>
            SEMINAR DETAILS:-
          </Typography>
          <Table className="table" striped bordered hover size="sm">
            <thead>
              <tr>
                <th>Scheduled By</th>
                <th>Title</th>
                <th>Date</th>
                <th>Attendance</th>
              </tr>
            </thead>
            <tbody>
              {seminar?.seminars?.map((e) => {
                return (
                  <>
                    {e.attended_role === "Student" && (
                      <tr key={e.id}>
                        {e.attended_by.map((s, index) => {
                          return (
                            <>
                              {s.firstName ===
                                data?.personal_info?.firstName && (
                                <>
                                  <td style={{ textTransform: "capitalize" }}>
                                    {e.schedule_by}
                                  </td>
                                  <td style={{ textTransform: "capitalize" }}>
                                    {e.title}
                                  </td>
                                  <td>{formatDate(s.created_at)}</td>
                                  <td style={{ textTransform: "capitalize" }}>
                                    {s.attended_status}
                                  </td>
                                </>
                              )}
                            </>
                          );
                        })}
                      </tr>
                    )}
                  </>
                );
              })}
            </tbody>
          </Table>
        </Box>
        {/* Course Detsils */}
        <Box py={2}>
          <Typography variant="h4" sx={{ color: "#5559ce" }}>
            COURSE DETAILS:-
          </Typography>
          <Table className="table" striped bordered hover size="sm">
            <thead>
              <tr>
                <th>No</th>
                <th>Date</th>
                <th>Course Name</th>
              </tr>
            </thead>
            <tbody>
              {sameCourses.length === 0 ? (
                <tr>
                  <td colSpan="3" align="center">
                    No records found
                  </td>
                </tr>
              ) : (
                sameCourses.map((e, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{e.date}</td>
                    <td>{e.name}</td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </Box>
        {/* Remsrks */}
        <Box py={2}>
          <Typography variant="h4" sx={{ color: "#5559ce" }}>
            REMARKS:-
            <Typography
              sx={{
                fontSize: "18px",
                color: "black",
                textTransform: "capitalize",
              }}
              variant="p"
            >
              {data?.remarks.join(" , ")}
            </Typography>
          </Typography>
        </Box>
      </MainCard>
    </>
  );
}

export default ViewMoreStudent;
