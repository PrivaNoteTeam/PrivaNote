import React from 'react';
import { useNotificationQueue } from '@hooks';
import { NotificationBanner } from './notificationArea/NotificationBanner';

export function NotificationArea() {
	const [notifications] = useNotificationQueue();

	return (
		<div className='absolute w-full mt-2'>
			<div className='flex-col space-y-1 flex w-4/5 m-auto items-center'>
				{notifications.map((n) => (
					<NotificationBanner message={n.message} style={n.style} />
				))}
			</div>
		</div>
	);
}
