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
			const found = fileExist(fileUrl);

			const render = found
				? `
					<a href=${fileUrl} download class='attachment-link flex justify-between hover:no-underline no-underline'>
						<div class='flex space-x-3'>
							${renderToString(<AttachmentIcon fill='#9CA3AF' />)}	
							<p class='text-sm text-gray-400 hover:no-underline no-underline'>${
								token.text
							}</p>
						</div>
						<p class='text-sm text-gray-400 hover:no-underline no-underline'>${getFileSize(
							fileUrl
						)} kB</p>
					</a>
					`
				: `
					<div class='flex'>
						${renderToString(<AttachmentIcon fill='#FF5733' className='mr-3' />)}
						<p class='text-sm text-red-400'>${token.text}</p>
					</div>
				`;

			return `<div class='border-4 ${
				found
					? 'border-gray-800 hover:border-gray-700'
					: 'border-red-400 hover:border-red-500'
			} p-4 my-2 cursor-pointer rounded-md min-w-min w-4/6 mr-auto'>
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
