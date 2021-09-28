import { app, BrowserWindow, Menu } from 'electron';
import { template as applicationMenu } from './renderer/components/application-menu';

app.on('ready', () => {
	let window = new BrowserWindow({
		width: 800,
		height: 600,
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
