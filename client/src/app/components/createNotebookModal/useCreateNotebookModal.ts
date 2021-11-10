import { useStore } from '@hooks';
import { createNotebook } from '@utils';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import fs from 'fs';
import * as yup from 'yup';
import { useHistory } from 'react-router';

interface FormValues {
	name: string;
	location: string;
}

interface FieldError {
	field: 'location' | 'name';
	message: string;
}

const validationSchema = yup.object({
	name: yup.string().required(),
	location: yup.string().required()
});

export function useCreateNotebookModal() {
	const [, dispatch] = useStore();
	let history = useHistory();

	const close = () => {
		history.push('/');
	};

	const {
		register,
		formState: { errors, isValid, isSubmitSuccessful },
		setError,
		setValue,
		handleSubmit: useFormHandleSubmit
	} = useForm<FormValues>({
		resolver: yupResolver(validationSchema)
	});

	const handleSubmit = useFormHandleSubmit(
		async ({
			name,
			location
		}: FormValues): Promise<FieldError | undefined> => {
			const path = `${location}/${name}`;

			if (!fs.existsSync(location)) {
				setError('location', { message: 'directory not found' });
				return;
			}

			if (fs.existsSync(path)) {
				setError('name', { message: 'name already used' });
				return;
			}

			const isCreated = await createNotebook(`${location}/${name}`);

			if (!isCreated) {
				setError('name', { message: 'an error occurred' });
				return;
			}

			dispatch({
				type: 'openNote',
				currentFile: undefined
			});

			dispatch({
				type: 'openNotebook',
				notebook: path
			});

			return;
		}
	);

	return {
		handleSubmit,
		register,
		errors,
		isValid,
		setValue,
		isSubmitSuccessful,
		close
	};
}
