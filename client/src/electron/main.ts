import { app } from 'electron';
import { registerIpcHandlers } from './ipc';
import { createMainWindow, getMainWindow } from './windows';
import { URL } from 'url';
import installExtension, {
	REACT_DEVELOPER_TOOLS
} from 'electron-devtools-installer';
import { getToken } from '@shared/Api/googleDriveSync';

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

			const tokens: any = await getToken(authorizationCode!);

			console.log(tokens);
			console.log(' ');

			const { access_token: accessToken, id_token: idToken } =
				tokens.tokens;

			mainWindow.webContents.send(
				'googleDriveAuth',
				accessToken,
				idToken
			);
		}

		deepLinkingUrl = url;
	});
});

export const getLink = () => deepLinkingUrl;
