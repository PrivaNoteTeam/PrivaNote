import React, { useEffect } from 'react';
import { ModalLayout } from '../modalManager/Modal';
import { TextField } from '../TextField';
import { BrowseInputField } from '../BrowseInputField';
import {
	DeepMap,
	DeepPartial,
	FieldError,
	UseFormSetValue
} from 'react-hook-form';

interface FormValues {
	name: string;
	location: string;
}

interface Props {
	isValid: boolean;
	errors: DeepMap<DeepPartial<FormValues>, FieldError>;
	register: any;
	isSubmitSuccessful: boolean;
	handleSubmit: (
		e?: React.BaseSyntheticEvent<object, any, any> | undefined
	) => Promise<void>;
	setValue: UseFormSetValue<FormValues>;
	close: () => void;
}

export function UINotebookModal({
	isValid,
	isSubmitSuccessful,
	errors,
	register,
	handleSubmit,
	setValue,
	close
}: Props) {
	useEffect(() => {
		if (isSubmitSuccessful) close();
	}, [isSubmitSuccessful]);

	return (
		<ModalLayout close={close}>
			<div className='flex flex-col space-y-10'>
				<h1 className='text-white text-3xl text-center select-none'>
					Create Notebook
				</h1>
				<form className='w-80 space-y-10' onSubmit={handleSubmit}>
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
							className={`pn-button bg-opacity-50 bg-blue-500 border-blue-500 ${
								isValid
									? 'hover:border-blue-400'
									: 'cursor-not-allowed opacity-20'
							}`}
						/>
					</div>
				</form>
			</div>
		</ModalLayout>
	);
}
