import * as vscode from 'vscode';
import * as webviewContent from './webviewContent';
export function activate(context: vscode.ExtensionContext) {

	console.log('Congratulations, your extension "gpss" is now active!');

	let disposable = vscode.commands.registerCommand('extension.runGpssModel', () => {
		let currentWindow = vscode.window.activeTextEditor;
		var child = require('child_process').execSync;
		const pathlib = require('path');

		let fullFilePath: string;
		let path: string;
		let filename: string;
		let fileType: string;
		let execPath: string;

		if (currentWindow !== undefined) {
			fullFilePath = currentWindow.document.uri.fsPath;
			path = pathlib.dirname(fullFilePath);
			filename = pathlib.parse(fullFilePath).name;

			fileType = pathlib.parse(fullFilePath).ext;
			if (fileType !== ".gpss" && fileType !== ".gps" && fileType !== ".liss" && fileType !== ".lis") {
				vscode.window.showErrorMessage("Wrong source file, expected .gpss or .gps, given: " + filename + fileType);
				return;
			}
			if (fileType === ".lis") {
				fileType = ".gps";
			}
			if (fileType === ".liss") {
				fileType = ".gpss";
			}

			execPath = path + "\\gpssh.exe" + " " + path + "\\" + filename + fileType;
			try {
				child(execPath);
			} catch (e) {
				vscode.window.showErrorMessage("Interpreter error.");
				const report = vscode.window.createWebviewPanel("errorReport", "ErrorReport", vscode.ViewColumn.Beside, {});
				report.webview.html = webviewContent.getWebviewContentErrorReport(e.message);
				return;
			}
			
			child(execPath, (e: any, stdout: any, stderr: any) => {
				if (e instanceof Error) {
					console.error(e);
					throw e;
				}
				console.log('stdout ', stdout);
				console.log('stderr ', stderr);
			});

			var openPath = vscode.Uri.parse("file:///" + path + "\\" + filename + ".liss");

			let windowToOpen = vscode.ViewColumn.Beside;
			let currentFileType = pathlib.parse(fullFilePath).ext;
			if (currentFileType === ".liss" || currentFileType === ".lis") {
				windowToOpen = vscode.ViewColumn.Active;
			}
			vscode.workspace.openTextDocument(openPath).then(doc => {
				vscode.window.showTextDocument(doc, { viewColumn: windowToOpen, preserveFocus: false });
			});
			vscode.commands.executeCommand("workbench.action.files.revert");
		}
		context.subscriptions.push(disposable);
	});
}
export function deactivate() { }

