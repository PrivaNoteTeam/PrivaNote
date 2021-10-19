import React, { useState } from 'react';
import { TextField } from '../TextField';
import { useModalStore } from '@hooks';
import * as yup from 'yup';
import { ModalLayout } from './Modal';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { FormError } from '@types';
import { FormBanner } from './FormBanner';

const validationSchema = yup.object({
    email: yup.string().email('Invalid email').required()
});

export function ForgotPasswordModal() {
    const [, modalManagerDispatch] = useModalStore();
    const [formError] = useState<FormError | undefined>();

    const { register, formState: {errors}, handleSubmit: useFormHandleSubmit} = useForm<{ email: string}>({
        mode: 'onBlur',
        resolver: yupResolver(validationSchema)
    })

    const submitHandler = useFormHandleSubmit(
        async ({ email }: { email: string }) => {
            console.log(email);
            //temporary
            modalManagerDispatch({
                type: 'resetPasswordModal',
                resetPasswordModalVisible: true
            })
        }
    )

    const handleCancelClick = () => {
        modalManagerDispatch({
            type: 'loginModal',
            loginModalVisible: true
        })
    }

    return (
		<ModalLayout
			close={() =>
				modalManagerDispatch({
					type: 'forgotPasswordModal',
                    forgotPasswordModalVisible: false
                })
			}
		>
			<form onSubmit={submitHandler} className='w-80 space-y-8'>
				<div className='space-y-3'>
					<h2 className='text-center text-2xl text-white select-none'>
                        Find your account
                    </h2>
					{formError && (
						<FormBanner text={formError.message} status='error' />
					)}
					<p className='text-gray-500 text-xs break-words text-center select-none'>
						Please enter your{' '}
						<span className='text-gray-400'>
							email address
						</span>{' '}
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
                                onClick={ handleCancelClick } 
                                className='pn-button bg-gray-500 bg-opacity-50 border-gray-500 hover:border-gray-400'>
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
		</ModalLayout>
    )
}
