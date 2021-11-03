import { shell } from 'electron';
import { google } from 'googleapis';
import credentials from '../../../googleCredentials.json';

const clientId = credentials.web.client_id;
const clientSecret = credentials.web.client_secret;
const redirect_uris = credentials.web.redirect_uris;
// const ROOT_DRIVE_FOLDER_NAME = 'privanote';
// let ROOT_DRIVE_FOLDER_ID = '';

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

export const getDrive = () => {
	return drive;
};
