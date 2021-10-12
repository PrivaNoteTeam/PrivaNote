import mock from 'mock-fs';
import { renameExplorerItem } from '../renameExplorerItem';
import { FileSystemItem } from '../../../types';

describe.skip('renameExplorerItem utility function', () => {
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

	test('renames a file', async () => {
		const expected: FileSystemItem = {
			name: 'list.md',
			path: `${process.cwd()}/root/documents/list.md`,
			type: 'note'
		};

		const received = renameExplorerItem(
			`${process.cwd()}/root/documents/index.md`,
			'list.md'
		); // need to convert renameExplorerItem to synchronous

		expect(received).toStrictEqual(expected);
	});

	test('renames a directory', async () => {
		const expected: FileSystemItem = {
			name: 'images',
			path: `${process.cwd()}/root/images`,
			type: 'directory'
		};

		const received = renameExplorerItem(
			`${process.cwd()}/root/documents`,
			'images'
		);

		expect(received).toStrictEqual(expected);
	});
});
