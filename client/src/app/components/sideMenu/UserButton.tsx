import React, { useEffect } from 'react';
import UserCircleIcon from '../../assets/icons/user-circle.svg';
import LoginIcon from '@assets/icons/log-in.svg';
import { ipcRenderer } from 'electron';
import { useUserStore, useModalStore } from '@hooks';

export function UserButton() {
	const [{ loginModalVisible }, modalManagerDispatch] = useModalStore();
	const [{ user }, userDispatch] = useUserStore();
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
		});
	}, [user]);

	return (
		<>
			{ user ? 
				<div className='text-gray-500 hover:text-gray-400'>
					<UserCircleIcon onClick={handleClick} className='cursor-pointer' />
				</div>
			:
				<div className='text-gray-500 hover:text-gray-400'>
					<LoginIcon onClick={handleClick} className='w-9' width={undefined} height={undefined} />
				</div>
			}
		
		</>
	)
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