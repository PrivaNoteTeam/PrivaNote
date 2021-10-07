import React from 'react';
import { FieldError, SetFieldValue } from 'react-hook-form';
import { UIBrowseInputField } from './browseInputField/UIBrowseInputField';
import { useBrowseInputField } from './browseInputField/useBrowseInputField';

interface Props {
	name: string;
	error?: FieldError;
	register: any;
	setValue: SetFieldValue<any>;
}

export function BrowseInputField({
	name,
	error,
	register,
	setValue
}: Props & React.HTMLProps<HTMLInputElement>) {
	const { handleClick } = useBrowseInputField({ name, setValue });

	return (
		<UIBrowseInputField
			name={name}
			error={error}
			register={register}
			handleClick={handleClick}
		/>
	);
}
