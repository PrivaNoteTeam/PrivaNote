import React, { useEffect } from 'react';
import UserCircleIcon from '../../assets/icons/user-circle.svg';
import { ipcRenderer } from 'electron';
import { useModalStore } from '../../hooks';

let signedIn = true;

export function UserButton() {
	const [{ loginModalVisible }, modalManagerDispatch] = useModalStore();
	const handleClick = () => {
		if (!signedIn) {
			modalManagerDispatch({
				type: 'loginModal',
				loginModalVisible: !loginModalVisible
			});
		} else {
			ipcRenderer.send('openUserContextMenu');
		}
	};

	useEffect(() => {
		ipcRenderer.on('signOut', () => (signedIn = false));
	}, [signedIn]);

	return (
		<div className='text-gray-500 hover:text-gray-400'>
			<UserCircleIcon className='cursor-pointer' onClick={handleClick} />
		</div>
	);
}
