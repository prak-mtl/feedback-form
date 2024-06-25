import { useSelector } from "react-redux";

export default function FormConfirmation() {
  const formData = useSelector((store) => store.feedbackForm.formData);
  const steps = useSelector((store) => store.feedbackForm.steps);

  async function processData(data) {
    console.log(formData);
  }

  return (
    <div data-testid="form-confirmation">
      <form className="px-12 py-4" onSubmit={processData}>
        <div className="mb-8">
          <h5 className="text-xl md:text-3xl font-bold text-white">
            Final Submission Data
          </h5>
          <p className="text-white">Confirm if this is the Data that you have filled</p>
        </div>
        <div className="text-white">
          {steps?.map(step =>
            <div className="flex mb-3">
              <h5>{step.title}</h5>
              <b>&nbsp; {String(formData[step.number]?.mood || "").toUpperCase()}</b>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
