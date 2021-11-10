import { Category } from '@types';

const editorSettings: Category = {
	title: 'Editor Settings',
	settings: [
		{
			title: 'Font Size',
			description: 'Controls the font size in pixels.',
			type: 'number',
			ui: 'text'
		}
	]
};

const previewSettings: Category = {
	title: 'Preview Settings',
	settings: []
};

export const settings = [editorSettings, previewSettings];
