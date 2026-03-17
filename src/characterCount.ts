import * as path from 'path';

const supportedExtensions = new Set(['.txt', '.md']);
const graphemeSegmenter =
	typeof Intl !== 'undefined' && typeof Intl.Segmenter !== 'undefined'
		? new Intl.Segmenter('ja', { granularity: 'grapheme' })
		: undefined;

export function isSupportedFile(fileName: string): boolean {
	return supportedExtensions.has(path.extname(fileName).toLowerCase());
}

export function countCharacters(text: string): number {
	if (graphemeSegmenter) {
		return Array.from(graphemeSegmenter.segment(text)).length;
	}

	return Array.from(text).length;
}
