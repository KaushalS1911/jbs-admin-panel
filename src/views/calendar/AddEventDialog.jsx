import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import {
  Autocomplete,
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useRecoilValue } from "recoil";
import { profile } from "../../atoms/authAtoms";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_green.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect } from "react";
import { useGetAllStudents } from "hooks/useGetAllStudents";
import { useState } from "react";

const validationSchema = Yup.object({
  eventType: Yup.string().required("Type is required"),
  event: Yup.string().required("Event/Leave Type is required"),
  startDate: Yup.date().required("Start Date is required"),
  endDate: Yup.date().required("End Date is required"),
  eventDescription: Yup.string(),
});

const initialValues = {
  eventType: "",
  event: "",
  startDate: "",
  endDate: "",
  eventDescription: "",
};

function AddEventDialog({
  open,
  handleClose,
  handleAddEvent,
  selectedStudents,
  setSelectedStudents,
}) {
  const [options, setOptions] = useState([]);
  const user = useRecoilValue(profile);
  const adminMenuItems = [
    <MenuItem key="holiday" value="festival holiday">
      Festival holiday
    </MenuItem>,
    <MenuItem key="Leave" value="Student Leave">
      Student Leave
    </MenuItem>,
    <MenuItem key="Leave" value="Reception Leave">
      Reception Leave
    </MenuItem>,
    <MenuItem key="other" value="other">
      other
    </MenuItem>,
  ];

  const regularUserMenuItems = [
    <MenuItem key="sick" value="sick leave">
      Sick Leave
    </MenuItem>,
    <MenuItem key="personal" value="personal leave">
      Personal Leave
    </MenuItem>,
    <MenuItem key="emergency" value="emergency leave">
      Emergency Leave
    </MenuItem>,
    <MenuItem key="unpaid" value="unpaid leave">
      Unpaid Leave
    </MenuItem>,
  ];

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      resetForm();
      handleAddEvent(values);
    },
  });

  const onDateChange = (selectedDates) => {
    const [startDate, endDate] = selectedDates;
    formik.setFieldValue("startDate", startDate);
    formik.setFieldValue("endDate", endDate);
  };

  function handleClickCloseBtn() {
    formik.resetForm();
    handleClose();
  }
  const { data: students, refetch } = useGetAllStudents();
  useEffect(() => {
    refetch();
  }, [refetch]);

  useEffect(() => {
    if (students && students.length !== 0) {
      const refactoredStudentList = students.students.map((item) => {
        return {
          student_user_id: item.student_user_id,
          firstName: item.personal_info.firstName,
          lastName: item.personal_info.lastName,
        };
      });

      setOptions(refactoredStudentList);
    }
  }, [students]);

  return (
    <React.Fragment>
      <Dialog
        fullWidth
        maxWidth={"xs"}
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle
          variant="h3"
          sx={{ m: 0, p: 2 }}
          id="customized-dialog-title"
        >
          {user.role === "Admin" ? "Add Event" : "Add Leave"}
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClickCloseBtn}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
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
              <Grid container>
                <Grid item xs={12} sx={{ marginBottom: "10px" }}>
                  <Autocomplete
                    size="small"
                    options={options}
                    getOptionLabel={(option) =>
                      `${option.firstName} ${option.lastName}`
                    }
                    value={selectedStudents}
                    onChange={(event, newValue) => {
                      setSelectedStudents(newValue);
                    }}
                    getOptionSelected={(option, value) =>
                      option.student_user_id === value.student_user_id
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
                <Grid item xs={12} sx={{ marginBottom: "10px" }}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel id="gender-label" style={{ color: "#5559ce" }}>
                      Event Type
                    </InputLabel>
                    <Select
                      labelId="gender-label"
                      id="type"
                      name="eventType"
                      size="small"
                      label="Event Type"
                      InputLabelProps={{
                        style: { color: "#5559CE" },
                      }}
                      {...formik.getFieldProps("eventType")}
                    >
                      {user.role === "Admin"
                        ? adminMenuItems
                        : regularUserMenuItems}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="outlined-basic"
                    label={user.role === "Admin" ? "Event" : "Leave Type"}
                    size="small"
                    name="event"
                    variant="outlined"
                    value={formik.values.event}
                    onChange={formik.handleChange("event")}
                    InputLabelProps={{
                      style: { color: "#5559CE" },
                    }}
                    error={formik.touched.event && Boolean(formik.errors.event)}
                    helperText={formik.touched.event && formik.errors.event}
                  />
                </Grid>
                <Grid item xs={12} sx={{ marginBottom: "10px" }}>
                  <Box
                    className="flatpicker"
                    style={{
                      outline: "none",
                      margin: "10px 0",
                      whiteSpace: "nowrap",
                    }}
                  >
                    <Flatpickr
                      placeholder="Select Date"
                      style={{ minWidth: "100%" }}
                      onChange={onDateChange}
                      className="form-control"
                      name="date"
                      options={{
                        dateFormat: "Y-m-d",
                        mode: "range",
                      }}
                    />
                  </Box>
                </Grid>
                <Grid item fullWidth xs={12}>
                  <textarea
                    className="text-Note"
                    name="eventDescription"
                    placeholder="Description"
                    rows="5"
                    cols="100"
                    value={formik.values.eventDescription}
                    onChange={formik.handleChange("eventDescription")}
                    style={{ width: "100%", resize: "vertical" }}
                  />
                </Grid>
              </Grid>
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
          <Button
            disabled={Object.keys(formik.values).some(
              (key) => formik.values[key] === "" || formik.values[key] === null
            )}
            autoFocus
            onClick={formik.handleSubmit}
            type="submit"
          >
            {user.role === "Admin" ? "Add Event" : "Add Leave"}
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default AddEventDialog;
