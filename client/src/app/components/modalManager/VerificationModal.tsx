import React from 'react';
import { ModalLayout } from './Modal';
import { useModalStore } from '@hooks';
import { TextField } from '@components/TextField';
import { useForm } from 'react-hook-form';
import { verifyUser } from '@shared/Api/verifyUser';

interface VerificationFormValues {
    verificationCode: string;
}

export function VerificiationModal() {
    const [, modalManagerDispatch] = useModalStore();

    const { register, formState: { errors }, setError, handleSubmit: useFormHandleSubmit } = useForm<VerificationFormValues>({
        mode: 'onBlur'
    });

    const handleSubmit = useFormHandleSubmit(
        async ({ verificationCode}: VerificationFormValues) => {
            const response = await verifyUser({verificationCode})
            
            if (response.fieldError) {
                setError('verificationCode', { message: response.fieldError.message });
                return;
            }

            modalManagerDispatch({
                type: 'verificationModal',
                verificationModalVisible: false
            })
        }
    )

    return (
        <ModalLayout
            close={ () => {
                modalManagerDispatch({
                    type: 'verificationModal',
                    verificationModalVisible: false
                });
            }}
        >
			<form onSubmit={handleSubmit} className='w-80 space-y-8'>
				<div className='space-y-3'>
					<h2 className='text-center text-2xl text-white select-none'>
                        Verify your account
                    </h2>
					<p className='text-gray-500 text-xs break-words text-center select-none'>
                        Check for the verification link or code which was <span className='text-gray-400'>sent to your account</span>. This will finish the registration process.
                    </p>
				</div>
				<div className='form-inner'>
					<div className='space-y-6 ...'>
						<TextField name='verificationCode' text='verification code' error={ errors.verificationCode } register={register} />
						<div className='flex justify-between items-end'>
                            <div className='flex flex-col'>
                                <p className='text-gray-200 text-sm'>Didn't receive an email?</p>
                                <a
                                    href='#'
                                    onClick={ () => {}}
                                    className='text-blue-500 text-sm hover:underline cursor-pointer'
                                >
                                    Resend
                                </a>
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
    )
}