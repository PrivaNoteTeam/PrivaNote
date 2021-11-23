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
			try {
				await logoutUser();
				process.env.ENCRYPTION_KEY = '';
				window.webContents.send(
					'removeCloudProvider',
					'PrivaNote Vault'
				);
				window.webContents.send('logout');
			} catch (err) {
				console.log(err);
			}
		}
	}
];

const userContextMenuTemplate = template;

export { userContextMenuTemplate };
