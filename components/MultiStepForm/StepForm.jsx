"use client";

import { useSelector } from "react-redux";

import CustomForm from "./StepForms/CustomForm";
import AddStepsForm from "./StepForms/AddStepsForm";
import FormConfirmation from "./StepForms/FormConfirmation";

export default function StepForm() {
  const currentStep = useSelector((store) => store.feedbackForm.currentStep);
  const expanded = useSelector((store) => store.feedbackForm.expanded);

  function renderFormByStep(step) {
    if (step === 0) {
      return <AddStepsForm />;
    }
    else if (step === -1) {
      return <FormConfirmation />;
    }
    else return <CustomForm />;
  }

  return <div className={`h-screen max-md:${expanded ? 'w-6/12' : 'w-full'}`}>{renderFormByStep(currentStep)}</div>;
}
