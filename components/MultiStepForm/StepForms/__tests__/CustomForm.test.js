import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { render, screen, fireEvent } from '@testing-library/react';

import CustomForm from '@/components/MultiStepForm/StepForms/CustomForm';

// Mock Redux store
const mockStore = configureStore([]);

describe('CustomForm Component', () => {
    it('renders CustomForm correctly', () => {
        const initialState = {
            feedbackForm: {
                currentStep: 1,
                steps: [1, 2, 3],
                formData: { 1: { mood: 'ok' } },
            },
        };
        const store = mockStore(initialState);

        render(
            <Provider store={store}>
                <CustomForm />
            </Provider>
        );

        expect(screen.getByTestId('custom-form')).toBeInTheDocument();
        expect(screen.getByText('Mood info')).toBeInTheDocument();
        expect(screen.getByText('Please choose the correct option which reflects your mood for the highlighted question on the left side.')).toBeInTheDocument();
    });

    it('updates chosenValue correctly when a radio button is clicked', () => {
        const initialState = {
            feedbackForm: {
                currentStep: 1,
                steps: [1, 2, 3],
                formData: { 1: { mood: 'ok' } },
            },
        };
        const store = mockStore(initialState);

        render(
            <Provider store={store}>
                <CustomForm />
            </Provider>
        );

        const badButton = screen.getByText('Bad');
        fireEvent.click(badButton);

        expect(badButton.classList).toContain('text-amber-400');
    });
});
