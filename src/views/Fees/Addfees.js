import { useState } from 'react';
import { Grid, TextField, Typography } from '@mui/material';
import { FormControl, InputLabel } from '@mui/material';
import { Select, MenuItem } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Button from '@mui/material/Button';

function Addfees({ handleCancel }) {
  // Selcted Course
  const [course, setCourse] = useState('');
  const handleCourse = (event) => {
    setCourse(event.target.value);
  };
  //Pyment type
  const [payment, setpayment] = useState('');
  const handlePayment = (event) => {
    setpayment(event.target.value);
  };
  //Fees status
  const [feesStatus, setfeesStatus] = useState('');
  const handleFeesStatus = (event) => {
    setfeesStatus(event.target.value);
  };

  const courses = [
    { value: 'Master In Flutter Development', label: 'Master In Flutter Development' },
    { value: 'Master In Android Development', label: 'Master In Android Development' },
    { value: 'Master In Game Development', label: 'Master In Game Development' },
    { value: 'Master In Full Stack Development', label: 'Master In Full Stack Development' },
    { value: 'Master In Web Development', label: 'Master In Web Development' },
    { value: 'Node js', label: 'Node js' },
    { value: 'React js', label: 'React js' },
    { value: 'Python', label: 'Python' },
    { value: 'Angular JS', label: 'Angular JS' },
    { value: 'C Programming', label: 'C Programming' },
    { value: 'C++ Programming', label: 'C++ Programming' },
    { value: 'Java Programming', label: 'Java Programming' },
    { value: 'IOS', label: 'IOS' },
    { value: 'Advance PHP', label: 'Advance PHP' },
    { value: 'Laravel', label: 'Laravel' },
    { value: 'Wordpress', label: 'Wordpress' },
    { value: 'Master In Web Design', label: 'Master In Web Design' },
    { value: 'Master in UI/UX Design', label: 'Master in UI/UX Design' },
    { value: 'Advance Graphics Design', label: 'Advance Graphics Design' },
    { value: 'Photoshop', label: 'Photoshop' },
    { value: 'CCC- Basic Computer Course', label: 'CCC- Basic Computer Course' },
    { value: 'Adobe XD', label: 'Adobe XD' },
    { value: 'Adobe Illustrator', label: 'Adobe Illustrator' }
  ];
  return (
    <>
      <FormControl
        sx={{
          m: 1,
          p: 0,
          minWidth: 120,
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
              borderWidth: '1px'
            }
          },
          size: 'small'
        }}
      >
        <Typography variant="h6" style={{ marginBottom: '20px', color: '#5559ce', fontWeight: '600', fontSize: '18px' }}>
          Add Fees Details
        </Typography>

        <Grid container spacing={2}>
          <Grid item lg={6} xl={6} md={6} sm={12} xs={12}>
            <TextField
              label="Enrollment*"
              variant="outlined"
              fullWidth
              InputLabelProps={{
                style: { color: '#5559CE' }
              }}
            />
          </Grid>
          <Grid item lg={6} xl={6} md={6} sm={12} xs={12}>
            <TextField
              label="Student Name*"
              variant="outlined"
              fullWidth
              InputLabelProps={{
                style: { color: '#5559CE' }
              }}
            />
          </Grid>
          <Grid item lg={6} xl={6} md={6} sm={12} xs={12}>
            <FormControl item={true}fullWidth variant="outlined">
              <InputLabel id="course-label*" style={{ color: '#5559ce' }}>
                Course
              </InputLabel>
              <Select
                labelId="course-label"
                id="course"
                value={course}
                onChange={handleCourse}
                label="Course"
                InputLabelProps={{
                  style: { color: '#5559CE' }
                }}
              >
                {courses.map((courseItem) => (
                  <MenuItem key={courseItem.value} value={courseItem.value}>
                    {courseItem.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item lg={6} xl={6} md={6} sm={12} xs={12}>
            <TextField
              label="Duration*"
              variant="outlined"
              fullWidth
              InputLabelProps={{
                style: { color: '#5559CE' }
              }}
            />
          </Grid>
          <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
            <LocalizationProvider dateAdapter={AdapterDayjs} fullWidth>
              <DatePicker label="Collection Date*" />
            </LocalizationProvider>
          </Grid>
          <Grid item lg={6} xl={6} md={6} sm={12} xs={12}>
            <FormControl item={true}fullWidth variant="outlined">
              <InputLabel id="payment-label" style={{ color: '#5559ce' }}>
                Payment*
              </InputLabel>
              <Select labelId="payment-label" id="payment" value={payment} onChange={handlePayment} label="payment">
                <MenuItem value="Cash">Cash</MenuItem>
                <MenuItem value="Cheque">Cheque</MenuItem>
                <MenuItem value="Online Transfer">Online Transfer</MenuItem>
                <MenuItem value="Draft">Draft</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item lg={6} xl={6} md={6} sm={12} xs={12}>
            <TextField
              label="Invoice Number*"
              variant="outlined"
              fullWidth
              InputLabelProps={{
                style: { color: '#5559CE' }
              }}
            />
          </Grid>
          <Grid item lg={6} xl={6} md={6} sm={12} xs={12}>
            <FormControl item={true}fullWidth variant="outlined">
              <InputLabel id="statusfees-label" style={{ color: '#5559ce' }}>
                Payment*
              </InputLabel>
              <Select labelId="statusfees-label" id="statusfees" value={feesStatus} onChange={handleFeesStatus} label="statusfees">
                <MenuItem value="Paid">Paid</MenuItem>
                <MenuItem value="Unpaid">Unpaid</MenuItem>
                <MenuItem value="Pending">Pending</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item lg={6} xl={6} md={6} sm={12} xs={12}>
            <TextField
              label="Amount*"
              variant="outlined"
              fullWidth
              InputLabelProps={{
                style: { color: '#5559CE' }
              }}
            />
          </Grid>
          <Grid item lg={6} xl={6} md={6} sm={12} xs={12}>
            <TextField
              label="Reduced Fees*"
              variant="outlined"
              fullWidth
              InputLabelProps={{
                style: { color: '#5559CE' }
              }}
            />
          </Grid>
          <Grid item lg={12} xl={12} md={12} sm={12} xs={12}>
            <Button variant="contained" style={{ backgroundColor: '#5559ce', color: '#fff' }}>
              Submit
            </Button>
            <Button
              variant="contained"
              style={{ backgroundColor: '#e1e1e1', color: '#5559ce', marginLeft: '10px' }}
              onCancel={handleCancel}
            >
              Cancel
            </Button>
          </Grid>
        </Grid>
      </FormControl>
    </>
  );
}

export default Addfees;
