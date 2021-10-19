import { useUserStore, useModalStore } from '@hooks';
import { useForm } from 'react-hook-form';
import { VerificationFormValues } from '@types';
import { verifyUser } from '@shared/Api/verifyUser';

export function useVerificationForm() {
	const [, userDispatch] = useUserStore();
	const [, modalManagerDispatch] = useModalStore();

	const {
		register,
		formState: { errors },
		setError,
		handleSubmit: useFormHandleSubmit
	} = useForm<VerificationFormValues>({
		mode: 'onBlur'
	});

	const handleSubmit = useFormHandleSubmit(
		async ({ verificationCode }: VerificationFormValues) => {
			const response = await verifyUser({ verificationCode });

			if (response.fieldError) {
				setError('verificationCode', {
					message: response.fieldError.message
				});
				return;
			}

			if (response.user) {
				userDispatch({
					type: 'login',
					user: response.user
				});
			}

			modalManagerDispatch({
				type: 'verificationModal',
				verificationModalVisible: false
			});
		}
	);

	return { register, errors, handleSubmit };
}
