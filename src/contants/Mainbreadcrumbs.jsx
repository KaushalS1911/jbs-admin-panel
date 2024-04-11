import { Grid, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import Breadcrumbs from '@mui/material/Breadcrumbs'

function Mainbreadcrumbs({ title, subtitle }) {
  return (
    <div>
      <Grid container direction="row" justifyContent="space-between" alignItems="center" sx={{ padding: '14px 10px' }}>
        <Grid>
          <Typography
            color="primary"
            sx={{
              fontSize: '28px',
              color: '#5559ce',
              fontWeight: '600',
            }}
          >
            {title}
          </Typography>
        </Grid>
        <Grid>
          <Breadcrumbs>
            <Link  style={{fontSize: '14px', fontWeight: '500',color: "#5559ce"}} to="/">
              <HomeOutlinedIcon />
            </Link>
            <Link to={`/${title.toLowerCase().replace(" ", "-")}`} style={{fontSize: '14px', fontWeight: '500',color: "#5559ce"}}>{title}</Link>

          </Breadcrumbs>
        </Grid>
      </Grid>
    </div>
  )
}

export default Mainbreadcrumbs
