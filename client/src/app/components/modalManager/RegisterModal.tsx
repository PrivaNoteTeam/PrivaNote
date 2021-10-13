import React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useModalStore } from '../../hooks';
import { ModalLayout } from './Modal';
import { TextField } from '../TextField';
import * as yup from 'yup';

interface RegisterFormValues {
	email: string;
	password: string;
	confirmPassword: string;
}

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
	const [, modalManagerDispatch] = useModalStore();

	const {
		register,
		formState: { errors },
		handleSubmit: useFormHandleSubmit
	} = useForm<RegisterFormValues>({
		resolver: yupResolver(validationSchema)
	});

	const handleClick = () => {
		modalManagerDispatch({
			type: 'registerModal',
			registerModalVisible: false
		});
		modalManagerDispatch({ type: 'loginModal', loginModalVisible: true });
	};

	const handleSubmit = useFormHandleSubmit(
		async ({ email, password, confirmPassword }: RegisterFormValues) => {
			console.log(email + password + confirmPassword);

			return;
		}
	);

	return (
		<ModalLayout
			close={() => {
				modalManagerDispatch({
					type: 'registerModal',
					registerModalVisible: false
				});
			}}
		>
			<form onSubmit={handleSubmit} className='w-80 space-y-8'>
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
