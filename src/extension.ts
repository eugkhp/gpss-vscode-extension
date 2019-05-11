// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { print } from 'util';
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "gpss" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('extension.runGpssModel', () => {
		// The code you place here will be executed every time your command is executed
		let a = vscode.window.activeTextEditor;
		var child = require('child_process').exec;
		let fspath = "not found";
		let path = "not found";
		if (a != null) {
			fspath = a.document.uri.fsPath;
			path = fspath.substring(0, fspath.lastIndexOf("\\"));
		}
		path = path + "\\gpssh.exe" + " " + fspath;
		let answer = child(path, (e: any, stdout: any, stderr: any) => {
			if (e instanceof Error) {
				console.error(e);
				throw e;
			}
			console.log('stdout ', stdout);
			console.log('stderr ', stderr);
		});
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() { }
