import React, { PropsWithChildren, DragEvent, useCallback } from 'react';
import { useDropzone, DropzoneOptions, DropEvent } from 'react-dropzone';

type OnDrop = DropzoneOptions['onDrop'];

interface Props {
	className?: string;
	onDrop: (files: any[], cursorPosition: [number, number]) => void;
}

export function Dropzone({
	className,
	children,
	onDrop: handleDrop
}: PropsWithChildren<Props>) {
	const onDrop: OnDrop = useCallback((acceptedFiles, _, event: DropEvent) => {
		// not type safe: need to discriminate DragEvent from DropEvent
		let dragEvent = event as DragEvent;
		handleDrop(acceptedFiles, [dragEvent.pageX, dragEvent.pageY]);
	}, []);

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		noClick: true
	});

	return (
		<div
			className={`w-full h-full ${
				isDragActive && 'border-2 border-blue-500'
			} ${className}`}
			{...getRootProps()}
		>
			<input {...getInputProps()} />
			{children}
		</div>
	);
}
