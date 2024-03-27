import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, Typography } from '@mui/material';

function ConfirmationDialog({ handleClose, open, handleDelete, title }) {

  return (
    <div>
      <Dialog open={open} onClose={handleClose} sx={{ width: '300px' }}>
        <DialogContent sx={{ fontSize: '18px' }}>
          <Typography sx={{ textAlign: 'center' }}>Are you sure you want to delete {title}? </Typography>
        </DialogContent>
        <DialogActions sx={{ textAlign: 'center', justifyContent: 'center', alignItems: 'center' }}>
          <Button
            onClick={handleClose}
            variant="contained"
            style={{
              width: { xs: '150px' },
              marginLeft: '10px',
              display: 'block',
              backgroundColor: '#5559CE',
              color: '#ede7f6',
            }}
          >
            Cancel
          </Button>
          <Button 
            style={{
              width: { xs: '150px' },
              marginLeft: '10px',
              display: 'block',
              backgroundColor: '#ede7f6',
              color: '#5559CE',
            }}
            onClick={handleDelete}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ConfirmationDialog;

