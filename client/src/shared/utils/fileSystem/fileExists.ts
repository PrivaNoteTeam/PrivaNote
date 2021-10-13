import fs from 'fs';

export const fileExist = (path: string | undefined) => fs.existsSync(path!);
