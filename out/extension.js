"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
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
        exec('spssh.exe', ['1.gpss'], { cwd: path }, (err, data) => {
            if (err)
                vscode.window.showInformationMessage(err);
            else
                vscode.window.showInformationMessage(data);
        });
        // Display a message box to the user
        vscode.window.showInformationMessage(path);
    });
    context.subscriptions.push(disposable);
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map