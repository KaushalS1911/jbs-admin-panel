import { useState } from 'react';
import MainCard from 'ui-component/cards/MainCard';
import { FormControl, Grid, TextField } from '@mui/material';

import 'flatpickr/dist/themes/material_green.css'
import { gridSpacing } from 'store/constant'
import { useRecoilState } from 'recoil'
import { profile } from '../../atoms/authAtoms'
import StudentList from '../Student/utils/StudentList'

function Index() {
  // eslint-disable-next-line
  const [profileData, setProfileData] = useRecoilState(profile)
  const [searchText, setSearchText] = useState('')

  return (
    <>
      
        <FormControl
          sx={{
            m: 1,
            p: 0,
            minWidth: 120,
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

            size: "small",
          }}
        >
          <Grid
            container
            spacing={gridSpacing}
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid item lg={4} md={4} xs={12} sm={12}>
              <Grid item>
                <TextField
                  item
                  label="Search"
                  fullWidth
                  size="small"
                  style={{ width: "100%", minWidth: "220px", margin: "auto" }}
                  variant="outlined"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  InputLabelProps={{
                    style: { color: "#5559CE", marginBottom: "0" },
                  }}
                />
              </Grid>
            </Grid>

            <Grid
              item
              display={{ xs: "flex", sm: "flex", md: "flex", lg: "flex" }}
              justifyContent={{
                xs: "normal",
                sm: "space-between",
                md: "space-between",
                lg: "flex-end",
              }}
              flexDirection={{ xs: "column", sm: "row", md: "row", lg: "row" }}
              alignItems={"center"}
              lg={8}
              md={12}
              xs={12}
              sm={12}
            ></Grid>
          </Grid>
        </FormControl>
      <MainCard sx={{ margin: "10px 0" }}>
        <StudentList searchText={searchText} />
      </MainCard>
    </>
  );
}

export default Index
