
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { render, screen } from '@testing-library/react';

import Steps from '@/components/MultiStepForm/Steps';

// Mock Redux store
const mockStore = configureStore([]);

describe('Steps Component', () => {
	it('should render SidebarItems correctly', () => {
		const steps = [
			{ number: 1, title: 'Step 1' },
			{ number: 2, title: 'Step 2' },
			{ number: 3, title: 'Step 3' },
		];

		const initialState = {
			feedbackForm: {
				currentStep: 2, // Mock currentStep from Redux state
			},
		};
		const store = mockStore(initialState);

		render(
			<Provider store={store}>
				<Steps steps={steps} />
			</Provider>
		);

		// Check if SidebarItems are rendered
		steps.forEach((step) => {
			const sidebarItem = screen.queryAllByText(step.title);
			sidebarItem.map(sidebarItemData => expect(sidebarItemData).toBeInTheDocument());
		});
	});
});
