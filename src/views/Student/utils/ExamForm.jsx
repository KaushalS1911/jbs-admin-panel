import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { FormControl, Grid, InputAdornment } from "@mui/material";
import axios from "axios";
import { notification } from "antd";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers";

const validationSchema = Yup.object({
  total_marks: Yup.number().required("Total Marks is required"),
  obtained_marks: Yup.number().required("Obtain Marks is required"),
  conducted_by: Yup.string().required("Conduct By is required"),
  desc: Yup.string().required("desc is required"),
});

function ExamForm({ setExaminationOpen, id }) {
  const user = JSON.parse(localStorage.getItem("user"));

  const openNotificationWithIcon = (type, message) => {
    notification[type]({
      message: message,
    });
  };

  const formik = useFormik({
    initialValues: {
      title: "",
      total_marks: "",
      obtained_marks: "",
      conducted_by: "",
      desc: "",
      date: null,
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const apiEndpoint1 = `${process.env.REACT_APP_API_URL}${user.company_id}/${id}/student`;
        const apiEndpoint = `${process.env.REACT_APP_API_URL}${user.company_id}/${id}/updateStudent`;

        const existingDataResponse = await axios.get(apiEndpoint1);
        const existingData = existingDataResponse.data.data.student.exam_info;
        const extractedInfo = existingData.map((exam) => ({
          title: exam.title,
          total_marks: exam.total_marks,
          obtained_marks: exam.obtained_marks,
          conducted_by: exam.conducted_by,
          date: exam.date,
        }));

        await axios.put(apiEndpoint, {
          exam_info: [
            ...extractedInfo,
            {
              title: values.title,
              desc: values.desc,
              total_marks: parseInt(values.total_marks),
              obtained_marks: parseInt(values.obtained_marks),
              conducted_by: values.conducted_by,
              date: values.date,
            },
          ],
        });
        setExaminationOpen(false);
        resetForm();
        openNotificationWithIcon("success", "Exam Add Succesfully");
      } catch (error) {
        console.error("API Error:", error);
        openNotificationWithIcon("error", "Somthing went Wrong!");
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} method="POST">
      <FormControl
        required
        fullWidth
        sx={{
          width: "100%",
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "#5559CE",
            },
            "&:hover fieldset": {
              borderColor: "#5559CE",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#5559CE",
              borderWidth: "2px",
            },
          },
        }}
        size="small"
        m={2}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <LocalizationProvider dateAdapter={AdapterDateFns} fullWidth>
              <MobileDatePicker
                fullWidth
                label="Date Of Birth"
                clearable
                value={formik.values.date}
                onChange={(date) => formik.setFieldValue("date", date)}
                renderInput={(props) => (
                  <TextField
                    {...props}
                    fullWidth
                    label="Select Date"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start"></InputAdornment>
                      ),
                    }}
                  />
                )}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="title"
              in
              name="title"
              label="Title"
              value={formik.values.title}
              onChange={formik.handleChange}
              error={formik.touched.title && Boolean(formik.errors.title)}
              helperText={formik.touched.title && formik.errors.title}
              InputLabelProps={{
                style: { color: "#5559CE" },
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="total_marks"
              name="total_marks"
              label="Total Marks"
              type="number"
              value={formik.values.total_marks}
              onChange={formik.handleChange}
              error={
                formik.touched.total_marks && Boolean(formik.errors.total_marks)
              }
              helperText={
                formik.touched.total_marks && formik.errors.total_marks
              }
              InputLabelProps={{
                style: { color: "#5559CE" },
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="obtained_marks"
              name="obtained_marks"
              label="Obtain Marks"
              type="number"
              value={formik.values.obtained_marks}
              onChange={formik.handleChange}
              error={
                formik.touched.obtained_marks &&
                Boolean(formik.errors.obtained_marks)
              }
              helperText={
                formik.touched.obtained_marks && formik.errors.obtained_marks
              }
              InputLabelProps={{
                style: { color: "#5559CE" },
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="conducted_by"
              name="conducted_by"
              label="Conduct By"
              value={formik.values.conducted_by}
              onChange={formik.handleChange}
              error={
                formik.touched.conducted_by &&
                Boolean(formik.errors.conducted_by)
              }
              helperText={
                formik.touched.conducted_by && formik.errors.conducted_by
              }
              InputLabelProps={{
                style: { color: "#5559CE" },
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <textarea
              className="text-Note"
              id="desc"
              name="desc"
              placeholder="desc"
              rows="4"
              cols="50"
              value={formik.values.desc}
              onChange={formik.handleChange}
              InputLabelProps={{
                style: { color: "#5559CE" },
              }}
            />
            {formik.touched.desc && formik.errors.desc && (
              <div style={{ color: "red" }}>{formik.errors.desc}</div>
            )}
          </Grid>
          <Grid item xs={12}>
            <Button
              color="primary"
              variant="contained"
              fullWidth
              type="submit"
              sx={{
                backgroundColor: "#5559CE",
                color: "#fff",
                marginRight: "10px",
                marginTop: "15px",
                height: "35px",
                lineHeight: "35px",
                "&:hover": { backgroundColor: "#5559CE" },
              }}
            >
              Add Exams
            </Button>
          </Grid>
        </Grid>
      </FormControl>
    </form>
  );
}

export default ExamForm;
