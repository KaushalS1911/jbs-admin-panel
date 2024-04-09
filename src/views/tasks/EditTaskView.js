import React from "react";
import MainCard from "ui-component/cards/MainCard";
import SecondaryAction from "ui-component/cards/CardSecondaryAction";
import {
  FormControl,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
  Paper,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  Button,
  Chip,
  Popover,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  IconButton,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { profile } from "../../atoms/authAtoms";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_green.css";
import { useFormik } from "formik";
import * as yup from "yup";
import SendIcon from "@mui/icons-material/Send";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CloseIcon from "@mui/icons-material/Close";
import { notification } from "antd";

const validationSchema = yup.object({
  title: yup.string().required("Task title is required"),
  priority: yup.string().required("Priority is required"),
  status: yup.string().required("Status is required"),
  startDate: yup.date().required("Start Date is required"),
  endDate: yup.date().required("End Date is required"),
});

const EditTaskView = () => {
  //notification
  const openNotificationWithIcon = (type, message) => {
    notification[type]({
      message: message,
    });
  };

  const { id } = useParams();
  const user = useRecoilValue(profile);
  const [taskData, setTaskData] = useState([]);
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [deleteId, setDeleteId] = useState("");

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const ids = open ? "simple-popover" : undefined;
  const fetchData = async () => {
    const apiUrl = `${process.env.REACT_APP_API_URL}${user.company_id}/${id}/tasks`;
    try {
      const response = await axios.get(apiUrl);
      const task = response.data.data.data;

      formik.setValues({
        title: task.task_title || "",
        priority: task.priority || "",
        status: task.status || "",
        startDate: task.create_date || "",
        endDate: task.due_date || "",
      });
      setTaskData(task);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_URL}${user.company_id}/${id}/deleteTask`
      );
      if (response.status === 200) {
        openNotificationWithIcon("success", response.data.data.message);
        navigate("/task");
      } else {
        console.error("Delete request failed:", response);
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleDeleteMsg = async () => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_URL}${user.company_id}/${id}/${deleteId}/deleteTask`
      );
      if (response.status === 200) {
        fetchData();
      } else {
        console.error("Delete request failed:", response);
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };
  const formik = useFormik({
    initialValues: {
      title: "",
      status: "",
      startDate: null,
      endDate: null,
      priority: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      let taskInfoArray = [];

      if (user.role === "Admin" && searchValue !== "") {
        taskInfoArray.push({
          task: searchValue,
        });
      } else if (user.role !== "Admin" && searchValue !== "") {
        taskInfoArray.push({
          queries: searchValue,
        });
      }

      const payload = {
        task_title: values.title,
        create_date: values.startDate,
        due_date: values.endDate,
        status: values.status,
        priority: values.priority,
        ...(searchValue !== "" && { task_info: taskInfoArray }),
      };

      try {
        const response = await axios.put(
          `${process.env.REACT_APP_API_URL}${user.company_id}/${id}/updateTask`,
          payload
        );
        if (response.status === 200) {
          fetchData();
          setSearchValue("");
        } else {
          console.error("Delete request failed:", response);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    },
  });

  const copyToClipboard = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        console.log("Text successfully copied to clipboard");
      })
      .catch((err) => {
        console.error("Unable to copy text to clipboard", err);
      });
  };

  const [openDialog, setOpenDialog] = useState(false);

  const handleDeleteModal = () => {
    setOpenDialog(true);
  };
  const HandlesaveModal = () => {
    navigate("/task");
  };
  const handleConfirmDelete = () => {
    handleDelete();
    setOpenDialog(false);
    navigate("/task");
  };

  const handleCancelDelete = () => {
    setOpenDialog(false);
  };

  return (
    <>
      <MainCard
        secondary={
          <SecondaryAction link="https://next.material-ui.com/system/typography/" />
        }
      >
        <form onSubmit={formik.handleSubmit}>
          <FormControl
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

              size: "small",
            }}
          >
            <Grid container>
              <Grid
                item
                lg={7}
                xl={8}
                md={12}
                xs={12}
                sm={12}
                sx={{ p: 2, display: "flex", flexDirection: "column" }}
              >
                <Grid
                  item
                  style={{
                    height: "660px",
                    marginBottom: "10px",
                    overflowY: "scroll",
                  }}
                >
                  <TableContainer
                    component={Paper}
                    style={{ marginTop: "16px" }}
                  >
                    <Table>
                      <TableBody>
                        {taskData?.task_info?.length > 0 ? (
                          taskData?.task_info?.map((item, _id) => (
                            <TableRow
                              key={_id}
                              onMouseEnter={() => setHoveredIndex(_id)}
                              onMouseLeave={() => setHoveredIndex(null)}
                            >
                              {user.role === "Admin" ? (
                                <>
                                  <TableCell
                                    align="left"
                                    style={{ border: "none" }}
                                  >
                                    <Typography variant="h4" component="h2">
                                      {item.queries && (
                                        <Chip
                                          label={item.queries}
                                          style={{
                                            backgroundColor: "#EDE7F6",
                                            color: "#5559CE",
                                          }}
                                        />
                                      )}
                                    </Typography>
                                  </TableCell>
                                  <TableCell
                                    align="right"
                                    style={{ border: "none" }}
                                  >
                                    <Typography variant="h4" component="h2">
                                      {item.task && (
                                        <>
                                          <div
                                            style={{
                                              display: "flex",
                                              alignItems: "center",
                                              justifyContent: "end",
                                            }}
                                          >
                                            <button
                                              className="more_btn"
                                              type="button"
                                              aria-describedby={ids}
                                              onClick={handleClick}
                                            >
                                              {hoveredIndex === _id && (
                                                <MoreVertIcon
                                                  onMouseEnter={() =>
                                                    setDeleteId(item._id)
                                                  }
                                                  style={{ fontSize: "15px" }}
                                                />
                                              )}
                                            </button>
                                            <Chip
                                              label={item.task}
                                              style={{
                                                backgroundColor: "#5559CE",
                                                color: "#ffffff",
                                              }}
                                            />
                                            <Popover
                                              id={ids}
                                              open={open}
                                              anchorEl={anchorEl}
                                              onClose={handleClose}
                                              anchorOrigin={{
                                                vertical: "bottom",
                                                horizontal: "left",
                                              }}
                                              transformOrigin={{
                                                vertical: "top",
                                                horizontal: "right",
                                              }}
                                              PaperProps={{
                                                style: {
                                                  padding: "0px",
                                                  boxShadow: "none",
                                                  border: "1px solid #dde1ef",
                                                  borderRadius: "10px",
                                                },
                                              }}
                                            >
                                              <MenuItem
                                                onClick={() => {
                                                  handleClose();
                                                  copyToClipboard(
                                                    item.task || item.queries
                                                  );
                                                }}
                                              >
                                                <ContentCopyIcon
                                                  style={{
                                                    fontSize: "15px",
                                                    marginRight: "5px",
                                                  }}
                                                />{" "}
                                                Copy
                                              </MenuItem>

                                              <MenuItem
                                                onClick={() => {
                                                  handleClose();
                                                  handleDeleteMsg();
                                                }}
                                              >
                                                <DeleteOutlineIcon
                                                  style={{
                                                    fontSize: "17px",
                                                    marginRight: "5px",
                                                  }}
                                                />{" "}
                                                Delete
                                              </MenuItem>
                                            </Popover>
                                          </div>
                                        </>
                                      )}
                                    </Typography>
                                  </TableCell>
                                </>
                              ) : (
                                <>
                                  <TableCell
                                    align="left"
                                    style={{ border: "none" }}
                                  >
                                    <Typography variant="h4" component="h2">
                                      {item.task && (
                                        <>
                                          <Chip
                                            label={item.task}
                                            style={{
                                              backgroundColor: "#EDE7F6",
                                              color: "#5559CE",
                                            }}
                                          />
                                        </>
                                      )}
                                    </Typography>
                                  </TableCell>
                                  <TableCell
                                    align="right"
                                    style={{ border: "none" }}
                                  >
                                    <Typography variant="h4" component="h2">
                                      {item.queries && (
                                        <>
                                          <div
                                            style={{
                                              display: "flex",
                                              alignItems: "center",
                                              justifyContent: "end",
                                            }}
                                          >
                                            <button
                                              className="more_btn"
                                              type="button"
                                              aria-describedby={ids}
                                              onClick={handleClick}
                                            >
                                              {hoveredIndex === _id && (
                                                <MoreVertIcon
                                                  onMouseEnter={() =>
                                                    setDeleteId(item._id)
                                                  }
                                                  style={{ fontSize: "15px" }}
                                                />
                                              )}
                                            </button>
                                            <Chip
                                              label={item.queries}
                                              style={{
                                                backgroundColor: "#5559CE",
                                                color: "#ffffff",
                                              }}
                                            />
                                            <Popover
                                              id={ids}
                                              open={open}
                                              anchorEl={anchorEl}
                                              onClose={handleClose}
                                              anchorOrigin={{
                                                vertical: "bottom",
                                                horizontal: "left",
                                              }}
                                              transformOrigin={{
                                                vertical: "top",
                                                horizontal: "right",
                                              }}
                                              PaperProps={{
                                                style: {
                                                  padding: "0px",
                                                  boxShadow: "none",
                                                  border: "1px solid #dde1ef",
                                                  borderRadius: "10px",
                                                },
                                              }}
                                            >
                                              <MenuItem
                                                onClick={() => {
                                                  handleClose();
                                                  copyToClipboard(
                                                    item.task || item.queries
                                                  );
                                                }}
                                              >
                                                <ContentCopyIcon
                                                  style={{
                                                    fontSize: "15px",
                                                    marginRight: "5px",
                                                  }}
                                                />{" "}
                                                Copy
                                              </MenuItem>
                                              <MenuItem
                                                onClick={() => {
                                                  handleClose();
                                                  handleDeleteMsg();
                                                }}
                                              >
                                                <DeleteOutlineIcon
                                                  style={{
                                                    fontSize: "17px",
                                                    marginRight: "5px",
                                                  }}
                                                />{" "}
                                                Delete
                                              </MenuItem>
                                            </Popover>
                                          </div>
                                        </>
                                      )}
                                    </Typography>
                                  </TableCell>
                                </>
                              )}
                            </TableRow>
                          ))
                        ) : (
                          <>
                            <TableRow>
                              <TableCell
                                colSpan={2}
                                align="left"
                                style={{ border: "none" }}
                              >
                                <Chip
                                  label={`Welcome To JBS Chat Boat! 🎉`}
                                  style={{
                                    backgroundColor: "#EDE7F6",
                                    color: "#5559CE",
                                  }}
                                />
                              </TableCell>
                            </TableRow>
                          </>
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
                <Grid item sx={{ display: "flex", alignItems: "center" }}>
                  <TextField
                    fullWidth
                    id="outlined-basic"
                    size="small"
                    variant="outlined"
                    placeholder="Search"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && searchValue.trim() !== "") {
                        e.preventDefault();
                        formik.handleSubmit();
                      }
                    }}
                  />
                  <Button
                    type="submit"
                    className="send_btn"
                    disabled={searchValue.trim() === ""}
                    sx={{ ml: 2 }}
                  >
                    <SendIcon />
                  </Button>
                </Grid>
              </Grid>

              <Grid
                item
                lg={5}
                xl={4}
                md={12}
                xs={12}
                sm={12}
                sx={{ p: 2, borderLeft: 1, borderColor: "#DDE1EF" }}
              >
                <Grid item style={{ height: "700px", borderRadius: "10px" }}>
                  <Typography variant="h3" component="h3">
                    Task Details
                  </Typography>
                  <TableContainer
                    component={Paper}
                    style={{ marginTop: "16px" }}
                  >
                    <Table>
                      <TableBody>
                        <TableRow>
                          <TableCell style={{ border: "none", width: "120px" }}>
                            <Typography variant="h5" component="h2">
                              Task No
                            </Typography>
                          </TableCell>
                          <TableCell style={{ border: "none" }}>
                            <Typography variant="h5" component="h2">
                              <TextField
                                placeholder="Task title"
                                name="title"
                                variant="outlined"
                                size="small"
                                disabled
                                fullWidth
                                InputProps={{
                                  style: { color: "#5559CE" },
                                }}
                                InputLabelProps={{
                                  shrink: true,
                                }}
                                value={
                                  taskData && taskData._id
                                    ? `#${taskData._id.substring(0, 6)}`
                                    : ""
                                }
                              />
                            </Typography>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell style={{ border: "none" }}>
                            <Typography variant="h5" component="h2">
                              Task Title
                            </Typography>
                          </TableCell>
                          <TableCell style={{ border: "none" }}>
                            <TextField
                              placeholder="Task title"
                              name="title"
                              variant="outlined"
                              size="small"
                              disabled={user.role !== "Admin"}
                              fullWidth
                              InputProps={{
                                style: { color: "#5559CE" },
                              }}
                              InputLabelProps={{
                                shrink: true,
                              }}
                              value={formik.values.title}
                              onChange={formik.handleChange}
                              error={
                                formik.touched.title &&
                                Boolean(formik.errors.title)
                              }
                              helperText={
                                formik.touched.title && formik.errors.title
                              }
                            />
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell style={{ border: "none" }}>
                            <Typography variant="h5" component="h2">
                              Priority
                            </Typography>
                          </TableCell>
                          <TableCell style={{ border: "none" }}>
                            <FormControl fullWidth>
                              <InputLabel
                                htmlFor="priority-placeholder"
                                style={{ display: "none" }}
                              >
                                Priority
                              </InputLabel>
                              <Select
                                name="priority"
                                inputProps={{
                                  name: "priority",
                                  id: "priority-placeholder",
                                }}
                                disabled={user.role !== "Admin"}
                                value={formik.values.priority}
                                onChange={formik.handleChange}
                                size="small"
                              >
                                <MenuItem value={"High"}>High</MenuItem>
                                <MenuItem value={"Medium"}>Medium</MenuItem>
                                <MenuItem value={"Low"}>Low</MenuItem>
                              </Select>
                            </FormControl>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell style={{ border: "none" }}>
                            <Typography variant="h5" component="h2">
                              Status
                            </Typography>
                          </TableCell>
                          <TableCell style={{ border: "none" }}>
                            <InputLabel
                              htmlFor="status-placeholder"
                              style={{ display: "none" }}
                            >
                              Priority
                            </InputLabel>
                            <FormControl fullWidth>
                              <Select
                                name="status"
                                size="small"
                                value={formik.values.status}
                                onChange={formik.handleChange}
                                disabled={user.role === "Admin"}
                                InputLabelProps={{
                                  style: { color: "#5559CE" },
                                }}
                                inputProps={{
                                  name: "status",
                                  id: "status-placeholder",
                                }}
                              >
                                <MenuItem value={"Open"}>Open</MenuItem>
                                <MenuItem value={"Complate"}>Complate</MenuItem>
                                <MenuItem value={"pending"}>pending</MenuItem>
                              </Select>
                            </FormControl>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell style={{ border: "none" }}>
                            <Typography variant="h5" component="h2">
                              Create Date
                            </Typography>
                          </TableCell>
                          <TableCell style={{ border: "none" }}>
                            <FormControl
                              fullWidth
                              className="flatpicker"
                              style={{ outline: "none", whiteSpace: "nowrap" }}
                            >
                              <Flatpickr
                                placeholder="Start Date"
                                style={{
                                  minWidth: "100%",
                                  cursor:
                                    user.role !== "Admin"
                                      ? "not-allowed"
                                      : "pointer",
                                }}
                                className="form-control"
                                disabled={user.role !== "Admin"}
                                name="startDate"
                                value={formik.values.startDate}
                                onChange={(date) =>
                                  formik.setFieldValue("startDate", date[0])
                                }
                                options={{
                                  dateFormat: "Y-m-d",
                                  enableTime: false,
                                  mode: "single",
                                }}
                              />
                            </FormControl>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell style={{ border: "none" }}>
                            <Typography variant="h5" component="h2">
                              Due Date
                            </Typography>
                          </TableCell>
                          <TableCell style={{ border: "none" }}>
                            <FormControl
                              fullWidth
                              className="flatpicker"
                              style={{ outline: "none", whiteSpace: "nowrap" }}
                            >
                              <Flatpickr
                                placeholder="End Date"
                                style={{
                                  minWidth: "100%",
                                  cursor:
                                    user.role !== "Admin"
                                      ? "not-allowed"
                                      : "pointer",
                                }}
                                className="form-control"
                                disabled={user.role !== "Admin"}
                                name="endDate"
                                value={formik.values.endDate}
                                onChange={(date) =>
                                  formik.setFieldValue("endDate", date[0])
                                }
                                options={{
                                  dateFormat: "Y-m-d",
                                  enableTime: false,
                                  mode: "single",
                                }}
                              />
                            </FormControl>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "end",
                    alignItems: "center",
                  }}
                >
                  <Button
                    type="submit"
                    className="save_content"
                    sx={{ mr: 2 }}
                    onClick={HandlesaveModal}
                  >
                    Save
                  </Button>
                  <Button
                    variant="contained"
                    onClick={handleDeleteModal}
                    className="delete_content"
                    disabled={user.role !== "Admin"}
                  >
                    Delete
                  </Button>

                  <Dialog
                    open={openDialog}
                    onClose={handleCancelDelete}
                    maxWidth={"xs"}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                  >
                    <DialogTitle
                      style={{ fontSize: "20px" }}
                      id="alert-dialog-title"
                    >
                      {"Are you sure?"}
                    </DialogTitle>
                    <IconButton
                      aria-label="close"
                      onClick={handleCancelDelete}
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
                      <DialogContentText id="alert-dialog-description">
                        This action will permanently delete the task ticket. Are
                        you sure you want to proceed?
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleCancelDelete} color="error">
                        No
                      </Button>
                      <Button
                        onClick={handleConfirmDelete}
                        style={{ color: "#5559CE" }}
                        autoFocus
                      >
                        Yes
                      </Button>
                    </DialogActions>
                  </Dialog>
                </div>
              </Grid>
            </Grid>
          </FormControl>
        </form>
      </MainCard>
    </>
  );
};

export default EditTaskView;
