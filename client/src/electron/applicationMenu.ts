import { MenuItemConstructorOptions } from 'electron';
export const template: MenuItemConstructorOptions[] = [
	{
		label: 'File',
		submenu: [
			{
				label: 'Create File'
			},
			{
				label: 'Create Notebook'
			},
			{
				label: 'Open Notebook'
			},
			{
				type: 'separator'
			},
			{
				label: 'Save'
			},
			{
				label: 'Save As'
			},
			{
				label: 'Export'
			},
			{
				type: 'separator'
			},
			{
				label: 'Exit'
			}
		]
	},
	{
		label: 'Edit',
		submenu: [
			{
				label: 'Copy'
			},
			{
				label: 'Pase'
			},
			{
				label: 'Cut'
			}
		]
	}
];
