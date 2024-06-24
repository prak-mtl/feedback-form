"use client";

import { useState, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { FaceFrownIcon, MinusCircleIcon, FaceSmileIcon } from '@heroicons/react/24/solid';

import NavButtons from "@/components/FormInputs/NavButtons";
import RadioButton from "@/components/FormInputs/RadioButton";

import { setCurrentStep, updateFormData } from "@/redux/slices/feedbackForm";

export default function CustomForm() {
	const currentStep = useSelector((store) => store.feedbackForm.currentStep);
	const steps = useSelector((store) => store.feedbackForm.steps);
	const formData = useSelector((store) => store.feedbackForm.formData);

	const dispatch = useDispatch();

	const [chosenValue, setChosenValue] = useState("");

	const {
		handleSubmit,
	} = useForm({
		defaultValues: {
			...formData,
		},
	});

	// Setting the step value of current mood in local state if available
	useEffect(() => {
		setChosenValue(formData?.[currentStep]?.mood || "");

		return () => {
			setChosenValue("")
		}
	}, [currentStep])

	// Processing the data occupied at each level and incrementing the step as needed
	async function processData() {
		const finalData = {
			[currentStep]: { mood: chosenValue }
		};

		// Updating in store
		dispatch(updateFormData(finalData));

		// Update the Current Step
		if (currentStep === steps.length) {
			dispatch(setCurrentStep(-1));
			return;
		}
		dispatch(setCurrentStep(currentStep + 1));
	}

	// Memoizing the config of different moods
	const radioButtonMapping = useMemo(() => [
		{
			value: "bad",
			title: "Bad",
			icon: <FaceFrownIcon className={`${chosenValue === 'bad' ? "text-amber-400 drop-shadow-lg" : "text-white"}`} />,
			specificClassName: "glassBox__svgBox1"
		},
		{
			value: "ok",
			title: "Ok",
			icon: <MinusCircleIcon className={`${chosenValue === 'ok' ? "text-amber-400 drop-shadow-lg" : "text-white"}`} />,
			specificClassName: "glassBox__svgBox2"
		},
		{
			value: "good",
			title: "Good",
			icon: <FaceSmileIcon className={`${chosenValue === 'good' ? "text-amber-400 drop-shadow-lg" : "text-white"}`} />,
			specificClassName: "glassBox__svgBox3"
		}
	], [chosenValue]);

	return (
		<form className="md:px-12 px-4 py-4" onSubmit={handleSubmit(processData)} data-testid="custom-form">
			<div className="md:mb-8 mb-4">
				<h5 className="lg:text-3xl text-lg font-bold text-white">
					Mood info
				</h5>
				<p className="text-white">Please choose the correct option which reflects your mood for the highlighted question on the left side.</p>
			</div>

			<div className="flex max-lg:flex-col flex-row max-lg:w-6/12 w-max max-lg:gap-4 gap-10">
				{radioButtonMapping?.map(radioButton => (
					<RadioButton
						index={radioButton?.title}
						specificClassName={radioButton?.specificClassName}
						icon={radioButton?.icon}
						value={radioButton?.value}
						title={radioButton?.title}
						chosenValue={chosenValue}
						setChosenValue={(value) => setChosenValue(value)}
					/>
				))}
			</div>

			<NavButtons />
		</form>
	);
}
