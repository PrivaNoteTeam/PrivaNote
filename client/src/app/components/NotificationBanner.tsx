import React from 'react';

interface Props {
	message: string;
	type: 'success' | 'neutral' | 'error';
}

export function NotificationBanner({ message, type }: Props) {
	let style: string;

	switch (type) {
		case 'success':
			style = 'bg-green-500 border-green-500';
			break;
		case 'error':
			style = 'bg-red-500 border-red-500';
			break;
		default:
			style = 'bg-blue-500 border-blue-500';
			break;
	}

	return (
		<div className={`${style} flex border w-full p-1`}>
			<p className='flex-grow' data-testid='notification-banner-p'>
				{message}
			</p>
		</div>
	);
}
