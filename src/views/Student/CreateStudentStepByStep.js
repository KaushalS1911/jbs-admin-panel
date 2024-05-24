import React, { useState } from "react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import FeesInfo from "./Studentmodel/FeesInfo";
import AddressInfo from "./Studentmodel/AddressInfo";
import GuardianInfo from "./Studentmodel/GuardianInfo";
import StudentInfo from "./Studentmodel/StudentInfo";
import MainCard from "ui-component/cards/MainCard";
import { Divider } from "@mui/material";
import Mainbreadcrumbs from "contants/Mainbreadcrumbs";

const steps = [
  "Personal Details",
  "Address Details",
  "Guardians Details",
  "Fee Details",
];

const stepComponents = [
  StudentInfo,
  AddressInfo,
  GuardianInfo,
  FeesInfo,
];

function CreateStudentStepByStep() {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleBack = () => setActiveStep((prev) => prev - 1);
  const handleReset = () => setActiveStep(0);

  const StepContent = stepComponents[activeStep];

  return (
      <>
        <Mainbreadcrumbs title="Student" />
        <MainCard>
          <div style={{ marginTop: "10px" }}>
            <Stepper activeStep={activeStep} sx={{ overflowX: 'scroll' }}>
              {steps.map((label, index) => (
                  <Step key={index}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
              ))}
            </Stepper>
            <Divider sx={{ marginTop: "15px" }} />
            <StepContent
                steps={steps}
                activeStep={activeStep}
                handleBack={handleBack}
                handleNext={handleNext}
                handleReset={handleReset}
            />
          </div>
        </MainCard>
      </>
  );
}

export default CreateStudentStepByStep;
