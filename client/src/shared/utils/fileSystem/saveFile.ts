import fs from 'fs';
import { FileItem } from '../../types';
import { saveItemToStructure } from '../synchronization/saveItemToStructure';

export function saveFile(
	file: FileItem,
	content: string,
	notebook: any = undefined
) {
	fs.writeFileSync(file.path, content);
	if (notebook) {
		saveItemToStructure(file.path, notebook);
	}
}
