import { Category } from '@types';

const editorSettings: Category = {
	title: 'Editor Settings',
	settings: [
		{
			title: 'Spell Check',
			description: 'Enable spell checking',
			type: 'boolean',
			ui: 'switch'
		},
		{
			title: 'Font Size',
			description: 'Controls the font size in pixels.',
			type: 'number',
			ui: 'number',
			maxLength: 3
		}
	]
};

const previewSettings: Category = {
	title: 'Preview Settings',
	settings: []
};

export const settings = [editorSettings, previewSettings];
