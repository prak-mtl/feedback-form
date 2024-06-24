"use client";

import { useSelector } from "react-redux";

import StepForm from "@/components/MultiStepForm/StepForm";
import Steps from "@/components/MultiStepForm/Steps";

export default function FeedbackFormPage() {
  const steps = useSelector((store) => store.feedbackForm.steps);

  return (
    <div className="flex panel-bg">
      {/* Left panel */}
      <Steps steps={steps} />
      {/* Right panel */}
      <StepForm />
    </div>
  );
}
