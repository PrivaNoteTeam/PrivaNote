import React from 'react';
import { UserButton } from './sideMenu/UserButton';

export function SideMenu() {
	return (
		<div className='flex flex-col-reverse bg-gray-700 p-4'>
			<UserButton />
		</div>
	);
}
