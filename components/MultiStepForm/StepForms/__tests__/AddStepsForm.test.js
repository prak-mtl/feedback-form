import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { render, screen, fireEvent } from '@testing-library/react';

import AddStepsForm from '@/components/MultiStepForm/StepForms/AddStepsForm';

import { addSteps, setCurrentStep } from "@/redux/slices/feedbackForm";

// Mock Redux store
const mockStore = configureStore([]);

const dispatch = jest.fn();

async function processData(data) {
    dispatch(addSteps(data.question));

    // Update the Current Step to 1
    dispatch(setCurrentStep(1));
}


describe('AddStepsForm Component', () => {
    it('renders AddStepsForm correctly', () => {
        const initialState = {
            feedbackForm: {
                formData: {},
            },
        };
        const store = mockStore(initialState);

        render(
            <Provider store={store}>
                <AddStepsForm />
            </Provider>
        );

        expect(screen.getByTestId('add-steps-form')).toBeInTheDocument();
        expect(screen.getByText('Add custom question')).toBeInTheDocument();
        expect(screen.getByText('Please add any custom question you want here.')).toBeInTheDocument();
        expect(screen.getByLabelText('Write your question')).toBeInTheDocument();
    });

    it('displays an error message when the question field is empty', async () => {
        const initialState = {
            feedbackForm: {
                formData: {},
            },
        };
        const store = mockStore(initialState);

        render(
            <Provider store={store}>
                <AddStepsForm />
            </Provider>
        );

        const form = screen.getByTestId('add-steps-form');
        fireEvent.submit(form);

        expect(await screen.findByText('You cannot leave this field empty')).toBeInTheDocument();
    });

    it('dispatches addSteps and setCurrentStep actions', async () => {
        const data = { question: 'What is your favorite color?' };

        // Call the function with the sample data
        await processData(data);

        // Assert that addSteps was dispatched with the correct payload
        expect(dispatch).toHaveBeenCalledWith(addSteps(data.question));

        // Assert that setCurrentStep was dispatched with the correct payload
        expect(dispatch).toHaveBeenCalledWith(setCurrentStep(1));
    });
});
