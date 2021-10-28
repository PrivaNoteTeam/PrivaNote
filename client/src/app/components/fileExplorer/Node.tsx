import React from 'react';
import { UINode } from './node/UINode';
import { useNode } from './node/useNode';
import { FileSystemItem } from '@types';
import DirectoryIcon from '@assets/icons/folder-f.svg';
import NoteIcon from '@assets/icons/file.svg';
import AttachmentIcon from '@assets/icons/attachment.svg';

interface Props {
	item: FileSystemItem;
	depth?: number;
}

export function Node({ item, depth = 0 }: Props) {
	const { opened, foldable, primarySelected, secondarySelected, children } =
		useNode({ item });

	let icon: JSX.Element;
	const iconStyle = {
		fill: '#9CA3AF',
		className: 'self-end w-5 mr-1 align-bottom'
	};

	switch (item.type) {
		case 'directory':
			icon = <DirectoryIcon {...iconStyle} />;
			break;
		case 'note':
			icon = <NoteIcon {...iconStyle} />;
			break;
		case 'attachment':
			icon = <AttachmentIcon {...iconStyle} />;
			break;
	}

	return (
		<UINode
			children={children}
			icon={icon}
			depth={depth}
			name={item.name}
			foldable={foldable}
			opened={opened}
			primarySelected={primarySelected}
			secondarySelected={secondarySelected}
		/>
	);
}
