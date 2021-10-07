import React, { useState } from 'react';
import { FileSystemItem, FileItem } from '../../types';
import { Directory } from './fileExplorer/Directory';
import { Note } from './fileExplorer/Note';
import PlusIcon from '../../assets/icons/plus.svg';
import FolderOpenIcon from '../../assets/icons/folder-open.svg';
import { getFileName } from '../../utils/getFileName';
import { createFile } from '../../utils/createFile';
import { createDirectory } from '../../utils/createDirectory';
import { getParentDirectory } from '../../utils/getParentDirectory';
import { renameExplorerItem } from '../../utils/renameExplorerItem';

interface Props {
	items: FileSystemItem[];
	currentNotebook: string;
	currentFile?: FileItem;
	setCurrentFile: React.Dispatch<FileItem>;
	selection?: FileSystemItem;
	setSelection: React.Dispatch<FileSystemItem | undefined>;
	itemSelectContext?: FileSystemItem;
	setItemSelectContext: React.Dispatch<FileSystemItem | undefined>;
	renameItem: boolean;
	setRenameItem: React.Dispatch<boolean>;
}

export function FileExplorer({
	items,
	currentNotebook,
	currentFile,
	setCurrentFile,
	selection,
	setSelection,
	itemSelectContext,
	setItemSelectContext,
	renameItem,
	setRenameItem
}: Props) {
	const [renameText, setRenameText] = useState('');

	const handleAddFileClick = () => {
		const newFilePath = selection
			? getParentDirectory(selection.path, { onlyFiles: true })
			: currentNotebook;
		const newFile = createFile(newFilePath);
		setCurrentFile(newFile);
	};

	const handleAddDirectoryClick = () => {
		const newDirectoryPath = selection
			? getParentDirectory(selection.path, { onlyFiles: true })
			: currentNotebook;
		const newDirectory = createDirectory(newDirectoryPath);
		setSelection(newDirectory);
	};

	const handleOuterClick = (event: React.MouseEvent<HTMLDivElement>) => {
		if (event.target !== event.currentTarget) return;

		setSelection(undefined);
		setItemSelectContext(undefined);
		if (renameItem) {
			renameExplorerItem(itemSelectContext?.path!, renameText)
				.then((renamedItem) => {
					setRenameItem(false);
					setItemSelectContext(undefined!);
					if (itemSelectContext?.path == currentFile?.path) {
						setCurrentFile(renamedItem!);
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
					{getFileName(currentNotebook)}
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
							currentFile={currentFile}
							setCurrentFile={setCurrentFile}
							setSelection={setSelection}
							selection={selection}
							itemSelectContext={itemSelectContext}
							setItemSelectContext={setItemSelectContext}
							renameItem={renameItem}
							setRenameItem={setRenameItem}
							renameText={renameText}
							setRenameText={setRenameText}
						/>
					) : (
						<Note
							item={item}
							currentFile={currentFile}
							setCurrentFile={setCurrentFile}
							setSelection={setSelection}
							selection={selection}
							itemSelectContext={itemSelectContext}
							setItemSelectContext={setItemSelectContext}
							renameItem={renameItem}
							setRenameItem={setRenameItem}
							renameText={renameText}
							setRenameText={setRenameText}
						/>
					);
				})}
			</div>
		</div>
	);
}
