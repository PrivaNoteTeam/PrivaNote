import React from 'react';
import { useNotificationQueue } from '@hooks';
import { NotificationBanner } from './notificationArea/NotificationBanner';

export function NotificationArea() {
	const { getNotifications } = useNotificationQueue();

	const notifications = getNotifications();

	return (
		<div>
			{notifications.map((n) => (
				<NotificationBanner message={n.message} style={n.style} />
			))}
		</div>
	);
}
