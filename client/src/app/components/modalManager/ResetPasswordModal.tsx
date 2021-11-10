import React, { useState } from 'react';
import { TextField } from '../TextField';
import * as yup from 'yup';
import { ModalLayout } from './Modal';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { FormError, ResetPasswordFormValues } from '@types';
import { FormBanner } from './FormBanner';
import { resetPassword } from '@shared/Api/resetPassword';
import { useHistory } from 'react-router-dom';

const validationSchema = yup.object({
	password: yup.string().required()
});

export function ResetPasswordModal() {
	const [formError] = useState<FormError | undefined>();
	let history = useHistory();

	const {
		register,
		formState: { errors },
		handleSubmit: useFormHandleSubmit
	} = useForm<{ password: string }>({
		mode: 'onBlur',
		resolver: yupResolver(validationSchema)
	});

	const submitHandler = useFormHandleSubmit(
		async ({ password }: ResetPasswordFormValues) => {
			resetPassword({ password }).then((response) => {
				if (response.success) {
					history.push('/');
				}
			});
		}
	);

	const handleCancelClick = () => {
		history.push('/login');
	};

	return (
		<ModalLayout close={() => history.push('/')}>
			<form onSubmit={submitHandler} className='w-80 space-y-8'>
				<div className='space-y-3'>
					<h2 className='text-center text-2xl text-white select-none'>
						Reset your password
					</h2>
					{formError && (
						<FormBanner text={formError.message} status='error' />
					)}
					<p className='text-gray-500 text-xs break-words text-center select-none'>
						Please enter your{' '}
						<span className='text-gray-400'>new password</span>{' '}
						below.
					</p>
				</div>
				<div className='form-inner'>
					<div className='space-y-6'>
						<TextField
							name='password'
							type='password'
							error={errors.password}
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
								value='Reset Password'
								className='pn-button bg-blue-500 bg-opacity-50 border-blue-500 hover:border-blue-400'
							/>
						</div>
					</div>
				</div>
			</form>
		</ModalLayout>
	);
}
