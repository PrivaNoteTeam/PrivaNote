import { MenuItemConstructorOptions, Menu } from 'electron';

const template: MenuItemConstructorOptions[] = [
	{
		label: 'johndoe@privanote.com'
	},
	{
		type: 'separator'
	},
	{
		label: 'Sign Out',
		click(_, window) {
			if (!window) return;
			window.webContents.send('signOut');
		}
	}
];

const userContextMenu = Menu.buildFromTemplate(template);

export { userContextMenu };
