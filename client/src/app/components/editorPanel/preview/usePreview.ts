import marked from 'marked';
import parse from 'html-react-parser';

export function usePreview(text: string) {
	const html = marked(text);

	return parse(html);
}
