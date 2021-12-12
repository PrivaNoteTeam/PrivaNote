import { removeConnectedProvider } from '@synchronization';
import fs from 'fs';
import p from 'path';
import { getNotebookParentLocation } from '@shared/notebook';
import { getDrive } from '@googleDrive';
import { NotebookItem } from '@types';

export const createAFile = async (
	file: NotebookItem,
	parentFolder: NotebookItem
) => {
	try {
		let absolutePath = p.join(getNotebookParentLocation(), ...file.paths);

		let metadata: any = {
			name: file.name,
			mimeType: file.mimeType,
			parents: [parentFolder.cloudIds.googleDrive]
		};
		let media = {
			mimeType: file.mimeType,
			body: fs.createReadStream(absolutePath)
		};

		const res = await getDrive().files.create({
			requestBody: metadata,
			media: media,
			fields: 'id'
		});

		return res.data as any;
	} catch (error) {
		console.log(`createFileError for ${file.name}`);
		console.log(error);
		removeConnectedProvider('Google Drive');
	}
};
