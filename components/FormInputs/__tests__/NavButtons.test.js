import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import NavButtons from '../NavButtons';


jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useSelector: jest.fn(),
    useDispatch: jest.fn(),
}));


describe('NavButtons', () => {

    // Renders 'Previous' button when currentStep > 1
    it('should render "Previous" button when currentStep is greater than 1', () => {
        const useSelectorMock = jest.spyOn(require('react-redux'), 'useSelector');
        const useDispatchMock = jest.spyOn(require('react-redux'), 'useDispatch');
        const dispatchMock = jest.fn();

        useDispatchMock.mockReturnValue(dispatchMock);
        useSelectorMock.mockImplementation(callback => callback({
            feedbackForm: {
                currentStep: 2,
                steps: [1, 2, 3]
            }
        }));

        const { getByText } = render(<NavButtons />);

        expect(getByText('Previous')).toBeInTheDocument();
    });

    // currentStep is 1, 'Previous' button does not render
    it('should not render "Previous" button when currentStep is 1', () => {
        const useSelectorMock = jest.spyOn(require('react-redux'), 'useSelector');
        const useDispatchMock = jest.spyOn(require('react-redux'), 'useDispatch');
        const dispatchMock = jest.fn();

        useDispatchMock.mockReturnValue(dispatchMock);
        useSelectorMock.mockImplementation(callback => callback({
            feedbackForm: {
                currentStep: 1,
                steps: [1, 2, 3]
            }
        }));

        const { queryByText } = render(<NavButtons />);

        expect(queryByText('Previous')).not.toBeInTheDocument();
    });
});
