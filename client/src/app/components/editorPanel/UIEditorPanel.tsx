import React from 'react';
import { useStore } from '@hooks';
import { Editor } from './Editor';
import { Placeholder } from '../Placeholder';
import { NotificationArea } from '../NotificationArea';
import { Preview } from './Preview';

interface Props {
	text: string;
	setText: React.Dispatch<string>;
}

export function UIEditorPanel({ text, setText }: Props) {
	const [{ currentNote }] = useStore();

	return (
		<div className='relative flex-grow flex flex-col'>
			<NotificationArea />

			{currentNote ? (
				<div className='flex h-full'>
					<Editor text={text} setText={setText} />
					<Preview text={text} />
				</div>
			) : (
				<Placeholder text='Create or open a note to continue' />
			)}
		</div>
	);
}
