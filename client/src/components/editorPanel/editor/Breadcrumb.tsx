import React from 'react';
import { FileSystemItem } from '../../../types';
import ChevronIcon from '../../../assets/icons/chevron-right.svg';
import { useRelativePath } from '../../../utils/useRelativePath';
import { isFile } from '../../../utils/isFile';
import { useStore } from '../../../useStore';

interface Props {
	unSaved: boolean;
	setSelection: React.Dispatch<FileSystemItem | undefined>;
}

export function Breadcrumb({ unSaved, setSelection }: Props) {
	const [{ notebook, currentNote }] = useStore();

	const parts = useRelativePath(notebook!, currentNote!.path).split(/[\/\\]/);

	const render = parts.map((part, i) => {
		const handleDirectoryClick = () => {
			let path = parts
				.slice(0, i + 1)
				.join('/')
				.replace(/^/, notebook!.concat('/'));

			setSelection({
				name: part,
				path,
				type: isFile(path) ? 'note' : 'directory'
			});
		};

		let text = part;

		if (i === parts.length - 1) {
			text = unSaved ? currentNote!.name.concat('*') : currentNote!.name;
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
