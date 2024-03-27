import PropTypes from 'prop-types';
import { CardContent, Divider, Grid, Typography } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import SkeletonPopularCard from 'ui-component/cards/Skeleton/PopularCard';
import { gridSpacing } from 'store/constant';
const PopularCard = ({ isLoading }) => {
  return (
    <>
      {isLoading ? (
        <SkeletonPopularCard />
      ) : (
        <MainCard content={false}>
          <CardContent style={{ height: '470px' }}>
            <Grid container spacing={gridSpacing}>
              <Grid item xs={12}>
                <Grid container alignContent="center" justifyContent="space-between">
                  <Grid item>
                    <Typography variant="h4" style={{ fontSize: '18px' }}>
                      am of the Month
                    </Typography>
                  </Grid>
                </Grid>
                <Divider sx={{ my: 1.5 }} />
              </Grid>
              <Grid item xs={12}></Grid>
            </Grid>
          </CardContent>

        </MainCard>
      )}
    </>
  );
};
PopularCard.propTypes = {
  isLoading: PropTypes.bool
};
export default PopularCard;
