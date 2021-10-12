import mock from 'mock-fs';
import { isFile } from '../isFile';

describe('isFile utility function', () => {
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

	test('returns true if item is in a file format', () => {
		const result = isFile(`${process.cwd()}/root/documents/index.md`);

		expect(result).toBe(true);
	});

	test('returns false if item is not in a file format', () => {
		const result = isFile(`${process.cwd()}/root/document`);

		expect(result).toBe(false);
	});

	test('returns true if item is in a file format even if it is non-existent', () => {
		const result = isFile(`${process.cwd()}/root/document/wishlist.md`);

		expect(result).toBe(true);
	});
});
