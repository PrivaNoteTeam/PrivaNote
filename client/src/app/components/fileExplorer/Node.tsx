import React, { CSSProperties } from 'react';
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

	return <></>;
}
