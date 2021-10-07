import React, { useState } from 'react';
import { FileSystemItem, EditorAction } from '../../types';
import { Directory } from './fileExplorer/Directory';
import { Note } from './fileExplorer/Note';
import PlusIcon from '../../assets/icons/plus.svg';
import FolderOpenIcon from '../../assets/icons/folder-open.svg';
import { getFileName } from '../../utils/getFileName';
import { createFile } from '../../utils/createFile';
import { createDirectory } from '../../utils/createDirectory';
import { getParentDirectory } from '../../utils/getParentDirectory';
import { renameExplorerItem } from '../../utils/renameExplorerItem';
import { useStore } from '../../useStore';

interface Props {
	items: FileSystemItem[];
	primarySelection?: FileSystemItem;
	secondarySelection?: FileSystemItem;
	isRenaming: boolean;
	editorDispatch: React.Dispatch<EditorAction>;
}

export function FileExplorer({
	items,
	primarySelection,
	secondarySelection,
	isRenaming,
	editorDispatch
}: Props) {
	const [{ notebook, currentNote }, dispatch] = useStore();
	const [renameText, setRenameText] = useState('');

	const handleAddFileClick = () => {
		const newFilePath = primarySelection
			? getParentDirectory(primarySelection.path, { onlyFiles: true })
			: notebook;
		const newFile = createFile(newFilePath as string);

		dispatch({
			type: 'openNote',
			currentNote: newFile
		});
	};

	const handleAddDirectoryClick = () => {
		const newDirectoryPath = primarySelection
			? getParentDirectory(primarySelection.path, { onlyFiles: true })
			: notebook;
		const newDirectory = createDirectory(newDirectoryPath as string);

		editorDispatch({
			type: 'primarySelect',
			primarySelection: newDirectory,
			isRenaming
		});
	};

	const handleOuterClick = (event: React.MouseEvent<HTMLDivElement>) => {
		if (event.target !== event.currentTarget) return;

		editorDispatch({
			type: 'primarySelect',
			primarySelection: undefined,
			isRenaming
		});

		editorDispatch({
			type: 'secondarySelect',
			secondarySelection: undefined,
			isRenaming
		});

		if (isRenaming) {
			renameExplorerItem(secondarySelection?.path!, renameText)
				.then((renamedItem) => {
					editorDispatch({
						type: 'rename',
						isRenaming: false
					});

					editorDispatch({
						type: 'secondarySelect',
						secondarySelection: undefined,
						isRenaming
					});

					if (secondarySelection?.path == currentNote?.path) {
						dispatch({
							type: 'openNote',
							currentNote: renamedItem
						});
					}
				})
				.catch((error) => {
					console.log(error);
				});
		}
	};

	return (
		<div className='bg-gray-800 pt-2 flex flex-col resize-x'>
			<div className='flex justify-between'>
				<p className='text-gray-500 text-sm font-bold px-3 py-1'>
					{getFileName(notebook as string)}
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
