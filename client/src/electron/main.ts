import { app } from 'electron';
import { registerIpcHandlers } from './ipc';
import { createMainWindow } from './windows';

const handleReady = () => {
	registerIpcHandlers();
	createMainWindow();
};

app.on('ready', handleReady);
