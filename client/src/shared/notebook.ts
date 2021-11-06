let notebookName = '';
let notebookLocation = '';

// This is similar to the useStore() in the react app but for electron
export const setNotebook = (location: string) => {
	let path =
		location.slice(-1) === '/'
			? location.substr(0, location.length - 1)
			: location;
	let name = path.split('/').pop()!;

	notebookName = name;
	notebookLocation = location;
};

export const getNotebookName = () => {
	return notebookName;
};

export const getNotebookLocation = () => {
	return notebookLocation;
};
