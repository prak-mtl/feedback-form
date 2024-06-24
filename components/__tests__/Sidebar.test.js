import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { render, screen, fireEvent } from '@testing-library/react';

import Sidebar, { SidebarItem } from '@/components/Sidebar';
import { setCurrentStep, deleteStep, toggleExpanded } from '@/redux/slices/feedbackForm';

const mockStore = configureStore([]);

describe('Sidebar Component', () => {
    let store;

    beforeEach(() => {
        store = mockStore({
            feedbackForm: {
                expanded: false,
                currentStep: 0,
            },
        });
        store.dispatch = jest.fn();
    });

    it('toggles expanded state when toggle button is clicked', () => {
        render(
            <Provider store={store}>
                <Sidebar>
                    <SidebarItem index={1} icon={<div>Icon</div>} text="Step 1" active="false" showDeleteIcon={false} />
                </Sidebar>
            </Provider>
        );

        const toggleButton = screen.getByRole('button');
        fireEvent.click(toggleButton);

        expect(store.dispatch).toHaveBeenCalledWith(toggleExpanded());
    });

    it('sets current step to 0 when Add Question button is clicked', () => {
        render(
            <Provider store={store}>
                <Sidebar>
                    <SidebarItem index={1} icon={<div>Icon</div>} text="Step 1" active="false" showDeleteIcon={false} />
                </Sidebar>
            </Provider>
        );

        const addButton = screen.getByText('Add question');
        fireEvent.click(addButton);

        expect(store.dispatch).toHaveBeenCalledWith(setCurrentStep(0));
    });

    it('sets current step to -1 when Summary button is clicked', () => {
        render(
            <Provider store={store}>
                <Sidebar>
                    <SidebarItem index={1} icon={<div>Icon</div>} text="Step 1" active="false" showDeleteIcon={false} />
                </Sidebar>
            </Provider>
        );

        const summaryButton = screen.getByText('Summary');
        fireEvent.click(summaryButton);

        expect(store.dispatch).toHaveBeenCalledWith(setCurrentStep(-1));
    });
});

describe('SidebarItem Component', () => {
    let store;

    beforeEach(() => {
        store = mockStore({
            feedbackForm: {
                expanded: true,
                currentStep: 1,
            },
        });
        store.dispatch = jest.fn();
    });

    it('dispatches setCurrentStep when sidebar item is clicked', () => {
        render(
            <Provider store={store}>
                <Sidebar>
                    <SidebarItem index={1} icon={<div>Icon</div>} text="Step 1" active="false" showDeleteIcon={false} />
                </Sidebar>
            </Provider>
        );

        const sidebarItem = screen.getByText('Step 1');
        fireEvent.click(sidebarItem);

        expect(store.dispatch).toHaveBeenCalledWith(setCurrentStep(1));
    });

    it('dispatches deleteStep when delete icon is clicked', () => {
        render(
            <Provider store={store}>
                <Sidebar>
                    <SidebarItem index={1} icon={<div>Icon</div>} text="Step 1" active="false" showDeleteIcon={true} />
                </Sidebar>
            </Provider>
        );

        const deleteIcon = screen.getByTestId('delete-icon');
        fireEvent.click(deleteIcon);

        expect(store.dispatch).toHaveBeenCalledWith(deleteStep(1));
    });
});
