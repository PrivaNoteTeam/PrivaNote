import React from 'react';
import './theme.css';
import CloseIcon from '@assets/icons/close.svg';

interface Props {
	content: any;
	handleClose: () => void;
}

export function UIPreview({ content, handleClose }: Props) {
	return (
		<div className='flex flex-col w-full h-full'>
			<div className='relative flex justify-between bg-gray-900 pn-drop-shadow flex py-1 px-4'>
				<p className='text-gray-500'>Preview</p>{' '}
				<CloseIcon
					onClick={handleClose}
					className='cursor-pointer'
					fill='#4B5563'
				/>
			</div>
			<div
				id='wrapper'
				className='flex-grow pn-drop-shadow bg-gray-900 p-8 text-white overflow-y-auto'
			>
				{content}
			</div>
		</div>
	);
}
