import mock from 'mock-fs';
import { createNotebook } from '../createNotebook';
import { defaultConfig } from '../../defaultConfig';
import fs from 'fs';

describe.skip('createNotebook utility function', () => {
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

	test('creates a directory for the notebook', () => {
		// turn createNotebook into async
		const received = createNotebook(
			`${process.cwd()}/root/documents/Notebook`
		);

		expect(received).toBe(true);
	});

	test('creates a hidden directory named .privanote in the notebook to store configs', () => {
		createNotebook(`${process.cwd()}/root/documents/Notebook`);
		const received = fs.existsSync(
			`${process.cwd()}/root/documents/Notebook/.privanote`
		);

		expect(received).toBe(true);
	});

	test('creates an app.json config file inside the .privanote hidden folder which contains the default config', () => {
		const expected = defaultConfig;

		createNotebook(`${process.cwd()}/root/documents/Notebook`);
		const content = fs.readFileSync(
			`${process.cwd()}/root/documents/Notebook/.privanote/app.json`
		);
		const received = JSON.parse(content.toString());

		expect(received).toStrictEqual(expected);
	});

	test('function returns false if notebook could not be created because name is already taken', () => {
		const received = createNotebook(
			`${process.cwd()}/root/documents/Notebook`
		);

		expect(received).toBe(false);
	});
});
