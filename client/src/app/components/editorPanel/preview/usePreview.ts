import marked from 'marked';
import parse from 'html-react-parser';
import hljs from 'highlight.js';

export function usePreview(text: string) {
	const html = marked(text, {
		highlight: (code: string) => {
			return hljs.highlightAuto(code).value; // no lang selected ,throws error
		}
	});

	return parse(html);
}
