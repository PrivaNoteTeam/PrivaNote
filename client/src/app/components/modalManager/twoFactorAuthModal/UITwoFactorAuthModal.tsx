import { VerificationFormValues } from '@types';
import React from 'react';
import {
	DeepMap,
	DeepPartial,
	FieldError,
	UseFormRegister
} from 'react-hook-form';
import { ModalLayout } from '../Modal';
import { TextField } from '../../TextField';
import { useHistory } from 'react-router-dom';

interface Props {
	register: UseFormRegister<VerificationFormValues>;
	handleSubmit: (
		event: React.BaseSyntheticEvent | undefined
	) => Promise<void>;
	errors: DeepMap<DeepPartial<VerificationFormValues>, FieldError>;
}

export function UITwoFactorAuthModal({
	register,
	errors,
	handleSubmit
}: Props) {
	let history = useHistory();

	return (
		<ModalLayout
			close={() => {
				history.push('/');
			}}
		>
			<form onSubmit={handleSubmit} className='w-80 space-y-8'>
				<div className='space-y-3'>
					<h2 className='text-center text-2xl text-white select-none'>
						Verify your identity
					</h2>
					<p className='text-gray-500 text-xs break-words text-center select-none'>
						Put in the code which was{' '}
						<span className='text-gray-400'>
							sent to your email
						</span>
						. This code will give you access to your PrivaNote
						account.
					</p>
				</div>
				<div className='form-inner'>
					<div className='space-y-6 ...'>
						<TextField
							name='verificationCode'
							text='verification code'
							error={errors.verificationCode}
							register={register}
						/>
						<div className='flex justify-between items-end'>
							<div className='flex flex-col'>
								<p className='text-gray-200 text-sm'>
									Didn't receive an email?
								</p>
								<p
									onClick={() => {}}
									className='text-blue-500 text-sm hover:underline cursor-pointer'
								>
									Resend
								</p>
							</div>
							<input
								type='submit'
								value='Verify'
								className='pn-button bg-blue-500 bg-opacity-50 border-blue-500 hover:border-blue-400'
							/>
						</div>
					</div>
				</div>
			</form>
		</ModalLayout>
	);
}
