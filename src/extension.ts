import * as path from 'path';
import * as vscode from 'vscode';
import { countCharacters, isSupportedFile } from './characterCount';

let statusBarItem: vscode.StatusBarItem | undefined;

function updateStatusBar(editor: vscode.TextEditor | undefined): void {
	if (!statusBarItem) {
		return;
	}

	if (!editor || !isSupportedFile(editor.document.fileName)) {
		statusBarItem.hide();
		return;
	}

	const characterCount = countCharacters(editor.document.getText());
	statusBarItem.text = `$(symbol-string) ${characterCount.toLocaleString()}文字`;
	statusBarItem.tooltip = `${path.basename(editor.document.fileName)}: ${characterCount.toLocaleString()} 文字`;
	statusBarItem.show();
}

export function activate(context: vscode.ExtensionContext): void {
	statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);
	context.subscriptions.push(statusBarItem);

	context.subscriptions.push(
		vscode.window.onDidChangeActiveTextEditor((editor) => {
			updateStatusBar(editor);
		}),
		vscode.workspace.onDidChangeTextDocument((event) => {
			if (event.document === vscode.window.activeTextEditor?.document) {
				updateStatusBar(vscode.window.activeTextEditor);
			}
		})
	);

	updateStatusBar(vscode.window.activeTextEditor);
}

export function deactivate(): void {
	statusBarItem = undefined;
}
