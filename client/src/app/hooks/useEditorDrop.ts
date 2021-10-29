export function useEditorDrop() {
	const drop = (files: any[], cursorPosition: [x: number, y: number]) => {
		console.log(files);
		console.log(cursorPosition);
	};

	const insert = (text: string, cursorPosition: [x: number, y: number]) => {
		console.log(text, cursorPosition);
	};

	return { drop, insert };
}
