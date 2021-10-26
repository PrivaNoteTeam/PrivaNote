import React, { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { ModalLayout } from './Modal';
import { TextField } from '../TextField';
import * as yup from 'yup';
import { registerUser } from '@shared/api/registerUser';
import { RegisterFormValues } from '@types';
import { FormBanner } from './FormBanner';
import { FormError } from '@types';
import { AxiosError } from 'axios';
import { useHistory } from 'react-router-dom';

const validationSchema = yup.object({
	email: yup.string().email('Invalid email').required(),
	password: yup
		.string()
		.min(8, 'Needs at least 8 characters')
		.required()
		.matches(
			/^.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?].*$/,
			'Needs a special character'
		),
	confirmPassword: yup
		.string()
		.required()
		.oneOf([yup.ref('password'), null], 'Password must match')
});

export function RegisterModal() {
	const [formError, setFormError] = useState<FormError | undefined>();
	let history = useHistory();

	const {
		register,
		formState: { errors },
		handleSubmit: useFormHandleSubmit,
		setError
	} = useForm<RegisterFormValues>({
		mode: 'onBlur',
		resolver: yupResolver(validationSchema)
	});

	const handleClick = () => {
		history.push('/login');
	};

	const handleSubmit = useFormHandleSubmit(
		async ({ email, password, confirmPassword }: RegisterFormValues) => {
			const unknownError = { message: 'An unknown error has occurred' };

			registerUser({ email, password, confirmPassword })
				.then((response) => {
					if (response.fieldError) {
						if (
							response.fieldError.field !== 'email' &&
							response.fieldError.field !== 'password' &&
							response.fieldError.field !== 'confirmPassword'
						)
							return;
						setError(response.fieldError.field!, {
							message: response.fieldError.message
						});
					} else if (response.formError) {
						setFormError(response.formError);
					} else if (response.success) {
						history.push('/verification');
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
			close={() => {
				history.push('/');
			}}
		>
			<form onSubmit={handleSubmit} className='w-80 space-y-8'>
				<div className='space-y-3'>
					<h2 className='text-center text-2xl text-white select-none'>
						Sign up for an account
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
						<TextField
							name='confirmPassword'
							type='password'
							text='confirm password'
							error={errors.confirmPassword}
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
