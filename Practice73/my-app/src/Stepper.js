import React from 'react'
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';


const steps = ['', ' '];

function StepperCom(props) {
    return (
      <Box sx={{ width: '75%' }}>
        <Stepper activeStep={props.activeStep}>
          {steps.map((label) => {
            const stepProps = {};
            const labelProps = {};
            return (
              <Step key={label} {...stepProps}
              sx={{
                  ".MuiSvgIcon-root": {
                    borderRadius: "50%",
                    border: "1px solid #1976d2",
                    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
                  }
              }}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
      </Box>
    );
}

export default StepperCom