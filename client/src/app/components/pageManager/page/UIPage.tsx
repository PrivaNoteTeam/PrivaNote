import React, { PropsWithChildren } from 'react';
import CloseIcon from '@assets/icons/close.svg';

interface Props {
	handleCloseClick: () => void;
}

export function UIPage({
	handleCloseClick,
	children
}: PropsWithChildren<Props>) {
	return (
		<div
			className='absolute w-screen h-screen backdrop-blur-3xl flex justify-center'
			data-testid='page-bg-div'
		>
			<div className='relative p-4 w-full sm:w-3/4 md:1/2 md:max-w-screen-md h-full bg-gray-800 border-r border-l border-gray-700'>
				<div
					onClick={handleCloseClick}
					className='flex justify-end text-gray-400 hover:text-gray-300 cursor-pointer'
				>
					<CloseIcon fill='#9CA3AF' />
				</div>
				<div className='p-4'>{children}</div>
			</div>
		</div>
	);
}
