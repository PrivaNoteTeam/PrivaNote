import React from 'react';
import { useForm } from 'react-hook-form';
import { ModalLayout } from './Modal';
import { TextField } from './TextField';

interface LoginFormValues {
	email: string;
	password: string;
}
interface Props {
	close: () => void;
	setLoginModalVisible: (value: boolean) => void;
	setRegisterModalVisible: (value: boolean) => void;
}
export function LoginModal({
	close,
	setLoginModalVisible,
	setRegisterModalVisible
}: Props) {
	const submitHandler = (e: { preventDefault: () => void }) => {
		e.preventDefault();
	};

	const { register } = useForm<LoginFormValues>();

	const handleClick = () => {
		setLoginModalVisible(false);
		setRegisterModalVisible(true);
	};

	return (
		<ModalLayout close={close}>
			<form onSubmit={submitHandler} className='w-80 space-y-8'>
				<div className='space-y-3'>
					<h2 className='text-center text-2xl text-white select-none'>
						Sign in to your account
					</h2>
					<p className='text-gray-500 text-xs break-words text-center select-none'>
						Signing into a PrivaNote account allows you to{' '}
						<span className='text-gray-400'>
							sync your settings across devices
						</span>{' '}
						and could give you access to the{' '}
						<span className='text-gray-400'>PrivaNote Vault</span>{' '}
						storage.
					</p>
				</div>
				<div className='form-inner'>
					<div className='space-y-6 ...'>
						<TextField name='email' register={register} />
						<TextField
							name='password'
							type='password'
							register={register}
						/>
						<div className='flex justify-between items-end'>
							<a
								href='#'
								onClick={handleClick}
								className='text-blue-500 hover:underline cursor-pointer'
							>
								Not registered?
							</a>
							<input
								type='submit'
								value='Sign in'
								className='pn-button bg-blue-500 bg-opacity-50 border-blue-500 hover:border-blue-400'
							/>
						</div>
					</div>
				</div>
			</form>
		</ModalLayout>
	);
}
