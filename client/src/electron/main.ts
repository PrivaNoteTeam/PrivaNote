import { app } from 'electron';
import { registerIpcHandlers } from './ipc';
import { createMainWindow, getMainWindow } from './windows';
import { URL } from 'url';
import installExtension, {
	REACT_DEVELOPER_TOOLS
} from 'electron-devtools-installer';
import {
	getToken,
	initializeGoogleDrive,
	// listFiles,
	setGoogleAuth
} from '@shared/Api/googleDriveSync';

const handleReady = () => {
	registerIpcHandlers();
	createMainWindow();
};

app.requestSingleInstanceLock();

app.on('ready', handleReady);

app.whenReady().then(() => {
	installExtension(REACT_DEVELOPER_TOOLS, {
		loadExtensionOptions: { allowFileAccess: true }
	})
		.then((name) => console.log(`Added Extension: ${name}`))
		.catch((err) => console.log(`An error occured: ${err}`));
});

let deepLinkingUrl: any;
let NOTEBOOK_LOCATION = '';

if (process.platform === 'win32') {
	deepLinkingUrl = process.argv.slice(1);
}

if (!app.isDefaultProtocolClient('privanote')) {
	app.setAsDefaultProtocolClient('privanote');
}

app.on('will-finish-launching', () => {
	app.on('open-url', async (event, url) => {
		event.preventDefault();

		const urlObject = new URL(url);
		const mainWindow = getMainWindow();

		if (url.startsWith('privanote://reset-password')) {
			mainWindow.webContents.send('url-privanote', url);
		} else if (url.startsWith('privanote://google-drive/auth')) {
			const authorizationCode =
				urlObject.searchParams.get('authorizationCode');

			const tokens = await getToken(authorizationCode!);

			setGoogleAuth(tokens);
			// listFiles();
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

		deepLinkingUrl = url;
	});
});

export const getLink = () => deepLinkingUrl;

export const setNotebookLocation = (location: string) => {
	NOTEBOOK_LOCATION = location;
	// console.log(NOTEBOOK_LOCATION);
};

export const getNotebookLocation = () => {
	return NOTEBOOK_LOCATION;
};
