import { removeConnectedProvider } from '@shared/utils/synchronization/removeConnectedProvider';
import fs from 'fs';
import { getDrive } from './setup';

type fileMetadata = {
	id?: string;
	name: string;
	mimeType: string;
	parents?: [string];
};

export const createAFile = async (file: any, parentId: string) => {
	try {
		let metadata: fileMetadata = {
			name: file.name,
			mimeType: file.mimeType,
			parents: [parentId]
		};
		let media = {
			mimeType: file.mimeType,
			body: fs.createReadStream(file.absolutePath)
		};

		const res = await getDrive().files.create({
			requestBody: metadata,
			media: media,
			fields: 'id'
		});

		return res.data as any;
	} catch (error) {
		console.log(error);
		removeConnectedProvider('Google Drive');
	}
};
