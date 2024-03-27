import { useEffect, useState } from 'react';
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
  Stack
  // TextField,
} from '@mui/material';
// project imports
import AnimateButton from 'ui-component/extended/AnimateButton';
// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import axios from 'axios';
import { profile } from '../../../../atoms/authAtoms';
import { useRecoilState } from 'recoil';
import PhoneInput from 'react-phone-input-2';
// ============================|| FIREBASE - LOGIN ||============================ //
const FirebaseLogin = ({ setIsLoading }) => {
  const [checked, setChecked] = useState(true);
  const [contact, setContact] = useState('+91');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [userData, setUserData] = useState({
    contact: contact,
    password: ''
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
    const formattedContact = formattedValue.startsWith('+91') ? formattedValue : '+91' + formattedValue;
    setContact(formattedContact);
    setUserData((prevData) => ({
      ...prevData,
      contact: formattedContact
    }));
  };
  // const handleChange = (event) => {
  //   const { name, value } = event.target;
  //   setUserData((prevData) => ({
  //     ...prevData,
  //     [name]: value
  //   }));
  // };
  const handleSubmit = async () => {
    setLoading(true)
    return await axios({
      method: 'POST',
      baseURL: `${process.env.REACT_APP_LOGIN_URL}`,
      url: 'login',
      data: {
        password: userData.password,
        contact: userData.contact
      },
      withCredentials: false
    })
      .then((res) => {
        const data = res.data.data.tokens;
        localStorage.setItem("jwt", data.jwt);
        localStorage.setItem("jwtRefresh", data.jwtRefresh);
        window.location = "/";
        // if (res?.data?.user?.role === 'Student') {
        //   setError('Student Permission Decline — Please Check!');
        //   setLoading(false);
        //   return;
        // }
        setLoading(false);
        setError('');
      })
      .catch((error) => {
        setLoading(false);
        setError(error.response.data.message);
        console.error('Error:', error);
      });
  };
  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && userData.password !== '') {
      handleSubmit();
    }
  };
  function loginUser() {
    axios({
      method: 'GET',
      baseURL: `${process.env.REACT_APP_LOGIN_URL}`,
      url: 'users/me',
      withCredentials: false
    })
      .then((response) => {
        if (response.status === 200) {
          setProfileData(response.data.data);
          window.location = '/';
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
      <Grid container direction="column" justifyContent="center" spacing={2}>
        <Grid item xs={12} container alignItems="center" justifyContent="center">
          {/*<Box sx={{ mb: 2 }}>*/}
          {/*  <Typography variant="subtitle1">Sign in with Mobile Number</Typography>*/}
          {/*</Box>*/}
        </Grid>
      </Grid>
      <form>
        <FormControl
          fullWidth
          sx={{
            width: '100%',
            padding: '20px 0',
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#5559CE'
              },
              '&:hover fieldset': {
                borderColor: '#5559CE'
              },
              '&.Mui-focused fieldset': {
                borderColor: '#5559CE',
                borderWidth: '2px'
              }
            }
          }}
        >
          {/* <MuiTelInput
            onChange={handlePhoneChange}
            defaultCountry="in"
            fullWidth
            value={contact}
            disableDropdown
            inputProps={{ maxLength: 16 }}
          /> */}
          <PhoneInput
            country={'in'}
            value={contact}
            onChange={handlePhoneChange}
          />
        </FormControl>
        <FormControl
          fullWidth
          sx={{
            width: '100%',
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#5559CE'
              },
              '&:hover fieldset': {
                borderColor: '#5559CE'
              },
              '&.Mui-focused fieldset': {
                borderColor: '#5559CE',
                borderWidth: '2px'
              }
            }
          }}
        >
          <InputLabel htmlFor="outlined-adornment-password-login" style={{ color: '#5559CE' }}>
            Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password-login"
            type={showPassword ? 'text' : 'password'}
            name="password"
            onChange={(e) => setUserData({ ...userData, password: e.target.value })}
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
        <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
          <FormControlLabel
            control={<Checkbox checked={checked} onChange={(event) => setChecked(event.target.checked)} name="checked"
              color="primary" />}
            label="Remember me"
          />
        </Stack>
        {error ? <Alert severity="error">{error}</Alert> : ''}
        <Box sx={{ mt: 2 }}>
          <AnimateButton>
            <Button
              fullWidth
              size="large"
              variant="contained"
              onClick={handleSubmit}
              color="secondary"
              disabled={userData.contact.length < 4 || userData.password.trim() === ''}
            >
              {loading ? <CircularProgress style={{ color: 'white', width: '25px', height: '25px' }} /> : 'Login'}
            </Button>
          </AnimateButton>
        </Box>
      </form>
    </>
  );
};
export default FirebaseLogin;