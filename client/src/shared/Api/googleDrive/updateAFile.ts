import { removeConnectedProvider } from '@shared/utils/synchronization/removeConnectedProvider';
import fs from 'fs';
import p from 'path';
import { getDrive } from './setup';
import { getNotebookParentLocation } from '@shared/notebook';

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

		let absolutePath = p.join(getNotebookParentLocation(), ...file.paths);

		if (file.mimeType != 'Folder') {
			let media = {
				mimeType: file.mimeType,
				body: fs.createReadStream(absolutePath)
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
		console.log(`updateAFile Error for ${file.name}`);
		console.log(error);
		removeConnectedProvider('Google Drive');
	}
};
