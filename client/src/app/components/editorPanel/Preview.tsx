import React from 'react';
import { UIPreview } from './preview/UIPreview';
import { usePreview } from './preview/usePreview';

interface Props {
	text: string;
	onClose: () => void;
}

export function Preview({ text, onClose }: Props) {
	const html = usePreview(text);

	return <UIPreview content={html} handleClose={onClose} />;
}
