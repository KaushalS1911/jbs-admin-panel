import React, {useEffect, useState} from 'react';
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import {Grid, MenuItem, Select, TableCell} from "@mui/material";
import {useGetAttendanceLogs} from "../../hooks/useGetAttendanceLogs";
import Box from "@mui/material/Box";
import DatePicker from "react-datepicker";
import moment from "moment";
import Mainbreadcrumbs from "../../contants/Mainbreadcrumbs";

function AttendanceLogs(props) {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedType, setSelectedType] = useState("Present")

    const {data, refetch} = useGetAttendanceLogs(selectedDate, selectedType)

    useEffect(() => {
        refetch()
    },[selectedDate, selectedType])

    return (
        <div>
            <Mainbreadcrumbs title={'Logs'}/>
            <Grid item lg={6} md={6} sm={12} xs={12}>
                <Box
                    className="flatpicker"
                    sx={{
                        outline: "none",
                        marginBottom: "20px",
                        whiteSpace: "nowrap",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}>
                    <Select
                        sx={{width: "300px"}}
                        id="type"
                        name="type"
                        value={selectedType}
                        size='medium'
                        InputLabelProps={{
                            style: { color: "#5559CE" },
                        }}
                        onChange={(e) =>setSelectedType( e.target.value)}
                    >
                        <MenuItem value={"Present"}>Present</MenuItem>
                        <MenuItem value={"Absent"}>Absent</MenuItem>
                        <MenuItem value={"Late"}>Late</MenuItem>
                    </Select>
                    <Box>
                        <label
                            htmlFor="rows-per-page"
                            style={{ minWidth: "fit-content", marginRight: "5px", fontSize: "1rem", fontWeight: 600 }}
                        >
                            Date :
                        </label>
                        <DatePicker
                            selected={selectedDate}
                            onChange={(date) => setSelectedDate(date)}
                        />
                    </Box>
                </Box>
            </Grid>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Sr No</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Contact</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data && data.map((row,index) => (
                            <TableRow
                                key={row._id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell>
                                    {index + 1}
                                </TableCell>
                                <TableCell >{row.firstName} {row.lastName}</TableCell>
                                <TableCell >{row.contact}</TableCell>
                                <TableCell >{moment(row.date).format("DD/MM/YYYY")}</TableCell>
                                <TableCell  style={{fontWeight: 500, color: row.status === "Present" ? "green" : row.status === "Absent" ? "red" : "orange" }}>{row.status}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default AttendanceLogs;
