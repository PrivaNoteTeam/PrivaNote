import { app } from 'electron';
import { registerIpcHandlers } from './ipc';
import { createMainWindow, getMainWindow } from './windows';
import { URL } from 'url';
import installExtension, {
	REACT_DEVELOPER_TOOLS
} from 'electron-devtools-installer';
import { getToken, setGoogleAuth } from '@shared/Api/googleDrive/setup';
import { initializeGoogleDrive } from '@shared/Api/googleDrive/initializeGoogleDrive';
import path from 'path';

const handleReady = () => {
	registerIpcHandlers();
	createMainWindow();
};

const gotTheLock = app.requestSingleInstanceLock();

app.on('ready', handleReady);

app.whenReady().then(() => {
	installExtension(REACT_DEVELOPER_TOOLS, {
		loadExtensionOptions: { allowFileAccess: true }
	})
		.then((name) => console.log(`Added Extension: ${name}`))
		.catch((err) => console.log(`An error occured: ${err}`));
});

let deepLinkingUrl: any;

if (process.defaultApp) {
	if (process.argv.length >= 2) {
		app.setAsDefaultProtocolClient('privanote', process.execPath, [
			path.resolve(process.argv[1])
		]);
	}
} else {
	app.setAsDefaultProtocolClient('privanote');
}

const handleOpenURL = async (url: string) => {
	const urlObject = new URL(url);
	const mainWindow = getMainWindow();

	if (url.startsWith('privanote://reset-password')) {
		mainWindow.webContents.send('url-privanote', url);
	} else if (url.startsWith('privanote://google-drive/auth')) {
		const authorizationCode =
			urlObject.searchParams.get('authorizationCode');

		const tokens = await getToken(authorizationCode!);
		setGoogleAuth(tokens);
		initializeGoogleDrive();

		const {
			access_token: accessToken,
			id_token: idToken,
			refresh_token: refreshToken
		} = tokens;

		// Refresh token is only received when google account first
		// authorizes PrivaNote so remove access here:
		// https://myaccount.google.com/permissions
		mainWindow.webContents.send(
			'googleDriveAuth',
			accessToken,
			refreshToken,
			idToken
		);
	}
};

if (!gotTheLock) {
	app.quit();
} else {
	app.on('second-instance', (_, commandLine, ___) => {
		let mainWindow = getMainWindow();
		if (mainWindow) {
			if (mainWindow.isMinimized()) mainWindow.restore();
			mainWindow.focus();
			console.log('hi');
		}
		if (process.platform === 'win32') {
			console.log(commandLine);
			deepLinkingUrl = commandLine.slice(-1)[0];
		}
		console.log(deepLinkingUrl);
		handleOpenURL(deepLinkingUrl);
	});
}

app.on('will-finish-launching', () => {
	app.on('open-url', async (event, url) => {
		event.preventDefault();
		deepLinkingUrl = url;
		handleOpenURL(deepLinkingUrl);
	});
});

export const getLink = () => deepLinkingUrl;
