import PropTypes from 'prop-types';
import { CardContent, Divider, Grid, Typography } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import ReactApexChart from 'react-apexcharts';
import { gridSpacing } from 'store/constant';

const PopularCard = ({ isLoading }) => {
  // Static employee data
  const employeeData = [
    { name: 'Kaushal sir', experiance: 3 },
    { name: 'Dixita Mam', experiance: 2 },
    { name: 'Jeel Kakadiya', experiance: 1 },
    { name: 'Yash Kakadiya', experiance: 1 },
  ];

  const employeeNames = employeeData.map((employee) => employee.name);
  const employeeSales = employeeData.map((employee) => employee.experiance);

  // Chart options
  const chartOptions = {
    labels: employeeNames,
  };

  // Chart series data
  const chartSeries = employeeSales;

  return (
    <>
      <MainCard content={false}>
        <CardContent style={{ height: '470px' }}>
          <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
              <Grid container alignContent="center" justifyContent="space-between">
                <Grid item>
                  <Typography variant="h4" style={{ fontSize: '18px',color:"#5559CE" }}>
                    Employee of the Month
                  </Typography>
                </Grid>
              </Grid>
              <Divider sx={{ my: 1.5 }} />
            </Grid>
            <Grid item xs={12}>
              <ReactApexChart
                type="pie"
                series={chartSeries}
                options={chartOptions}
                height={350}
              />
            </Grid>
          </Grid>
        </CardContent>
      </MainCard>
    </>
  );
};

PopularCard.propTypes = {
  isLoading: PropTypes.bool,
};

export default PopularCard;
