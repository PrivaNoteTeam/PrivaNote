import { app, BrowserWindow, Menu } from 'electron';
// import { template as applicationMenu } from './renderer/components';
import { template as applicationMenu } from './application-menu';

app.on('ready', () => {
	let window = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			nodeIntegration: true
		}
	});

	window.loadFile('index.html');

	Menu.setApplicationMenu(Menu.buildFromTemplate(applicationMenu));
});

// const applicationMenu = [
// 	{
// 		label: 'File',
// 		submenu: [
// 			{
// 				label: 'Create File'
// 			},
// 			{
// 				label: 'Create Notebook'
// 			},
// 			{
// 				label: 'Open Notebook'
// 			},
// 			{
// 				label: 'Save'
// 			},
// 			{
// 				label: 'Save As'
// 			},
// 			{
// 				label: 'Export'
// 			},
// 			{
// 				label: 'Exit'
// 			}
// 		]
// 	},
// 	{
// 		label: 'Edit',
// 		submenu: [
// 			{
// 				label: 'Copy'
// 			},
// 			{
// 				label: 'Pase'
// 			},
// 			{
// 				label: 'Cut'
// 			}
// 		]
// 	}
// ];

if (process.platform === 'darwin') {
	applicationMenu.unshift({ label: 'PrivaNote', submenu: [] });
}
