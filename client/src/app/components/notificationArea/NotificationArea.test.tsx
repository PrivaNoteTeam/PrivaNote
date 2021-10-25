import React from 'react';
import { NotificationArea } from '../NotificationArea';
import { render } from '@testing-library/react';

describe('NotificationArea component', () => {
	test('renders component without crashing', () => {
		const result = render(<NotificationArea />);

		expect(result).not.toBe(null);
	});
});
