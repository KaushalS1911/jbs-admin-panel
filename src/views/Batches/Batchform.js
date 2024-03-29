import React from "react";
import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_green.css";
import { notification } from "antd";
import { useGetAllStudents } from "hooks/useGetAllStudents";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
    },
  },
};

const labs = [
  { value: "lab 1", label: "Lab 1" },
  { value: "lab 2", label: "Lab 2" },
  { value: "lab 3", label: "Lab 3" },
  { value: "lab 4", label: "Lab 4" },
  { value: "lab 5", label: "Lab 5" },
  { value: "lab 6", label: "Lab 6" },
  { value: "lab 7", label: "Lab 7" },
  { value: "lab 8", label: "Lab 8" },
  { value: "lab 9", label: "Lab 9" },
  { value: "lab 10", label: "Lab 10" },
];

function Batchform({ setIsBatchOpen, fetchData }) {
  //notification
  const openNotificationWithIcon = (type, message) => {
    notification[type]({
      message: message,
    });
  };

  const [options, setOptions] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const { data: students, refetch } = useGetAllStudents();
  

  useEffect(() => {
    refetch();
  }, []);

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
  }, []);

  const validationSchema = Yup.object({
    technology: Yup.string().required("technology is required"),
    note: Yup.string().required("Note is required"),
    batch_time: Yup.date().required("Batch time is required"),
    lab_name: Yup.date().required("Lab Name is required"),
  });

  const onDateChange = (selectedDates) => {
    formik.setFieldValue("batch_time", selectedDates[0]);
  };
  const user = JSON.parse(localStorage.getItem("user"));

  const formik = useFormik({
    initialValues: {
      technology: "",
      batch_time: null,
      note: "",
      lab_name: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const apiEndpoint = `${process.env.REACT_APP_API_URL}${user.company_id}/batch`;
        const payload = {
          ...values,
          batch_members: selectedStudents,
        };
        const response = await axios.post(apiEndpoint, payload);
        resetForm();
        fetchData();
        setIsBatchOpen(false);
        openNotificationWithIcon("success", response.data.data.message);
        refetch();
      } catch (error) {
        console.error("API Error:", error);
      }
    },
  });

  // useEffect(() => {
  //   const fetchStudentData = async () => {
  //     try {
  //       const apiEndpoint = `${process.env.REACT_APP_API_URL}${user.company_id}/student`
  //       const response = await axios.get(apiEndpoint)
  //       setOptions(response.data.data.students)

  //     } catch (error) {
  //       console.error('Error fetching student data:', error)
  //     }
  //   }
  //   fetchStudentData()
  // }, [])

  // const handleStudentId = (event, value) => {
  //   setSelectedStudents(value)
  //   // setSelectedStudentsIds(value.student_id)
  // }

  return (
    <form action="" onSubmit={formik.handleSubmit}>
      <FormControl
        defaultValue=""
        required
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
      >
        <Grid
          container
          spacing={2}
          justifyContent={"flex-end"}
          sx={{ padding: "20px 30px " }}
        >
          <Grid item xl={12} lg={12} md={6} sm={6} xs={12}>
            <TextField
              id="outlined-basic"
              label="Technology"
              variant="outlined"
              name="technology"
              value={formik.values.technology}
              error={
                formik.touched.technology && Boolean(formik.errors.technology)
              }
              helperText={formik.touched.technology && formik.errors.technology}
              onChange={formik.handleChange}
              fullWidth
              InputLabelProps={{
                style: { color: "#5559CE" },
              }}
            />
          </Grid>
          <Grid item xl={12} lg={12} md={6} sm={6} xs={12}>
            <Box
              className="flatpicker-input"
              style={{ outline: "none", whiteSpace: "nowrap" }}
            >
              <Flatpickr
                placeholder="Batch Time"
                name="batch_time"
                value={formik.values.batch_time}
                onChange={(selectedDates) => onDateChange(selectedDates)}
                className="form-control"
                options={{
                  dateFormat: "H:i ",
                  noCalendar: true,
                  enableTime: true,
                }}
              />
            </Box>
          </Grid>
          <Grid item xl={12} lg={12} md={6} sm={6} xs={12}>
            <textarea
              className="text-Note"
              id="w3review"
              name="note"
              placeholder="Notes"
              rows="4"
              cols="50"
              value={formik.values.note}
              onChange={formik.handleChange}
            />
            {formik.touched.note && formik.errors.note && (
              <div style={{ color: "red" }}>{formik.errors.note}</div>
            )}
          </Grid>
          <Grid item xl={12} lg={12} md={6} sm={6} xs={12}>
            <FormControl fullWidth variant="outlined">
              <InputLabel id="demo-simple-select-label">Lab Name</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="lab_name"
                label="Lab Name"
                value={formik.values.lab_name}
                error={
                  formik.touched.lab_name && Boolean(formik.errors.lab_name)
                }
                helperText={formik.touched.lab_name && formik.errors.lab_name}
                onChange={formik.handleChange}
                MenuProps={MenuProps}
                InputLabelProps={{
                  style: { color: "#5559CE" },
                }}
              >
                {labs.map((LabItem) => (
                  <MenuItem key={LabItem.value} value={LabItem.value}>
                    {LabItem.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xl={12} lg={12} md={6} sm={6} xs={12}>
            <Autocomplete
              multiple
              options={options}
              getOptionLabel={(option) =>
                `${option.firstName} ${option.lastName}`
              }
              value={selectedStudents}
              onChange={(event, newValue) => {
                setSelectedStudents(newValue);
              }}
              fullWidth
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Student Name"
                  label="Student Name"
                  variant="outlined"
                  className="mt-8 mx-4"
                  // error={errors?.studentIds}
                  // helperText={errors?.studentIds?.message}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  required
                />
              )}
            />
          </Grid>
          <Grid>
            <Button
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: "#5559CE",
                color: "#fff",
                marginRight: "10px",
                marginTop: "15px",
                height: "35px",
                lineHeight: "35px",
                "&:hover": { backgroundColor: "#5559CE" },
              }}
              onClick={formik.handleSubmit}
            >
              Add Batch
            </Button>
          </Grid>
        </Grid>
      </FormControl>
    </form>
  );
}

export default Batchform;
