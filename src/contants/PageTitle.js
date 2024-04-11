import React from 'react';
import {Toolbar, Typography} from "@mui/material";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import {Link} from "react-router-dom";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import {Box} from "@mui/system";

function PageTitle({title, subtitle}) {
    return (
        <div>
            <Box sx={{flexGrow: 1, marginBottom: "20px"}}>
                <Toolbar>
                    <Typography variant="h2" component="div"
                                sx={{flexGrow: 1, color: "#5559CE"}}>
                        {subtitle}
                    </Typography>
                    <Breadcrumbs>
                        <Link style={{color: "#5559ce"}} to="/">
                            <HomeOutlinedIcon />
                        </Link>
                        <Link to={`/${title.toLowerCase()}`} style={{fontSize: '14px', fontWeight: '500',color: "#5559ce"}}>{title}</Link>
                    </Breadcrumbs>
                </Toolbar>
            </Box>
        </div>
    );
}

export default PageTitle;