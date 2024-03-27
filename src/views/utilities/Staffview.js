import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import SchoolIcon from '@mui/icons-material/School';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import { Box, Grid, Typography } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';

function Staffview() {
  const { id } = useParams();
  const [employee, setEmployee] = useState([]);

  const fetchData = async () => {
    const apiEndpoint = `${process.env.REACT_APP_API_URL}staff/${id}`;
    try {
      const response = await axios.get(apiEndpoint);
      setEmployee(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);
  
  const formattedJoiningDate = new Date(employee.joining_date).toLocaleDateString();
  const formattedDob = new Date(employee.dob).toLocaleDateString();

  return (
    <div>
      <MainCard>
        <Grid sx={{ border: '1px solid #e1e1e1', padding: '10px', borderRadius: '10px', height: 'auto' }}>
          <Grid container spacing={2} alignItems={'center'}>
            <Grid item lg={2} md={4} sm={4} xs={12}>
              <div className="staff_image" style={{ margin: 'auto', textAlign: 'center ' }}>
                <img
                  src={employee.image}
                  alt="studentimage"
                  style={{ border: '6px solid #e1e1e1', margin: 'auto', width: '150px', height: '180px' }}
                />
              </div>
            </Grid>
            <Grid item lg={2} md={4} sm={4} xs={12}>
              <Typography style={{ fontSize: '14px', fontWeight: '600', marginBottom: '10px' }}>
                <Box>Full Name:</Box>
                <Box style={{ fontSize: '14px', fontWeight: '400', color: '#777ad8' }}>
                  {employee.firstName} {employee.lastName}
                </Box>
              </Typography>
              <Typography style={{ fontSize: '14px', fontWeight: '600', marginBottom: '10px' }}>
                <Box>Developer:</Box>
                <Box style={{ fontSize: '14px', fontWeight: '400', color: '#777ad8' }}>{employee.developer_role}</Box>
              </Typography>
              <Typography style={{ fontSize: '14px', fontWeight: '600', marginBottom: '10px' }}>
                <Box>Date Of Birth:</Box>
                <Box style={{ fontSize: '14px', fontWeight: '400', color: '#777ad8' }}>{formattedDob}</Box>
              </Typography>
            </Grid>
            <Grid item lg={3} md={4} sm={4} xs={12}>
              <Typography style={{ fontSize: '14px', fontWeight: '600', marginBottom: '10px' }}>
                <Box>Aadhar No:</Box>
                <Box style={{ fontSize: '14px', fontWeight: '400', color: '#777ad8' }}>{employee.aadhar_no}</Box>
              </Typography>
              <Typography style={{ fontSize: '14px', fontWeight: '600', marginBottom: '10px' }}>
                <Box>Mobile No:</Box>
                <Box style={{ fontSize: '14px', fontWeight: '400', color: '#777ad8' }}>{employee.mo_Number}</Box>
              </Typography>
              <Typography style={{ fontSize: '14px', fontWeight: '600', marginBottom: '10px' }}>
                <Box>Email Id:</Box>
                <Box style={{ fontSize: '14px', fontWeight: '400', color: '#777ad8', wordWrap: 'break-word' }}>{employee.email}</Box>
              </Typography>
            </Grid>
            <Grid item lg={2} md={4} sm={4} xs={12}>
              <Typography style={{ fontSize: '14px', fontWeight: '600', marginBottom: '10px' }}>
                <Box>Gender:</Box>
                <Box style={{ fontSize: '14px', fontWeight: '400', color: '#777ad8' }}>{employee.gender}</Box>
              </Typography>
              <Typography style={{ fontSize: '14px', fontWeight: '600', marginBottom: '10px' }}>
                <Box>Employee Id:</Box>
                <Box style={{ fontSize: '14px', fontWeight: '400', color: '#777ad8' }}>{employee.employee_no}</Box>
              </Typography>
              <Typography style={{ fontSize: '14px', fontWeight: '600', marginBottom: '10px' }}>
                <Box>Joining Date:</Box>
                <Box style={{ fontSize: '14px', fontWeight: '400', color: '#777ad8' }}>{formattedJoiningDate}</Box>
              </Typography>
            </Grid>
            <Grid item lg={3} md={4} sm={4} xs={12}>
              <Grid item lg={12} xs={12} style={{ display: 'flex', marginBottom: '4px' }}>
                <Box style={{ marginRight: '15px' }}>
                  <SchoolIcon style={{ color: '#5559ce' }} />
                </Box>
                <Box>
                  <Typography style={{ fontSize: '16px', fontWeight: '400', color: '#777ad8', marginBottom: '6px' }}>Education</Typography>
                  <Typography style={{ fontSize: '16px', fontWeight: '500', color: '#000', marginBottom: '6px' }}>
                    {employee.education}
                  </Typography>
                </Box>
              </Grid>
              <Grid item lg={12} xs={12} style={{ display: 'flex', marginBottom: '4px' }}>
                <Box style={{ marginRight: '15px' }}>
                  <BusinessCenterIcon style={{ color: '#5559ce' }} />
                </Box>
                <Box>
                  <Typography style={{ fontSize: '16px', fontWeight: '400', color: '#777ad8', marginBottom: '6px' }}>Experiance</Typography>
                  <Typography style={{ fontSize: '16px', fontWeight: '500', color: '#000', marginBottom: '6px' }}>
                    {employee.experience}
                  </Typography>
                </Box>
              </Grid>
              <Grid item lg={12} xs={12} style={{ display: 'flex', marginBottom: '4px' }}>
                <Box style={{ marginRight: '15px' }}>
                  <LocationOnIcon style={{ color: '#5559ce' }} />
                </Box>
                <Box>
                  <Typography style={{ fontSize: '16px', fontWeight: '400', color: '#777ad8', marginBottom: '6px' }}>Address:</Typography>
                  <Typography style={{ fontSize: '16px', fontWeight: '500', color: '#000', marginBottom: '6px' }}>
                    {employee.address}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </MainCard>
    </div>
  );
}

export default Staffview;
