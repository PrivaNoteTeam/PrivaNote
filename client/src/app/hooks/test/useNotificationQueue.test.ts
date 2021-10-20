import { useNotificationQueue } from '../useNotificationQueue';
import { renderHook } from '@testing-library/react-hooks';
import { act } from 'react-dom/test-utils';

type HookResult = ReturnType<typeof useNotificationQueue>;

describe('useNotificationQueue hook', () => {
	afterAll(() => {
		jest.useRealTimers();
	});

	test('adds notification to notification queue', () => {
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

	jest.useFakeTimers();
	jest.spyOn(global, 'setTimeout');

	test('removes notification after a certain duration', () => {
		const { result } = renderHook<void, HookResult>(() =>
			useNotificationQueue()
		);

		const expected = [];
		const expectedDuration = 5000;

		act(() => {
			result.current.notify({
				message: 'testing notification',
				style: 'neutral'
			});

			jest.advanceTimersByTime(expectedDuration * 10); // take duration of timeout and multiply it just in case

			expect(result.current.getNotifications()).toHaveLength(
				expected.length
			);
		});

		act(() => {
			result.current.notify({
				message: 'another notification',
				style: 'success'
			});

			result.current.notify({
				message: 'yet another notification',
				style: 'error'
			});

			result.current.notify({
				message: 'yet another notification... again',
				style: 'neutral'
			});

			jest.advanceTimersByTime(expectedDuration * 10);

			expect(result.current.getNotifications()).toHaveLength(
				expected.length
			);
		});
	});
});
