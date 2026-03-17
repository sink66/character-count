import * as assert from 'assert';
import * as vscode from 'vscode';
import { countCharacters, isSupportedFile } from '../characterCount';

suite('Extension Test Suite', () => {
	vscode.window.showInformationMessage('Start all tests.');

	test('counts grapheme clusters as characters', () => {
		assert.strictEqual(countCharacters('abc'), 3);
		assert.strictEqual(countCharacters('あいう'), 3);
		assert.strictEqual(countCharacters('A😀é'), 3);
	});

	test('supports txt and md files only', () => {
		assert.strictEqual(isSupportedFile('note.txt'), true);
		assert.strictEqual(isSupportedFile('README.md'), true);
		assert.strictEqual(isSupportedFile('memo.markdown'), false);
		assert.strictEqual(isSupportedFile('script.ts'), false);
	});
});
