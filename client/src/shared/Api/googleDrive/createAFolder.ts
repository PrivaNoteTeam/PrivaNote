import { removeConnectedProvider } from '@synchronization';
import { getDrive } from '@googleDrive';
import { NotebookItem } from '@types';

export const createAFolder = async (
	folder: NotebookItem,
	parentFolder?: NotebookItem
) => {
	try {
		let metadata: any = {
			name: folder.name,
			mimeType: 'application/vnd.google-apps.folder'
		};

		if (parentFolder && parentFolder.cloudIds.googleDrive) {
			metadata.parents = [parentFolder.cloudIds.googleDrive];
		}

		const res = await getDrive().files.create({
			requestBody: metadata,
			fields: 'id'
		});

		return res.data as any;
	} catch (error) {
		console.log(`createAFolder for ${folder.name}`);
		console.log(error);
		removeConnectedProvider('Google Drive');
	}
};
