const codeEditor = document.getElementById('codeEditor');
const editor = window.CodeMirror.fromTextArea(codeEditor, {
  lineNumbers: true,
  mode: "javascript",
  theme: "material",
  indentUnit: 4,
  smartIndent: true,
  matchBrackets: true,
  autoCloseBrackets: true,
  extraKeys: { "Ctrl-Space": "autocomplete" }
});

const outputDiv = document.getElementById('output');
const outputEditor = window.CodeMirror(outputDiv, {
  lineNumbers: true,
  mode: "javascript",
  theme: "material",
  readOnly: true,
});

const runButton = document.getElementById('runButton');
const loaderContainer = document.getElementById('loader-container');

runButton.addEventListener('click', () => {
  const code = editor.getValue();
  loaderContainer.style.display = 'flex';
  outputEditor.setValue('');

  try {
    const workerCode = `
      self.onmessage = function(event) {
        const code = event.data;
        let consoleOutput = [];

        const originalConsoleLog = console.log;
        console.log = function(...args) {
          consoleOutput.push(args.join(' '));
          originalConsoleLog(...args);
        };

        try {
          eval(code);
          self.postMessage({ result: consoleOutput.join('\\n') });
        } catch (error) {
          self.postMessage({ error: error.message });
        }
      };
    `;
    const blob = new Blob([workerCode], { type: 'application/javascript' });
    const worker = new Worker(URL.createObjectURL(blob));

    worker.postMessage(code);

    worker.onmessage = function(event) {
      if (event.data.error) {
        outputEditor.setValue(`Ошибка: ${event.data.error}`);
      } else {
        outputEditor.setValue(event.data.result);
      }
      loaderContainer.style.display = 'none';
    };
  } catch (error) {
    outputEditor.setValue(`Ошибка: ${error.message}`);
    loaderContainer.style.display = 'none';
  }
});