import { app } from 'electron';
import { registerIpcHandlers } from './ipc';
import { createMainWindow  } from './windows';

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
	app.on('open-url',(event, url) => {
		event.preventDefault();
		deepLinkingUrl = url;

	});
})

export const getLink = () => deepLinkingUrl;