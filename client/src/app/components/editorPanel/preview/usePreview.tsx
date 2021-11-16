import React from 'react';
import marked from 'marked';
import parse from 'html-react-parser';
import hljs from 'highlight.js';
import { useStore } from '@hooks';
import AttachmentIcon from '@assets/icons/attachment.svg';
import { renderToString } from 'react-dom/server';
import { fileExist, getFileSize } from '@utils';
import path from 'path';

export function usePreview(text: string) {
	const [{ notebook }] = useStore();

	const baseUrl = notebook!;

	const attachments: any = {
		name: 'attachment',
		level: 'block',
		start(src: string) {
			return src.match(/^\[.*]\{(.*\..*)\}\s?$/)?.index || -1;
		},
		tokenizer(src: string, _: any) {
			// goal: /^\[.*]\((.*\..*)\)\s?$/
			const rule = /^\[(.*)]\{(.*\..*)\}\s?$/;
			const match = rule.exec(src);

			if (match) {
				const token = {
					type: 'attachment',
					raw: match[0],
					text: match[1].trim(),
					link: match[2].trim(),
					tokens: []
				};

				this.lexer.inline(token.text, token.tokens);

				return token;
			}

			return;
		},
		renderer(token: any) {
			let baseUrlParent = baseUrl.substring(0, baseUrl.lastIndexOf('/'));
			const fileUrl = path.join(baseUrlParent, token.link);
			const fileExt = fileUrl.substring(fileUrl.lastIndexOf('.') + 1);
			const found = fileExist(fileUrl);

			const render = found
				? `
					<a href=${fileUrl} download class='attachment-link flex justify-between hover:no-underline no-underline items-center'>
						<div class='flex space-x-3 items-center'>
							${renderToString(<AttachmentIcon fill='#6B7280' />)}	
							<p class='text-sm uppercase font-semibold text-gray-500 hover:no-underline no-underline'>${
								token.text
							}</p>
						</div>
						<div class='flex flex-col space-y-1 items-center text-xs'>
							<p class='bg-gray-700 p-1 rounded-md text-gray-900 font-bold uppercase text-center'>
								${fileExt}
							</p>
							<p class='text-gray-500 hover:no-underline no-underline'>
								${getFileSize(fileUrl)} KB
							</p>
						</div>
					</a>
					`
				: `
					<div class='flex'>
						${renderToString(<AttachmentIcon fill='#FF5733' className='mr-3' />)}
						<p class='text-sm text-red-400'>${token.text}</p>
					</div>
				`;

			return `<div class='border-2 ${
				found
					? 'border-gray-800 hover:border-gray-700'
					: 'border-red-400 hover:border-red-500'
			} p-2 my-2 cursor-pointer rounded-md min-w-min w-64 mr-auto'>
					${render}
				</div>`;
		},
		childTokens: []
	};

	marked.use({
		extensions: [attachments]
	});

	const html = marked(text, {
		highlight: (code: string) => {
			return hljs.highlightAuto(code).value; // no lang selected ,throws error
		},
		baseUrl
	});

	return parse(html);
}
