import { shell } from 'electron';
import { google } from 'googleapis';
import credentials from '../../googleCredentials.json';

const clientId = credentials.web.client_id;
const clientSecret = credentials.web.client_secret;
const redirect_uris = credentials.web.redirect_uris;
const ROOT_DRIVE_FOLDER_NAME = 'privanote';

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

export const createAFolder = async (name: string) => {
	try {
		const res = await drive.files.create({
			requestBody: {
				name: name,
				mimeType: 'application/vnd.google-apps.folder'
			},
			fields: 'id'
		});
		return res.data;
	} catch (error) {
		return console.log(error);
	}
};

export const initializeGoogleDrive = () => {
	searchForFolder(ROOT_DRIVE_FOLDER_NAME).then((folders) => {
		if (!folders || !folders.length) {
			// Folder doesn't exist, creating a new one
			createAFolder(ROOT_DRIVE_FOLDER_NAME);
		} else {
			// start syncing process
		}
	});
};
