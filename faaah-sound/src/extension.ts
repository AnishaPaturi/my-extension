import * as vscode from 'vscode';



export function activate(context: vscode.ExtensionContext) {

    console.log('FAAAH extension activated 😈');

    // 🔹 When file is saved
    const saveListener = vscode.workspace.onDidSaveTextDocument((document) => {
        checkForErrorsAndScream(document, context);
    });

    // 🔹 When debugging starts (running code)
    const debugListener = vscode.debug.onDidStartDebugSession(() => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) return;

        checkForErrorsAndScream(editor.document, context);
    });

    context.subscriptions.push(saveListener);
    context.subscriptions.push(debugListener);
}

function checkForErrorsAndScream(
    document: vscode.TextDocument,
    context: vscode.ExtensionContext
) {
    const diagnostics = vscode.languages.getDiagnostics(document.uri);

    const hasErrors = diagnostics.some(
        d => d.severity === vscode.DiagnosticSeverity.Error
    );

    if (hasErrors) {
        playSound(context);
    }
}

function playSound(context: vscode.ExtensionContext) {
    const panel = vscode.window.createWebviewPanel(
        'faahSound',
        'FAAAH',
        { preserveFocus: true, viewColumn: vscode.ViewColumn.Beside },
        {
            enableScripts: true
        }
    );

    const soundUri = panel.webview.asWebviewUri(
        vscode.Uri.joinPath(context.extensionUri, 'media', 'faah.mp3')
    );

    panel.webview.html = `
        <html>
            <body>
                <audio autoplay>
                    <source src="${soundUri}" type="audio/mpeg">
                </audio>
            </body>
        </html>
    `;

    // Auto close after 1 second
    setTimeout(() => {
        panel.dispose();
    }, 1000);
}


export function deactivate() {}