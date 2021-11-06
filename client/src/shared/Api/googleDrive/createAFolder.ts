import { removeConnectedProvider } from '@shared/utils/synchronization/removeConnectedProvider';
import { dialog } from 'electron';
import { getDrive } from './setup';

type fileMetadata = {
	id?: string;
	name: string;
	mimeType: string;
	parents?: [string];
};

export const createAFolder = async (folder: any, parentId: string = '') => {
	try {
		let metadata: fileMetadata;

		metadata = {
			name: folder.name,
			mimeType: 'application/vnd.google-apps.folder'
		};

		if (parentId) {
			metadata.parents = [parentId];
		}

		const res = await getDrive().files.create({
			requestBody: metadata,
			fields: 'id'
		});

		return res.data as any;
	} catch (error) {
		console.log(error);
		removeConnectedProvider('Google Drive');
		dialog.showMessageBox({
			message:
				'Google Drive connection is lost. Please reconnect to start syncing again.'
		});
	}
};
