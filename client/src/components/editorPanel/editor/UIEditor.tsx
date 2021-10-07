import React from 'react';
import { EditorAction } from '../../../types';
import { Breadcrumb } from './Breadcrumb';

interface Props {
	unsaved: boolean;
	text: string;
	editorDispatch: React.Dispatch<EditorAction>;
	handleChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export function UIEditor({
	unsaved,
	text,
	editorDispatch,
	handleChange
}: Props) {
	return (
		<div className='bg-gray-900 flex-grow flex flex-col'>
			<Breadcrumb unsaved={unsaved} editorDispatch={editorDispatch} />
			<div className='overflow-auto flex-grow w-full'>
				<textarea
					onChange={handleChange}
					value={text}
					className='w-full h-full bg-transparent outline-none border-none text-gray-200 font-mono p-8 resize-none'
				></textarea>
			</div>
		</div>
	);
}
