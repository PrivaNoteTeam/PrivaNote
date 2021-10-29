import { useEditorDrop } from '@hooks';
import React, { PropsWithChildren, DragEvent, useCallback } from 'react';
import { useDropzone, DropzoneOptions, DropEvent } from 'react-dropzone';

type OnDrop = DropzoneOptions['onDrop'];

interface Props {
	className?: string;
}

export function Dropzone({ className, children }: PropsWithChildren<Props>) {
	const { drop } = useEditorDrop();
	const onDrop: OnDrop = useCallback((acceptedFiles, _, event: DropEvent) => {
		// not type safe: need to discriminate DragEvent from DropEvent
		let dragEvent = event as DragEvent;
		drop(acceptedFiles, [dragEvent.pageX, dragEvent.pageY]);
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
