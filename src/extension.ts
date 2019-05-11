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
        var exec = require('child_process').execFile;
        let a = vscode.window.activeTextEditor;
        let path = "not found";
        if (a != null) {
            path = a.document.uri.fsPath;
            path = path.substring(0, path.lastIndexOf("\\"));
        }
        var child = require('child_process').execFile;
		path = "C:\\Users\\evgenii\\university\\Model\\test\\gpssh.exe";
		var parameters = ["1.gpss"];
        child(path, parameters, function (err: { code: any; }, data: { toString: () => void; }) {
			console.log("hey");
            if (err.code) {
                console.error(err.code);
                return;
            }
            console.log(data.toString());
        });
        // Display a message box to the user
        vscode.window.showInformationMessage(path);
        // var child = require('child_process').execFile;
        // var executablePath = "C:\\Program Files\\Mozilla Firefox\\firefox.exe";
        // child(executablePath, function (err, data) {
        //     if (err.code) {
        //         console.error(err.code);
        //         return;
        //     }
        //     console.log(data.toString());
        // });
    });

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() { }
