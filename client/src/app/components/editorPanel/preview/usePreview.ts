import marked from 'marked';
import parse from 'html-react-parser';
import hljs from 'highlight.js';
import { useStore } from '@hooks';

export function usePreview(text: string) {
	const [{ notebook }] = useStore();

	const html = marked(text, {
		highlight: (code: string) => {
			return hljs.highlightAuto(code).value; // no lang selected ,throws error
		},
		baseUrl: notebook
	});

	return parse(html);
}
