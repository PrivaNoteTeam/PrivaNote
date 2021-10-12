import React from 'react';
import { UINotebookModal } from './createNotebookModal/UINotebookModal';
import { useCreateNotebookModal } from './createNotebookModal/useCreateNotebookModal';

interface Props {
	close: () => void;
}

export function CreateNotebookModal({ close }: Props) {
	const {
		isValid,
		errors,
		setValue,
		register,
		handleSubmit,
		isSubmitSuccessful
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
