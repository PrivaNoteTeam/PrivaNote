// import { removeConnectedProvider } from '@synchronization';
// import axios from 'axios';

// export const downloadAFile = async (fileId: string) => {
// 	try {
// 		const res = await axios.post(
// 			'http://localhost:8080/api/vault/download-file',
// 			{
// 				fileId
// 			}
// 		);

// 		if (res) {
// 			return res;
// 		} else {
// 			throw Error('Error download from PrivaNote Vault: \n' + res);
// 		}
// 	} catch (error) {
// 		console.log(error);
// 		removeConnectedProvider('PrivaNote Vault');
// 	}
// };
