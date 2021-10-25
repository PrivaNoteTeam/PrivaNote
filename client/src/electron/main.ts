import { app } from 'electron';
import { registerIpcHandlers } from './ipc';
import { createMainWindow, getMainWindow } from './windows';
import { URL } from 'url';

const handleReady = () => {
	registerIpcHandlers();
	createMainWindow();
};

app.requestSingleInstanceLock();

app.on('ready', handleReady);

let deepLinkingUrl: any;

if (process.platform === 'win32') {
	deepLinkingUrl = process.argv.slice(1);
}

if (!app.isDefaultProtocolClient('privanote')) {
	app.setAsDefaultProtocolClient('privanote');
}

app.on('will-finish-launching', () => {
	app.on('open-url', (event, url) => {
		event.preventDefault();

		const urlObject = new URL(url);
		const mainWindow = getMainWindow();

		if (url.startsWith('privanote://reset-password')) {
			mainWindow.webContents.send('url-privanote', url);
		} else if (url.startsWith('privanote://google-drive/auth')) {
			const token = urlObject.searchParams.get('token');
			mainWindow.webContents.send('google-drive-auth', token);
		}

		deepLinkingUrl = url;
	});
});

export const getLink = () => deepLinkingUrl;
