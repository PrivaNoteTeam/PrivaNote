import mock from 'mock-fs';
import { FileItem } from '../../../types';
import { createFile } from '../createFile';

describe.skip('createFile utility function', () => {
	beforeEach(() => {
		mock({
			root: {
				documents: {}
			}
		});
	});

	afterEach(() => {
		mock.restore();
	});

	test('creates a file', () => {
		const expected: FileItem = {
			name: 'Untitled.md',
			path: `${process.cwd()}/root/documents/Untitled.md`
		};

		const result = createFile(`${process.cwd()}/root/documents`);

		expect(result).toStrictEqual(expected);
	});

	test('creates a file with an appended name if name already taken', () => {
		const expected: FileItem = {
			name: 'Untitled (1).md',
			path: `${process.cwd()}/root/documents/Untitled\ (1).md`
		};

		createFile(`${process.cwd()}/root/documents`);

		const result = createFile(`${process.cwd()}/root/documents`);

		expect(result).toStrictEqual(expected);
	});

	test('appended name for already existing files increment', () => {
		const expected: FileItem = {
			name: 'Untitled (2).md',
			path: `${process.cwd()}/root/documents/Untitled\ (2).md`
		};

		createFile(`${process.cwd()}/root/documents`);
		createFile(`${process.cwd()}/root/documents`);

		const result = createFile(`${process.cwd()}/root/documents`);

		expect(result).toStrictEqual(expected);
	});
});
