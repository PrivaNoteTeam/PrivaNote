import { NotificationBanner } from '../NotificationBanner';
import React from 'react';
import { render } from '@testing-library/react';

type NotificationBannerProps = React.ComponentProps<typeof NotificationBanner>;

describe('NotificationBanner component', () => {
	test('renders without crashing', () => {
		const props: NotificationBannerProps = {
			message: 'testing notification banner',
			style: 'neutral'
		};

		const result = render(<NotificationBanner {...props} />);

		expect(result).not.toBeNull();
	});

	test('renders text from message prop', async () => {
		const props: NotificationBannerProps = {
			message: 'testing notification banner',
			style: 'neutral'
		};

		const { getByTestId } = render(<NotificationBanner {...props} />);

		const result = getByTestId('notification-banner-p');

		expect(result.textContent).toBe('testing notification banner');
	});

	test('renders notification in the correct color', () => {
		const { container } = render(
			<>
				<NotificationBanner message='neutral' style='neutral' />
				<NotificationBanner message='success' style='success' />
				<NotificationBanner message='error' style='error' />
			</>
		);

		const banners = container.children;
		expect(banners.length).toBe(3);
		expect(banners.item(0)!.classList.toString().includes('blue')).toBe(
			true
		);
		expect(banners?.item(1)!.classList.toString().includes('green')).toBe(
			true
		);
		expect(banners?.item(2)!.classList.toString().includes('red')).toBe(
			true
		);
	});
});
