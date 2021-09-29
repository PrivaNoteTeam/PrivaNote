import React from 'react';
import { ModalLayout } from './Modal';
import { BrowseInputField } from './BrowseInputField';
import { TextField } from './TextField';

export function CreateNotebookModal() {
	return (
		<ModalLayout>
			<div className='flex flex-col space-y-10'>
				<h1 className='text-white text-3xl text-center'>
					Create Notebook
				</h1>
				<div className='w-80 space-y-10'>
					<TextField name='Name' />
					<BrowseInputField name='Location' />
					<div className='flex justify-end'>
						<p className='pn-button bg-blue-500 bg-opacity-50 border-blue-500 hover:border-blue-400'>
							Create
						</p>
					</div>
				</div>
			</div>
		</ModalLayout>
	);
}
