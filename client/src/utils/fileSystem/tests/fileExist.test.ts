import mock from 'mock-fs';
import { fileExist } from '../fileExists';

// todo: rename fileExist to fileItemExist

describe.skip('fileExist utility function', () => {
	beforeEach(() => {
		mock({
			root: {
				documents: {
					'index.md': 'lorem ipsum'
				}
			}
		});
	});

	afterEach(() => {
		mock.restore();
	});

	test('identifies existing files', () => {
		const result = fileExist(`${process.cwd()}/root/documents/index.md`);

		expect(result).toBe(true);
	});

	test('returns false if file does not exist', () => {
		const result = fileExist(`${process.cwd()}/root/documents/wishlist.md`);

		expect(result).toBe(false);
	});

	test('returns true if an existing directory is identified', () => {
		const result = fileExist(`${process.cwd()}/root/documents`);

		expect(result).toBe(true);
	});

	test('returns false if passing a non-existent directory', () => {
		const result = fileExist(`${process.cwd()}/root/images`);

		expect(result).toBe(false);
	});
});
