"use client";

import { useSelector } from "react-redux";

import Sidebar, { SidebarItem } from "../Sidebar";

export default function Steps({ steps }) {
  const currentStep = useSelector((store) => store.feedbackForm.currentStep);

  return (
    <Sidebar>
      {steps?.map((step, index) => {
        const { number, title } = step;
        return <SidebarItem
          index={number}
          icon={number}
          text={title}
          active={`${number === currentStep ? true : false}`}
          showDeleteIcon={index >= 6}
        />
      })}
    </Sidebar>
  );
}
