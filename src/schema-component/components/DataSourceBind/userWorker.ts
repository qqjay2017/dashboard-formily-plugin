import * as monaco from "monaco-editor";
import editorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";
import jsonWorker from "monaco-editor/esm/vs/language/json/json.worker?worker";
import cssWorker from "monaco-editor/esm/vs/language/css/css.worker?worker";
import htmlWorker from "monaco-editor/esm/vs/language/html/html.worker?worker";
import tsWorker from "monaco-editor/esm/vs/language/typescript/ts.worker?worker";

self.MonacoEnvironment = {
    getWorker(_: any, label: string) {
        if (label === "json") {
            return new jsonWorker();
        }
        if (label === "css" || label === "scss" || label === "less") {
            return new cssWorker();
        }
        if (label === "html" || label === "handlebars" || label === "razor") {
            return new htmlWorker();
        }
        if (label === "typescript" || label === "javascript") {
            return new tsWorker();
        }
        return new editorWorker();
    },
};

monaco.languages.typescript.typescriptDefaults.setEagerModelSync(true);

monaco.languages.registerCompletionItemProvider('typescript', {

    provideCompletionItems: (model, position) => {
        const word = model.getWordUntilPosition(position);
        const range = { startLineNumber: position.lineNumber, startColumn: word.startColumn, endLineNumber: position.lineNumber, endColumn: word.endColumn };
        const textUntilPosition = model.getValueInRange({ startLineNumber: 1, startColumn: 1, endLineNumber: position.lineNumber, endColumn: position.column });

        const match = textUntilPosition.match(/context\.$/);
        if (match !== null) {
            return {
                suggestions: [
                    {
                        range,
                        label: 'get',
                        kind: monaco.languages.CompletionItemKind.Method,
                        documentation: 'The get method is a part of the context object',
                        insertText: 'get',
                    },
                    // Adding more properties of the context object
                ]
            };
        }
        return {
            suggestions: [
                {
                    range,
                    label: 'apiRes',
                    kind: 4,
                    documentation: 'The response from API',
                    insertText: 'apiRes'
                },
                {
                    range,
                    label: 'context',
                    kind: 4,
                    documentation: 'The context object',
                    insertText: 'context'
                }
            ]
        };
    }
});

