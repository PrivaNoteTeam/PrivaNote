import { MenuItemConstructorOptions, Menu, dialog, ipcMain } from 'electron';
import { getConfig } from '@utils';
import { exportNote } from '../handlers/exportNote';
import { setNotebook } from '@shared/notebook';
import { getNotebookStructure } from '@shared/utils/synchronization/getNotebookStructure';
import { setupConnectedProviders } from '@shared/utils/synchronization/setupConnectedProviders';

const template: MenuItemConstructorOptions[] = [
	{
		label: 'File',
		submenu: [
			{
				label: 'Create Note',
				click: (_, window) => {
					if (window) window.webContents.send('createNote');
				}
			},
			{
				label: 'Create Notebook',
				click: (_, window) => {
					if (window) window.webContents.send('createNotebook');
				}
			},
			{
				label: 'Open Notebook',
				click: (_, window) => {
					if (!window) return;

					dialog
						.showOpenDialog(window, {
							properties: ['openDirectory']
						})
						.then((value) => {
							const path = value.filePaths[0];

							if (
								!getConfig(path) ||
								!getNotebookStructure(path)
							) {
								window.webContents.send(
									'openNotebook',
									path,
									false
								);
								return;
							}
							setNotebook(path);

							setupConnectedProviders().then(() => {
								window.webContents.send(
									'openNotebook',
									path,
									true
								);
							});
						});
				}
			},
			{
				type: 'separator'
			},
			{
				label: 'Save',
				click: (_, window) => {
					if (window) window.webContents.send('saveNote');
				}
			},
			{
				label: 'Save As'
			},
			{
				label: 'Export',
				click: (_, window) => {
					if (!window) return;

					window.webContents.send('exportNote');

					ipcMain.removeAllListeners('currentFileToExport');
					ipcMain.on('currentFileToExport', (_, currentFile) => {
						if (currentFile) {
							exportNote(window, currentFile);
						} else {
							dialog.showMessageBox(window, {
								message: 'Please select a note to export.'
							});
						}
					});
				}
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
			{ label: 'Cut', accelerator: 'CmdOrCtrl+X', role: 'cut' },
			{ label: 'Copy', accelerator: 'CmdOrCtrl+C', role: 'copy' },
			{ label: 'Paste', accelerator: 'CmdOrCtrl+V', role: 'paste' },
			{ type: 'separator' }
		]
	},
	{
		label: 'View',
		submenu: [
			{
				label: 'Toggle File Explorer',
				click: (_, window) => {
					if (!window) return;
					window.webContents.send('toggleFileExplorer');
				}
			},
			{
				label: 'Toggle Preview',
				click: (_, window) => {
					if (!window) return;
					window.webContents.send('toggleLivePreviewVisabilty');
				}
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

const applicationMenu = Menu.buildFromTemplate(template);

export { applicationMenu };
