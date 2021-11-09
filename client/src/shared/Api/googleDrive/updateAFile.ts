import { removeConnectedProvider } from '@shared/utils/synchronization/removeConnectedProvider';
import fs from 'fs';
import { getDrive } from './setup';

type fileMetadata = {
	id?: string;
	name: string;
	mimeType: string;
	parents?: [string];
};

export const updateAFile = async (file: any) => {
	try {
		let res: any;

		let metadata: fileMetadata = {
			name: file.name,
			mimeType: file.mimeType
		};

		if (file.mimeType != 'Folder') {
			let media = {
				mimeType: file.mimeType,
				body: fs.createReadStream(file.absolutePath)
			};

			res = await getDrive().files.update({
				fileId: file.ids.googleDrive,
				requestBody: metadata,
				media: media,
				fields: 'id'
			});
		} else {
			res = await getDrive().files.update({
				fileId: file.ids.googleDrive,
				requestBody: metadata,
				fields: 'id'
			});
		}

		return res.data as any;
	} catch (error) {
		console.log(error);
		removeConnectedProvider('Google Drive');
	}
};
