"use strict";var v=Object.create;var c=Object.defineProperty;var m=Object.getOwnPropertyDescriptor;var l=Object.getOwnPropertyNames;var p=Object.getPrototypeOf,h=Object.prototype.hasOwnProperty;var g=(e,o)=>{for(var s in o)c(e,s,{get:o[s],enumerable:!0})},a=(e,o,s,n)=>{if(o&&typeof o=="object"||typeof o=="function")for(let i of l(o))!h.call(e,i)&&i!==s&&c(e,i,{get:()=>o[i],enumerable:!(n=m(o,i))||n.enumerable});return e};var w=(e,o,s)=>(s=e!=null?v(p(e)):{},a(o||!e||!e.__esModule?c(s,"default",{value:e,enumerable:!0}):s,e)),f=e=>a(c({},"__esModule",{value:!0}),e);var y={};g(y,{activate:()=>b,deactivate:()=>D});module.exports=f(y);var t=w(require("vscode")),r=0,S=2e3;function b(e){console.log("Ctrl+S of Shame activated \u{1F608}");let o=t.workspace.onDidSaveTextDocument(n=>{d(n,e)}),s=t.debug.onDidStartDebugSession(()=>{let n=t.window.activeTextEditor;n&&d(n.document,e)});e.subscriptions.push(o),e.subscriptions.push(s)}function d(e,o){let n=t.languages.getDiagnostics(e.uri).filter(u=>u.severity===t.DiagnosticSeverity.Error).length,i=Date.now();n>0&&i-r>S&&(r=i,x(o))}function x(e){let o=["faah1.mp3","faah2.mp3","faah3.mp3"],s=o[Math.floor(Math.random()*o.length)],n=t.window.createWebviewPanel("ctrlSOfShame","",{preserveFocus:!0,viewColumn:t.ViewColumn.Beside},{enableScripts:!0}),i=n.webview.asWebviewUri(t.Uri.joinPath(e.extensionUri,"media",s));n.webview.html=`
        <html>
            <body style="background:transparent;">
                <audio autoplay>
                    <source src="${i}" type="audio/mpeg">
                </audio>
            </body>
        </html>
    `,setTimeout(()=>{n.dispose()},1e3)}function D(){}0&&(module.exports={activate,deactivate});
