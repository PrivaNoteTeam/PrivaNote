import { Category } from '@types';

const editorSettings: Category = {
	title: 'Editor Settings',
	settings: [
		{
			title: 'Auto Save',
			description: 'Enable auto save for notes.',
			type: 'boolean',
			ui: 'switch',
			mapsTo: 'editor.autoSave'
		},
		{
			title: 'Spell Check',
			description: 'Enable spell checking.',
			type: 'boolean',
			ui: 'switch',
			mapsTo: 'editor.spellCheck'
		},
		{
			title: 'Dictionary Language',
			description: 'Sets the language for the spell checker.',
			type: 'string',
			ui: 'dropdown',
			options: ['English (CA)', 'Français (CA)'],
			mapsTo: 'editor.dictionaryLanguage'
		},
		{
			title: 'Font Size',
			description: 'Controls the font size in pixels.',
			type: 'number',
			ui: 'number',
			maxLength: 2,
			min: 3,
			max: 72,
			mapsTo: 'editor.fontSize'
		},
		{
			title: 'Tab Width',
			description: 'Controls the width of tabs.',
			type: 'number',
			ui: 'number',
			maxLength: 2,
			min: 1,
			max: 24,
			mapsTo: 'editor.tabWidth'
		},
		{
			title: 'Columns',
			description: 'Sets the number of text columns.',
			type: 'number',
			ui: 'number',
			maxLength: 3,
			min: 1,
			max: 200,
			mapsTo: 'editor.columns'
		}
	]
};

const previewSettings: Category = {
	title: 'Preview Settings',
	settings: [
		{
			title: 'Font Size',
			description: 'Controls the font size in pixels.',
			type: 'number',
			ui: 'number',
			maxLength: 2,
			min: 3,
			max: 72,
			mapsTo: 'preview.fontSize'
		}
	]
};

export const settings = [editorSettings, previewSettings];
