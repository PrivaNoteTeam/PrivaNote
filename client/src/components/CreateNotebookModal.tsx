import React from 'react';
import { ModalLayout } from './Modal';
import { BrowseInputField } from './BrowseInputField';
import { TextField } from './TextField';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import fs from 'fs';

interface Props {
	setCurrentNotebook: React.Dispatch<
		React.SetStateAction<string | undefined>
	>;
	close: () => void;
}

interface FormValues {
	name: string;
	location: string;
}

const validationSchema = yup.object({
	name: yup.string().required(),
	location: yup.string().required()
});

export function CreateNotebookModal({ setCurrentNotebook, close }: Props) {
	const {
		register,
		formState: { errors },
		setError,
		setValue,
		handleSubmit
	} = useForm<FormValues>({
		resolver: yupResolver(validationSchema)
	});

	const onSubmit = ({ name, location }: FormValues) => {
		const path = `${location}/${name}`;

		if (!fs.existsSync(location)) {
			setError('location', { message: 'directory not found' });
			return;
		}

		if (fs.existsSync(path)) {
			setError('name', { message: 'name already used' });
			return;
		}

		fs.mkdirSync(path);
		setCurrentNotebook(path);
		close();
	};

	return (
		<ModalLayout close={close}>
			<div className='flex flex-col space-y-10'>
				<h1 className='text-white text-3xl text-center'>
					Create Notebook
				</h1>
				<form
					className='w-80 space-y-10'
					onSubmit={handleSubmit(onSubmit)}
				>
					<TextField
						name='name'
						error={errors.name}
						register={register}
					/>
					<BrowseInputField
						name='location'
						error={errors.location}
						setValue={setValue}
						register={register}
					/>
					<div className='flex justify-end'>
						<input
							type='submit'
							value='Create'
							className='pn-button bg-blue-500 bg-opacity-50 border-blue-500 hover:border-blue-400'
						/>
					</div>
				</form>
			</div>
		</ModalLayout>
	);
}
