import React from 'react';
import { useStore } from '../../../useStore';
import { EditorAction, FileSystemItem } from '../../../types';
import { Directory } from './Directory';
import { Note } from './Note';
import { getFileName } from '../../../utils/getFileName';
import PlusIcon from '../../../assets/icons/plus.svg';
import FolderOpenIcon from '../../../assets/icons/folder-open.svg';

interface Props {
	items: FileSystemItem[];
	handleAddFileClick: () => void;
	handleAddDirectoryClick: () => void;
	handleOuterClick: (event: React.MouseEvent<HTMLDivElement>) => void;
	primarySelection?: FileSystemItem;
	secondarySelection?: FileSystemItem;
	isRenaming: boolean;
	editorDispatch: React.Dispatch<EditorAction>;
	renameText: string;
	setRenameText: React.Dispatch<string>;
}

export function UIFileExplorer({
	items,
	handleAddFileClick,
	handleAddDirectoryClick,
	handleOuterClick,
	editorDispatch,
	primarySelection,
	secondarySelection,
	isRenaming,
	renameText,
	setRenameText
}: Props) {
	const [{ notebook }] = useStore();

	return (
		<div className='bg-gray-800 pt-2 flex flex-col resize-x'>
			<div className='flex justify-between'>
				<p className='text-gray-500 text-sm font-bold px-3 py-1'>
					{getFileName(notebook!)}
				</p>
				<div className='mx-2 flex space-x-1'>
					<PlusIcon
						onClick={handleAddFileClick}
						fill='#9CA3AF'
						className='p-0.5 hover:bg-gray-700 rounded-md cursor-pointer'
					/>
					<FolderOpenIcon
						onClick={handleAddDirectoryClick}
						fill='#9CA3AF'
						className='p-0.5 hover:bg-gray-700 rounded-md cursor-pointer'
					/>
				</div>
			</div>
			<div
				onClick={handleOuterClick}
				className='flex-grow overflow-y-scroll pb-6'
			>
				{items.map((item) => {
					return item.type === 'directory' ? (
						<Directory
							item={item}
							primarySelection={primarySelection}
							secondarySelection={secondarySelection}
							isRenaming={isRenaming}
							editorDispatch={editorDispatch}
							renameText={renameText}
							setRenameText={setRenameText}
						/>
					) : (
						<Note
							item={item}
							primarySelection={primarySelection}
							secondarySelection={secondarySelection}
							isRenaming={isRenaming}
							editorDispatch={editorDispatch}
							renameText={renameText}
							setRenameText={setRenameText}
						/>
					);
				})}
			</div>
		</div>
	);
}
