import { app, BrowserWindow, Menu, ipcMain, dialog } from 'electron';
import { buildMenu } from './electron/applicationMenu';

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

	Menu.setApplicationMenu(buildMenu(window));

	ipcMain.on('selectDirectory', async (event, _) => {
		dialog
			.showOpenDialog(window, {
				properties: ['openDirectory']
			})
			.then((value) => {
				event.returnValue = value.filePaths[0];
			});
	});
});
