import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import FormConfirmation from '../FormConfirmation';

// Mock Redux store
const mockStore = configureStore([]);

describe('FormConfirmation Component', () => {
	it('renders UI elements correctly', () => {
		const initialState = {
			feedbackForm: {
				formData: {
					name: 'John Doe',
					email: 'john.doe@example.com',
					feedback: 'This is my feedback',
				},
			},
		};
		const store = mockStore(initialState);

		render(
			<Provider store={store}>
				<FormConfirmation />
			</Provider>
		);

		// Check if headings and text content are rendered correctly
		expect(screen.getByText('Final Submission Data')).toBeInTheDocument();
		expect(screen.getByText('Confirm if this is the Data that you have filled')).toBeInTheDocument();
	});
});
