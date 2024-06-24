import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

import RadioButton from '@/components/FormInputs/RadioButton';

jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useSelector: jest.fn(),
}));

describe('RadioButton', () => {

    // renders without crashing
    it('should render without crashing when all props are provided', () => {
        const { getByText } = render(
            <RadioButton
                index={0}
                specificClassName="test-class"
                icon={<svg />}
                value="happy"
                title="Happy"
                chosenValue="happy"
                setChosenValue={jest.fn()}
            />
        );
        expect(getByText('Happy')).toBeInTheDocument();
    });
});
