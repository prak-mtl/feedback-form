import feedbackFormSlice from "./slices/feedbackForm";

const { configureStore } = require("@reduxjs/toolkit");

export const store = configureStore({
  reducer: {
    feedbackForm: feedbackFormSlice,
  },
});