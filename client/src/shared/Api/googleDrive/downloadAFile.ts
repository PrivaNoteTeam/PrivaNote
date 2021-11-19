import fs from 'fs';
import { getDrive } from '@googleDrive';
import { NotebookItem } from '@types';

export const downloadAFile = async (
	file: NotebookItem,
	destination: string = ''
) => {
	try {
		if (destination) {
			let dest = fs.createWriteStream(destination);
			const res = await getDrive().files.get(
				{
					fileId: file.cloudIds.googleDrive,
					alt: 'media'
				},
				{ responseType: 'stream' }
			);
			res.data
				.on('end', () => {
					console.log('Done');
				})
				.on('error', (err: any) => {
					console.log('error during downloading:\n', err);
				})
				.pipe(dest);
		} else {
			const res = await getDrive().files.get({
				fileId: file.cloudIds.googleDrive,
				alt: 'media'
			});

			return res.data as any;
		}
	} catch (error) {
		console.log(error);
		// removeConnectedProvider('Google Drive');
	}
};
