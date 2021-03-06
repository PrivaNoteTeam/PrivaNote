import React, { PropsWithChildren } from 'react';
import CloseIcon from '../../assets/icons/close.svg';

interface Props {
	close: () => void;
}

export function ModalLayout({ close, children }: PropsWithChildren<Props>) {
	const handleClick = () => close();

	return (
		<div className='fixed left-0 top-0 w-full h-full bg-opacity-30 flex justify-center backdrop-blur-3xl z-10'>
			<div className='relative p-8 rounded-md bg-gray-800 flex flex-col m-auto border border-gray-700'>
				<div className='flex justify-end'>
					<div
						onClick={handleClick}
						className='cursor-pointer text-gray-500 hover:text-gray-300'
					>
						<CloseIcon fill='#9CA3AF' />
					</div>
				</div>
				<div>{children}</div>
			</div>
		</div>
	);
}
