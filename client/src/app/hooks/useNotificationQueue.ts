import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';

interface Notification {
	message: string;
	style: 'success' | 'neutral' | 'error';
}

type TrackedNotification = Notification & { id: string };

export function useNotificationQueue() {
	const [notifications, setNotifications] = useState<TrackedNotification[]>(
		[]
	);
	const duration = 5000;

	const notify = (notification: Notification) => {
		const id = nanoid();

		setNotifications([...notifications, { ...notification, id }]);
	};

	const getNotifications = () => notifications;

	useEffect(() => {
		setTimeout(() => {
			notifications.shift();
		}, duration);
	}, [notifications]);

	return { notify, getNotifications };
}
