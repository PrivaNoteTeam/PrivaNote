import React from 'react';
import { useNode } from './node/useNode';
import { FileSystemItem } from '@types';
import DirectoryIcon from '@assets/icons/folder-f.svg';
import NoteIcon from '@assets/icons/file.svg';
import AttachmentIcon from '@assets/icons/attachment.svg';

interface Props {
	item: FileSystemItem;
	depth?: number;
}

export function Node({ item }: Props) {
	const {} = useNode({ item });

	let icon: JSX.Element;

	switch (item.type) {
		case 'directory':
			icon = <DirectoryIcon />;
			break;
		case 'note':
			icon = <NoteIcon />;
			break;
		case 'attachment':
			icon = <AttachmentIcon />;
			break;
	}

	return <></>;
}
