// import PropTypes from 'prop-types';
<<<<<<< HEAD
// material-ui
import { styled } from '@mui/material/styles';
import { Avatar, Box, Grid, Typography } from '@mui/material';
// project imports
import MainCard from 'ui-component/cards/MainCard';
import StudentIc from '../../../assets/images/icone deshbord/Vector (1).png';
=======

// material-ui
import { styled } from '@mui/material/styles';
import { Avatar, Box, Grid, Typography } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import StudentIc from '../../../assets/images/icone deshbord/Vector (1).png';


>>>>>>> 2b531e6ccdcfc1f67f7b29f7dcb5669a43a823a4
const CardWrapper = styled(MainCard)(() => ({
  backgroundColor: '#fff',
  color: '#fff',
  border: '1px solid #E5EBF0'
}));
// ==============================|| DASHBOARD - TOTAL ORDER LINE CHART CARD ||============================== //
<<<<<<< HEAD
=======

>>>>>>> 2b531e6ccdcfc1f67f7b29f7dcb5669a43a823a4
const TotalOrderLineChartCard = () => {
  return (
    <>
       <CardWrapper border={false} content={false}>
        <Box sx={{ p: 2.25 }} >
          <Grid container direction="row"  sx={{ justifyContent: 'space-around' }}>
            <Grid item>
              <Grid container alignItems="center">
                <Grid item >
                  <Avatar variant="rounded" sx={{ marginTop:'8px'}}>
                    <img src={StudentIc} alt="student" />
                  </Avatar>
                </Grid>
              </Grid>
            </Grid>
            <Grid item >
              <Grid container  direction="column">
                <Grid >
                  <Typography
                    sx={{
                      fontSize: '1rem',
                      fontWeight: 500,
                      color: '#1B1D28'
                    }}
                  >
                    Staff
                  </Typography>
                </Grid>
                <Grid >
                  <Typography sx={{ fontSize: '26px', fontWeight: 500, color: '#79AB78' }}>315</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </CardWrapper>
    </>
  );
};
<<<<<<< HEAD
export default TotalOrderLineChartCard;
=======
export default TotalOrderLineChartCard;
>>>>>>> 2b531e6ccdcfc1f67f7b29f7dcb5669a43a823a4
