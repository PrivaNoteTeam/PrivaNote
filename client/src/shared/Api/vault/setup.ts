import { getUser } from '../getUser';

export const isConnected = async () => {
	try {
		const userResponse = await getUser();

		if (userResponse && userResponse.message === 'no authenticated user') {
			console.log(userResponse.message);
			return false;
		}
		return true;
	} catch (err) {
		console.log('Error at isConnected from setup.ts', err);
		return false;
	}
};
