import {
  Avatar,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { gridSpacing } from "store/constant";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_green.css";
import CloseIcon from "@mui/icons-material/Close";
import { useRecoilValue } from "recoil";
import { profile } from "../../atoms/authAtoms";
import { useFormik } from "formik";
import * as Yup from "yup";
import instance from "helpers/axios";
import axios from "axios";
import emprty from "../../assets/images/emprty.png";
import { useEffect } from "react";
import { useState } from "react";
import { notification } from "antd";

const validationSchema = Yup.object({
  role: Yup.string().required("Role is required"),
  user: Yup.array().required("User is required"),
  title: Yup.string().required("title is required"),
  date_time: Yup.date().required("date and time is required"),
  schedule_by: Yup.string().required("schedule by is required"),
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const AddSeminar = ({
  openAddTaskDialog,
  setOpenAddTaskDialog,
  refetch,
  setIsEdit,
  isEdit,
  editId,
  setEditId,
}) => {
  const user = useRecoilValue(profile);
  const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false);
  const [loading, setLoading] = useState(false);

  //notification
  const openNotificationWithIcon = (type, message) => {
    notification[type]({
      message: message,
    });
  };

  const handleClose = () => {
    setOpenAddTaskDialog(false);
    setIsEdit(false);
    setEditId("");
    formik.resetForm();
  };

  const handleRoleChange = (event) => {
    const selectedRole = event.target.value;
    if (selectedRole) {
      instance
        .get(
          `${process.env.REACT_APP_LOGIN_URL}users/company/${user.company_id}/role/${selectedRole}`
        )
        .then((response) => {
          formik.setFieldValue("user", "");
          formik.setFieldTouched("user", false);
          formik.setFieldError("user", "");
          formik.setFieldValue("role", selectedRole);
          formik.setFieldValue("options", response.data.data);
        })
        .catch((error) => {
          console.error("API Error:", error);
        });
    }
  };

  const formik = useFormik({
    initialValues: {
      role: "",
      user: [],
      title: "",
      date_time: "",
      schedule_by: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      const payload = {
        title: values.title,
        date_time: values.date_time,
        schedule_by: values.schedule_by,
        attended_role: values.role,
        attended_by: values.user.map((attended_id) => ({ attended_id })),
      };
      setLoading(true);
      try {
        if (isEdit) {
          const response = await axios.put(
            `${process.env.REACT_APP_API_URL}${user.company_id}/${editId}/updateseminar`,
            payload
          );
          openNotificationWithIcon("success", response.data.message);
          formik.resetForm();
          setLoading(false);
        } else {
          const response = await axios.post(
            `${process.env.REACT_APP_API_URL}${user.company_id}/seminar`,
            payload
          );
          openNotificationWithIcon("success", response.data.data.message);
          formik.resetForm();
        }
        handleClose();
        setLoading(false);
        refetch();
      } catch (error) {
        console.error("Error:", error);
        handleClose();
      }
    },
  });

  const handleUserChange = (event) => {
    const {
      target: { value },
    } = event;
    formik.setFieldValue(
      "user",
      typeof value === "string" ? value.split(",") : value
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}${user.company_id}/${editId}/${user._id}/seminar`
        );
        const semi = response.data.data.seminars;
        const myRole = await instance.get(
          `${process.env.REACT_APP_LOGIN_URL}users/company/${user.company_id}/role/${semi[0]?.attended_role}`
        );
        const attendedBy = semi[0]?.attended_by || [];
        formik.setValues({
          title: semi[0]?.title || "",
          date_time: semi[0]?.date_time || "",
          schedule_by: semi[0]?.schedule_by || "",
          user: attendedBy.map((attended) => attended?.attended_id) || [],
          role: semi[0]?.attended_role || "",
        });
        formik.setFieldValue("options", myRole.data.data);
      } catch (error) {
        console.error("Error fetching dummy API:", error);
      }
    };

    if (isEdit) {
      fetchData();
    }
  }, [isEdit]);

  const handleOpenDeleteConfirmation = () => {
    setOpenDeleteConfirmation(true);
  };

  const handleCloseDeleteConfirmation = () => {
    setOpenDeleteConfirmation(false);
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_URL}${user.company_id}/${editId}/deleteseminar`
      );
      openNotificationWithIcon("success", response.data.message);
      handleCloseDeleteConfirmation();
      handleClose();
      refetch();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <Dialog
        fullWidth
        maxWidth={"sm"}
        open={openAddTaskDialog}
        onClose={handleClose}
      >
        <DialogTitle
          variant="h4"
          sx={{ m: 0, p: 2 }}
          id="customized-dialog-title"
        >
          {isEdit ? "Edit Seminer" : "Add Seminer"}
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent style={{ padding: "20px 24px 5px 24px" }}>
          <form onSubmit={formik.handleSubmit}>
            <FormControl
              defaultValue=""
              required
              spacing={gridSpacing}
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
              <Grid container sx={{ display: "flex" }}>
                <Grid xs={12} sm={12} lg={6} item>
                  <Grid container sx={{ padding: "10px 15px 0  " }}>
                    <Grid
                      item
                      xs={12}
                      style={{ padding: "5px", marginBottom: "5px" }}
                    >
                      <TextField
                        label="Title"
                        name="title"
                        variant="outlined"
                        fullWidth
                        value={formik.values.title}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.touched.title && Boolean(formik.errors.title)
                        }
                        helperText={formik.touched.title && formik.errors.title}
                        InputLabelProps={{
                          style: { color: "#5559CE" },
                        }}
                      />
                    </Grid>
                  </Grid>
                  <Grid container sx={{ padding: "0px 15px " }}>
                    <Grid
                      item
                      xs={12}
                      style={{ padding: "5px", marginBottom: "5px" }}
                    >
                      <TextField
                        label="Sedule By"
                        variant="outlined"
                        name="schedule_by"
                        fullWidth
                        value={formik.values.schedule_by}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.touched.schedule_by &&
                          Boolean(formik.errors.schedule_by)
                        }
                        helperText={
                          formik.touched.schedule_by &&
                          formik.errors.schedule_by
                        }
                        InputLabelProps={{
                          style: { color: "#5559CE" },
                        }}
                      />
                    </Grid>
                  </Grid>
                  <Grid container sx={{ padding: "0px 15px " }}>
                    <Grid
                      item
                      xs={12}
                      style={{ padding: "5px", marginBottom: "5px" }}
                    >
                      <FormControl
                        fullWidth
                        className="flatpicker"
                        style={{ outline: "none", whiteSpace: "nowrap" }}
                      >
                        <Flatpickr
                          placeholder="Date Time"
                          name="date_time"
                          value={formik.values.date_time}
                          onChange={(date) =>
                            formik.setFieldValue("date_time", date[0])
                          }
                          options={{
                            enableTime: true,
                            dateFormat: "Y-m-d H:i",
                          }}
                        />
                        {formik.touched.date_time &&
                          formik.errors.date_time && (
                            <small
                              style={{
                                color: "red",
                                margin: "5px 0px 0px 10px",
                              }}
                            >
                              {formik.errors.date_time}
                            </small>
                          )}
                      </FormControl>
                    </Grid>
                  </Grid>

                  <Grid container sx={{ padding: "0px 15px " }}>
                    <Grid
                      item
                      xs={12}
                      style={{ padding: "5px", marginBottom: "5px" }}
                    >
                      <FormControl fullWidth>
                        <InputLabel
                          id="role-label"
                          style={{ color: "#5559ce" }}
                        >
                          Role
                        </InputLabel>
                        <Select
                          labelId="role-label"
                          id="role"
                          name="role"
                          label="role"
                          disabled={isEdit}
                          value={formik.values.role}
                          onChange={handleRoleChange}
                          onBlur={formik.handleBlur}
                          InputLabelProps={{
                            style: { color: "#5559CE" },
                          }}
                        >
                          <MenuItem value="Employee">Employee</MenuItem>
                          <MenuItem value="Student">Student</MenuItem>
                        </Select>
                        {formik.touched.role && formik.errors.role && (
                          <small
                            style={{ color: "red", margin: "5px 0px 0px 10px" }}
                          >
                            {formik.errors.role}
                          </small>
                        )}
                      </FormControl>
                    </Grid>
                  </Grid>
                  <Grid container sx={{ padding: "0px 15px " }}>
                    <Grid
                      item
                      xs={12}
                      style={{ padding: "5px", marginBottom: "5px" }}
                    >
                      <FormControl fullWidth>
                        <InputLabel
                          id="userRole-label"
                          style={{ color: "#5559ce" }}
                        >
                          {formik.values.role || "selected Role"}
                        </InputLabel>
                        <Select
                          labelId="userRole-label"
                          id={formik.values.role || ""}
                          name="user"
                          label={formik.values.role}
                          value={formik.values.user || []}
                          onChange={handleUserChange}
                          onBlur={formik.handleBlur}
                          disabled={
                            !formik.values.options ||
                            formik.values.options.length === 0
                          }
                          input={<OutlinedInput label={formik.values.role} />}
                          renderValue={(selected) => {
                            const selectedUsers = formik.values.options.filter(
                              (user) => selected.includes(user._id)
                            );
                            return selectedUsers
                              .map(
                                (user) => `${user.firstName} ${user.lastName}`
                              )
                              .join(", ");
                          }}
                          multiple
                          MenuProps={MenuProps}
                          InputLabelProps={{
                            style: { color: "#5559CE" },
                          }}
                        >
                          {Array.isArray(formik.values.options) &&
                          formik.values.options.length === 0 ? (
                            <MenuItem disabled value="">
                              No users available
                            </MenuItem>
                          ) : Array.isArray(formik.values.options) ? (
                            formik.values.options.map((user) => (
                              <MenuItem key={user._id} value={user._id}>
                                <Checkbox
                                  checked={formik.values.user.includes(
                                    user._id
                                  )}
                                />
                                <ListItemText
                                  primary={`${user.firstName} ${user.lastName}`}
                                />
                              </MenuItem>
                            ))
                          ) : null}
                        </Select>
                        {formik.touched.user && formik.errors.user && (
                          <small
                            style={{ color: "red", margin: "5px 0px 0px 10px" }}
                          >
                            {formik.errors.user}
                          </small>
                        )}
                      </FormControl>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid
                  xs={12}
                  sm={12}
                  lg={6}
                  container
                  sx={{ padding: "15px 15px 0px 15px" }}
                >
                  <>
                    {formik.values.user.length > 0 ? (
                      <>
                        <Grid
                          item
                          xs={12}
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            position: "fixed",
                            backgroundColor: "#fff",
                          }}
                        >
                          <Avatar
                            sx={{
                              backgroundColor: "#D9DAF9",
                              width: 26,
                              height: 26,
                              color: "black",
                            }}
                          ></Avatar>{" "}
                          <Typography variant="h5" sx={{ marginLeft: "10px" }}>
                            Selected member
                          </Typography>
                        </Grid>
                        <Grid
                          xs={12}
                          sx={{ overflow: "scroll", height: 280, marginTop: 5 }}
                        >
                          <TableContainer component={Paper}>
                            <Table>
                              <TableBody>
                                {Array.isArray(formik.values.user) &&
                                  formik.values.user.map((userId) => {
                                    const selectedUser =
                                      formik.values.options.find(
                                        (user) => user._id === userId
                                      );
                                    return (
                                      <TableRow key={userId}>
                                        <TableCell style={{ padding: "10px" }}>
                                          {" "}
                                          {selectedUser
                                            ? `${selectedUser.firstName} ${selectedUser.lastName}`
                                            : "User not found"}
                                        </TableCell>
                                      </TableRow>
                                    );
                                  })}
                              </TableBody>
                            </Table>
                          </TableContainer>
                        </Grid>
                      </>
                    ) : (
                      <>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <img
                            src={emprty}
                            alt="no data"
                            loading="lazy"
                            style={{ maxWidth: "250px" }}
                          />
                        </div>
                      </>
                    )}
                  </>
                </Grid>
              </Grid>
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
          {isEdit ? (
            <Button onClick={handleOpenDeleteConfirmation} color="error">
              Delete
            </Button>
          ) : (
            <Button onClick={handleClose} color="error">
              Cancel
            </Button>
          )}
          <Button
            color="primary"
            style={{ color: "#5559CE", marginRight: "10px" }}
            type="submit"
            onClick={formik.handleSubmit}
            disabled={Object.keys(formik.values).some(
              (key) => formik.values[key] === ""
            )}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openDeleteConfirmation}
        onClose={handleCloseDeleteConfirmation}
        maxWidth={"xs"}
      >
        <DialogTitle style={{ fontSize: "15px" }}>Delete Seminar</DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleCloseDeleteConfirmation}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this seminar?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseDeleteConfirmation}
            style={{ color: "#5559CE" }}
          >
            Cancel
          </Button>
          <Button onClick={handleDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddSeminar;
