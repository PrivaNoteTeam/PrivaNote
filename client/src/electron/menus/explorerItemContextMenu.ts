import { MenuItemConstructorOptions, Menu } from 'electron';

const template: MenuItemConstructorOptions[] = [
	{
		label: 'Rename',
		click(_, window) {
			if (!window) return;
			console.log('renamed clicked and sending event');
			window.webContents.send('renameExplorerItem');
		}
	},
	{
		label: 'Delete',
		click(_, window) {
			if (!window) return;
			window.webContents.send('deleteExplorerItem');
		}
	}
];

const explorerItemContextMenu = Menu.buildFromTemplate(template);

export { explorerItemContextMenu };
