import React, { useState } from "react";
import {
  Button,
  FormControl,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { Avatar, Modal } from "antd";

function Setting() {
  // Profile
  const [profileModal, setProfileModal] = useState(false);
  const [profilePic, setProfilePic] = useState("");
  const [companyName, setCompanyName] = useState("");

  const showProfile = () => {
    setProfileModal(true);
  };

  const handleProfileOpenModal = () => {
    setProfileModal(true);
  };

  const handleProfileCloseModal = () => {
    setProfileModal(false);
  };

  // Upload Profile Photo
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setProfilePic(URL.createObjectURL(file));
  };

  const saveProfile = (event) => {
    event.preventDefault();
    console.log("Company Profile data:", companyName, profilePic);
    handleProfileCloseModal(); // Close modal after saving
  };

  // Expenses
  const [expensesModal, setExpensesModal] = useState(false);
  const [expenses, setExpenses] = useState([]);
  const [selectedExpense, setSelectedExpense] = useState("");

  const showExpenses = () => {
    setExpensesModal(true);
  };

  const handleExpensesOpenModal = () => {
    setExpensesModal(true);
  };

  const handleExpensesCloseModal = () => {
    setExpensesModal(false);
  };

  const handleAddExpense = (event) => {
    event.preventDefault();
    const newExpense = event.target.expenses.value;
    if (newExpense.trim() !== "") {
      if (!expenses.includes(newExpense)) {
        setExpenses([...expenses, newExpense]);
      } else {
        alert("This expense already exists!");
      }
      event.target.reset();
    }
  };

  // Role
  const [roleModal, setRoleModal] = useState(false);
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState("");

  const showRoles = () => {
    setRoleModal(true);
  };

  const handleRoleOpenModal = () => {
    setRoleModal(true);
  };

  const handleRoleCloseModal = () => {
    setRoleModal(false);
  };

  const handleAddRole = (event) => {
    event.preventDefault();
    const newRole = event.target.role.value;
    if (newRole.trim() !== "") {
      if (!roles.includes(newRole)) {
        setRoles([...roles, newRole]);
      } else {
        alert("This role already exists!");
      }
      event.target.reset();
    }
  };

  return (
    <div>
      <Grid container spacing={2}>
        {/* Profile */}
        <Grid item xs={12} sm={12} md={6} lg={4}>
          <Grid
            boxShadow={1}
            sx={{
              padding: "20px",
              backgroundColor: "#fff",
              borderRadius: "10px",
            }}
          >
            <Grid sx={{ display: "flex", justifyContent: "flex-end" }}>
              <AddPhotoAlternateIcon
                sx={{ color: "#673ab7", fontSize: "30px", cursor: "pointer" }}
                onClick={showProfile}
              />
              <EditNoteIcon
                sx={{ color: "#858899", fontSize: "30px", cursor: "pointer" }}
              />
            </Grid>
            <Typography
              sx={{
                fontSize: "28px",
                fontWeight: "500",
                color: "#f8c46c",
                marginBottom: "16px",
              }}
            >
              Profile
            </Typography>
            <Typography
              sx={{ fontSize: "20px", color: "#262626", marginBottom: "16px" }}
            >
              Please Edit and Add Profile according to personal Details.
            </Typography>
          </Grid>
        </Grid>

        {/* Expenses */}
        <Grid item xs={12} sm={12} md={6} lg={4}>
          <Grid
            boxShadow={1}
            sx={{
              padding: "20px",
              backgroundColor: "#fff",
              borderRadius: "10px",
            }}
          >
            <Grid sx={{ display: "flex", justifyContent: "flex-end" }}>
              <AddPhotoAlternateIcon
                sx={{ color: "#673ab7", fontSize: "30px", cursor: "pointer" }}
                onClick={showExpenses}
              />
              <EditNoteIcon
                sx={{ color: "#858899", fontSize: "30px", cursor: "pointer" }}
              />
            </Grid>
            <Typography
              sx={{
                fontSize: "28px",
                fontWeight: "500",
                color: "#989be1",
                marginBottom: "16px",
              }}
            >
              Expenses
            </Typography>
            <Typography
              sx={{ fontSize: "20px", color: "#262626", marginBottom: "16px" }}
            >
              Please Edit and Add Expenses according to personal Details.
            </Typography>
          </Grid>
        </Grid>

        {/* Role */}
        <Grid item xs={12} sm={12} md={6} lg={4}>
          <Grid
            boxShadow={1}
            sx={{
              padding: "20px",
              backgroundColor: "#fff",
              borderRadius: "10px",
            }}
          >
            <Grid sx={{ display: "flex", justifyContent: "flex-end" }}>
              <AddPhotoAlternateIcon
                sx={{ color: "#673ab7", fontSize: "30px", cursor: "pointer" }}
                onClick={showRoles}
              />
              <EditNoteIcon
                sx={{ color: "#858899", fontSize: "30px", cursor: "pointer" }}
              />
            </Grid>
            <Typography
              sx={{
                fontSize: "28px",
                fontWeight: "500",
                color: "#e97c7c",
                marginBottom: "16px",
              }}
            >
              Role
            </Typography>
            <Typography
              sx={{ fontSize: "20px", color: "#262626", marginBottom: "16px" }}
            >
              Please Edit and Add Role according to personal Details.
            </Typography>
          </Grid>
        </Grid>
      </Grid>

      {/* Profile Modal */}
      <Modal
        visible={profileModal}
        onCancel={handleProfileCloseModal}
        footer={null}
        maskClosable={false}
        width={400}
      >
        <form onSubmit={saveProfile}>
          <Grid>
            <Grid item>
              <Typography
                sx={{
                  fontSize: "18px",
                  color: "#262626",
                  textAlign: "center",
                  marginBottom: "20px",
                  fontWeight: "700",
                  letterSpacing: "1.1px",
                }}
              >
                Upload Your Company Logo
              </Typography>
              <Grid
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "auto",
                }}
              >
                <input
                  id="file-input"
                  type="file"
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />
                <Avatar
                  alt="Avatar"
                  src={profilePic}
                  onClick={() => document.getElementById("file-input").click()}
                  style={{ cursor: "pointer", width: 96, height: 100 }}
                />
              </Grid>
            </Grid>
            <Grid
              item
              xl={12}
              lg={12}
              md={12}
              sm={12}
              xs={12}
              sx={{
                marginTop: "20px",
              }}
            >
              <FormControl
                sx={{
                  minWidth: 120,
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
                  marginBottom: "20px",
                }}
              >
                <TextField
                  label="Company Name"
                  id="company-name"
                  name="companyName"
                  variant="outlined"
                  fullWidth
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  InputLabelProps={{
                    style: { color: "#5559CE" },
                  }}
                />
              </FormControl>
            </Grid>
            <Grid
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Button
                type="submit"
                variant="contained"
                sx={{ backgroundColor: "#5559CE", width: "100%" }}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Modal>

      {/* Expenses Modal */}
      <Modal
        visible={expensesModal}
        onCancel={handleExpensesCloseModal}
        footer={null}
        maskClosable={false}
        width={650}
      >
        <form onSubmit={handleAddExpense}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography
                variant="h6"
                sx={{ fontWeight: 600, marginBottom: 2 }}
              >
                Add Company Expenses
              </Typography>
              <TextField
                id="outlined-basic"
                label="Expenses"
                name="expenses"
                fullWidth
                variant="outlined"
                InputLabelProps={{
                  style: { color: "#5559CE" },
                }}
                sx={{ marginBottom: 2 }}
              />
              <Button
                type="submit"
                variant="contained"
                sx={{ backgroundColor: "#5559CE", width: "100%" }}
              >
                Add
              </Button>
            </Grid>

            <Grid item xs={12} sm={6}>
              {expenses.length > 0 ? (
                <>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 600, marginBottom: 2 }}
                  >
                    Show Company Expenses
                  </Typography>
                  <Select
                    labelId="select-expense-label"
                    id="select-expense"
                    fullWidth
                    value={selectedExpense}
                    onChange={(e) => setSelectedExpense(e.target.value)}
                  >
                    {expenses.map((expense, index) => (
                      <MenuItem key={index} value={expense}>
                        {expense}
                      </MenuItem>
                    ))}
                  </Select>
                </>
              ) : (
                <Typography>No Expenses</Typography>
              )}
            </Grid>
          </Grid>
        </form>
      </Modal>

      {/* Role Modal */}
      <Modal
        visible={roleModal}
        onCancel={handleRoleCloseModal}
        footer={null}
        maskClosable={false}
        width={650}
      >
        <form onSubmit={handleAddRole}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography
                variant="h6"
                sx={{ fontWeight: 600, marginBottom: 2 }}
              >
                Add Company Role
              </Typography>
              <TextField
                id="outlined-basic"
                label="Role"
                name="role"
                fullWidth
                variant="outlined"
                InputLabelProps={{
                  style: { color: "#5559CE" },
                }}
                sx={{ marginBottom: 2 }}
              />
              <Button
                type="submit"
                variant="contained"
                sx={{ backgroundColor: "#5559CE", width: "100%" }}
              >
                Add
              </Button>
            </Grid>

            <Grid item xs={12} sm={6}>
              {roles.length > 0 ? (
                <>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 600, marginBottom: 2 }}
                  >
                    Show Company Roles
                  </Typography>
                  <Select
                    labelId="select-role-label"
                    id="select-role"
                    fullWidth
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                  >
                    {roles.map((role, index) => (
                      <MenuItem key={index} value={role}>
                        {role}
                      </MenuItem>
                    ))}
                  </Select>
                </>
              ) : (
                <Typography>No Roles</Typography>
              )}
            </Grid>
          </Grid>
        </form>
      </Modal>
    </div>
  );
}

export default Setting;
