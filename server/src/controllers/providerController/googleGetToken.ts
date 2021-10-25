import { Request, Response } from 'express';
import { getToken } from '../../services/googleDrive';
export const googleGetToken = async (req: Request, res: Response) => {
    if (!req.query.code) return res.status(400).send('Invalid request');
    
    const { accessToken, idToken } = await getToken(req.query.code as string);

    if (!idToken || !accessToken) {
        res.status(400).send('Error retrieving access token for Google Drive');
        return;
    }

    res.redirect(`privanote://google-drive/auth?accessToken=${accessToken}&idToken=${idToken}`);
    
    return;
}