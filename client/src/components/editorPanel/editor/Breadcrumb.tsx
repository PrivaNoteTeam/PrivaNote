import React from 'react';
import { FileItem } from '../../../types';
import ChevronIcon from '../../../assets/icons/chevron-right.svg';
import { useRelativePath } from '../../../utils/useRelativePath';

interface Props {
	currentFile: FileItem;
	currentNotebook: string;
	unSaved: boolean;
}

export function Breadcrumb({ currentFile, currentNotebook, unSaved }: Props) {
	const parts = useRelativePath(currentNotebook, currentFile.path).split(
		/[\/\\]/
	);

	const render = parts.map((part, i) => {
		let text = part;

		if (i === parts.length - 1) {
			text = unSaved ? currentFile.name.concat('*') : currentFile.name;
		}

		return (
			<div className='flex'>
				{i !== 0 && (
					<ChevronIcon fill='#9CA3AF' className='self-baseline' />
				)}
				<p className='text-gray-400 self-center select-none'>{text}</p>
			</div>
		);
	});

	return (
		<div className='bg-gray-900 pn-drop-shadow flex py-1 px-4'>
			{render}
		</div>
	);
}
