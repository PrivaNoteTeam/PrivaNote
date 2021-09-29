import React, { useState } from 'react';
import { ModalLayout } from './Modal';
import { BrowseInputField } from './BrowseInputField';
import { TextField } from './TextField';
import fs from 'fs';

interface Props {
	close: () => void;
}

export function CreateNotebookModal({ close }: Props) {
	const [name, setName] = useState('');
	const getName = (value: string) => {
		setName(value);
	};

	const [selectedDirectory, setSelectedDirectory] = useState('');
	const getSelectedDirectory = (value: string) => {
		setSelectedDirectory(value);
	};

	const handleClick = () => {
		if (selectedDirectory == '' || name == '') return;

		if (!fs.existsSync(selectedDirectory)) {
			console.error(`${selectedDirectory} not found.`);
			return;
		}

		fs.mkdirSync(`${selectedDirectory}/${name}`);
		console.log(`Notebook created at ${selectedDirectory}`);
	};

	return (
		<ModalLayout close={close}>
			<div className='flex flex-col space-y-10'>
				<h1 className='text-white text-3xl text-center'>
					Create Notebook
				</h1>
				<div className='w-80 space-y-10'>
					<TextField name='name' liftState={getName} />
					<BrowseInputField
						name='location'
						currentPath={selectedDirectory}
						liftState={getSelectedDirectory}
					/>
					<div className='flex justify-end'>
						<p
							onClick={handleClick}
							className='pn-button bg-blue-500 bg-opacity-50 border-blue-500 hover:border-blue-400'
						>
							Create
						</p>
					</div>
				</div>
			</div>
		</ModalLayout>
	);
}
