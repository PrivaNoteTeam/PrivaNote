import React from 'react';
import { Breadcrumb } from './Breadcrumb';
//import Markdown from 'markdown-to-jsx'; // for the useEditor business logic, gets HTML from markdown
import MonicoEditor, { loader, Monaco } from '@monaco-editor/react';
import path from 'path';

interface Props {
	unsaved: boolean;
	text: string;
	handleChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

function ensureFirstBackSlash(str: string) {
	return str.length > 0 && str.charAt(0) !== '/' ? '/' + str : str;
}

function uriFromPath(_path: string) {
	const pathName = path.resolve(_path).replace(/\\/g, '/');
	return encodeURI('file://' + ensureFirstBackSlash(pathName));
}

export function UIEditor({ unsaved }: Props) {
	//const monaco = useMonaco();

	loader.config({
		paths: {
			vs: uriFromPath(
				path.join(__dirname, '../node_modules/monaco-editor/min/vs')
			)
		}
	});

	const handleMount = (_: any, monaco: Monaco) => {
		monaco.editor.defineTheme('Default', {
			base: 'vs-dark',
			colors: { 'editor.background': '#11182700' },
			inherit: true,
			rules: [
				{
					background: '#11182700', //"#111827",
					token: ''
				}
			]
		});

		monaco.editor.setTheme('Default');
	};

	return (
		<div className='bg-gray-900 flex-grow flex flex-col'>
			<Breadcrumb unsaved={unsaved} />
			<div className='overflow-auto flex-grow w-full'>
				<div className='w-full h-full bg-transparent outline-none border-none font-mono p8 resize-none'>
					<MonicoEditor
						defaultLanguage='markdown'
						defaultValue='# Hello world'
						options={{
							padding: { top: 16 },
							lineNumbers: 'off',
							fontSize: 14,
							smoothScrolling: true,
							contextmenu: false,
							minimap: { enabled: false },
							wordWrap: 'on',
							selectionHighlight: false,
							quickSuggestions: false,
							renderLineHighlight: 'none',
							cursorBlinking: 'blink',
							hideCursorInOverviewRuler: true,
							overviewRulerBorder: false,
							scrollbar: {
								vertical: 'hidden'
							}
						}}
						onMount={handleMount}
					/>
				</div>
			</div>
		</div>
	);
}
