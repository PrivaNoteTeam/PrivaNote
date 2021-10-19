import { app } from 'electron';
import { registerIpcHandlers } from './ipc';
import { createMainWindow } from './windows';

const handleReady = () => {
	registerIpcHandlers();
	createMainWindow();
};

app.on('ready', handleReady);

let link: string;
app.on('open-url',(event, data) => {
	event.preventDefault();
	link = data;
});
app.setAsDefaultProtocolClient('privanote')

export const getLink = () => link;