import * as React from "react";
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

function CreateStudentStepByStep() {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const steps = [
    "Personal Details",
    "Address Details",
    "Guardians Details",
    "Fee Details",
  ];

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <StudentInfo
            steps={steps}
            activeStep={activeStep}
            handleBack={handleBack}
            handleNext={handleNext}
            handleReset={handleReset}
          />
        );
      case 1:
        return (
          <AddressInfo
            steps={steps}
            activeStep={activeStep}
            handleBack={handleBack}
            handleNext={handleNext}
            handleReset={handleReset}
          />
        );
      case 2:
        return (
          <GuardianInfo
            steps={steps}
            activeStep={activeStep}
            handleBack={handleBack}
            handleNext={handleNext}
            handleReset={handleReset}
          />
        );
      case 3:
        return (
          <FeesInfo
            steps={steps}
            activeStep={activeStep}
            handleBack={handleBack}
            handleReset={handleReset}
          />
        );
      default:
        return "Unknown step";
    }
  };

  return (
    <>
      <Mainbreadcrumbs title={"Student"} subtitle={"Add Student"} />
      <MainCard>
        <div style={{ marginTop: "10px" }}>
          <Stepper activeStep={activeStep}>
            {steps.map((label, index) => (
              <Step key={index}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <Divider sx={{ marginTop: "15px" }} />
          <div>{getStepContent(activeStep)}</div>
        </div>
      </MainCard>
    </>
  );
}

export default CreateStudentStepByStep;
