import axios from 'axios';

export const createANotebook = async () => {
	const notebook = {
		name: 'Notebook Name'
	};
	return new Promise<void>((_, reject) => {
		axios
			.post('http://localhost:8080/api/vault/notebook', {
				notebook
			})
			.then((response) => {
				console.log(response);
			})
			.catch((err) => {
				reject(err);
			});
	});
};
