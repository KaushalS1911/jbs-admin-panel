import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import { Box, Grid, Typography } from '@mui/material';
// // project imports
import MainCard from 'ui-component/cards/MainCard';
const CardWrapper = styled(MainCard)(() => ({
  backgroundColor: '#fff',
  color: '#fff',
  boxShadow: 'rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;'
}));


const Allofcounter = ({ icone, role, roleValue, roleColor }) => {
  return (
    <>
      <CardWrapper border={true} content={false}>
        <Box sx={{ p: 2.25 }}>
          <Grid container direction="row" sx={{ justifyContent: 'space-around' }}>
            <Grid item>
              <Grid container alignItems="center">
                <Grid item>
                  <img src={icone} alt={role} style={{ marginTop: '8px', width: '40px', height: '40px', lineHeight: '40px' }} />
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid container direction="column">
                <Grid>
                  <Typography
                    sx={{
                      fontSize: '14px',
                      fontWeight: 500,
                      color: '#1B1D28'
                    }}
                  >
                    {role}
                  </Typography>
                </Grid>
                <Grid>
                  <Typography sx={{ fontSize: '26px', fontWeight: 500, color: roleColor, textAlign: 'center' }}>{roleValue}</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </CardWrapper>
    </>
  );
};
Allofcounter.propTypes = {
  isLoading: PropTypes.bool,
  icon: PropTypes.string,
  role: PropTypes.string,
  roleValue: PropTypes.string,
  roleColor: PropTypes.string
};
export default Allofcounter;
