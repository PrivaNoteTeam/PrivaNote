import { useUserStore } from '@hooks';
import { useForm } from 'react-hook-form';
import { VerificationFormValues } from '@types';
import { verifyUser } from '@shared/Api/verifyUser';
import { useNotificationQueue } from '@hooks';
import { useHistory } from 'react-router';

export function useVerificationForm() {
	const [, userDispatch] = useUserStore();
	const [, notify] = useNotificationQueue();
	let history = useHistory();

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
			} else if (response.user) {
				userDispatch({
					type: 'login',
					user: response.user
				});

				notify({ message: 'Signed in successfully', style: 'success' });
			} else {
				notify({
					message: 'An unknown error has occurred',
					style: 'error'
				});
			}

			history.push('/');
		}
	);

	return { register, errors, handleSubmit };
}
