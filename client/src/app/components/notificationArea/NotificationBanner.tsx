import React from 'react';

interface Props {
	message: string;
	style: 'success' | 'neutral' | 'error';
}

export function NotificationBanner({ message, style }: Props) {
	let colors: string;

	switch (style) {
		case 'success':
			colors = 'bg-green-500 border-green-500';
			break;
		case 'error':
			colors = 'bg-red-500 border-red-500';
			break;
		default:
			colors = 'bg-blue-500 border-blue-500';
			break;
	}

	return (
		<div className={`${colors} flex border w-full p-1`}>
			<p className='flex-grow' data-testid='notification-banner-p'>
				{message}
			</p>
		</div>
	);
}
