import React from 'react';
import { UIPage } from './UIPage';
import { render } from '@testing-library/react';
describe('Page component', () => {
	describe('UIPage component', () => {
		test('renders without crashing', () => {
			const result = render(<UIPage handleCloseClick={() => {}} />);

			expect(result).not.toBeNull();
		});

		test('displays a full width background', () => {
			const { getByTestId } = render(
				<UIPage handleCloseClick={() => {}} />
			);

			const background = getByTestId('page-bg-div');
			const hasAbsolute = background.classList.contains('absolute');

			const hasFullScreen = background.classList.contains('w-screen');
			const hasFullWidth = background.classList.contains('w-full');

			expect(hasAbsolute).toBe(true);
			expect(hasFullScreen || hasFullWidth).toBe(true);
		});

		test('displays a close button', () => {
			const { getByTestId } = render(
				<UIPage handleCloseClick={() => {}} />
			);

			const result = getByTestId('page-close-btn-svg');

			expect(result).not.toBeFalsy();
		});
	});
});
