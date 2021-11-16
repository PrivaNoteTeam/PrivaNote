import { app, dialog, ipcMain, Menu } from 'electron';
import { getMainWindow } from './windows';
import { selectDirectory } from './handlers/selectDirectory';
import { explorerItemContextMenu, userContextMenuTemplate } from './menus';
import { exportNote } from './handlers/exportNote';
import { User } from '@types';
import { setNotebook } from '@shared/notebook';
// import { addItemToStructure } from '@shared/utils/synchronization/addItemToStructure';
// import { deleteItemFromStructure } from '@shared/utils/synchronization/deleteItemFromStructure';
// import { renameItemInStructure } from '@shared/utils/synchronization/renameItemInStructure';
// import { saveItemToStructure } from '@shared/utils/synchronization/saveItemToStructure';
// import { syncUpstream } from '@shared/utils/synchronization/syncUpstream';
import { exportNotebookStructure } from '@shared/utils/synchronization/exportNotebookStructure';

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

	ipcMain.on('setNotebook', (_, path) => {
		setNotebook(path);
	});

	ipcMain.on('addNewNotebookContentToStructure', (_) => {
		exportNotebookStructure();
	});

	// ipcMain.on('createDirectory', (_, path) => {
	// 	addItemToStructure(path).then((res: any) => {
	// 		syncUpstream(res.action, res.content);
	// 	});
	// });

	// ipcMain.on('createFile', (_, path) => {
	// 	addItemToStructure(path).then((res: any) => {
	// 		syncUpstream(res.action, res.content);
	// 	});
	// });

	// ipcMain.on('deleteExplorerItem', (_, path) => {
	// 	deleteItemFromStructure(path).then((res: any) => {
	// 		syncUpstream(res.action, res.content);
	// 	});
	// });

	// ipcMain.on('renameExplorerItem', (_, path, newName) => {
	// 	renameItemInStructure(path, newName).then((res: any) => {
	// 		syncUpstream(res.action, res.content);
	// 	});
	// });

	// ipcMain.on('saveFile', (_, path) => {
	// 	saveItemToStructure(path).then((res: any) => {
	// 		syncUpstream(res.action, res.content);
	// 	});
	// });
}
