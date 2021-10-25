import React from 'react';
import { render } from '@testing-library/react';
import { UICloudProviderPage } from './UICloudProviderPage';

describe('CloudProviderPage component', () => {
	describe('UICloudProviderPage UI component', () => {
		test('renders without crashing', () => {
			const result = render(
				<UICloudProviderPage handleClose={jest.fn()} />
			);

			expect(result).not.toBeNull();
		});
	});
});
