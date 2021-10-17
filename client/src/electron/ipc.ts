import { app, dialog, ipcMain } from 'electron';
import { getMainWindow } from './windows';
import { selectDirectory } from './handlers/selectDirectory';
import { explorerItemContextMenu, userContextMenu } from './menus';
import { exportNote } from './handlers/exportNote';

export function registerIpcHandlers() {
	ipcMain.on('quit', () => app.quit());

	ipcMain.on('openUserContextMenu', () => {
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

	ipcMain.on('login', (_, email: string) => {
		const emailLabel = userContextMenu.getMenuItemById('user-email');
		
		if (!emailLabel) return;

		emailLabel.label = email;
	})
}
