import mock from 'mock-fs';
import fs from 'fs';
import { FileItem } from '@types';
import { saveFile } from '../saveFile';

describe.skip('saveFile utility function', () => {
	beforeEach(() => {
		mock({
			root: {
				documents: {
					'index.md': ''
				}
			}
		});
	});

	afterEach(() => {
		mock.restore();
	});

	test('writes to file successfully', () => {
		const file: FileItem = {
			name: 'index.md',
			path: `${process.cwd()}/root/documents/index.md`
		};

		const expected = 'hello, world!';

		saveFile(file, expected);

		const received = fs.readFileSync(file.path).toString();
		expect(received).toEqual(expected);
	});

	// this test is useful when you have a file opened in PrivaNote which was deleted in the native file explorer
	test('writing to a non-existent file should throw an error', () => {
		const file: FileItem = {
			name: 'list.md',
			path: `${process.cwd()}/root/documents/list.md`
		};

		expect(saveFile(file, 'hello, world!')).toThrowError();

		const newFile = fs.existsSync(file.path);
		expect(newFile).toBe(false);
	});
});
