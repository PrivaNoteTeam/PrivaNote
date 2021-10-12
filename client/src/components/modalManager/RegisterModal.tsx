import React from 'react';
import { useForm } from 'react-hook-form';
import { useModalStore } from '../../hooks';
import { ModalLayout } from './Modal';
import { TextField } from '../TextField';

interface RegisterFormValues {
	email: string;
	password: string;
}

export function RegisterModal() {
	const [, modalManagerDispatch] = useModalStore();
	const submitHandler = (e: { preventDefault: () => void }) => {
		e.preventDefault();
	};

	const { register } = useForm<RegisterFormValues>();

	const handleClick = () => {
		modalManagerDispatch({
			type: 'registerModal',
			registerModalVisible: false
		});
		modalManagerDispatch({ type: 'loginModal', loginModalVisible: true });
	};

	return (
		<ModalLayout
			close={() => {
				modalManagerDispatch({
					type: 'registerModal',
					registerModalVisible: false
				});
			}}
		>
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
						<TextField
							name='confirmPassword'
							type='password'
							text='confirm password'
							register={register}
						/>
						<div className='flex justify-between items-end'>
							<a
								href='#'
								onClick={handleClick}
								className='text-blue-500 hover:underline cursor-pointer'
							>
								Already have an account?
							</a>
							<input
								type='submit'
								value='Register'
								className='pn-button bg-blue-500 bg-opacity-50 border-blue-500 hover:border-blue-400'
							/>
						</div>
					</div>
				</div>
			</form>
		</ModalLayout>
	);
}
