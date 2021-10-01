import fs from 'fs';

export function createFile(path: string) {
	let count = 0;
	let filename = 'Untitled.md';

	while (fs.existsSync(`${path}/${filename}`)) {
		filename = `Untitled (${++count}).md`;
	}

	const absolutePath = `${path}/${filename}`;

	fs.writeFileSync(absolutePath, '');

	return absolutePath;
}
