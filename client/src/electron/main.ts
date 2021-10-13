import { app, BrowserWindow, Menu, ipcMain } from 'electron';
import {
	applicationMenu,
	explorerItemContextMenu,
	userContextMenu
} from './menus';
import { selectDirectory } from './handlers/selectDirectory';

app.on('ready', () => {
	let window = new BrowserWindow({
		width: 1200,
		height: 900,
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: false,
			devTools: true
		}
	});

	window.loadFile('index.html');

	Menu.setApplicationMenu(applicationMenu);

	ipcMain.on('selectDirectory', (event) => selectDirectory(window, event));

	ipcMain.on('openExplorerFileContextMenu', () => {
		explorerItemContextMenu.popup();
	});

	ipcMain.on('openUserContextMenu', () => {
		userContextMenu.popup();
	});
});
