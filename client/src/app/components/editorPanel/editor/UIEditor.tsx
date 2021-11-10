import React from 'react';
import { Breadcrumb } from './Breadcrumb';
import MonicoEditor, { loader, OnChange, OnMount } from '@monaco-editor/react';
import path from 'path';
import { Dropzone } from './Dropzone';
import { useEditorDrop } from '@hooks';

interface Props {
	unsaved: boolean;
	text: string;
	handleChange: OnChange;
}

function ensureFirstBackSlash(str: string) {
	return str.length > 0 && str.charAt(0) !== '/' ? '/' + str : str;
}

function uriFromPath(_path: string) {
	const pathName = path.resolve(_path).replace(/\\/g, '/');
	return encodeURI('file://' + ensureFirstBackSlash(pathName));
}

export function UIEditor({ unsaved, text, handleChange }: Props) {
	const { drop: handleDrop, init } = useEditorDrop();

	loader.config({
		paths: {
			vs: uriFromPath(
				path.join(__dirname, '../node_modules/monaco-editor/min/vs')
			)
		}
	});

	const handleMount: OnMount = (event, monaco) => {
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

		init((path: string, cursorPosition: [number, number]) => {
			console.log('run', path);
			const target = event.getTargetAtClientPoint(
				cursorPosition[0],
				cursorPosition[1]
			);

			if (!target) return;

			event.setPosition(target.position!);

			const fileName = path.substring(
				path.lastIndexOf('/') + 1,
				path.lastIndexOf('.')
			);

			const line = event.getPosition();
			const range = new monaco.Range(
				line!.lineNumber,
				1,
				line!.lineNumber,
				1
			);

			var id = { major: 1, minor: 1 };
			const textToInsert = `\n[${fileName}]{${path}}\n`;
			const op = {
				identifier: id,
				range,
				text: textToInsert,
				forceMoveMarkers: true
			};

			event.executeEdits('', [op]);
		});
	};

	return (
		<div className='bg-gray-900 flex-grow flex flex-col w-full h-full'>
			<Breadcrumb unsaved={unsaved} />
			<div className='overflow-auto flex-grow w-full'>
				<div className='relative w-full h-full bg-transparent outline-none border-none font-mono p8 resize-none'>
					<Dropzone onDrop={handleDrop}>
						<MonicoEditor
							defaultLanguage='markdown'
							value={text}
							onChange={handleChange}
							options={{
								padding: { top: 16 },
								lineNumbers: 'off',
								fontSize: 14,
								smoothScrolling: true,
								contextmenu: false,
								minimap: { enabled: false },
								wordWrap: 'off',
								selectionHighlight: false,
								quickSuggestions: false,
								renderLineHighlight: 'none',
								cursorBlinking: 'blink',
								links: false,
								hideCursorInOverviewRuler: true,
								overviewRulerBorder: false,
								scrollbar: {
									vertical: 'hidden'
								}
							}}
							onMount={handleMount}
						/>
					</Dropzone>
				</div>
			</div>
		</div>
	);
}
