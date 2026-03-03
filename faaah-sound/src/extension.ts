import * as vscode from 'vscode';
const player = require('play-sound')({});

export function activate(context: vscode.ExtensionContext) {

    const saveListener = vscode.workspace.onDidSaveTextDocument((document) => {

        const diagnostics = vscode.languages.getDiagnostics(document.uri);

        const hasErrors = diagnostics.some(d => d.severity === vscode.DiagnosticSeverity.Error);

        if (hasErrors) {
            playSound(context);
        }
    });

    context.subscriptions.push(saveListener);
}

function playSound(context: vscode.ExtensionContext) {
    const soundPath = vscode.Uri.joinPath(context.extensionUri, 'media', 'faah.mp3').fsPath;

    player.play(soundPath, (err: any) => {
        if (err) {
            console.log("Could not play sound:", err);
        }
    });
}

export function deactivate() {}