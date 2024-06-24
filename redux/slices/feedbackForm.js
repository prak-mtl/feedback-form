// Create a slice

const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  steps: [
    {
      number: 1,
      title: "How would you rate your overall job satisfaction this week?",
    },
    {
      number: 2,
      title: "How do you feel about your workload this week?",
    },
    {
      number: 3,
      title: "How would you rate the communication within your team this week?",
    },
    {
      number: 4,
      title: "How satisfied are you with the support you received from your manager this week?",
    },
    {
      number: 5,
      title: "How do you feel about the progress you made on your projects this week?",
    },
    {
      number: 6,
      title: "How would you rate the work-life balance you experienced this week?",
    },
  ],
  currentStep: 1,
  expanded: true,
  formData: {},
};

const feedbackFormSlice = createSlice({
  name: "onboarding",
  initialState,
  reducers: {
    setCurrentStep: (state, action) => {
      state.currentStep = action.payload;
    },
    toggleExpanded: (state) => {
      state.expanded = !state.expanded;
    },
    updateFormData: (state, action) => {
      state.formData = {
        ...state.formData,
        ...action.payload,
      };
    },
    addSteps: (state, action) => {
      state.steps = [
        ...state.steps,
        {
          number: ++state.steps.length,
          title: action.payload,
        }
      ];
    },
    deleteStep: (state, action) => {
      state.currentStep = 1;
      state.steps = state.steps.filter(step => step.number !== action.payload);
      delete state.formData[action.payload];
    }
  },
});

export const { setCurrentStep, toggleExpanded, updateFormData, addSteps, deleteStep } = feedbackFormSlice.actions;

export default feedbackFormSlice.reducer;
