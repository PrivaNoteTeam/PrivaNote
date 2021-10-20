import { app, dialog, ipcMain, Menu } from 'electron';
import { getMainWindow } from './windows';
import { selectDirectory } from './handlers/selectDirectory';
import { explorerItemContextMenu, userContextMenuTemplate } from './menus';
import { exportNote } from './handlers/exportNote';
import { User } from '@types';

export function registerIpcHandlers() {
	ipcMain.on('quit', () => app.quit());

	ipcMain.on('openUserContextMenu', (_, user: User) => {
		let updatedUserContextMenuTemplate = userContextMenuTemplate;

		const i = updatedUserContextMenuTemplate.findIndex((item) => {
			return item.id === 'user-email';
		});

		updatedUserContextMenuTemplate[i].label = user.email;

		const userContextMenu = Menu.buildFromTemplate(userContextMenuTemplate);
		userContextMenu.popup();
	});

	ipcMain.on('openExplorerFileContextMenu', () => {
		explorerItemContextMenu.popup();
	});

	ipcMain.on('selectDirectory', (event) => {
		const mainWindow = getMainWindow();
		selectDirectory(mainWindow, event);
	});

	ipcMain.on('currentFileToExport', (_, currentFile) => {
		const mainWindow = getMainWindow();

		if (currentFile) {
			exportNote(mainWindow, currentFile);
		} else {
			dialog.showMessageBox(mainWindow, {
				message: 'Please select a note to export.'
			});
		}
	});
}
