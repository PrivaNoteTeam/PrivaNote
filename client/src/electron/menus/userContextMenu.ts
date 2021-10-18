import { MenuItemConstructorOptions } from 'electron';
import { logoutUser } from '@shared/api/logoutUser';

const template: MenuItemConstructorOptions[] = [
	{
		label: '',
		id: 'user-email'
	},
	{ type: 'separator' },
	{
		label: 'Sign Out',
		click: async (_, window) => {
			if (!window) return;
			await logoutUser();
			window.webContents.send('logout');
		}
	}
];

const userContextMenuTemplate = template;

export { userContextMenuTemplate };
