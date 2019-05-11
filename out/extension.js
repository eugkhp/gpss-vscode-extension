"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
function activate(context) {
    console.log('Congratulations, your extension "gpss" is now active!');
    let disposable = vscode.commands.registerCommand('extension.runGpssModel', () => {
        let currentWindow = vscode.window.activeTextEditor;
        var child = require('child_process').execSync;
        const pathlib = require('path');
        let fullFilePath;
        let path;
        let filename;
        if (currentWindow != null) {
            fullFilePath = currentWindow.document.uri.fsPath;
            path = pathlib.dirname(fullFilePath);
            filename = pathlib.parse(fullFilePath).name;
            let fileType = pathlib.parse(fullFilePath).ext;
            if (fileType != ".gpss") {
                vscode.window.showErrorMessage("Wrong source file, expected .gpss, given: " + filename + fileType);
                return;
            }
        }
        let execPath = path + "\\gpssh.exe" + " " + fullFilePath;
        child(execPath, (e, stdout, stderr) => {
            if (e instanceof Error) {
                console.error(e);
                throw e;
            }
            console.log('stdout ', stdout);
            console.log('stderr ', stderr);
        });
        var openPath = vscode.Uri.parse("file:///" + path + "\\" + filename + ".liss");
        vscode.workspace.openTextDocument(openPath).then(doc => {
            vscode.window.showTextDocument(doc, { viewColumn: vscode.ViewColumn.Beside });
        });
    });
    context.subscriptions.push(disposable);
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map