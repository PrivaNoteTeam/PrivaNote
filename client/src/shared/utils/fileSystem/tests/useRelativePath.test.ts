import { useRelativePath } from '../useRelativePath';

describe('useRelativePath', () => {
	const fullPath = '/User/admin/notebook/groceries/list.md';

	test('returns path relative to base of format: /notebook/', () => {
		const expected = 'notebook/groceries/list.md';
		const received = useRelativePath('/notebook/', fullPath);
		expect(received).toEqual(expected);
	});

	test('returns path relative to base of format: notebook/', () => {
		const expected = 'notebook/groceries/list.md';
		const received = useRelativePath('notebook/', fullPath);
		expect(received).toEqual(expected);
	});

	test('returns path relative to base of format: /notebook', () => {
		const expected = 'notebook/groceries/list.md';
		const received = useRelativePath('/notebook', fullPath);
		expect(received).toEqual(expected);
	});

	test('returns path relative to base of format: notebook', () => {
		const expected = 'notebook/groceries/list.md';
		const received = useRelativePath('notebook', fullPath);
		expect(received).toEqual(expected);
	});

	test('throws error if blank was provided as base', () => {
		const received = useRelativePath('', fullPath);
		expect(received).toThrowError();
	});

	test('throws error if blank was provided as fullpath', () => {
		const received = useRelativePath('notebook', '');
		expect(received).toThrowError();
	});
});
