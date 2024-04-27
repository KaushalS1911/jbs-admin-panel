import React from 'react';
import MainCard from 'ui-component/cards/MainCard';
import { Button, FormControl, TextField } from '@mui/material';
import { Box, Stack } from '@mui/system';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Modal from '@mui/material/Modal';
import AddRoom from 'views/lab/AddRoom';

const Lab = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <FormControl item={true}style={{ width: '100%', backgroundColor: '#fff', borderRadius: '8px', margin: '10px 0 ', padding: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>
            <Box
              component="form"
              sx={{
                '& > :not(style)': { m: 1, width: '40vh' },
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
              noValidate
              autoComplete="off"
            >
              <TextField
                id="outlined-basic"
                variant="outlined"
                fullWidth
                size="small"
                name="Search"
                placeholder="Search"
                InputLabelProps={{
                  style: { color: '#5559CE' }
                }}
              />
            </Box>
          </div>
          <div style={{ display: 'flex', alignContent: 'center' }}>
            <div>
              <Stack style={{ margin: '10px 0' }} sx={{ display: 'flex', flexDirection: 'row' }}>
                <Button
                  variant="outlined"
                  style={{ color: '#5E35B1', border: 'none', backgroundColor: '#EDE7F6' }}
                  startIcon={<DeleteIcon />}
                >
                  Delete
                </Button>
                <Button
                  variant="outlined"
                  style={{ color: '#00AE84', border: 'none', backgroundColor: '#DBF4EE', marginLeft: '10px' }}
                  startIcon={<AddCircleOutlineIcon />}
                  onClick={() => handleOpen(true)}
                >
                  Add Inquiry
                </Button>
              </Stack>
            </div>
          </div>
        </div>
      </FormControl>
      <MainCard></MainCard>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        footer={false}
      >
        <AddRoom />
      </Modal>
    </>
  );
};

export default Lab;
