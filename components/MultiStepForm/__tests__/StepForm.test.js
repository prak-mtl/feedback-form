import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { render, screen } from '@testing-library/react';

import CustomForm from '../StepForms/CustomForm';
import AddStepsForm from '../StepForms/AddStepsForm';
import FormConfirmation from '../StepForms/FormConfirmation';

// Mock Redux store
const mockStore = configureStore([]);

describe('StepForm Component', () => {
    it('renders AddStepsForm when currentStep is 0', () => {
        const initialState = {
            feedbackForm: {
                currentStep: 0,
                expanded: true, // Mock expanded state as needed
            },
        };
        const store = mockStore(initialState);

        render(
            <Provider store={store}>
                <AddStepsForm />
            </Provider>
        );

        expect(screen.getByTestId('add-steps-form')).toBeInTheDocument();
    });

    it('renders FormConfirmation when currentStep is -1', () => {
        const initialState = {
            feedbackForm: {
                currentStep: -1,
                expanded: true, // Mock expanded state as needed
            },
        };
        const store = mockStore(initialState);

        render(
            <Provider store={store}>
                <FormConfirmation />
            </Provider>
        );

        expect(screen.getByTestId('form-confirmation')).toBeInTheDocument();
    });

    it('renders CustomForm when currentStep is neither 0 nor -1', () => {
        const initialState = {
            feedbackForm: {
                currentStep: 1, // Mock currentStep as needed
                expanded: true, // Mock expanded state as needed
            },
        };
        const store = mockStore(initialState);

        render(
            <Provider store={store}>
                <CustomForm />
            </Provider>
        );

        expect(screen.getByTestId('custom-form')).toBeInTheDocument();
    });
});
