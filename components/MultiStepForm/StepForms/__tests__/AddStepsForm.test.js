import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import AddStepsForm from '../AddStepsForm';

// Mock Redux store
const mockStore = configureStore([]);

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
});
