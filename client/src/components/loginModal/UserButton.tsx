import React from 'react';
import UserCircleIcon from '../../assets/icons/user-circle.svg';

interface Props {
	authModalVisible: boolean;
	setAuthModalVisible: React.Dispatch<boolean>;
}

export function UserButton({ authModalVisible, setAuthModalVisible }: Props) {
	const handleClick = () => {
		setAuthModalVisible(!authModalVisible);
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
