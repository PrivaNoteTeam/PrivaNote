import React from 'react';
import { useStore } from '@hooks';
import { Editor } from './Editor';
import { Placeholder } from '../Placeholder';
import { NotificationArea } from '../NotificationArea';
import { Preview } from './Preview';
import { SplitPane } from 'react-collapse-pane';

interface Props {
	text: string;
	setText: React.Dispatch<string>;
}

export function UIEditorPanel({ text, setText }: Props) {
	const [{ currentFile }] = useStore();

	return (
		<div className='relative flex-grow flex flex-col'>
			<NotificationArea />

			{currentFile ? (
				<div className='w-full h-full'>
					<SplitPane
						className='w-full h-full'
						split='vertical'
						minSizes={32}
					>
						<Editor text={text} setText={setText} />
						<Preview text={text} />
					</SplitPane>
				</div>
			) : (
				<Placeholder text='Create or open a note to continue' />
			)}
		</div>
	);
}
