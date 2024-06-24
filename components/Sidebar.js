"use client";

import { useContext, createContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { ClipboardDocumentListIcon, BeakerIcon, ArrowLeftEndOnRectangleIcon, ArrowRightEndOnRectangleIcon, DocumentPlusIcon, TrashIcon } from '@heroicons/react/24/solid';

import { setCurrentStep, deleteStep, toggleExpanded } from "@/redux/slices/feedbackForm";

const SidebarContext = createContext();

export default function Sidebar({ children }) {
	const expanded = useSelector((store) => store.feedbackForm.expanded);

	const dispatch = useDispatch();

	const toggleExpandedView = () => {
		dispatch(toggleExpanded());
	}

	const handleAddQuestionClick = () => {
		dispatch(setCurrentStep(0));
	}

	const handleSummaryClick = () => {
		dispatch(setCurrentStep(-1));
	}

	return (
		<aside className={`h-screen ${expanded ? 'w-6/12' : 'w-min'} z-10`}>
			<nav className="h-full inline-flex flex-col bg-white border-r shadow-sm">
				<div className="p-4 pb-2 flex justify-between items-center">
					{expanded ?
						<div className="inline-flex">
							<ClipboardDocumentListIcon className="size-6 text-blue-500" />
							<div
								className={`flex justify-between items-center overflow-hidden transition-all w-52 ml-3`}
							>
								<div className="leading-4">
									<h4 className="font-semibold">FEEDBACK FORM</h4>
								</div>
							</div>
						</div>
						: <div />}
					<button
						onClick={toggleExpandedView} className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
					>
						{expanded ? <ArrowLeftEndOnRectangleIcon className="size-6 text-blue-500" /> : <ArrowRightEndOnRectangleIcon className="size-6 text-blue-500" />}
					</button>
				</div>

				<SidebarContext.Provider value={{ expanded }}>
					<ul className="flex-1 px-3">{children}</ul>
				</SidebarContext.Provider>

				<div className={`border-t flex p-3 cursor-pointer ${expanded ? "justify-left" : "justify-center"}`} onClick={handleAddQuestionClick}>
					<DocumentPlusIcon className="size-6 text-blue-500" />
					<div
						className={`flex justify-between items-center overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}`}
					>
						<div className="leading-4">
							<h4 className="font-semibold">Add question</h4>
						</div>
					</div>
				</div>

				<div className={`border-t flex p-3 cursor-pointer ${expanded ? "justify-left" : "justify-center"}`} onClick={handleSummaryClick}>
					<BeakerIcon className="size-6 text-blue-500" />
					<div
						className={`flex justify-between items-center overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}`}
					>
						<div className="leading-4">
							<h4 className="font-semibold">Summary</h4>
						</div>
					</div>
				</div>
			</nav>
		</aside>
	)
}

export function SidebarItem({ index, icon, text, active, showDeleteIcon }) {
	const { expanded } = useContext(SidebarContext);
	const dispatch = useDispatch();

	const handleSideBarItemClick = (step) => {
		dispatch(setCurrentStep(step));
	}

	const handleDeleteStepClick = (e, index) => {
		e.stopPropagation();
		dispatch(deleteStep(index));
	}

	return (
		<li key={index}
			className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group justify-center max-w-3xl 
			${expanded ? "h-max" : "h-10"}
        	${active === "true"
					? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
					: "hover:bg-indigo-50 text-gray-600"
				}
			`}
			onClick={() => handleSideBarItemClick(index)}
		>
			{icon}

			<span
				className={`overflow-hidden transition-all duration-0 ${expanded ? "w-full ml-3" : "w-0"}`}
			>
				{text}
			</span>

			{showDeleteIcon && (
				<TrashIcon className="size-6 text-blue-500" onClick={(e) => handleDeleteStepClick(e, index)} />
			)}

			{!expanded && (
				<div
					className={`absolute left-full rounded-md px-2 py-1 ml-6 bg-indigo-100 text-indigo-800 text-sm invisible opacity-20 -translate-x-3 transition-all w-96 group-hover:visible group-hover:opacity-100 z-10 group-hover:translate-x-0`}
				>
					{text}
				</div>
			)}
		</li>
	)
}