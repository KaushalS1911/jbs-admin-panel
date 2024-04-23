import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControl,
  FormControlLabel,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
} from "@mui/material";
import AnimateButton from "ui-component/extended/AnimateButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import axios from "axios";
import { profile } from "../../../../atoms/authAtoms";
import { useRecoilState } from "recoil";
import PhoneInput from "react-phone-input-2";
import { notification } from "antd";
import {getConfigs} from "../../../Setting/SettingSlice";
import {useDispatch} from "react-redux";

// ============================|| ADMIN PANEL LOGIN ||============================ //
const FirebaseLogin = ({ setIsLoading }) => {
  //notification
  const openNotificationWithIcon = (type, message) => {
    notification[type]({
      message: message,
    });
  };
  const dispatch = useDispatch()
  const [checked, setChecked] = useState(true);
  const [contact, setContact] = useState("+91");
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({
    contact: contact,
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  // eslint-disable-next-line
  const [profileData, setProfileData] = useRecoilState(profile);

  useEffect(() => {
    loginUser();
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

  const handleSubmit = async () => {
    setLoading(true);
    return await axios({
      method: "POST",
      baseURL: `${process.env.REACT_APP_LOGIN_URL}`,
      url: "login",
      data: {
        password: userData.password,
        contact: userData.contact,
      },
      withCredentials: false,
    })
      .then((res) => {
        if (res.status === 200) {
          const data = res.data.data.tokens;
          localStorage.setItem("jwt", data.jwt);
          localStorage.setItem("jwtRefresh", data.jwtRefresh);
          openNotificationWithIcon("success", res.data.data.message);
          dispatch(getConfigs())
          window.location = "/";
          setLoading(false);
        }
      })
      .catch((error) => {
        setLoading(false);
        openNotificationWithIcon("error", error.response.data.message);
      });
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && userData.password !== "") {
      handleSubmit();
    }
  };
  function loginUser() {
    axios({
      method: "GET",
      baseURL: `${process.env.REACT_APP_LOGIN_URL}`,
      url: "users/me",
      withCredentials: false,
    })
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          setProfileData(response.data.data);
          window.location = "/";
        }
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
    return () => {
      setIsLoading(true);
    };
  }

  return (
    <>
      <form>
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
          <PhoneInput
            country={"in"}
            value={contact}
            onChange={handlePhoneChange}
          />
        </FormControl>
        <FormControl
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
        >
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
            inputProps={{}}
          />
          {/* <small style={{ color: "#EF5350", marginLeft: "12px", marginTop: '5px' }}>{error || ""}</small> */}
        </FormControl>
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
                "Login"
              )}
            </Button>
          </AnimateButton>
        </Box>
      </form>
    </>
  );
};
export default FirebaseLogin;
