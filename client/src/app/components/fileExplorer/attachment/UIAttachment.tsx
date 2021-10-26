import React from 'react';
import AttachmentIcon from '@assets/icons/attachment.svg';
import { useEditorStore } from '@hooks';
import { FileSystemItem } from '@types';

interface Props {
	depth: number;
	item: FileSystemItem;
}

export function UIAttachment({ depth, item }: Props) {
	const [{ primarySelection, secondarySelection }] = useEditorStore();

	let style = '';

	if (secondarySelection?.path === item.path) {
		style = 'border-blue-500 border-opacity-70 border-2';
	} else if (primarySelection?.path === item.path) {
		style =
			'bg-blue-500 border-blue-300 border bg-opacity-30 border-opacity-30';
	} else {
		style = 'hover:bg-opacity-30 hover:bg-gray-700 border-transparent';
	}

	return (
		<div
			style={{ paddingLeft: `${depth + 2}rem` }}
			className={`flex select-none cursor-pointer py-0.5 align-bottom ${style} `}
		>
			<AttachmentIcon fill='#9CA3AF' className='self-end w-5 mr-1' />
		</div>
	);
}
