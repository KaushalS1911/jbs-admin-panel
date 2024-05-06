import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Autocomplete, FormControl, Grid, InputAdornment } from "@mui/material";
import { useGetAllStudents } from "hooks/useGetAllStudents";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers";

const validationSchema = Yup.object({
  total_marks: Yup.number().required("Total Marks is required"),
  obtain_marks: Yup.number().required("Obtain Marks is required"),
  conduct_by: Yup.string().required("Conduct By is required"),
  description: Yup.string().required("Description is required"),
});

function ExamForm({ setIsFollowOpen, id }) {
  const [options, setOptions] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const { data: students, refetch } = useGetAllStudents();

  useEffect(() => {
    refetch();
  }, [refetch]);

  useEffect(() => {
    if (students && students.length !== 0) {
      const refactoredStudentList = students.students.map((item) => {
        return {
          student_id: item._id,
          firstName: item.personal_info.firstName,
          lastName: item.personal_info.lastName,
        };
      });

      setOptions(refactoredStudentList);
    }
  }, [students]);

  const formik = useFormik({
    initialValues: {
      date: null,
      total_marks: "",
      obtain_marks: "",
      conduct_by: "",
      description: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const payload = {
        id,
        ...values,
        selectedStudents,
      };
      console.log(payload);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
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
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <MobileDatePicker
                fullWidth
                label="Date"
                clearable
                value={formik.values.date}
                onChange={(date) => formik.setFieldValue("date", date)}
                renderInput={(props) => (
                  <TextField
                    {...props}
                    fullWidth
                    label="Select Date"
                    InputProps={{
                      startAdornment: <InputAdornment position="start" />,
                    }}
                  />
                )}
              />
            </LocalizationProvider>
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
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="obtain_marks"
              name="obtain_marks"
              label="Obtain Marks"
              type="number"
              value={formik.values.obtain_marks}
              onChange={formik.handleChange}
              error={
                formik.touched.obtain_marks &&
                Boolean(formik.errors.obtain_marks)
              }
              helperText={
                formik.touched.obtain_marks && formik.errors.obtain_marks
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="conduct_by"
              name="conduct_by"
              label="Conduct By"
              value={formik.values.conduct_by}
              onChange={formik.handleChange}
              error={
                formik.touched.conduct_by && Boolean(formik.errors.conduct_by)
              }
              helperText={formik.touched.conduct_by && formik.errors.conduct_by}
            />
          </Grid>
          <Grid item xs={12}>
            <textarea
              className="text-Note"
              id="description"
              name="description"
              placeholder="Description"
              rows="4"
              cols="50"
              value={formik.values.description}
              onChange={formik.handleChange}
            />
            {formik.touched.description && formik.errors.description && (
              <div style={{ color: "red" }}>{formik.errors.description}</div>
            )}
          </Grid>
          <Grid item xs={12}>
            <Autocomplete
              multiple
              options={options}
              getOptionLabel={(option) =>
                `${option.firstName} ${option.lastName}`
              }
              value={selectedStudents}
              onChange={(event, newValue) => setSelectedStudents(newValue)}
              getOptionSelected={(option, value) =>
                option.student_id === value.student_id
              }
              fullWidth
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Student Name"
                  label="Student Name"
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              )}
            />
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
