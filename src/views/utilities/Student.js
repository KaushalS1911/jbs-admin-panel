// import MainCard from 'ui-component/cards/MainCard';
import SecondaryAction from 'ui-component/cards/CardSecondaryAction'
import Index from 'views/Student/Index.js'
import { Box } from '@mui/material'

const Student = () => (
  <Box secondary={<SecondaryAction />}>
    <div>
      <Index />
    </div>
  </Box>
)

export default Student
