import { MenuItemConstructorOptions, Menu, dialog } from 'electron';
import { getConfig } from '../utils/getConfig';

const template: MenuItemConstructorOptions[] = [
	{
		label: 'File',
		submenu: [
			{
				label: 'Create Note',
				click: (_, window) => {
					if (window) window.webContents.send('createNote');
				}
			},
			{
				label: 'Create Notebook',
				click: (_, window) => {
					if (window) window.webContents.send('createNotebook');
				}
			},
			{
				label: 'Open Notebook',
				click: (_, window) => {
					if (!window) return;

					dialog
						.showOpenDialog(window, {
							properties: ['openDirectory']
						})
						.then((value) => {
							const path = value.filePaths[0];

							if (!getConfig(path)) {
								window.webContents.send(
									'openNotebook',
									path,
									false
								);
								return;
							}

							window.webContents.send('openNotebook', path, true);
						});
				}
			},
			{
				type: 'separator'
			},
			{
				label: 'Save',
				click: (_, window) => {
					if (window) window.webContents.send('saveNote');
				}
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

if (process.env.NODE_ENV !== 'production') {
	template.push({
		label: 'Develop',
		submenu: [
			{
				label: 'Toggle Developer Tools',
				click: (_, focusedWindow) => {
					if (!focusedWindow) return;
					(focusedWindow as unknown as any).toggleDevTools();
				}
			}
		]
	});
}

if (process.platform === 'darwin') {
	template.unshift({ label: 'PrivaNote', submenu: [] });
}

const menu = Menu.buildFromTemplate(template);

export { menu };
