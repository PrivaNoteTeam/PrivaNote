import React from 'react';
import { UIPreview } from './preview/UIPreview';
import { usePreview } from './preview/usePreview';

interface Props {
	text: string;
}

export function Preview({ text }: Props) {
	const html = usePreview(text);

	return <UIPreview content={html} />;
}
