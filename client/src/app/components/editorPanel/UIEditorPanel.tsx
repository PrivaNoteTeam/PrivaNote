import React from 'react';
import { useStore } from '@hooks';
import { Editor } from './Editor';
import { Placeholder } from '../Placeholder';
import { NotificationArea } from '../NotificationArea';
import { Preview } from './Preview';

export function UIEditorPanel() {
	const [{ currentNote }] = useStore();

	return (
		<div className='relative flex-grow flex flex-col'>
			<NotificationArea />

			{currentNote ? (
				<div className='flex h-full'>
					<Editor />
					<Preview />
				</div>
			) : (
				<Placeholder text='Create or open a note to continue' />
			)}
		</div>
	);
}
