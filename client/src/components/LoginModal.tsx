import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ModalLayout } from './Modal';
import { TextField } from './TextField';
import { login } from '../utils/login';

interface LoginDetails {
	email: string;
	password: string;
}
interface Props {
	error: string;
	close: () => void;
}
export function LoginModal({ close, error }: Props) {
	const [details] = useState<LoginDetails>({ email: '', password: '' });

	const submitHandler = (e: { preventDefault: () => void }) => {
		e.preventDefault();
		login(details);
	};

	const { register } = useForm<LoginDetails>();

	return (
		<ModalLayout close={close}>
			<form onSubmit={submitHandler} className='w-80 space-y-10'>
				<h2 className='text-center text-3xl text-white'>Login</h2>
				<div className='form-inner'>
					{error != '' ? <div className='error'></div> : ''}
					<div className='space-y-6 ...'>
						<TextField name='email' register={register} />
						<TextField name='password' register={register} />
						<div className='flex justify-end'>
							<input
								type='submit'
								value='Sign in'
								className='pn-button bg-blue-500 bg-opacity-50 border-blue-500 hover:border-blue-400 mergin-top:'
							/>
						</div>
					</div>
				</div>
			</form>
		</ModalLayout>
	);
}
