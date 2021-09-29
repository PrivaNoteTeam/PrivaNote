import React from 'react';
import { ModalLayout } from './Modal';

export function CreateNotebookModal() {
	return (
		<ModalLayout>
			<div className='flex flex-col'>
				<h1 className='text-white text-2xl'>Create Notebook</h1>
				<div>
					<div className='flex flex-col'>
						<label>Name</label>
						<div className='flex'>
							<input />
							<p className='bg-gray-900 rounded-md text-white'>
								...
							</p>
						</div>
					</div>
				</div>
			</div>
		</ModalLayout>
	);
}
