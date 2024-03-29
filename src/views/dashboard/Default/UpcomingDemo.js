import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {
    Button,
    CardActions,
    Avatar,
    CardContent,
    Divider,
    Grid,
    Table,
    TableBody,
    Typography,
} from "@mui/material";
import MainCard from "ui-component/cards/MainCard";
import SkeletonPopularCard from "ui-component/cards/Skeleton/PopularCard";
import {gridSpacing} from "store/constant";
import {Box} from "@mui/system";
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";
import axios from "axios";
import {useGetUpcomingDemo} from "../../../hooks/useGetUpcomingDemo";

const UpcomingDemo = ({isLoading}) => {
    const {data, refetch} = useGetUpcomingDemo()

    useEffect(() => {
        refetch()
    }, []);

    return (
        <>
            {isLoading ? (
                <SkeletonPopularCard/>
            ) : (
                <MainCard content={false}>
                    <CardContent style={{height: "445px"}}>
                        <Grid container spacing={gridSpacing}>
                            <Grid item xs={12}>
                                <Grid
                                    container
                                    alignContent="center"
                                    justifyContent="space-between"
                                >
                                    <Grid item>
                                        <Typography variant="h4" style={{fontSize: "18px"}}>
                                            Upcoming Demo
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Divider sx={{my: 1.5}}/>
                            </Grid>
                            <Grid
                                item
                                xs={12}
                                sx={{
                                    overflow: "hidden",
                                    overflowY: "scroll",
                                    maxHeight: "380px",
                                }}
                            >
                                <Table aria-label="table with ellipsis texts" noWrap>
                                    <TableBody style={{cursor: "pointer"}}>
                                        {data && data.length !== 0 && data.map((entry, index) => {
                                            const faculty_name = entry.faculty_name.split(" ")[0];
                                            const avatarPhotoUrl = `https://api.adorable.io/avatars/100/${faculty_name}.png`;
                                            return (
                                                <tr
                                                    key={index}
                                                    style={{
                                                        display: "flex",
                                                        justifyContent: "space-between",
                                                        alignItems: "center",
                                                        padding: "10px 0",
                                                        borderBottom: "1px solid #E5EBF0",
                                                    }}
                                                >
                                                    <td>
                                                        <Box
                                                            sx={{
                                                                display: "flex",
                                                                alignItems: "center",
                                                                gap: 1.5,
                                                            }}
                                                        >
                                                            <Box sx={{minWidth: 0}}>
                                                                <Typography
                                                                    noWrap
                                                                    fontWeight="lg"
                                                                    sx={{
                                                                        fontSize: "14px",
                                                                        color: "#1B1D28",
                                                                        fontWeight: "500",
                                                                    }}
                                                                >
                                                                    <Avatar
                                                                        alt={entry.faculty_name}
                                                                        src={avatarPhotoUrl}
                                                                    />

                                                                </Typography>
                                                            </Box>
                                                        </Box>
                                                    </td>
                                                    <td>
                                                        <Box
                                                            sx={{
                                                                display: "flex",
                                                                alignItems: "center",
                                                                gap: 1.5,
                                                            }}
                                                        >
                                                            <Box sx={{minWidth: 0}}>
                                                                <Typography
                                                                    noWrap
                                                                    fontWeight="lg"
                                                                    sx={{
                                                                        textAlign: "end",
                                                                        fontSize: "14px",
                                                                        color: "#5559CE",
                                                                        fontWeight: "600",
                                                                    }}
                                                                >
                                                                    {entry.faculty_name}
                                                                </Typography>

                                                                <Typography
                                                                    noWrap
                                                                    level="body-sm"
                                                                    sx={{
                                                                        fontSize: "10px",
                                                                        color: "#96A0B5",
                                                                        fontWeight: "400",
                                                                    }}
                                                                >
                                                                    {new Date(entry.date).toLocaleDateString()} - {entry.time}
                                                                </Typography>
                                                                <Typography
                                                                    noWrap
                                                                    fontWeight="lg"
                                                                    sx={{
                                                                        textAlign: "end",
                                                                        fontSize: "12px",
                                                                        color: "#1B1D28",
                                                                        fontWeight: "400",
                                                                        lineHeight: '10px 0'
                                                                    }}
                                                                >
                                                                    Note: {entry.note}
                                                                </Typography>
                                                            </Box>
                                                        </Box>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </TableBody>
                                </Table>
                            </Grid>
                        </Grid>
                    </CardContent>
                    <CardActions sx={{padding: "20px 0", justifyContent: "center"}}>
                        <Button
                            size="small"
                            disableElevation
                            sx={{fontSize: "14px", color: "#5559CE", fontWeight: "500"}}
                        >
                            View All
                            <ChevronRightOutlinedIcon/>
                        </Button>
                    </CardActions>
                </MainCard>
            )}
        </>
    );
};

UpcomingDemo.propTypes = {
    isLoading: PropTypes.bool,
};

export default UpcomingDemo;
