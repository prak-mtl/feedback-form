import { useDispatch, useSelector } from "react-redux";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

import { setCurrentStep } from "@/redux/slices/feedbackForm";

export default function NavButtons() {
  const currentStep = useSelector((store) => store.feedbackForm.currentStep);
  const steps = useSelector((store) => store.feedbackForm.steps);

  const dispatch = useDispatch();

  function handlePrevious() {
    dispatch(setCurrentStep(currentStep - 1));
  }

  return (
    <div className="flex justify-between max-lg:items-start items-center max-lg:flex-col flex-row">
      {currentStep > 1 && (
        <button
          onClick={handlePrevious}
          type="button"
          className="inline-flex items-center px-5 py-2 mt-10 text-sm font-medium text-center text-white bg-slate-900 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-slate-800 dark:bg-blue-600 dark:hover:bg-blue-700"
        >
          <ChevronLeftIcon className="w-5 h-5 mr-2" />
          <span>Previous</span>
        </button>
      )}

      <button
        type="submit"
        className="inline-flex items-center px-5 py-2 md:mt-10 mt-4 text-sm font-medium text-center text-white bg-slate-900 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-slate-800 dark:bg-blue-600 dark:hover:bg-blue-700"
      >
        <span>
          {currentStep === steps?.length ? "Confirm and Submit" : "Save and Continue"}
        </span>
        <ChevronRightIcon className="w-5 h-5 ml-2" />
      </button>
    </div>
  );
}
