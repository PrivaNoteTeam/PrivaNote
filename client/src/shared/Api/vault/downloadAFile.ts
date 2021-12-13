import { decryptFile } from '@shared/data/encryption';
import { removeConnectedProvider } from '@synchronization';
import { NotebookItem } from '@types';
import axios from 'axios';
import fs from 'fs';

export const downloadAFile = async (
	file: NotebookItem,
	destination?: string
) => {
	try {
		const res: any = await axios.get(
			'https://privanote.herokuapp.com/api/vault/download',
			{
				params: {
					itemId: file.id
				}
			}
		);

		if (!res.data)
			throw Error('Error download from PrivaNote Vault: \n' + res);

		if (destination) {
			let dest = fs.createWriteStream(destination);
			dest.write(decryptFile(res.data.content));
			return;
		} else {
			return decryptFile(res.data.content).toString();
		}
	} catch (error) {
		console.log('FROM downloadAFile: \n', error);
		if (
			error.response.status === 400 &&
			error.response.data.indexOf('could not be downloaded.') != -1
		) {
			console.log(error.response.data);
		} else {
			removeConnectedProvider('PrivaNote Vault');
		}
		return;
	}
};
