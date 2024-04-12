import React, { useState, useEffect } from "react";
import {
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
import Autocomplete from "@mui/material/Autocomplete";
import { useGetAllStudents } from "hooks/useGetAllStudents";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_green.css";
import { notification } from "antd";

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

function BatchEdit({ batchData, setIsBatcheditOpen, fetchData }) {
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

  useEffect(() => {
    if (batchData && batchData.batch_members) {
      setSelectedStudents(batchData.batch_members);
    }
  }, [batchData]);

  const validationSchema = Yup.object({
    technology: Yup.string().required("Technology is required"),
    note: Yup.string().required("Note is required"),
    lab_name: Yup.string().required("Lab Name is required"),
  });

  const onDateChange = (selectedDates) => {
    formik.setFieldValue("batch_time", selectedDates[0]);
  };

  const initialValues = {
    technology: batchData.technology || "",
    batch_time: batchData.batch_time || "",
    note: batchData.note || "",
    lab_name: batchData.lab_name || "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      const validSelectedStudents = selectedStudents.filter((student) => {
        return options.some(
          (option) => option.student_id === student.student_id
        );
      });
      const payload = {
        ...values,
        batch_members: validSelectedStudents,
      };
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const apiEndpoint = `${process.env.REACT_APP_API_URL}${user.company_id}/${batchData.id}/updateBatch`;
        const response = await axios.put(apiEndpoint, payload);
        if (response.status === 200) {
          fetchData();
          setIsBatcheditOpen(false);
          resetForm();
          openNotificationWithIcon("success", response.data.data.message);
        }
        resetForm();
      } catch (error) {
        console.error("API Error:", error);
        openNotificationWithIcon("error", error.response.data.message);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
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
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
            <TextField
              id="outlined-basic"
              label="Technology"
              variant="outlined"
              name="technology"
              value={formik.values?.technology}
              error={
                formik.touched?.technology && Boolean(formik.errors?.technology)
              }
              helperText={
                formik.touched?.technology && formik.errors?.technology
              }
              onChange={formik.handleChange}
              fullWidth
              InputLabelProps={{
                style: { color: "#5559CE" },
              }}
            />
          </Grid>
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
            <Box
              className="flatpicker-input"
              style={{ outline: "none", whiteSpace: "nowrap" }}
            >
              <Flatpickr
                placeholder="Batch Time"
                name="batch_time"
                value={formik.values?.batch_time || ""}
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
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
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
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
            <FormControl fullWidth variant="outlined">
              <InputLabel
                id="demo-simple-select-label"
                style={{ color: "#5559CE" }}
                helpertext={formik.touched.lab_name && formik.errors.lab_name}
              >
                Lab Name
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="lab_name"
                label="Lab Name"
                value={formik.values.lab_name}
                error={
                  formik.touched.lab_name && Boolean(formik.errors.lab_name)
                }
                onChange={formik.handleChange}
                MenuProps={MenuProps}
              >
                {labs.map((LabItem) => (
                  <MenuItem key={LabItem.value} value={LabItem.value}>
                    {LabItem.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
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
              getOptionSelected={(option, value) =>
                option.student_id === value.student_id
              }
              fullWidth
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Student Name"
                  variant="outlined"
                  className="mt-8 mx-4"
                  InputLabelProps={{
                    shrink: true,
                  }}
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
            >
              Save
            </Button>
          </Grid>
        </Grid>
      </FormControl>
    </form>
  );
}
export default BatchEdit;
