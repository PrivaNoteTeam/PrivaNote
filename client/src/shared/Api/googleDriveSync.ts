import { google } from 'googleapis';
import credentials from '../../googleCredentials.json';

const clientId = credentials.web.client_id;
const clientSecret = credentials.web.client_secret;
const redirect_uris = credentials.web.redirect_uris;

const oAuth2Client = new google.auth.OAuth2(
	clientId,
	clientSecret,
	redirect_uris[0]
);

let drive: any;

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
			pageSize: 10,
			fields: 'nextPageToken, files(id, name)'
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
