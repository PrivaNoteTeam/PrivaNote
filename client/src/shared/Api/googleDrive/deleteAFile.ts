import { removeConnectedProvider } from '@shared/utils/synchronization/removeConnectedProvider';
import { getDrive } from '@googleDrive';
import { NotebookItem } from '@types';

export const deleteAFile = async (file: NotebookItem) => {
	try {
		const res = await getDrive().files.delete({
			fileId: file.cloudIds.googleDrive
		});

		return res.data as any;
	} catch (error) {
		console.log(error);
		removeConnectedProvider('Google Drive');
	}
};
