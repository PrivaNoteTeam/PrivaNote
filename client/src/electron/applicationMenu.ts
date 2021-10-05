import { MenuItemConstructorOptions, Menu, dialog } from 'electron';

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
							window.webContents.send(
								'openNotebook',
								value.filePaths[0]
							);
						});
				}
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
	},
	{
		label: 'View',
		submenu: [
			{
				label: 'Toggle File Explorer',
				click: (_, window) => {
					if (!window) return;
					window.webContents.send('toggleFileExplorer');
				}
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
