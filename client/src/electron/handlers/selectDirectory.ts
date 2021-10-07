import { IpcMainEvent, BrowserWindow, dialog } from 'electron';

export async function selectDirectory(
	window: BrowserWindow,
	event: IpcMainEvent
) {
	dialog
		.showOpenDialog(window, {
			properties: ['openDirectory']
		})
		.then((value) => {
			event.returnValue = value.filePaths[0];
		});
}
