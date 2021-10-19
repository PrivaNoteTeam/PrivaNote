import { useVerificationForm } from '@app/hooks/useVerificationForm';
import React from 'react';
import { UITwoFactorAuthModal } from './twoFactorAuthModal/UITwoFactorAuthModal';

export function TwoFactorAuthModal() {
	const { errors, handleSubmit, register } = useVerificationForm();

	return (
		<UITwoFactorAuthModal
			errors={errors}
			handleSubmit={handleSubmit}
			register={register}
		/>
	);
}
