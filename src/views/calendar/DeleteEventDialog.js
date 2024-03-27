import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { Box, FormControl, Grid, IconButton, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import axios from 'axios';
import CloseIcon from '@mui/icons-material/Close';
import { useRecoilValue } from 'recoil';
import { profile } from '../../atoms/authAtoms';
import { useState } from 'react';
import { useEffect } from 'react';
import EventNoteIcon from '@mui/icons-material/EventNote';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import MessageIcon from '@mui/icons-material/Message';
import BeenhereIcon from '@mui/icons-material/Beenhere';
import Flatpickr from 'react-flatpickr'

const adminMenuItems = [
    <MenuItem key="holiday" value="festival holiday">festival holiday</MenuItem>,
    <MenuItem key="other" value="other">other</MenuItem>,
];

const regularUserMenuItems = [
    <MenuItem key="sick" value="sick leave">Sick Leave</MenuItem>,
    <MenuItem key="personal" value="personal leave">Personal Leave</MenuItem>,
    <MenuItem key="emergency" value="emergency leave">Emergency Leave</MenuItem>,
    <MenuItem key="unpaid" value="unpaid leave">Unpaid Leave</MenuItem>,
];

function DeleteEventDialog({ open, handleClose, handleDelete, selectedEvent, events, refetch, setEdit, edit, setAction, action }) {
    const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
    const [showCancelBtn, setShowCancelBtn] = useState(false)
    const [deniedReason, setDeniedReason] = useState('');
    const [updatedData, setUpdatedData] = useState({
        event: '',
        startDate: '',
        endDate: '',
        leave_type: '',
        leave_description: '',
        event_user_id: '',
        leave_status: ''
    });

    const [readData, setReadData] = useState({
        leave_endTime: '',
        leave_startTime: '',
        leave_status: ''
    });


    const handleApproveConfirmation = async () => {
        try {
            const updatedLeaveStatus = action === "Approve" ? "Approved" : "Denied";

            const requestData = action === "Approve"
                ? { ...updatedData, leave_status: updatedLeaveStatus }
                : { ...updatedData, leave_status: updatedLeaveStatus, denied_reason: deniedReason };

            await axios.patch(
                `${process.env.REACT_APP_API_URL}${user.company_id}/${selectedEvent}/updateEvent`,
                requestData
            );

            setConfirmationDialogOpen(false);
            refetch();
            handleClose();
            setEdit(false);
        } catch (error) {
            console.error('Error approving leave:', error);
        }
    };

    useEffect(() => {
        const myData = events && Array.isArray(events) ? events.find(item => item?.id === selectedEvent) : null;
        if (myData) {
            setUpdatedData({
                event: myData.title || '',
                startDate: myData.start || '',
                endDate: myData.end || '',
                leave_type: myData.leave_type || '',
                leave_description: myData.leave_description || '',
                event_user_id: myData.event_user_id || '',
            });
            setReadData({
                leave_startTime: myData.leave_startTime || '',
                leave_endTime: myData.leave_endTime || '',
                leave_status: myData.leave_status || '',
                denied_reason: myData.denied_reason || ''
            });
        }
    }, [selectedEvent, events]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleDateChange = (selectedDates) => {
        const [start, end] = selectedDates;
        setUpdatedData((prevData) => ({
            ...prevData,
            startDate: start,
            endDate: end,
        }));
    };

    const user = useRecoilValue(profile)

    const handleUpdate = async () => {
        try {
            await axios.patch(`${process.env.REACT_APP_API_URL}${user.company_id}/${selectedEvent}/updateEvent`, updatedData);
            refetch();
            handleClose();
            setEdit(false)
        } catch (error) {
            console.error('Error updating event:', error);
        }
    };

    const handleManage = () => {
        if (updatedData.event_user_id === user._id) {
            setEdit(!edit);
        }
    };

    const handleApprove = () => {
        setAction('Approve');
        setConfirmationDialogOpen(true);
    };

    const handleDeny = () => {
        setAction('Denied');
        setConfirmationDialogOpen(true);
    };

    useEffect(() => {
        if (updatedData.event_user_id === user._id && (readData.leave_status === 'Pending' || readData.leave_status === 'office')) {
            setShowCancelBtn(false)
        } else {
            if (readData.leave_status === 'Pending' && updatedData.event_user_id !== user._id) {

                setShowCancelBtn(false)
            } else {
                setShowCancelBtn(true)

            }
        }
    }, [user, readData])

    return (
        <Dialog
            fullWidth
            maxWidth={'xs'}
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={open}
        >
            <DialogTitle variant="h3" sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                {updatedData.event || "Update Event"}
            </DialogTitle>
            <IconButton
                aria-label="close"
                onClick={handleClose}
                sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: (theme) => theme.palette.grey[500],
                }}
            >
                <CloseIcon />
            </IconButton>
            <DialogContent dividers>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: "end", marginBottom: edit ? '15px' : '5px' }}>
                    {updatedData.event_user_id === user._id && (readData.leave_status === 'Pending' || readData.leave_status === 'office') && (
                        <Button onClick={handleManage} style={{ color: '#5559CE' }}>
                            {edit ? "Cancel" : "Update"}
                        </Button>
                    )}
                </div>
                {
                    edit ? (
                        <>
                            <FormControl defaultValue="" required
                                sx={{
                                    width: '100%',
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            borderColor: '#5559CE',
                                        },
                                        '&:hover fieldset': {
                                            borderColor: '#5559CE',
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#5559CE',
                                            borderWidth: '2px',
                                        },
                                    },
                                }}
                                size="small"
                            >
                                <Grid container >
                                    <Grid item xs={12} style={{ marginBottom: "10px" }}>
                                        <FormControl fullWidth variant="outlined">
                                            <InputLabel id="gender-label" style={{ color: '#5559ce' }}>
                                                Type
                                            </InputLabel>
                                            <Select
                                                labelId="gender-label"
                                                id="type"
                                                name="leave_type"
                                                size="small"
                                                value={updatedData.leave_type}
                                                label="Type"
                                                InputLabelProps={{
                                                    style: { color: '#5559CE' },
                                                }}
                                                onChange={(e) => handleInputChange(e)}
                                            >
                                                {user.role === 'Admin' ? adminMenuItems : regularUserMenuItems}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            id="outlined-basic"
                                            label={user.role === 'Admin' ? 'Event' : 'Leave Type'}
                                            size="small"
                                            value={updatedData.event}
                                            name='event'
                                            variant="outlined"
                                            InputLabelProps={{
                                                style: { color: '#5559CE' },
                                            }}
                                            onChange={handleInputChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Box className="flatpicker" style={{ outline: 'none', margin: '10px 0', whiteSpace: 'nowrap' }}>
                                            <Flatpickr
                                                placeholder="Select Date and Time"
                                                style={{ minWidth: '100%' }}
                                                value={[updatedData.startDate, updatedData.endDate]}
                                                className="form-control"
                                                onChange={handleDateChange}
                                                name="date"
                                                options={{
                                                    dateFormat: 'Y-m-d H:i',
                                                    enableTime: true,
                                                    mode: 'range'
                                                }}
                                            />
                                        </Box>
                                    </Grid>
                                    <Grid item fullWidth xs={12}>
                                        <textarea
                                            className='text-Note'
                                            name="leave_description"
                                            placeholder='Description'
                                            onChange={handleInputChange}
                                            value={updatedData.leave_description}
                                            rows="5"
                                            cols="100"
                                            style={{ width: "100%", resize: "vertical" }}
                                        />
                                    </Grid>
                                </Grid>
                            </FormControl>
                        </>
                    ) : (
                        <>
                            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                                <EventNoteIcon />
                                <span style={{ marginLeft: '10px' }}>{`${updatedData.startDate || "-"} to ${updatedData.endDate || "-"}`}</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                                <AccessTimeIcon />
                                <span style={{ marginLeft: '10px' }}>{`${readData.leave_startTime || "-"} to ${readData.leave_endTime || "-"}`}</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                                <MessageIcon />
                                <span style={{ marginLeft: '10px' }}>{`${updatedData.leave_description || "description is not available"}`}</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <BeenhereIcon />
                                {
                                    readData.denied_reason ?
                                        <div style={{ marginLeft: '10px' }}>
                                            <span style={{ color: '#f44336' }}>Denied reason :</span><br />
                                            {readData.denied_reason ? readData.denied_reason : "Denied reason is not available"}
                                        </div>
                                        :
                                        <span style={{
                                            marginLeft: '10px', color:
                                                readData.leave_status === 'Pending' ? '#5559CE' :
                                                    readData.leave_status === 'Approved' ? '#228b22' :
                                                        readData.leave_status === 'Denied' ? '#f44336' : 'inherit'
                                        }}>
                                            {`${readData.leave_status ? readData.leave_status + "..." : '' || "leave status is not available"}`}
                                        </span>
                                }
                            </div>
                        </>
                    )
                }
            </DialogContent>
            <DialogActions>
                <div style={{ display: "flex", justifyContent: "space-between", width: "100%", alignItems: 'center' }}>
                    <div>
                        {user.role === 'Admin' && updatedData.event_user_id !== user._id && readData.leave_status === 'Pending' && (
                            <>
                                <Button className='Approve_btn' color="success" onClick={handleApprove}>
                                    Approve
                                </Button>
                                <Button className='Denied_btn' color="error" onClick={handleDeny}>
                                    Denied
                                </Button>
                            </>
                        )}
                    </div>
                    <div>
                        {
                            updatedData.event_user_id === user._id && (readData.leave_status === 'Pending' || readData.leave_status === 'office') && (
                                <>
                                    <Button onClick={handleDelete} color="error">
                                        Delete
                                    </Button>
                                    {edit && <Button
                                        disabled={!updatedData.event || !updatedData.startDate || !updatedData.endDate}
                                        onClick={handleUpdate} style={{ color: '#5559CE' }}
                                    >
                                        Update Event
                                    </Button>}
                                </>
                            )
                        }
                    </div>
                    {showCancelBtn &&
                        <Button className='cn_btn' color="success" onClick={handleClose}>
                            Cancel
                        </Button>}
                </div>
            </DialogActions>
            <Dialog
                open={confirmationDialogOpen}
                onClose={() => setConfirmationDialogOpen(false)}
            >
                <DialogTitle variant="h3" sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    {action === 'Approve' ? 'Confirmation' : 'Denied Reason'}
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={() => setConfirmationDialogOpen(false) }
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
                {
                    action === 'Approve' ? (
                        <>
                            <DialogContent style={{ fontSize: "16px" }}>
                                Are you sure you want to approve this leave?
                            </DialogContent>
                        </>
                    ) : (
                        <>
                            <textarea
                                className='text-Note'
                                placeholder='Denied Reason'
                                minLength='10'
                                rows="5"
                                cols="100"
                                style={{ width: "370px", resize: "vertical", margin: "0px 15px 0px 15px" }}
                                value={deniedReason}
                                onChange={(e) => setDeniedReason(e.target.value)}
                            />
                        </>
                    )
                }
                <DialogActions>
                    <Button onClick={() => setConfirmationDialogOpen(false)} style={{ color: action === 'Approve' ? '#f44336' : 'rgba(0, 128, 0, 0.959)' }}>
                        Cancel
                    </Button>
                    <Button style={{ color: action === 'Approve' ? 'rgba(0, 128, 0, 0.959)' : '#f44336' }} disabled={action === 'Approve' ? false : deniedReason.length < 10} onClick={handleApproveConfirmation}>
                        {action}
                    </Button>

                </DialogActions>
            </Dialog>
        </Dialog>
    );
}

export default DeleteEventDialog;