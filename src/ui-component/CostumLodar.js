import React from 'react'
import JbsLogo from '../assets/images/JBS-IT-Institute-logo.png'
import { CircularProgress } from '@mui/material'

const CostumLodar = () => {
    return (
        <>
         
                <div className="loader-container">
                    <CircularProgress variant="indeterminate" size={120} thickness={1} style={{ color: '#5559CE' }} />
                    <img src={JbsLogo} alt="logo" className="img-fluid rounded-circle rotating-image" height="120px" width="120px" />
                </div>
          
        </>
    )
}

export default CostumLodar
