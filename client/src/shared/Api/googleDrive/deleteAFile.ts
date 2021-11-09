import { removeConnectedProvider } from '@shared/utils/synchronization/removeConnectedProvider';
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
	}
};
