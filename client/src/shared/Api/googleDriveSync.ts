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

export const getToken = async (code: string) => {
	try {
		const tokens = await oAuth2Client.getToken(code);

		return tokens;
		// console.log(response);

		// const { access_token: accessToken, id_token: idToken } =
		// 	response.tokens;

		// return { accessToken, idToken };
	} catch (err) {
		console.log('Error retrieving access token for Google Drive', err);
		return {};
	}
};
