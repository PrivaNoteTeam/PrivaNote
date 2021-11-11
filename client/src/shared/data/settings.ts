import { Category } from '@types';

const editorSettings: Category = {
	title: 'Editor Settings',
	settings: [
		{
			title: 'Spell Check',
			description: 'Enable spell checking.',
			type: 'boolean',
			ui: 'switch'
		},
		{
			title: 'Dictionary Language',
			description: 'Sets the language for the spell checker.',
			type: 'string',
			ui: 'dropdown'
		},
		{
			title: 'Font Size',
			description: 'Controls the font size in pixels.',
			type: 'number',
			ui: 'number',
			maxLength: 2,
			min: 3,
			max: 72
		},
		{
			title: 'Tab Width',
			description: 'Controls the width of tabs.',
			type: 'number',
			ui: 'number',
			maxLength: 2,
			min: 1,
			max: 24
		},
		{
			title: 'Columns',
			description: 'Sets the number of text columns.',
			type: 'number',
			ui: 'number',
			maxLength: 3,
			min: 1,
			max: 200
		}
	]
};

const previewSettings: Category = {
	title: 'Preview Settings',
	settings: []
};

export const settings = [editorSettings, previewSettings];
