import { removeConnectedProvider } from '@shared/utils/synchronization/removeConnectedProvider';
import fs from 'fs';
import p from 'path';
import { getDrive } from '@googleDrive';
import { getNotebookParentLocation } from '@shared/notebook';
import { NotebookItem } from '@types';

export const updateAFile = async (file: NotebookItem) => {
	try {
		let res: any;

		let metadata = {
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
				fileId: file.cloudIds.googleDrive,
				requestBody: metadata,
				media: media,
				fields: 'id'
			});
		} else {
			res = await getDrive().files.update({
				fileId: file.cloudIds.googleDrive,
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
