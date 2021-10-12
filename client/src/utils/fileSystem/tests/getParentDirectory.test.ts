import mock from 'mock-fs';
import { getParentDirectory } from '../getParentDirectory';
import { FileSystemItem, FileItem } from '../../../types';

describe('getParentDirectory utility function', () => {
	beforeEach(() => {
		mock({
			root: {
				documents: {
					'index.md': 'contents'
				}
			}
		});
	});

	afterEach(() => {
		mock.restore();
	});

	test('gets the parent directory of specified file', () => {
		// going to need to change the return type of getParentDirectory()
		const expected: FileSystemItem = {
			name: 'documents',
			path: `${process.cwd()}/root/documents`,
			type: 'directory'
		};

		const file: FileItem = {
			name: 'index.md',
			path: `${process.cwd()}/root/documents/index.md`
		};

		const received = getParentDirectory(file.path);

		expect(received).toStrictEqual(expected);
	});

	test('gets the parent directory of specified directory', () => {
		const expected: FileSystemItem = {
			name: 'root',
			path: `${process.cwd()}/root`,
			type: 'directory'
		};

		const directory: FileSystemItem = {
			name: 'documents',
			path: `${process.cwd()}/root/directory`,
			type: 'directory'
		};

		const received = getParentDirectory(directory.path);

		expect(received).toStrictEqual(expected);
	});

	test('gets an error when a non-existent directory is given in the path', () => {
		const received = getParentDirectory(`${process.cwd()}/root/images`);

		expect(received).toThrowError();
	});
});
