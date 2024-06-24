"use client";

import { useSelector } from "react-redux";

import StepForm from "@/components/MultiStepForm/StepForm";
import Steps from "@/components/MultiStepForm/Steps";

export default function StudentOnboardingPage() {
  const steps = useSelector((store) => store.feedbackForm.steps);

  return (
    <div className="flex panel-bg">
      {/* Steps */}
      <Steps steps={steps} />
      {/* Form */}
      <StepForm />
    </div>
  );
}
