"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const webviewContent = require("./webviewContent");
function activate(context) {
    console.log('Congratulations, your extension "gpss" is now active!');
    let disposable = vscode.commands.registerCommand('extension.runGpssModel', () => {
        let currentWindow = vscode.window.activeTextEditor;
        var child = require('child_process').execSync;
        const pathlib = require('path');
        let fullFilePath;
        let path;
        let filename;
        if (currentWindow !== undefined) {
            fullFilePath = currentWindow.document.uri.fsPath;
            path = pathlib.dirname(fullFilePath);
            filename = pathlib.parse(fullFilePath).name;
            let fileType = pathlib.parse(fullFilePath).ext;
            if (fileType !== ".gpss") {
                vscode.window.showErrorMessage("Wrong source file, expected .gpss, given: " + filename + fileType);
                return;
            }
        }
        let execPath = path + "\\gpssh.exe" + " " + fullFilePath;
        try {
            child(execPath);
        }
        catch (e) {
            vscode.window.showErrorMessage("Interpreter error.");
            const report = vscode.window.createWebviewPanel("errorReport", "ErrorReport", vscode.ViewColumn.Beside, {});
            report.webview.html = webviewContent.getWebviewContentErrorReport(e.message);
            return;
        }
        var openPath = vscode.Uri.parse("file:///" + path + "\\" + filename + ".liss");
        vscode.workspace.openTextDocument(openPath).then((doc) => {
            vscode.window.showTextDocument(doc, { viewColumn: vscode.ViewColumn.Beside });
        });
    });
    context.subscriptions.push(disposable);
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map