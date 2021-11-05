let notebookName = '';
let notebookLocation = '';

// This is similar to the useStore() in the react app.
// It holds global variables for notebook opened for electron
// This does not work in react app when either directly or indirectly
// This functions will only work in electron
export const setNotebook = (location: string) => {
	let path =
		location.slice(-1) === '/'
			? location.substr(0, location.length - 1)
			: location;
	let name = path.split('/').pop()!;

	notebookName = name;
	notebookLocation = location;

	console.log(notebookName);
	console.log(notebookLocation);
};

export const getNotebookName = () => {
	return notebookName;
};

export const getNotebookLocation = () => {
	return notebookLocation;
};
