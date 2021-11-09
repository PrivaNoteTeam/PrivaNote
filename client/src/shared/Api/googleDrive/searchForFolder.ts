import { getDrive } from './setup';

export const searchForFolder = async (name: string, parentID: string = '') => {
	try {
		let query = `name = '${name}' and mimeType = 'application/vnd.google-apps.folder' and trashed=false`;
		if (parentID) {
			query = `${query} '${parentID}' in parents`;
		}

		const res = await getDrive().files.list({
			q: `name = '${name}' and mimeType = 'application/vnd.google-apps.folder' and trashed=false`,
			fields: 'nextPageToken, files(id, name)',
			spaces: 'drive'
		});
		return res.data.files;
	} catch (error) {
		return console.log(error);
	}
};
