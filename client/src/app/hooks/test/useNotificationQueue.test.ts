import { useNotificationQueue } from '../useNotificationQueue';
import { renderHook } from '@testing-library/react-hooks';
import { act } from 'react-dom/test-utils';

type HookResult = ReturnType<typeof useNotificationQueue>;

describe('useNotificationQueue hook', () => {
	test('adds notification to notification queue', () => {
		// TODO: Figure out how to get return type without casting
		const { result } = renderHook<void, HookResult>(() =>
			useNotificationQueue()
		);

		const expected = [
			{ message: 'testing notification', style: 'neutral' }
		];

		act(() =>
			result.current.notify({
				message: 'testing notification',
				style: 'neutral'
			})
		);

		expect(result.current.getNotifications()).toStrictEqual(expected);
	});
});
