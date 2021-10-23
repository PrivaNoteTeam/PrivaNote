import React from 'react';
import { UserButton } from './sideMenu/UserButton';
import { CloudButton } from './sideMenu/CloudButton';
import { SettingsButton } from './sideMenu/SettingsButton';
import { useStore } from '@hooks';

export function SideMenu() {
	const [{ notebook }] = useStore();
	return (
		<div className='flex flex-col-reverse bg-gray-700 p-3'>
			<div className='space-y-reverse space-y-2 inline-flex flex-col-reverse cursor-pointer'>
				{notebook && <SettingsButton />}
				<UserButton />
				{notebook && <CloudButton status='default' />}
			</div>
		</div>
	);
}
