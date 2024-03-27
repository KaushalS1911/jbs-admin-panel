import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Grid,
    IconButton,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    TextField,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useRecoilValue } from 'recoil';
import { profile } from '../../atoms/authAtoms';
import instance from 'helpers/axios';
import Flatpickr from 'react-flatpickr'
import 'flatpickr/dist/themes/material_green.css'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const validationSchema = Yup.object({
    role: Yup.string().required('Role is required'),
    user: Yup.string().required('User is required'),
    title: Yup.string().required('Task title is required'),
    startDate: Yup.date().required('Start date is required'),
    endDate: Yup.date().required('End date is required'),
    priority: Yup.string().required('Priority is required'),
});


const AddTask = ({ openAddTaskDialog, setOpenAddTaskDialog,refetch }) => {
    const user = useRecoilValue(profile)

    const handleClose = () => {
        setOpenAddTaskDialog(false);
    };

    const handleRoleChange = (event) => {
        instance.get(`${process.env.REACT_APP_LOGIN_URL}users/company/${user.company_id}/role/${event.target.value}`)
            .then(response => {
                formik.setFieldValue('user', '');
                formik.setFieldTouched('user', false);
                formik.setFieldError('user', '');
                formik.setFieldValue('role', event.target.value);
                formik.setFieldValue('options', response.data.data);
            })
            .catch(error => {
                console.error(error);
            });
    };

    const handleUserChange = (event) => {
        const selectedUser = formik.values.options.find((user) => user._id === event.target.value);
        formik.setFieldValue('user', event.target.value);
        formik.setFieldValue('fullName', `${selectedUser.firstName} ${selectedUser.lastName}`);
    };

    const formik = useFormik({
        initialValues: {
            role: '',
            fullName:'',
            user: '',
            title: '',
            startDate: null,
            endDate: null,
            priority: '',
        },
        validationSchema,
        onSubmit: async (values) => {
            const payload = {
                role: values.role,
                assign_id: values.user,
                task_title: values.title,
                create_date: values.startDate.toISOString(),
                due_date: values.endDate.toISOString(),
                status: 'pending',
                priority: values.priority,
                fullName:values.fullName
            };
            try {
                await axios.post(`${process.env.REACT_APP_API_URL}${user.company_id}/task`, payload);
                formik.resetForm()
                handleClose();
                refetch()
            } catch (error) {
                console.error('Error:', error);
                handleClose();
            }
        },

    });

    const handleStartDateChange = (selectedDate) => {
        formik.setFieldValue('startDate', selectedDate[0] || null);
    };

    const handleEndDateChange = (selectedDate) => {
        formik.setFieldValue('endDate', selectedDate[0] || null);
    };

    return (
        <Dialog fullWidth
            maxWidth={'xs'}
            open={openAddTaskDialog}
            onClose={handleClose}
        >
            <DialogTitle variant='h4' sx={{ m: 0, p: 2 }} id="customized-dialog-title">Add New Task</DialogTitle>
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
            <DialogContent style={{ padding: '20px 24px 5px 24px' }}>
                <form onSubmit={formik.handleSubmit}>
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
                        <Grid container>
                            <Grid item xs={6} style={{ padding: '5px', marginBottom: '5px' }}>
                                <FormControl fullWidth >
                                    <InputLabel id="role-label" style={{ color: '#5559ce' }}>
                                        Role
                                    </InputLabel>
                                    <Select
                                        labelId='role-label'
                                        id='role'
                                        name='role'
                                        label='role'
                                        value={formik.values.role}
                                        onChange={handleRoleChange}
                                        onBlur={formik.handleBlur}
                                        InputLabelProps={{
                                            style: { color: '#5559CE' },
                                        }}
                                    >
                                        <MenuItem value="Employee">Employee</MenuItem>
                                        <MenuItem value="Faculty">Faculty</MenuItem>
                                        <MenuItem value="Student">Student</MenuItem>
                                    </Select>
                                    {formik.touched.role && formik.errors.role && (
                                        <small style={{ color: 'red', margin: '5px 0px 0px 10px' }}>{formik.errors.role}</small>
                                    )}
                                </FormControl>
                            </Grid>
                            <Grid item xs={6} style={{ padding: '5px', marginBottom: '5px' }}>
                                <FormControl fullWidth>
                                    <InputLabel id="userRole-label" style={{ color: '#5559ce' }}>
                                        {formik.values.role || 'selected Role'}
                                    </InputLabel>
                                    <Select
                                        labelId='userRole-label'
                                        id={formik.values.role}
                                        name='user'
                                        label={formik.values.role}
                                        value={formik.values.user}
                                        onChange={handleUserChange}
                                        onBlur={formik.handleBlur}
                                        disabled={!formik.values.options || formik.values.options.length === 0}
                                        InputLabelProps={{
                                            style: { color: '#5559CE' },
                                        }}
                                    >
                                        {Array.isArray(formik.values.options) && formik.values.options.length === 0 ? (
                                            <MenuItem disabled value="">
                                                No users available
                                            </MenuItem>
                                        ) : (
                                            Array.isArray(formik.values.options) ? (
                                                formik.values.options.map((user) => (
                                                    <MenuItem key={user._id} value={user._id}>
                                                        {`${user.firstName} ${user.lastName}`}
                                                    </MenuItem>
                                                ))
                                            ) : null
                                        )}
                                    </Select>
                                    {formik.touched.user && formik.errors.user && (
                                        <small style={{ color: 'red', margin: '5px 0px 0px 10px' }}>{formik.errors.user}</small>
                                    )}
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} style={{ padding: '5px', marginBottom: '5px' }}>
                                <TextField
                                    label="Task title"
                                    name="title"
                                    variant="outlined"
                                    fullWidth
                                    InputLabelProps={{
                                        style: { color: '#5559CE' }
                                    }}
                                    value={formik.values.title}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.title && Boolean(formik.errors.title)}
                                    helperText={formik.touched.title && formik.errors.title}
                                />

                            </Grid>
                            <Grid item xs={6} style={{ padding: '5px', marginBottom: '5px' }}>
                                <FormControl fullWidth className="flatpicker" style={{ outline: 'none', whiteSpace: 'nowrap' }}>
                                    <Flatpickr
                                        placeholder="Start Date"
                                        style={{ minWidth: '100%' }}
                                        className="form-control"
                                        name="startDate"
                                        value={formik.values.startDate}
                                        onChange={handleStartDateChange}
                                        options={{
                                            dateFormat: 'Y-m-d',
                                            enableTime: false,
                                            mode: 'single'
                                        }}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={6} style={{ padding: '5px', marginBottom: '5px' }}>
                                <FormControl fullWidth className="flatpicker" style={{ outline: 'none', whiteSpace: 'nowrap' }}>
                                    <Flatpickr
                                        placeholder="End Date"
                                        style={{ minWidth: '100%' }}
                                        className="form-control"
                                        name="endDate"
                                        value={formik.values.endDate}
                                        onChange={handleEndDateChange}
                                        options={{
                                            dateFormat: 'Y-m-d',
                                            enableTime: false,
                                            mode: 'single'
                                        }}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} style={{ padding: '5px' }}>
                                <FormControl fullWidth>
                                    <InputLabel id="userRole-label" style={{ color: '#5559ce' }}>
                                        Priority
                                    </InputLabel>
                                    <Select
                                        labelId="priority"
                                        name="priority"
                                        label="Priority"
                                        value={formik.values.priority}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        InputLabelProps={{
                                            style: { color: '#5559CE' }
                                        }}
                                    >
                                        <MenuItem value={'High'}>High</MenuItem>
                                        <MenuItem value={'Medium'}>Medium</MenuItem>
                                        <MenuItem value={'Low'}>Low</MenuItem>
                                    </Select>
                                    {formik.touched.priority && formik.errors.priority && (
                                        <small style={{ color: 'red', margin: '5px 0px 0px 10px' }}>{formik.errors.priority}</small>
                                    )}
                                </FormControl>
                            </Grid>
                        </Grid>
                    </FormControl>
                </form>

            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="error">
                    Cancel
                </Button>
                <Button color="primary" style={{ color: '#5559CE', marginRight: '10px' }} type="submit" onClick={formik.handleSubmit} disabled={
                    Object.keys(formik.values).some(
                        key => formik.values[key] === '' || formik.values[key] === null
                    )
                }>
                    Save
                </Button>

            </DialogActions>
        </Dialog>
    );
};

export default AddTask;


