import PropTypes from 'prop-types';
import { useState } from 'react';
import { Divider, Grid, MenuItem, TextField, Typography } from '@mui/material';
import SkeletonTotalGrowthBarChart from 'ui-component/cards/Skeleton/TotalGrowthBarChart';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import ReactApexChart from 'react-apexcharts';

const status = [{ value: 'today', label: 'Today' }, { value: 'month', label: ' Month' }, { value: 'year', label: 'Year' }];

const Totalrevenue = ({ isLoading }) => {
  const [value, setValue] = useState('today');
  const todayOptions = {
    chart: {
      type: 'bar'
    },
    series: [
      {
        name: 'Revenue',
        data: [1000, 5000, 2000, 3000, 1000, 3000, 200, 100, 300, 200, 1000, 300, 200, 100, 900]
      }
    ],
    xaxis: {
      categories: ['2024-01-01', '2024-01-02', '2024-01-03', '2024-01-04', '2024-01-05', '2024-01-06', '2024-01-07', '2024-01-08', '2024-01-09', '2024-01-10', '2024-01-11', '2024-01-12', '2024-01-13', '2024-01-14', '2024-01-15']
    },
    plotOptions: {
      bar: {
        columnWidth: '24%',
        borderRadius: 7,
        colors: {
          ranges: [
            {
              from: 0,
              to: 100,
              color: '#5E35B1'
            }
          ]
        }
      }
    },
    fill: {
      colors: ['#5E35B1']
    },
    dataLabels: {
      enabled: false
    }
  };

  const monthlyOptions = {
    chart: {
      type: 'bar'
    },
    series: [
      {
        name: 'Revenue',
        data: [10000, 20000, 30000, 40000, 50000, 6000, 7000, 8000, 50000, 70000, 50000, 60000]
      }
    ],
    xaxis: {
      categories: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    },
    plotOptions: {
      bar: {
        columnWidth: '22%',
        borderRadius: 7,
        colors: {
          ranges: [
            {
              from: 0,
              to: 100,
              color: '#5E35B1'
            }
          ]
        }
      }
    },
    fill: {
      colors: ['#5E35B1']
    },
    dataLabels: {
      enabled: false
    }
  };

  const yearlyOptions = {
    chart: {
      type: 'bar'
    },
    series: [
      {
        name: 'Revenue',
        data: [100000, 200000, 350000, 700000]
      }
    ],
    xaxis: {
      categories: [2020, 2021, 2022, 2023, 2024]
    },
    plotOptions: {
      bar: {
        columnWidth: '8%',
        borderRadius: 7,
        colors: {
          ranges: [
            {
              from: 0,
              to: 100,
              color: '#5E35B1'
            }
          ]
        }
      }
    },
    fill: {
      colors: ['#5E35B1']
    },
    dataLabels: {
      enabled: false
    }
  };
  const selectedOptions =
    value === 'today' ? todayOptions :
      value === 'month' ? monthlyOptions :
        value === 'year' ? yearlyOptions :
          null;


  return (
    <>
      {isLoading ? (
        <SkeletonTotalGrowthBarChart />
      ) : (
        <MainCard>
          <Grid container spacing={gridSpacing}>
            <Grid item xs={12} sx={{ p: 0 }}>
              <Grid container alignItems="center" justifyContent="space-between">
                <Grid item>
                  <Grid container direction="column" spacing={1}>
                    <Grid item>
                      <Typography variant="h3" style={{ fontSize: '18px' }}>
                        Total Revenue
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="h3" style={{ color: '#5559CE', fontSize: '18px' }}>
                        $2,324.00
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <TextField
                    id="standard-select-currency"
                    select
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    sx={{
                      width: '120px',
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: 'transparent'
                        },
                        '&:hover fieldset': {
                          borderColor: 'transparent'
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: 'transparent',
                          borderWidth: '2px'
                        }
                      }
                    }}
                  >
                    {status.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
              </Grid>
              <Divider sx={{ my: 1.5 }} />
            </Grid>
            <Grid item xs={12}>
              <div style={{ height: '350px', overflowX: 'auto', overflowY: 'hidden' }}>
                <ReactApexChart options={selectedOptions} series={selectedOptions.series} type="bar" height={350} />
              </div>
            </Grid>
          </Grid>
        </MainCard>
      )}
    </>
  );
};
Totalrevenue.propTypes = {
  isLoading: PropTypes.bool
};
export default Totalrevenue;
