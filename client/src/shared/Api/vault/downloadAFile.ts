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
		const res: any = await axios.post(
			'http://localhost:8080/api/vault/download-file',
			{
				fileId: file.id
			}
		);

		if (!res) throw Error('Error download from PrivaNote Vault: \n' + res);

		if (destination) {
			let dest = fs.createWriteStream(destination);
			dest.write(decryptFile(res.content));
			return;
		} else {
			return decryptFile(res.content).toString();
		}
	} catch (error) {
		console.log(error);
		removeConnectedProvider('PrivaNote Vault');
		return;
	}
};
