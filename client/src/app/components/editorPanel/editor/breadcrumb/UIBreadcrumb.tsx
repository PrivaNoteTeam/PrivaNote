import React from 'react';
import ChevronIcon from '../../../../assets/icons/chevron-right.svg';

interface Props {
	pathSegments: string[];
	applyDirectoryClickHandler: (part: string, index: number) => () => void;
	applyUnsavedChangesIndicator: (segment: string, index: number) => string;
}

export function UIBreadcrumb({
	pathSegments,
	applyDirectoryClickHandler,
	applyUnsavedChangesIndicator
}: Props) {
	const render = pathSegments.map((segment, i) => {
		return (
			<div className='flex'>
				{i !== 0 && (
					<ChevronIcon fill='#9CA3AF' className='self-baseline' />
				)}
				<p
					onClick={applyDirectoryClickHandler(segment, i)}
					className='text-gray-400 self-center select-none hover:text-white cursor-pointer'
				>
					{applyUnsavedChangesIndicator(segment, i)}
				</p>
			</div>
		);
	});

	return (
		<div
			className='bg-gray-900 pn-drop-shadow flex py-1 px-4'
			data-testid='ui-breadcrumb'
		>
			{render}
		</div>
	);
}
