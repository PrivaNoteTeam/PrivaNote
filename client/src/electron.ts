import { app, BrowserWindow, Menu } from 'electron';
import { template as applicationMenu } from './electron/applicationMenu';

app.on('ready', () => {
	let window = new BrowserWindow({
		width: 1200,
		height: 900,
		webPreferences: {
			nodeIntegration: true
		}
	});

	window.loadFile('index.html');

	Menu.setApplicationMenu(Menu.buildFromTemplate(applicationMenu));
});

if (process.platform === 'darwin') {
	applicationMenu.unshift({ label: 'PrivaNote', submenu: [] });
}
