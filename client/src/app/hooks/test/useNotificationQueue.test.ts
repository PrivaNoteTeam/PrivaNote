import { useNotificationQueue } from '../useNotificationQueue';

describe('useNotificationQueue hook', () => {
	test('adds notification to notification queue', () => {
		const { getNotifications, notify } = useNotificationQueue();

		notify({
			message: 'testing notification',
			style: 'neutral'
		});

		const result = getNotifications();
		const expected = [
			{ message: 'testing notification', style: 'neutral' }
		];
		expect(result).toStrictEqual(expected);
	});
});
