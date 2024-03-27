import React from "react";
// import Icon from '@mui/material/Icon';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';

function StudentTableHeader() {

  return (
    <div className="flex flex-1 w-full items-center justify-between">
      <div className="flex items-center">
        {/*<Icon*/}
        {/*  component={motion.span}*/}
        {/*  initial={{ scale: 0 }}*/}
        {/*  animate={{ scale: 1, transition: { delay: 0.2 } }}*/}
        {/*  className="text-24 md:text-32"*/}
        {/*>*/}
        {/*  receipt*/}
        {/*</Icon>*/}
        <Typography
          component={motion.span}
          initial={{ x: -20 }}
          animate={{ x: 0, transition: { delay: 0.2 } }}
          delay={300}
          className="text-16 md:text-24 mx-12 font-semibold"
        >
          Students
        </Typography>
      </div>
    </div>
  );
}

export default StudentTableHeader;
