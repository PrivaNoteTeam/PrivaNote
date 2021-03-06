import React, { useState } from 'react';
import { TextField } from '../TextField';
import * as yup from 'yup';
import { ModalLayout } from './Modal';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { FormError } from '@types';
import { FormBanner } from './FormBanner';
import { forgetPassword } from '@shared/Api/forgetPassword';
import { useHistory } from 'react-router';

const validationSchema = yup.object({
	email: yup.string().email('Invalid email').required()
});

export function ForgotPasswordModal() {
	const [formError] = useState<FormError | undefined>();
	const [responseSuccess, setResponseSuccess] = useState<boolean>(false);
	let history = useHistory();

	const {
		register,
		formState: { errors },
		setError,
		handleSubmit: useFormHandleSubmit
	} = useForm<{ email: string }>({
		mode: 'onBlur',
		resolver: yupResolver(validationSchema)
	});

	const submitHandler = useFormHandleSubmit(
		async ({ email }: { email: string }) => {
			forgetPassword({ email }).then((response) => {
				if (response.success) {
					setResponseSuccess(true);
				} else if (response.fieldError) {
					setError('email', { message: response.fieldError.message });
				}
			});
		}
	);

	const handleCancelClick = () => {
		history.push('/login');
	};

	return (
		<ModalLayout close={() => history.push('/')}>
			{!responseSuccess ? (
				<form onSubmit={submitHandler} className='w-80 space-y-8'>
					<div className='space-y-3'>
						<h2 className='text-center text-2xl text-white select-none'>
							Find your account
						</h2>
						{formError && (
							<FormBanner
								text={formError.message}
								status='error'
							/>
						)}
						<p className='text-gray-500 text-xs break-words text-center select-none'>
							Please enter your{' '}
							<span className='text-gray-400'>email address</span>{' '}
							.
						</p>
					</div>
					<div className='form-inner'>
						<div className='space-y-6'>
							<TextField
								name='email'
								error={errors.email}
								register={register}
							/>
							<div className='flex justify-end items-center space-x-2'>
								<button
									onClick={handleCancelClick}
									className='pn-button bg-gray-500 bg-opacity-50 border-gray-500 hover:border-gray-400'
								>
									Cancel
								</button>
								<input
									type='submit'
									value='Find Account'
									className='pn-button bg-blue-500 bg-opacity-50 border-blue-500 hover:border-blue-400'
								/>
							</div>
						</div>
					</div>
				</form>
			) : (
				<div className='w-80 space-y-8'>
					<div className='space-y-3'>
						<h2 className='text-center text-2xl text-white select-none'>
							Password Reset
						</h2>
						<p className='text-gray-500 text-xs break-words text-center select-none'>
							Check your email for a{' '}
							<span className='text-gray-400'>
								password-reset link
							</span>
							. Clicking this link will open PrivaNote and prompt
							for a new password.
						</p>
					</div>
					<div className='flex justify-end items-center space-x-2'>
						<button
							onClick={() => history.push('/')}
							className='pn-button bg-blue-500 bg-opacity-50 border-blue-500 hover:border-blue-400'
						>
							Ok
						</button>
					</div>
				</div>
			)}
		</ModalLayout>
	);
}
