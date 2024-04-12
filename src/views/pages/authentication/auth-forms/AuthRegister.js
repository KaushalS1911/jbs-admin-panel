import React, { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  TextField,
} from "@mui/material";
import AnimateButton from "ui-component/extended/AnimateButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import axios from "axios";
import { profile } from "../../../../atoms/authAtoms";
import { useRecoilState } from "recoil";
import PhoneInput from "react-phone-input-2";
import { notification } from "antd";

const AuthRegister = ({ setIsLoading }) => {
  const openNotificationWithIcon = (type, message) => {
    notification[type]({
      message: message,
    });
  };

  const [checked, setChecked] = useState(true);
  const [contact, setContact] = useState("+91");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [userData, setUserData] = useState({
    contact,
    password: "",
    role: "Admin",
    firstName: "",
    lastName: "",
    email: "",
    company_name: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  // eslint-disable-next-line
  const [profileData, setProfileData] = useRecoilState(profile);

  useEffect(() => {
    registerUser();
  }, [setProfileData]);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handlePhoneChange = (value, country, e, formattedValue) => {
    const formattedContact = formattedValue.startsWith("+91")
      ? formattedValue
      : "+91" + formattedValue;
    setContact(formattedContact);
    setUserData((prevData) => ({
      ...prevData,
      contact: formattedContact,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_LOGIN_URL}/register`,
        { ...userData }
      );
      if(response.status ===200){
        const data = response.data.data.tokens;
        localStorage.setItem("jwt", data.jwt);
        localStorage.setItem("jwtRefresh", data.jwtRefresh);
        window.location = "/";
        setLoading(false);
        openNotificationWithIcon("success", response.data.data.message);
        setError("");
      }
    } catch (error) {
      setLoading(false);
      openNotificationWithIcon("error", error.response.data.message);
      console.error("Error:", error);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && userData.password.trim() !== "") {
      handleSubmit();
    }
  };

  function registerUser() {
    axios({
      method: "GET",
      baseURL: `${process.env.REACT_APP_LOGIN_URL}`,
      url: "users/me",
      withCredentials: false,
    })
      .then((response) => {
        if (response.status === 200) {
          setProfileData(response.data.data);
          window.location = "/";
        }
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }

  return (
    <form onSubmit={handleSubmit}>
      <FormControl
        fullWidth
        sx={{
          width: "100%",
          padding: "20px 0",
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
      >
        <Grid container spacing={3}>
          <Grid item lg={12} sm={12} xs={12}>
            <TextField
              label="First Name"
              id="firstname"
              name="firstName"
              value={userData.firstName}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              InputLabelProps={{
                style: { color: "#5559CE" },
              }}
            />
          </Grid>
          <Grid item lg={12} sm={12} xs={12}>
            <TextField
              id="outlined-basic"
              label="Last Name"
              name="lastName"
              value={userData.lastName}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              InputLabelProps={{
                style: { color: "#5559CE" },
              }}
            />
          </Grid>
          <Grid item lg={12} sm={12} xs={12}>
            <TextField
              id="outlined-basic"
              label="Email id"
              name="email"
              variant="outlined"
              value={userData.email}
              onChange={handleChange}
              fullWidth
              InputLabelProps={{
                style: { color: "#5559CE" },
              }}
            />
          </Grid>
          <Grid item lg={12} sm={12} xs={12}>
            <TextField
              id="outlined-basic"
              label="Company name"
              name="company_name"
              value={userData.company_name}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              InputLabelProps={{
                style: { color: "#5559CE" },
              }}
            />
          </Grid>
          <Grid item lg={12} sm={12} xs={12}>
            <PhoneInput
              country={"in"}
              value={contact}
              onChange={handlePhoneChange}
            />
          </Grid>
          <Grid item lg={12} sm={12} xs={12}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel
                htmlFor="outlined-adornment-password-login"
                style={{ color: "#5559CE" }}
              >
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password-login"
                type={showPassword ? "text" : "password"}
                name="password"
                onChange={(e) =>
                  setUserData({ ...userData, password: e.target.value })
                }
                onKeyDown={handleKeyDown}
                value={userData.password}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      size="large"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
                inputProps={{
                  autoComplete: "new-password",
                  maxLength: 20,
                }}
              />
            </FormControl>
          </Grid>
        </Grid>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          spacing={1}
        >
          <FormControlLabel
            control={
              <Checkbox
                checked={checked}
                onChange={(event) => setChecked(event.target.checked)}
                name="checked"
                color="primary"
              />
            }
            label="Remember me"
          />
        </Stack>
        {error && <Alert severity="error">{error}</Alert>}
        <Box sx={{ mt: 2 }}>
          <AnimateButton>
            <Button
              fullWidth
              size="large"
              variant="contained"
              onClick={handleSubmit}
              color="secondary"
              disabled={
                userData.contact.length < 4 || userData.password.trim() === ""
              }
            >
              {loading ? (
                <CircularProgress
                  style={{ color: "white", width: "25px", height: "25px" }}
                />
              ) : (
                "Register"
              )}
            </Button>
          </AnimateButton>
        </Box>
      </FormControl>
    </form>
  );
};

export default AuthRegister;
