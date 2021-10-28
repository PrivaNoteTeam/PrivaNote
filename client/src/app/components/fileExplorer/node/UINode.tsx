import React from 'react';
import { Node } from '../Node';
import ChevronDownIcon from '@assets/icons/chevron-down.svg';
import ChevronRightIcon from '@assets/icons/chevron-right.svg';
import { FileSystemItem } from '@types';

interface Props {
	name: string;
	depth: number;
	foldable?: boolean;
	opened?: boolean;
	primarySelected?: boolean;
	secondarySelected?: boolean;
	icon: JSX.Element;
	children: FileSystemItem[];
	onClick: () => void;
}

export function UINode({
	name,
	depth = 0,
	foldable = false,
	opened = false,
	primarySelected = false,
	secondarySelected = false,
	icon,
	children,
	onClick
}: Props) {
	let selectionStyle = '';

	if (secondarySelected) {
		selectionStyle = 'border-blue-500 border-2 border-opacity-70';
	} else if (primarySelected) {
		selectionStyle =
			'bg-blue-500 border-blue-300 border bg-opacity-30 border-opacity-30';
	} else {
		selectionStyle =
			'hover:bg-opacity-30 hover:bg-gray-700 border border-transparent';
	}

	let chevronIcon: JSX.Element | null = null;
	if (foldable && opened) {
		chevronIcon = <ChevronDownIcon fill='#9CA3AF' className='-ml-6' />;
	} else if (foldable && !opened) {
		chevronIcon = <ChevronRightIcon fill='#9CA3AF' className='-ml-6' />;
	}

	return (
		<div>
			<div
				onClick={onClick}
				className={`flex items-center py-0.5 select-none cursor-pointer align-bottom ${selectionStyle}`}
				style={{ paddingLeft: `${depth + 2}rem` }}
			>
				{chevronIcon}
				{icon}
				<p className='text-gray-300 text-sm'>{name}</p>
			</div>
			<div className='relative'>
				<div
					className='absolute h-full bg-gray-600'
					style={{ marginLeft: `${depth + 1.25}rem`, width: '1px' }}
				/>
				{children.map((item) => (
					<Node item={item} depth={depth + 1} />
				))}
			</div>
		</div>
	);
}
