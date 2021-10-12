import mock from 'mock-fs';
import { FileSystemItem } from '../../../types';
import { createDirectory } from '../createDirectory';

describe('createDirectory utility function', () => {
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

	test('creates a directory', () => {
		const expected: FileSystemItem = {
			name: 'Untitled',
			path: `${process.cwd()}/root/documents/Untitled`,
			type: 'directory'
		};

		const result = createDirectory(`${process.cwd()}/root/documents`);
		expect(result).toStrictEqual(expected);
	});

	test('fails to create a directory in an invalid path', () => {
		const result = createDirectory(`${process.cwd()}/root/images`);

		expect(result).toThrowError();
	});

	test('fails to create a directory when a file is given through path', () => {
		const result = createDirectory(
			`${process.cwd()}/root/documents/index.md`
		);
		expect(result).toThrowError();
	});
});
