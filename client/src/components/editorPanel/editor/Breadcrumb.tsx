import React from 'react';
import { FileItem, FileSystemItem } from '../../../types';
import ChevronIcon from '../../../assets/icons/chevron-right.svg';
import { useRelativePath } from '../../../utils/useRelativePath';
import { isFile } from '../../../utils/isFile';

interface Props {
	currentFile: FileItem;
	currentNotebook: string;
	unSaved: boolean;
	setSelection: React.Dispatch<FileSystemItem | undefined>;
}

export function Breadcrumb({
	currentFile,
	currentNotebook,
	unSaved,
	setSelection
}: Props) {
	const parts = useRelativePath(currentNotebook, currentFile.path).split(
		/[\/\\]/
	);

	const render = parts.map((part, i) => {
		const handleDirectoryClick = () => {
			let path = parts
				.slice(0, i + 1)
				.join('/')
				.replace(/^/, currentNotebook.concat('/'));

			setSelection({
				name: part,
				path,
				type: isFile(path) ? 'note' : 'directory'
			});
		};

		let text = part;

		if (i === parts.length - 1) {
			text = unSaved ? currentFile.name.concat('*') : currentFile.name;
		}

		return (
			<div className='flex'>
				{i !== 0 && (
					<ChevronIcon fill='#9CA3AF' className='self-baseline' />
				)}
				<p
					onClick={handleDirectoryClick}
					className='text-gray-400 self-center select-none hover:text-white cursor-pointer'
				>
					{text}
				</p>
			</div>
		);
	});

	return (
		<div className='bg-gray-900 pn-drop-shadow flex py-1 px-4'>
			{render}
		</div>
	);
}
