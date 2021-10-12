import { deleteExplorerItem } from '../deleteExplorerItem';
import mock from 'mock-fs';
import fs from 'fs';

describe('deleteExplorerItem utility function', () => {
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

	test('file to be deleted', () => {
		// turn deleteExplorerIterm to synchronous
		const received = deleteExplorerItem(
			`${process.cwd()}/root/documents/index.md`
		);
		expect(received).toBe(true);

		const stillExists = fs.existsSync(
			`${process.cwd()}/root/documents/index.md`
		);
		expect(stillExists).toBe(false);
	});

	test('directory to be deleted', () => {
		const received = deleteExplorerItem(`${process.cwd()}/root`);
		expect(received).toBe(true);

		const stillExists = fs.existsSync(`${process.cwd()}/root`);
		expect(stillExists).toBe(false);
	});
});
