import React, { PropsWithChildren } from 'react';
import CloseIcon from '../assets/icons/close.svg';

export function ModalLayout({ children }: PropsWithChildren<{}>) {
	return (
		<div className='absolute w-full h-full bg-black bg-opacity-50 flex justify-center'>
			<div className='relative p-8 rounded-md bg-gray-800 flex flex-col m-auto'>
				<div className='flex justify-end'>
					<CloseIcon fill='#9CA3AF' />
				</div>
				<div>{children}</div>
			</div>
		</div>
	);
}
