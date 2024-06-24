"use client";

import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import TextInput from "@/components/FormInputs/TextInput";
import NavButtons from "@/components/FormInputs/NavButtons";

import { setCurrentStep, addSteps } from "@/redux/slices/feedbackForm";

export default function AddStepsForm() {
	const formData = useSelector((store) => store.feedbackForm.formData);

	const dispatch = useDispatch();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			...formData,
		},
	});

	async function processData(data) {
		dispatch(addSteps(data.question));

		// Update the Current Step to 1
		dispatch(setCurrentStep(1));
	}

	return (
		<form className="px-12 py-4" onSubmit={handleSubmit(processData)} data-testid="add-steps-form">
			<div className="mb-8">
				<h5 className="text-xl md:text-3xl font-bold text-white">
					Add custom question
				</h5>
				<p className="text-white">Please add any custom question you want here.</p>
			</div>
			<div className="grid gap-2 sm:grid-cols-2">
				<TextInput
					label="Write your question"
					name="question"
					placeholder="Type here to add your question"
					errorMessage="You cannot leave this field empty"
					register={register}
					errors={errors}
				/>
			</div>

			<NavButtons />
		</form>
	);
}