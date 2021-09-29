import { MenuItemConstructorOptions, Menu } from 'electron';

const template: MenuItemConstructorOptions[] = [
	{
		label: 'File',
		submenu: [
			{
				label: 'Create File'
			},
			{
				label: 'Create Notebook',
				click: (_, window) => {
					if (window) window.webContents.send('createNotebook');
				}
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
