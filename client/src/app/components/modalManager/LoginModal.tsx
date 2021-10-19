import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ModalLayout } from './Modal';
import { TextField } from '../TextField';
import { useModalStore } from '../../hooks';
import { LoginFormValues } from '@types';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginUser } from '@shared/api/loginUser';
import { FormBanner } from './FormBanner';
import { FormError } from '@types';
import { AxiosError } from 'axios';

const validationSchema = yup.object({
	email: yup.string().email('Invalid email').required(),
	password: yup.string().required()
});

export function LoginModal() {
	const [, modalManagerDispatch] = useModalStore();
	const [formError, setFormError] = useState<FormError | undefined>();

	const {
		register,
		formState: { errors },
		handleSubmit: useFormHandleSubmit,
		setError
	} = useForm<LoginFormValues>({
		mode: 'onBlur',
		resolver: yupResolver(validationSchema)
	});

	const handleClick = () => {
		modalManagerDispatch({ type: 'loginModal', loginModalVisible: false });
		modalManagerDispatch({
			type: 'registerModal',
			registerModalVisible: true
		});
	};

	const handleForgotPasswordClick = () => {
		modalManagerDispatch({ type: 'forgotPasswordModal', forgotPasswordModalVisible: true });
	}

	const submitHandler = useFormHandleSubmit(
		async ({ email, password }: LoginFormValues) => {
			const unknownError = { message: 'An unknown error has occurred' };

			loginUser({ email, password })
				.then((response) => {
					if (response.fieldError) {
						if (
							response.fieldError.field !== 'email' &&
							response.fieldError.field !== 'password'
						)
							return;
						setError(response.fieldError.field!, {
							message: response.fieldError.message
						});
					} else if (response.formError) {
						setFormError(response.formError);
					} else if (response.success) {
						modalManagerDispatch({
							type: 'twoFactorAuthModal',
							twoFactorAuthModalVisible: true
						});
					} else {
						setFormError(unknownError);
					}
				})
				.catch((err: AxiosError) => {
					setFormError({ message: err.message });
				})
				.catch(() => {
					setFormError(unknownError);
				});

			return;
		}
	);

	return (
		<ModalLayout
			close={() =>
				modalManagerDispatch({
					type: 'loginModal',
					loginModalVisible: false
				})
			}
		>
			<form onSubmit={submitHandler} className='w-80 space-y-8'>
				<div className='space-y-3'>
					<h2 className='text-center text-2xl text-white select-none'>
						Sign in to your account
					</h2>
					{formError && (
						<FormBanner text={formError.message} status='error' />
					)}
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
						<TextField
							name='email'
							error={errors.email}
							register={register}
						/>
						<TextField
							name='password'
							type='password'
							error={errors.password}
							register={register}
						/>
						<div className='flex justify-between items-center'>
							<div className='flex flex-col text-sm space-y-1'>
								<a
									href='#'
									onClick={handleForgotPasswordClick}
									className='text-blue-500 hover:underline cursor-pointer'
								>
									Forgot password?
								</a>
								<a
									href='#'
									onClick={handleClick}
									className='text-blue-500 hover:underline cursor-pointer'
								>
									Create new account
								</a>
							</div>
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
