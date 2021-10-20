import React, { useState } from 'react';
import CloseIcon from '@assets/icons/close.svg';

interface Props {
	message: string;
	style: 'success' | 'neutral' | 'error';
}

export function NotificationBanner({ message, style }: Props) {
	let colors: string;
	const [hidden, setHidden] = useState<boolean>(false);

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

	const handleCloseClick = () => {
		setHidden(true);
	};

	return (
		<>
			{!hidden ? (
				<div
					className={`${colors} flex w-full text-center backdrop-blur-md bg-opacity-50 border rounded-md p-1`}
				>
					<p
						className='flex-grow text-white text-sm'
						data-testid='notification-banner-p'
					>
						{message}
					</p>
					<CloseIcon onClick={handleCloseClick} fill='#FFF' />
				</div>
			) : null}
		</>
	);
}
