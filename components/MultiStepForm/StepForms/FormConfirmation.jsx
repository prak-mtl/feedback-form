import { useSelector } from "react-redux";

import NavButtons from "../../FormInputs/NavButtons";

export default function FormConfirmation() {
  const formData = useSelector((store) => store.feedbackForm.formData);

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
        <div className="grid gap-2 sm:grid-cols-2 text-white">
          <code>
            <pre>{JSON.stringify(formData, null, 2)}</pre>
          </code>
        </div>
      </form>
    </div>
  );
}
