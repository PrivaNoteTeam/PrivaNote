import React from 'react';
import { useVerificationForm } from '@app/hooks/useVerificationForm';
import { UIVerificationModal } from './verificationModal/UIVerificationModal';

export function VerificiationModal() {
	const { register, errors, handleSubmit } = useVerificationForm();

	return (
		<UIVerificationModal
			register={register}
			errors={errors}
			handleSubmit={handleSubmit}
		/>
	);
}
