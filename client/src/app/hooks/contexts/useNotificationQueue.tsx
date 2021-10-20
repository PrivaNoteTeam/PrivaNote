import React, {
	useEffect,
	createContext,
	PropsWithChildren,
	useMemo,
	useContext,
	useState
} from 'react';
import { Notification, NotificationState } from '@types';

const context = createContext<any>({});

export const NotificationProvider = ({ children }: PropsWithChildren<{}>) => {
	const [notifications, setNotifications] = useState<NotificationState>([]);

	const notify = (notification: Notification) => {
		setNotifications([...notifications, notification]);
	};

	const contextValue = useMemo(
		() => [notifications, notify],
		[notifications, notify]
	);

	const duration = 5000;

	useEffect(() => {
		const timer = setTimeout(() => {
			let updatedNotifications = notifications;
			updatedNotifications.shift();
			setNotifications([...updatedNotifications]);
		}, duration);

		return () => clearTimeout(timer);
	}, [notifications]);

	return <context.Provider value={contextValue}>{children}</context.Provider>;
};

export const useNotificationQueue = () =>
	useContext<[NotificationState, (notification: Notification) => void]>(
		context
	);
