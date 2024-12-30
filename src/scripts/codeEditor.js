// Инициализация CodeMirror
const codeEditor = document.getElementById('codeEditor');
const editor = window.CodeMirror.fromTextArea(codeEditor, {
    lineNumbers: true, // Номера строк
    mode: "javascript", // Режим для JavaScript
    theme: "material", // Тема
    indentUnit: 4, // Отступы
    smartIndent: true, // Умные отступы
    matchBrackets: true, // Подсветка совпадающих скобок
    autoCloseBrackets: true, // Автозакрытие скобок
    extraKeys: { "Ctrl-Space": "autocomplete" }
});

const runButton = document.getElementById('runButton');
const output = document.getElementById('output');
const loaderContainer = document.getElementById('loader-container');

runButton.addEventListener('click', () => {
    const code = editor.getValue(); // Получаем код из редактора

    loaderContainer.style.display = 'flex'; // Показываем лоадер
    output.innerHTML = ''; // Очищаем вывод

    try {
        // Создаем Worker
        const workerCode = `
            self.onmessage = function(event) {
                const code = event.data;
                let consoleOutput = [];

                // Переопределяем console.log
                const originalConsoleLog = console.log;
                console.log = function(...args) {
                    consoleOutput.push(args.join(' '));
                    originalConsoleLog(...args);
                };

                try {
                    eval(code); // Выполняем код
                    self.postMessage({ result: consoleOutput.join('\\n') });
                } catch (error) {
                    self.postMessage({ error: error.message });
                }
            };
        `;
        const blob = new Blob([workerCode], { type: 'application/javascript' });
        const worker = new Worker(URL.createObjectURL(blob));

        // Отправляем код в Worker
        worker.postMessage(code);

        // Обрабатываем результат
        worker.onmessage = function(event) {
            if (event.data.error) {
                output.innerHTML = `<pre style="color: red;">Ошибка: ${event.data.error}</pre>`;
            } else {
                output.innerHTML = `<pre>${event.data.result}</pre>`;
            }
            loaderContainer.style.display = 'none'; // Скрываем лоадер
        };
    } catch (error) {
        output.innerHTML = `<pre style="color: red;">Ошибка: ${error.message}</pre>`;
        loaderContainer.style.display = 'none'; // Скрываем лоадер
    }
});