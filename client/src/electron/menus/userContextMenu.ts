import { MenuItemConstructorOptions, Menu } from 'electron';
import { logoutUser } from '@shared/api/logoutUser';

const template: MenuItemConstructorOptions[] = [
	{ 
		label: 'johndoe@privanote.com',
		id: 'user-email' 
	},
	{ type: 'separator' },
	{
		label: 'Sign Out',
		click: async (_, window) => {
			if (!window) return;
			await logoutUser();
			window.webContents.send('signOut');
		}
	}
];

const userContextMenu = Menu.buildFromTemplate(template);

export { userContextMenu };
