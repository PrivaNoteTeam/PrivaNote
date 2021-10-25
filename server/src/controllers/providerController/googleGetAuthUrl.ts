import { Request, Response } from 'express';
import { getAuthUrl } from '../../services/googleDrive';
export const googleGetAuthUrl = (_: Request, res: Response) => {
    const authUrl = getAuthUrl();

    res.send(authUrl)
}