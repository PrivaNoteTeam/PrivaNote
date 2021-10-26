import React from 'react';
import { FileSystemItem } from '@types';
import { useAttachment } from './attachment/useAttachment';
import { UIAttachment } from './attachment/UIAttachment';

interface props {
	item: FileSystemItem;
	depth?: number;
	renameText: string;
	setRenameText: React.Dispatch<string>;
}

export function Attachment({
	item,
	depth = 0,
	renameText,
	setRenameText
}: props) {
	useAttachment({ item, renameText, setRenameText });
	return <UIAttachment depth={depth} item={item} />;
}
