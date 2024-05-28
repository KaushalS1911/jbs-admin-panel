import React, {useEffect} from "react";
import {
    Grid,
    Typography,
} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {getConfigs} from "./SettingSlice";
import {useRecoilValue} from "recoil";
import {profile} from "../../atoms/authAtoms";

function Setting() {
    const user = useRecoilValue(profile)
    const dispatch = useDispatch()

    const backgroundImageUrl ="https://i.postimg.cc/DZR5bVtY/back-school-pattern-background-set-different-drawings-related-school-blue-color-153454-35.avif";
    
    const gridItemStyle = {
        backgroundImage: `url(${backgroundImageUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
    };


    const navigate = useNavigate();
    const showExpenses = () => {
        navigate("/settings/expenses-config");
    };
    const showCompanyProfile = () => {
        navigate("/settings/company-profile-config");
    };
    const showRoles = () => {
        navigate("/settings/role-config");
    };
    const showCourses = () => {
        navigate("/settings/course-config");
    };
    const showClassrooms = () => {
        navigate("/settings/classroom-config");
    };
    const showEmployeeRoles = () => {
        navigate("/settings/emp-roles-config");
    };
    const showDeveloperOptions = () => {
        navigate("/settings/developer-options-config");
    };

    const ShowDeveloperLogs =()=>{
        navigate("/settings-Admin-lock")
    }
    const ShowBannercode=()=>{
        navigate("/settings-banner-lock")
    }


    // const ShowDeveloperLogs =()=>{
    //     navigate("/settings-Admin-lock")
    // }
    useEffect(() => {
        dispatch(getConfigs(user.company_id))
    }, []);


    return (
        <div>

            <Grid container spacing={2}>

                {/* Expenses */}
                <Grid item xs={12} sm={6} md={6} lg={4} onClick={showExpenses}
                      sx={{cursor: 'pointer'}}>
                    <Grid
                        style={gridItemStyle}
                        boxShadow={1}
                        sx={{
                            padding: "20px",
                            backgroundColor: "#fff",
                            borderRadius: "10px",
                            aspectRatio: '0.9/0.3'
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: "25px",
                                fontWeight: "500",
                                color: "#b8bbff",
                                marginBottom: "16px",
                            }}
                        >
                            Expenses
                        </Typography>
                    </Grid>
                </Grid>

                {/* Profile */}
                <Grid item xs={12} sm={6} md={6} lg={4}
                      onClick={showCompanyProfile} sx={{cursor: 'pointer'}}>
                    <Grid
                        style={gridItemStyle}
                        boxShadow={1}
                        sx={{
                            padding: "20px",
                            backgroundColor: "#fff",
                            borderRadius: "10px",
                            aspectRatio: '0.9/0.3'
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: "25px",
                                fontWeight: "500",
                                color: "#ffb67f",
                                marginBottom: "16px",
                            }}
                        >
                            Company Profile
                        </Typography>
                    </Grid>
                </Grid>

                <Grid item xs={12} sm={6} md={6} lg={4}
                      onClick={showRoles} sx={{cursor: 'pointer'}}>
                    <Grid
                        style={gridItemStyle}
                        boxShadow={1}
                        sx={{
                            padding: "20px",
                            backgroundColor: "#fff",
                            borderRadius: "10px",
                            aspectRatio: '0.9/0.3'
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: "25px",
                                fontWeight: "500",
                                color: "#fc8ff7",
                                marginBottom: "16px",
                            }}
                        >
                            User Roles
                        </Typography>
                    </Grid>
                </Grid>

                <Grid item xs={12} sm={6} md={6} lg={4}
                      onClick={showCourses} sx={{cursor: 'pointer'}}>
                    <Grid
                        style={gridItemStyle}
                        boxShadow={1}
                        sx={{
                            padding: "20px",
                            backgroundColor: "#fff",
                            borderRadius: "10px",
                            aspectRatio: '0.9/0.3'
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: "25px",
                                fontWeight: "500",
                                color: "#92f3f6",
                                marginBottom: "16px",
                            }}
                        >
                            Courses
                        </Typography>
                    </Grid>
                </Grid>

                <Grid item xs={12} sm={6} md={6} lg={4}
                      onClick={showClassrooms} sx={{cursor: 'pointer'}}>
                    <Grid
                        style={gridItemStyle}
                        boxShadow={1}
                        sx={{
                            padding: "20px",
                            backgroundColor: "#fff",
                            borderRadius: "10px",
                            aspectRatio: '0.9/0.3'
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: "25px",
                                fontWeight: "500",
                                color: "#f69592",
                                marginBottom: "16px",
                            }}
                        >
                            Labs / Classrooms
                        </Typography>
                    </Grid>
                </Grid>

                <Grid item xs={12} sm={6} md={6} lg={4}
                      onClick={showEmployeeRoles} sx={{cursor: 'pointer'}}>
                    <Grid
                        style={gridItemStyle}
                        boxShadow={1}
                        sx={{
                            padding: "20px",
                            backgroundColor: "#fff",
                            borderRadius: "10px",
                            aspectRatio: '0.9/0.3'
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: "25px",
                                fontWeight: "500",
                                color: "#7bff6e",
                                marginBottom: "16px",
                            }}
                        >
                            Employee Roles
                        </Typography>
                    </Grid>
                </Grid>

                <Grid item xs={12} sm={6} md={6} lg={4}
                      onClick={showDeveloperOptions} sx={{cursor: 'pointer'}}>
                    <Grid
                        style={gridItemStyle}
                        boxShadow={1}
                        sx={{
                            padding: "20px",
                            backgroundColor: "#fff",
                            borderRadius: "10px",
                            aspectRatio: '0.9/0.3'
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: "25px",
                                fontWeight: "500",
                                color: "#ffea4c",
                                marginBottom: "16px",
                            }}
                        >
                            Developer options
                        </Typography>
                    </Grid>
                </Grid>

                <Grid item xs={12} sm={6} md={6} lg={4}
                      onClick={ShowDeveloperLogs} sx={{cursor: 'pointer'}}>
                    <Grid
                        style={gridItemStyle}
                        boxShadow={1}
                        sx={{
                            padding: "20px",
                            backgroundColor: "#fff",
                            borderRadius: "10px",
                            aspectRatio: '0.9/0.3'
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: "25px",
                                fontWeight: "500",
                                color: "#ffea4c",
                                marginBottom: "16px",
                            }}
                        >
                            Admin Logs
                        </Typography>
                    </Grid>
                </Grid>

                <Grid item xs={12} sm={6} md={6} lg={4}
                      onClick={ShowBannercode} sx={{cursor: 'pointer'}}>
                    <Grid
                        style={gridItemStyle}
                        boxShadow={1}
                        sx={{
                            padding: "20px",
                            backgroundColor: "#fff",
                            borderRadius: "10px",
                            aspectRatio: '0.9/0.3'
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: "25px",
                                fontWeight: "500",
                                color: "#d8460c",
                                marginBottom: "16px",
                            }}
                        >
                           App Banner
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>


        </div>
    );
}

export default Setting;
