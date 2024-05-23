import { FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { Stack } from '@mui/system';
import { Button } from 'antd';
import React from 'react';
import { gridSpacing } from 'store/constant';
import MainCard from 'ui-component/cards/MainCard';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '50%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP
    }
  }
};

const labName = ['Lab 1', 'Lab 2', 'Lab 3', 'Lab 4', 'Lab 5', 'Lab 6', 'Lab 7', 'Develop Room 8'];

const labType = ['Theory', 'Pratical', 'Developer'];

const RoomName = ['All Lab', 'Reception', 'Metting Room', 'Office'];

const Staff = ['employee', 'faculty'];

const AddRoom = () => {
  const [Labname, setLebname] = React.useState('');
  const [labTypeValue, setLabTypeValue] = React.useState('');

  const [RoomValue, setRoomValue] = React.useState('');
  const [NumberOfRooms, setNumberOfRooms] = React.useState('');
  const [staffValue, setStaffValue] = React.useState('');
  const [staffLab, setStaffLab] = React.useState('');
  const [Instructions, setInstructions] = React.useState('');

  const handleLebChange = (event) => {
    setLebname(event.target.value);
  };

  const handleTypeChange = (event) => {
    setLabTypeValue(event.target.value);
  };

  const handleRoomChange = (event) => {
    const selectedRoom = event.target.value;
    setRoomValue(selectedRoom);

    let NumberOfRooms = ' ';

    if (selectedRoom === 'All Lab') {
      NumberOfRooms = 8;
    } else if (selectedRoom === 'Reception') {
      NumberOfRooms = 2;
    } else if (selectedRoom === 'Meeting Room') {
      NumberOfRooms = 0;
    } else if (selectedRoom === 'Office') {
      NumberOfRooms = 2;
    }

    setNumberOfRooms(NumberOfRooms);
  };

  const handleStaffChange = (event) => {
    const selectedValue = event.target.value;
    setStaffValue(selectedValue);

    let staffLab = '';

    if (selectedValue === 'employee') {
      staffLab = 'developer room';
    } else if (selectedValue === 'faculty') {
      staffLab = 'Meeting room';
    }

    setStaffLab(staffLab);
  };

  const handleInstructionsChange = (event) => {
    setInstructions(event.target.value);
  };

  return (
    <>
      <MainCard sx={style}>
        <FormControl
          defaultValue=""
          required
          sx={{
            borderRadius: '20px',
            width: '100%',
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#5559CE'
              },
              '&:hover fieldset': {
                borderColor: '#5559CE'
              },
              '&.Mui-focused fieldset': {
                borderColor: '#5559CE',
                borderWidth: '2px'
              }
            }
          }}
          size="small"
        >
          <Grid container spacing={gridSpacing} sx={{ padding: '20px 30px ' }}>
            <Grid item xl={6} xs={12}>
              <FormControl item={true}fullWidth>
                <InputLabel id="demo-simple-select-label" style={{ color: '#5559CE' }}>
                  Lab Name
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={Labname}
                  label="Lab Name"
                  MenuProps={MenuProps}
                  onChange={handleLebChange}
                  InputLabel={{
                    borderRadius: '4px'
                  }}
                  InputLabelProps={{
                    style: { color: '#5559CE' }
                  }}
                >
                  {labName.map((labName) => (
                    <MenuItem key={labName} value={labName}>
                      {labName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xl={6} xs={12}>
              <FormControl item={true}fullWidth>
                <InputLabel id="demo-simple-select-label" style={{ color: '#5559CE' }}>
                  Lab Type
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={labTypeValue}
                  label="Lab Type"
                  MenuProps={MenuProps}
                  onChange={handleTypeChange}
                  InputLabelProps={{
                    style: { color: '#5559CE' }
                  }}
                >
                  {labType.map((labType) => (
                    <MenuItem key={labType} value={labType}>
                      {labType}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xl={6} xs={12}>
              <FormControl item={true}fullWidth>
                <InputLabel id="demo-simple-select-label-Name" style={{ color: '#5559CE' }}>
                  Room Name
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label-Name"
                  id="demo-simple-select-Name"
                  value={RoomValue}
                  label="Room Name"
                  MenuProps={MenuProps}
                  onChange={handleRoomChange}
                  InputLabelProps={{
                    style: { color: '#5559CE' }
                  }}
                >
                  {RoomName.map((RoomName) => (
                    <MenuItem key={RoomName} value={RoomName}>
                      {RoomName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xl={6} xs={12}>
              <TextField
                id="outlined-basic"
                label="Number of Room"
                variant="outlined"
                fullWidth
                name="Number of Room"
                onChange={handleRoomChange}
                value={NumberOfRooms}
                InputLabelProps={{
                  style: { color: '#5559CE' }
                }}
              />
            </Grid>
            <Grid item xl={6} xs={12}>
              <FormControl item={true}fullWidth>
                <InputLabel id="demo-simple-select-label-Name" style={{ color: '#5559CE' }}>
                  Staff
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label-Name"
                  id="demo-simple-select-Name"
                  value={staffValue}
                  label="Staff"
                  MenuProps={MenuProps}
                  onChange={handleStaffChange}
                  InputLabelProps={{
                    style: { color: '#5559CE' }
                  }}
                >
                  {Staff.map((Staff) => (
                    <MenuItem key={Staff} value={Staff}>
                      {Staff}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xl={6} xs={12}>
              <TextField
                id="outlined-basic"
                label="Staff Lab"
                variant="outlined"
                fullWidth
                name="Staff Lab"
                value={staffLab}
                onChange={handleStaffChange}
                InputLabelProps={{
                  style: { color: '#5559CE' }
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="outlined-basic"
                label="Instructions"
                variant="outlined"
                fullWidth
                name="Instructions"
                value={Instructions}
                onChange={handleInstructionsChange}
                InputLabelProps={{
                  style: { color: '#5559CE' }
                }}
              />
            </Grid>
          </Grid>
          <Grid container justifyContent="flex-end" sx={{ padding: '20px 30px ' }}>
            <Stack spacing={2} direction="row">
              <Button className="button-1" variant="contained">
                Create
              </Button>
              <Button className="button-2" variant="outlined">
                Cancel
              </Button>
            </Stack>
          </Grid>
        </FormControl>
      </MainCard>
    </>
  );
};

export default AddRoom;
