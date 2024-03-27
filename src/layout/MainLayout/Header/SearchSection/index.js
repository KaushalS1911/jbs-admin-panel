import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { useLocation } from 'react-router-dom';

const SearchSection = () => {
  const location = useLocation();
  const [output, setOutput] = useState('');


  useEffect(() => {
    const path = location.pathname.split('/')[1];
    switch (path) {
      case 'Dashboard':
        setOutput('Dashboard');
        break;
      case 'Inquiry':
        setOutput('Inquiry');
        break;
      case 'quotes':
        setOutput('Quotes');
        break;
      case 'Student':
        setOutput('Student');
        break;
      case 'Employee':
        setOutput('Employee');
        break;
      case 'Account':
        setOutput('Account');
        break;
      case 'Lab':
        setOutput('Lab');
        break;
      case 'Fees':
        setOutput('Fees');
        break;
      case 'Demo':
        setOutput('Demo');
        break;
      case 'Attendance':
        setOutput('Attendance');
        break;
      case 'Reviews':
        setOutput('Reviews');
        break;
      default:
        setOutput('');
    }
  }, [location.pathname]);

  return (
    <Box>
      <span style={{ marginLeft: '20px', color: '#5559CE', fontSize: '26px', fontWeight: '600' }}>{output}</span>
    </Box>
  );
};

export default SearchSection;
