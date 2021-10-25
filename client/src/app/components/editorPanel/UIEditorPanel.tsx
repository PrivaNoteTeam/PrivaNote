import React from 'react';
import { useStore } from '@hooks';
import { getFileSystemItems } from '@utils';
import { FileExplorer } from './FileExplorer';
import { Editor } from './Editor';
import { Placeholder } from './Placeholder';
import { NotificationArea } from '../NotificationArea';

interface Props {
	fileExplorerVisible: boolean;
}

export function UIEditorPanel({ fileExplorerVisible }: Props) {
	const [{ notebook, currentNote }] = useStore();

	return notebook ? (
		<>
			{fileExplorerVisible && (
				<FileExplorer items={getFileSystemItems(notebook)} />
			)}
			<div className='relative flex-grow flex flex-col'>
				<NotificationArea />

				{currentNote ? (
					<Editor />
				) : (
					<Placeholder text='Create or open a note to continue' />
				)}
			</div>
		</>
	) : (
		<>
			<div className='relative flex-grow flex flex-col'>
				<NotificationArea />
				<Placeholder text='Open a notebook to continue' />
			</div>
		</>
	);
}
