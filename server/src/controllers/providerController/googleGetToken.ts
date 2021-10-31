import { Request, Response } from 'express';
// import { getToken } from '../../services/googleDrive';
export const googleGetToken = async (req: Request, res: Response) => {
	if (!req.query.code) return res.status(400).send('Invalid request');

	// const { accessToken, idToken } = await getToken(req.query.code as string);
	// const tokens = await getToken(req.query.code as string);

	// if (!idToken || !accessToken) {
	// if (!tokens) {
	// 	res.status(400).send('Error retrieving access token for Google Drive');
	// 	return;
	// }

	// console.log(tokens);
	// res.redirect(`privanote://google-drive/auth?accessToken=${accessToken}&idToken=${idToken}`);
	res.redirect(
		`privanote://google-drive/auth?authorizationCode=${req.query.code}`
	);

	return;
};
