import { createAFolder } from './createAFolder';
import { createAFile } from './createAFile';

export const uploadEntireNotebook = async (
	notebookItems: any,
	parentId: string
) => {
	if (
		notebookItems.mimeType === 'Notebook' ||
		notebookItems.mimeType === 'Folder'
	) {
		await createAFolder(notebookItems, parentId)
			.then(async (res) => {
				notebookItems.ids.googleDrive = res.id;
				for (let item of notebookItems.subFolder) {
					item = await uploadEntireNotebook(
						item,
						notebookItems.ids.googleDrive
					);
				}
			})
			.catch((err) => console.log(err));
	} else if (notebookItems.mimeType) {
		await createAFile(notebookItems, parentId)
			.then((res) => {
				notebookItems.ids.googleDrive = res.id;
			})
			.catch((err) => console.log(err));
	}
	return notebookItems;
};
