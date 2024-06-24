import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import TextInput from '../TextInput';

describe('TextInput', () => {

    // renders input field with default properties
    it('should render input field with default properties', () => {
        const { getByLabelText } = render(
            <TextInput
                label="Test Label"
                name="testName"
                id="testName"
                register={() => { }}
                errors={{}}
            />
        );
        const inputElement = getByLabelText('Test Label');
        expect(inputElement).toBeInTheDocument();
        expect(inputElement).toHaveAttribute('type', 'text');
        expect(inputElement).toHaveAttribute('name', 'testName');
        expect(inputElement).toHaveAttribute('id', 'testName');
    });
});
