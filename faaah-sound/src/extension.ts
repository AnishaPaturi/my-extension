import * as vscode from 'vscode';

let lastScreamTime = 0;
const COOLDOWN_MS = 2000; // 2 second cooldown

export function activate(context: vscode.ExtensionContext) {

    console.log('Ctrl+S of Shame activated 😈');

    const saveListener = vscode.workspace.onDidSaveTextDocument((document) => {
        checkForErrorsAndScream(document, context);
    });

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

    const errorCount = diagnostics.filter(
        d => d.severity === vscode.DiagnosticSeverity.Error
    ).length;

    const now = Date.now();

    if (errorCount > 0 && now - lastScreamTime > COOLDOWN_MS) {
        lastScreamTime = now;
        playSound(context);
    }
}

function playSound(context: vscode.ExtensionContext) {

    // 🔥 Add multiple sounds inside media folder
    const sounds = ["faah1.mp3", "faah2.mp3", "faah3.mp3"];
    const randomSound = sounds[Math.floor(Math.random() * sounds.length)];

    const panel = vscode.window.createWebviewPanel(
        'ctrlSOfShame',
        '',
        { preserveFocus: true, viewColumn: vscode.ViewColumn.Beside },
        { enableScripts: true }
    );

    const soundUri = panel.webview.asWebviewUri(
        vscode.Uri.joinPath(context.extensionUri, 'media', randomSound)
    );

    panel.webview.html = `
        <html>
            <body style="background:transparent;">
                <audio autoplay>
                    <source src="${soundUri}" type="audio/mpeg">
                </audio>
            </body>
        </html>
    `;

    setTimeout(() => {
        panel.dispose();
    }, 1000);
}

export function deactivate() {}