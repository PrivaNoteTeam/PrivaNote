import React, { useEffect } from 'react';
import UserCircleIcon from '../../assets/icons/user-circle.svg';
import LoginIcon from '@assets/icons/arrow-circle-right.svg';
import { ipcRenderer } from 'electron';
import { useUserStore, useModalStore, useNotificationQueue } from '@hooks';

export function UserButton() {
	const [{ loginModalVisible }, modalManagerDispatch] = useModalStore();
	const [{ user }, userDispatch] = useUserStore();
	const [, notify] = useNotificationQueue();

	const handleClick = () => {
		if (!user) {
			modalManagerDispatch({
				type: 'loginModal',
				loginModalVisible: !loginModalVisible
			});
		} else {
			ipcRenderer.send('openUserContextMenu', user);
		}
	};

	useEffect(() => {
		ipcRenderer.on('logout', () => {
			userDispatch({ type: 'logout' });
			notify({
				message: 'Successfully signed out of your account',
				style: 'success'
			});
		});
	}, [user]);

	return (
		<>
			{user ? (
				<div className='text-gray-500 hover:text-gray-400 cursor-pointer'>
					<UserCircleIcon
						onClick={handleClick}
						className='cursor-pointer w-8'
						width={undefined}
						height={undefined}
					/>
				</div>
			) : (
				<div className='text-gray-500 hover:text-gray-400 cursor-pointer'>
					<LoginIcon
						onClick={handleClick}
						className='w-8'
						width={undefined}
						height={undefined}
					/>
				</div>
			)}
		</>
	);
}

/*

		{ user ? (
			<div className='text-gray-500 hover:text-gray-400'>	
				<UserCircleIcon className='cursor-pointer' onClick={handleClick} /> 
			</div>)
		:
			<div></div>
		}
	);
*/
