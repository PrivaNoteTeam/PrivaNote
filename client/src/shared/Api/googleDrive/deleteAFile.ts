import { removeConnectedProvider } from '@shared/utils/synchronization/removeConnectedProvider';
import { dialog } from 'electron';
import { getDrive } from './setup';

export const deleteAFile = async (file: any) => {
	try {
		const res = await getDrive().files.delete({
			fileId: file.ids.googleDrive
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
