import React from 'react';
import { EditorAction } from '../../../types';
import ChevronIcon from '../../../assets/icons/chevron-right.svg';
import { useRelativePath } from '../../../utils/useRelativePath';
import { isFile } from '../../../utils/isFile';
import { useStore } from '../../../useStore';

interface Props {
	unsaved: boolean;
	editorDispatch: React.Dispatch<EditorAction>;
}

export function Breadcrumb({ unsaved, editorDispatch }: Props) {
	const [{ notebook, currentNote }] = useStore();

	const parts = useRelativePath(notebook!, currentNote!.path).split(/[\/\\]/);

	const render = parts.map((part, i) => {
		const handleDirectoryClick = () => {
			let path = parts
				.slice(0, i + 1)
				.join('/')
				.replace(/^/, notebook!.concat('/'));

			editorDispatch({
				type: 'primarySelect',
				primarySelection: {
					name: part,
					path,
					type: isFile(path) ? 'note' : 'directory'
				},
				isRenaming: false // this is NOT supposed to be here. Delete ASAP
			});
		};

		let text = part;

		if (i === parts.length - 1) {
			text = unsaved ? currentNote!.name.concat('*') : currentNote!.name;
		}

		return (
			<div className='flex'>
				{i !== 0 && (
					<ChevronIcon fill='#9CA3AF' className='self-baseline' />
				)}
				<p
					onClick={handleDirectoryClick}
					className='text-gray-400 self-center select-none hover:text-white cursor-pointer'
				>
					{text}
				</p>
			</div>
		);
	});

	return (
		<div className='bg-gray-900 pn-drop-shadow flex py-1 px-4'>
			{render}
		</div>
	);
}
