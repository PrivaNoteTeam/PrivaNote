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
		let metadata: fileMetadata = {
			name: file.name,
			mimeType: file.mimeType
		};
		let media = {
			mimeType: file.mimeType,
			body: fs.createReadStream(file.absolutePath)
		};

		const res = await getDrive().files.update({
			fileId: file.ids.googleDrive,
			requestBody: metadata,
			media: media,
			fields: 'id'
		});

		return res.data as any;
	} catch (error) {
		console.log(error);
	}
};
