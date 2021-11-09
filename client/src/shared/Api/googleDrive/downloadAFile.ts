import fs from 'fs';
import { getDrive } from './setup';

export const downloadAFile = async (file: any, destination: string = '') => {
	try {
		if (destination) {
			let dest = fs.createWriteStream(destination);
			const res = await getDrive().files.get(
				{
					fileId: file.ids.googleDrive,
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
				fileId: file.ids.googleDrive,
				alt: 'media'
			});

			return res.data as any;
		}
	} catch (error) {
		console.log(error);
		// removeConnectedProvider('Google Drive');
	}
};
