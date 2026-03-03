"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/extension.ts
var extension_exports = {};
__export(extension_exports, {
  activate: () => activate,
  deactivate: () => deactivate
});
module.exports = __toCommonJS(extension_exports);
var vscode = __toESM(require("vscode"));
var lastScreamTime = 0;
var COOLDOWN_MS = 2e3;
function activate(context) {
  console.log("Ctrl+S of Shame activated \u{1F608}");
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
function checkForErrorsAndScream(document, context) {
  const diagnostics = vscode.languages.getDiagnostics(document.uri);
  const errorCount = diagnostics.filter(
    (d) => d.severity === vscode.DiagnosticSeverity.Error
  ).length;
  const now = Date.now();
  if (errorCount > 0 && now - lastScreamTime > COOLDOWN_MS) {
    lastScreamTime = now;
    playSound(context);
  }
}
function playSound(context) {
  const sounds = ["faah1.mp3", "faah2.mp3", "faah3.mp3"];
  const randomSound = sounds[Math.floor(Math.random() * sounds.length)];
  const panel = vscode.window.createWebviewPanel(
    "ctrlSOfShame",
    "",
    { preserveFocus: true, viewColumn: vscode.ViewColumn.Beside },
    { enableScripts: true }
  );
  const soundUri = panel.webview.asWebviewUri(
    vscode.Uri.joinPath(context.extensionUri, "media", randomSound)
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
  }, 1e3);
}
function deactivate() {
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  activate,
  deactivate
});
//# sourceMappingURL=extension.js.map
