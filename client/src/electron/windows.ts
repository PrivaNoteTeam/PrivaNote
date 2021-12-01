import { BrowserWindow, Menu } from 'electron';
import { applicationMenu } from './menus';
import path from 'path';

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

	mainWindow.loadFile(path.join(__dirname, 'index.html'));
	Menu.setApplicationMenu(applicationMenu);
}
