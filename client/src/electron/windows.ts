import { BrowserWindow, Menu } from 'electron';
import { applicationMenu } from './menus';

let mainWindow: BrowserWindow;

export function getMainWindow() {
	return mainWindow;
}

export function createMainWindow() {
	mainWindow = new BrowserWindow({
		width: 1200,
		height: 900,
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: false,
			devTools: process.env.NODE_ENV !== 'production'
		}
	});

	mainWindow.loadFile('index.html');
	Menu.setApplicationMenu(applicationMenu);
}
