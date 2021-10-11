import React from 'react';
import UserCircleIcon from '../../assets/icons/user-circle.svg';
import { ipcRenderer } from 'electron';

interface Props {
	authModalVisible: boolean;
	setAuthModalVisible: React.Dispatch<boolean>;
}

const signedIn = true;

export function UserButton({ authModalVisible, setAuthModalVisible }: Props) {
	const handleClick = () => {
		if (!signedIn) {
			setAuthModalVisible(!authModalVisible);
		} else {
			ipcRenderer.send('openUserContextMenu');
		}
	};

	return (
		<div className='cursor-pointer'>
			<UserCircleIcon
				fill='#566573'
				className='cursor-pointer'
				onClick={handleClick}
			/>
		</div>
	);
}
