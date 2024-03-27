import React from 'react'
import { Box } from '@mui/system'
import Button from '@mui/material/Button'

function FormStepButtons({ activeStep, steps, handleBack, handleNext }) {
  return (
    <div>
      <React.Fragment>
        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
          <Button
            color="inherit"
            disabled={activeStep === 0}
            onClick={handleBack}
            sx={{ mr: 1 }}
            style={{
              border: 'none',
              lineHeight: '35px',
              height: '35px',
              backgroundColor: '#D9DAF9',
              margin: ' 0px 10px 0px 10px ',
              color: '#5e35b1'
            }}
          >
            Back
          </Button>
          <Box sx={{ flex: '1 1 auto' }} />
          <Button
            onClick={handleNext}
            type="submit"
            sx={{
              backgroundColor: '#5559CE',
              color: '#fff',
              marginRight: '10px',
              height: '35px',
              lineHeight: '35px',
              '&:hover': { Color: '#5559CE', backgroundColor: '#5559CE' }
            }}
          >
            {activeStep === steps?.length - 1 ? 'Finish' : 'Next'}
          </Button>
        </Box>
      </React.Fragment>
    </div>
  )
}

export default FormStepButtons
