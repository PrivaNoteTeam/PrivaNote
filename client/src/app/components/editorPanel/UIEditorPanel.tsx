import React from 'react';
import { useStore } from '@hooks';
import { Editor } from './Editor';
import { Placeholder } from '../Placeholder';
import { NotificationArea } from '../NotificationArea';
import { Preview } from './Preview';
import { SplitPane } from 'react-collapse-pane';

interface Props {
	livePreviewVisiable: boolean;
	text: string;
	setText: React.Dispatch<string>;
}

export function UIEditorPanel({ text, setText, livePreviewVisiable }: Props) {
	const [{ currentFile }] = useStore();

	return (
		<div className='relative flex-grow flex flex-col h-full'>
			<NotificationArea />

			{currentFile ? (
				<div className='w-full h-full'>
					{livePreviewVisiable ? (
						<SplitPane
							className=''
							split='vertical'
							minSizes={32}
							resizerOptions={{
								css: {
									backgroundColor: 'rgb(31, 41, 55)'
								},
								hoverCss: {
									backgroundColor: 'rgb(59, 130, 246)'
								}
							}}
						>
							<Editor text={text} setText={setText} />
							{livePreviewVisiable ? (
								<Preview text={text} />
							) : (
								<div></div>
							)}
						</SplitPane>
					) : (
						<Editor text={text} setText={setText} />
					)}
				</div>
			) : (
				<Placeholder text='Create or open a note to continue' />
			)}
		</div>
	);
}
