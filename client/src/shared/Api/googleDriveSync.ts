import { createNotebookStructure } from '@shared/utils/synchronization/createNotebookStructure';
import { shell } from 'electron';
import { google } from 'googleapis';
import credentials from '../../googleCredentials.json';
// import { nanoid } from 'nanoid';
import fs from 'fs';
import { saveFile } from '@shared/utils';
import { FileItem } from '@types';

const clientId = credentials.web.client_id;
const clientSecret = credentials.web.client_secret;
const redirect_uris = credentials.web.redirect_uris;
const ROOT_DRIVE_FOLDER_NAME = 'privanote';
let ROOT_DRIVE_FOLDER_ID = '';

const oAuth2Client = new google.auth.OAuth2(
	clientId,
	clientSecret,
	redirect_uris[0]
);

let drive = google.drive('v3');

const scopeBaseUrl = 'https://www.googleapis.com/auth/';
const scope = [
	`${scopeBaseUrl}drive.metadata.readonly`,
	`${scopeBaseUrl}userinfo.profile`,
	`${scopeBaseUrl}drive.file`
];

export const getGoogleAuth = () => {
	const authUrl = oAuth2Client.generateAuthUrl({
		access_type: 'offline',
		scope
	});

	shell.openExternal(authUrl);
};

export const getToken = async (code: string) => {
	try {
		const { tokens } = await oAuth2Client.getToken(code);
		return tokens;
	} catch (err) {
		console.log('Error retrieving access token for Google Drive', err);
		return {};
	}
};

//need to try authenticating upon opening notebook

export const setGoogleAuth = (tokens: any) => {
	oAuth2Client.setCredentials(tokens);
	drive = google.drive({
		version: 'v3',
		auth: oAuth2Client
	});
};

export const listFiles = () => {
	drive.files.list(
		{
			// pageSize: 10,
			q: 'trashed=false',
			fields: 'nextPageToken, files(id, name)',
			spaces: 'drive'
		},
		(err: any, res: any) => {
			if (err) return console.log('The API returned an error: ' + err);
			const files = res.data.files;
			if (files.length) {
				console.log('Files:');
				files.map((file: any) => {
					console.log(`${file.name} (${file.id})`);
				});
			} else {
				console.log('No files found.');
			}
		}
	);
};

export const searchForFolder = async (name: string) => {
	try {
		const res = await drive.files.list({
			q: `name = '${name}' and mimeType = 'application/vnd.google-apps.folder' and trashed=false`,
			fields: 'nextPageToken, files(id, name)',
			spaces: 'drive'
		});
		return res.data.files;
	} catch (error) {
		return console.log(error);
	}
};

type fileMetadata = {
	id?: string;
	name: string;
	mimeType: string;
	parents?: [string];
};

export const createAFolder = async (folder: any, parentId: string = '') => {
	try {
		let metadata: fileMetadata;

		metadata = {
			name: folder.name,
			mimeType: 'application/vnd.google-apps.folder'
		};

		if (parentId) {
			metadata.parents = [parentId];
		}

		const res = await drive.files.create({
			requestBody: metadata,
			fields: 'id'
		});

		return res.data as any;
	} catch (error) {
		return console.log(error);
	}
};

export const createAFile = async (file: any, parentId: string) => {
	try {
		let metadata: fileMetadata = {
			name: file.name,
			mimeType: file.mimeType,
			parents: [parentId]
		};
		let media = {
			mimeType: file.mimeType,
			body: fs.createReadStream(file.absolutePath)
		};

		const res = await drive.files.create({
			requestBody: metadata,
			media: media,
			fields: 'id'
		});

		return res.data as any;
	} catch (error) {
		console.log(error);
	}
};

const uploadEntireNotebook = async (notebookItems: any, parentId: string) => {
	if (
		notebookItems.mimeType === 'Notebook' ||
		notebookItems.mimeType === 'Folder'
	) {
		await createAFolder(notebookItems, parentId)
			.then(async (res) => {
				notebookItems.ids.googleDrive = res.id;
				for (let item of notebookItems.subFolder) {
					item = await uploadEntireNotebook(
						item,
						notebookItems.ids.googleDrive
					);
				}
			})
			.catch((err) => console.log(err));
	} else if (notebookItems.mimeType) {
		await createAFile(notebookItems, parentId)
			.then((res) => {
				notebookItems.ids.googleDrive = res.id;
			})
			.catch((err) => console.log(err));
	}
	return notebookItems;
};

export const initializeGoogleDrive = () => {
	searchForFolder(ROOT_DRIVE_FOLDER_NAME).then(async (folders) => {
		if (!folders || !folders.length) {
			// Folder doesn't exist, creating a new one
			let notebookLocation = '/Users/jasonxie/Desktop/PrivaNote Notebook';
			let notebookItems: any = createNotebookStructure(notebookLocation);
			await createAFolder({ name: ROOT_DRIVE_FOLDER_NAME })
				.then(async (res) => {
					ROOT_DRIVE_FOLDER_ID = res.id;
					notebookItems = await uploadEntireNotebook(
						notebookItems,
						ROOT_DRIVE_FOLDER_ID
					);
				})
				.catch((err) => console.log(err));

			const name = 'notebookStructure.json';
			const exportFile: FileItem = {
				name: name,
				path: `${notebookLocation}/.privanote/${name}`
			};

			saveFile(exportFile, JSON.stringify(notebookItems));
		} else {
			// synchronize google drive with current files
			// createAFolder(ROOT_DRIVE_FOLDER_NAME, nanoid())
			// 	.then((res) => console.log(res))
			// 	.catch((err) => console.log(err));
		}
	});
};
