import { Response, Request } from 'express';
import { updateUserPassword } from '../../database/updateUserPassword';

export const resetPassword = async (req: Request, res: Response) => {
    const user = req.session.user;

    const newPassword: string | undefined = req.body.password;

    if (!user || !newPassword) {
        res.status(200).json({ success: false });
        return;
    }

    const successful = await updateUserPassword(req.ctx!, user.userID, {
        newPassword
    });

    res.status(200).json({ success: successful });
}