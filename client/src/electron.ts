import { app, BrowserWindow, Menu, ipcMain, dialog } from 'electron';
import { template as applicationMenu } from './electron/applicationMenu';

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

	Menu.setApplicationMenu(Menu.buildFromTemplate(applicationMenu));

	ipcMain.on('selectDirectory', () => {
		dialog
			.showOpenDialog(window, {
				properties: ['openDirectory']
			})
			.then((value) => {
				console.log(value);
			});
	});
});

if (process.platform === 'darwin') {
	applicationMenu.unshift({ label: 'PrivaNote', submenu: [] });
}
