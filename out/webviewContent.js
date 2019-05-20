"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getWebviewContentErrorReport(error) {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Report</title>
</head>
<body>` + error + `
</body>
</html>`;
}
exports.getWebviewContentErrorReport = getWebviewContentErrorReport;
//# sourceMappingURL=webviewContent.js.map