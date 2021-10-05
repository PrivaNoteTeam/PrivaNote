import React from 'react';
import { FileItem } from '../../../types';
import ChevronIcon from '../../../assets/icons/chevron-right.svg';

interface Props {
	currentFile: FileItem;
	unSaved: boolean;
}

export function Breadcrumb({ currentFile, unSaved }: Props) {
	const parts = currentFile.path.split(/[\/\\]/);

	const render = parts.map((part, i) => {
		let text = part;

		if (i === parts.length - 1) {
			text = unSaved ? currentFile.name.concat('*') : currentFile.name;
		} //py-1 px-4

		return (
			<div className='flex'>
				{i !== 0 && (
					<ChevronIcon fill='#9CA3AF' className='self-end w-5 mr-1' />
				)}
				<p className='text-gray-400'>{text}</p>
			</div>
		);
	});

	return <div className='bg-gray-900 pn-drop-shadow flex'>{render}</div>;
}
