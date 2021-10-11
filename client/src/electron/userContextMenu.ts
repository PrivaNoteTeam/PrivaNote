import { MenuItemConstructorOptions, Menu } from 'electron';

const template: MenuItemConstructorOptions[] = [
	{
		label: 'johndoe@privanote.com',
		click(_, window) {
			if (!window) return;
			window.webContents.send('renameExplorerItem');
		}
	},
	{
		type: 'separator'
	},
	{
		label: 'Sign Out',
		click(_, window) {
			if (!window) return;
			window.webContents.send('deleteExplorerItem');
		}
	}
];

const userContextMenu = Menu.buildFromTemplate(template);

export { userContextMenu };
