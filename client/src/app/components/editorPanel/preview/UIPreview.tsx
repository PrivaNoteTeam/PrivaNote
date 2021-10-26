import React from 'react';

export function UIPreview() {
	return (
		<div className='flex flex-col w-1/2'>
			<div className='bg-gray-900 pn-drop-shadow flex py-1 px-4 z-10'>
				<p className='text-gray-500'>Live Preview</p>
			</div>
			<div className='flex-grow pn-drop-shadow bg-gray-900 p-8 text-white'>
				<p>Test</p>
			</div>
		</div>
	);
}
