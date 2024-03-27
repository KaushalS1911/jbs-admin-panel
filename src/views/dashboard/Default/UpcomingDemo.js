import React from 'react';
import PropTypes from 'prop-types';
import { Button, CardActions, Avatar, CardContent, Divider, Grid, Table, TableBody, Typography } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import SkeletonPopularCard from 'ui-component/cards/Skeleton/PopularCard';
import { gridSpacing } from 'store/constant';
import { Box } from '@mui/system';
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';

const UpcomingDemo = ({ isLoading }) => {
  const demoData = [
    {
      id: 'UpcomingDemo',
      AvatarImg: '/static/images/avatar/1.jpg ',
      name: 'John Smith',
      uid: '#54263',
      facName: 'Dr. Julia Hussa',
      date: '16 Sep 2022 | 9 AM - 10 AM'
    },
    {
      id: 'UpcomingDemo',
      AvatarImg: '/static/images/avatar/1.jpg ',
      name: 'Emily Johnson',
      uid: '#54264',
      facName: 'Dr. Julia Hussa',
      date: '16 Sep 2022 | 9 AM - 10 AM'
    },
    {
      id: 'UpcomingDemo',
      AvatarImg: '/static/images/avatar/1.jpg ',
      name: 'Michael Brown',
      uid: '#54265',
      facName: 'Dr. Julia Hussa',
      date: '16 Sep 2022 | 9 AM - 10 AM'
    },
    {
      id: 'UpcomingDemo',
      AvatarImg: '/static/images/avatar/1.jpg ',
      name: 'Jessica Wilson',
      uid: '#54266',
      facName: 'Dr. Julia Hussa',
      date: '16 Sep 2022 | 9 AM - 10 AM'
    },
    {
      id: 'UpcomingDemo',
      AvatarImg: '/static/images/avatar/1.jpg ',
      name: 'Daniel Martinez',
      uid: '#54267',
      facName: 'Dr. Julia Hussa',
      date: '16 Sep 2022 | 9 AM - 10 AM'
    },
    {
      id: 'UpcomingDemo',
      AvatarImg: '/static/images/avatar/1.jpg ',
      name: 'Sophia Davis',
      uid: '#54268',
      facName: 'Dr. Julia Hussa',
      date: '16 Sep 2022 | 9 AM - 10 AM'
    },
    {
      id: 'UpcomingDemo',
      AvatarImg: '/static/images/avatar/1.jpg ',
      name: 'Matthew Taylor',
      uid: '#54269',
      facName: 'Dr. Julia Hussa',
      date: '16 Sep 2022 | 9 AM - 10 AM'
    },
    {
      id: 'UpcomingDemo',
      AvatarImg: '/static/images/avatar/1.jpg ',
      name: 'Olivia Rodriguez',
      uid: '#54270',
      facName: 'Dr. Julia Hussa',
      date: '16 Sep 2022 | 9 AM - 10 AM'
    },
    {
      id: 'UpcomingDemo',
      AvatarImg: '/static/images/avatar/1.jpg ',
      name: 'William Lopez',
      uid: '#54271',
      facName: 'Dr. Julia Hussa',
      date: '16 Sep 2022 | 9 AM - 10 AM'
    },
    {
      id: 'UpcomingDemo',
      AvatarImg: '/static/images/avatar/1.jpg ',
      name: 'Ava Martinez',
      uid: '#54272',
      facName: 'Dr. Julia Hussa',
      date: '16 Sep 2022 | 9 AM - 10 AM'
    },
    {
      id: 'UpcomingDemo',
      AvatarImg: '/static/images/avatar/1.jpg ',
      name: 'Ethan Thompson',
      uid: '#54273',
      facName: 'Dr. Julia Hussa',
      date: '16 Sep 2022 | 9 AM - 10 AM'
    },
    {
      id: 'UpcomingDemo',
      AvatarImg: '/static/images/avatar/1.jpg ',
      name: 'Isabella Harris',
      uid: '#54274',
      facName: 'Dr. Julia Hussa',
      date: '16 Sep 2022 | 9 AM - 10 AM'
    }
  ];
  

  return (
    <>
      {isLoading ? (
        <SkeletonPopularCard />
      ) : (
        <MainCard content={false}>
          <CardContent style={{ height: '445px' }}>
            <Grid container spacing={gridSpacing}>
              <Grid item xs={12}>
                <Grid container alignContent="center" justifyContent="space-between">
                  <Grid item>
                    <Typography variant="h4" style={{ fontSize: '18px' }}>
                      Upcoming Demo
                    </Typography>
                  </Grid>
                </Grid>
                <Divider sx={{ my: 1.5 }} />
              </Grid>
              <Grid
                item
                xs={12}
                sx={{
                  overflow: 'hidden',
                  overflowY: 'scroll',
                  maxHeight: '380px'
                }}
              >
                <Table aria-label="table with ellipsis texts" noWrap>
                  <TableBody style={{ cursor: 'pointer' }}>
                    {demoData.map((item) => (
                      <tr
                        key={item.id}
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          padding: '10px 0',
                          borderBottom: '1px solid #E5EBF0'
                        }}
                      >
                        <td>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                            <Avatar alt="Remy Sharp" src={item.AvatarImg} />
                            <Box sx={{ minWidth: 0 }}>
                              <Typography noWrap fontWeight="lg" sx={{ fontSize: '14px', color: '#1B1D28', fontWeight: '500' }}>
                                {item.name}
                              </Typography>
                              <Typography noWrap level="body-sm" sx={{ fontSize: '10px', color: '#1B1D28', fontWeight: '400' }}>
                                {item.uid}
                              </Typography>
                            </Box>
                          </Box>
                        </td>
                        <td>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                            <Box sx={{ minWidth: 0 }}>
                              <Typography
                                noWrap
                                fontWeight="lg"
                                sx={{ textAlign: 'end', fontSize: '12px', color: '#1B1D28', fontWeight: '400' }}
                              >
                                {item.facName}
                              </Typography>
                              <Typography noWrap level="body-sm" sx={{ fontSize: '10px', color: '#96A0B5', fontWeight: '400' }}>
                                {item.date}
                              </Typography>
                            </Box>
                          </Box>
                        </td>
                      </tr>
                    ))}
                  </TableBody>
                </Table>
              </Grid>
            </Grid>
          </CardContent>
          <CardActions sx={{ padding: '20px 0', justifyContent: 'center' }}>
            <Button size="small" disableElevation sx={{ fontSize: '14px', color: '#5559CE', fontWeight: '500' }}>
              View All
              <ChevronRightOutlinedIcon />
            </Button>
          </CardActions>
        </MainCard>
      )}
    </>
  );
};

UpcomingDemo.propTypes = {
  isLoading: PropTypes.bool
};

export default UpcomingDemo;
