import React from 'react';
import { UINotebookModal } from './createNotebookModal/UINotebookModal';
import { useCreateNotebookModal } from './createNotebookModal/useCreateNotebookModal';

export function CreateNotebookModal() {
	const {
		isValid,
		errors,
		setValue,
		register,
		handleSubmit,
		isSubmitSuccessful,
		close
	} = useCreateNotebookModal();

	return (
		<UINotebookModal
			isValid={isValid}
			errors={errors}
			setValue={setValue}
			register={register}
			handleSubmit={handleSubmit}
			isSubmitSuccessful={isSubmitSuccessful}
			close={close}
		/>
	);
}
