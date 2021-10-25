import { google } from 'googleapis';
import credentials from '../googleCredentials.json';

const clientId = credentials.web.client_id;
const clientSecret = credentials.web.client_secret;
const redirect_uris = credentials.web.redirect_uris; 

const oAuth2Client = new google.auth.OAuth2(clientId, clientSecret, redirect_uris[0]);

const scopeBaseUrl = 'https://www.googleapis.com/auth/';
const scope = [
    `${scopeBaseUrl}drive.metadata.readonly`,
    `${scopeBaseUrl}userinfo.profile`,
    `${scopeBaseUrl}drive.file`
]

export const getAuthUrl = () => {
    return oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope
    });
}