import p from 'path';

let notebookName = '';
let notebookLocation = '';

// This is similar to the useStore() in the react app but for electron
export const setNotebook = (location: string) => {
	let path =
		location.slice(-1) === p.sep
			? location.substr(0, location.length - 1)
			: location;
	let name = path.split(p.sep).pop()!;

	notebookName = name;
	notebookLocation = location;
};

export const getNotebookName = () => {
	return notebookName;
};

export const getNotebookLocation = () => {
	return notebookLocation;
};

export const getNotebookParentLocation = () => {
	return notebookLocation.substr(
		0,
		notebookLocation.indexOf(p.sep + notebookName)
	);
};
