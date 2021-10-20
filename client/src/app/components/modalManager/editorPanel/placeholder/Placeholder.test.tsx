import 'jest';
import React from 'react';
import { render } from '@testing-library/react';
import { Placeholder } from '../Placeholder';

type PlaceholderProps = React.ComponentProps<typeof Placeholder>;

describe('Placeholder', () => {
	test('component renders successfully', () => {
		const props: PlaceholderProps = {
			text: 'rendering Placeholder'
		};

		render(<Placeholder {...props} />);
	});

	test('text is displayed in the component', () => {
		const expected = 'this text is displayed in the component';
		const props: PlaceholderProps = {
			text: expected
		};

		const { getByTestId } = render(<Placeholder {...props} />);

		expect(getByTestId('placeholder-p').textContent).toEqual(expected);
	});
});
