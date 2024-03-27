import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

function Loading() {
  return (
    <Box style={{width:"100vw", height: "100vh", overflow: "hidden", display: "flex", justifyContent: "center", alignItems: "center"}}>
        <div style={{display: "flex", flexDirection: "column", justifyContent:"center", alignItems: "center", gap: "6px"}}>
          <CircularProgress color="inherit" />
          <Typography>Loading...</Typography>
        </div>
    </Box>
  );
}

export default Loading;
