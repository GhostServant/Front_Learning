(self.webpackChunkfrontend_learning=self.webpackChunkfrontend_learning||[]).push([[943],{39:()=>{const e=document.getElementById("codeEditor"),n=window.CodeMirror.fromTextArea(e,{lineNumbers:!0,mode:"javascript",theme:"material",indentUnit:4,smartIndent:!0,matchBrackets:!0,autoCloseBrackets:!0,extraKeys:{"Ctrl-Space":"autocomplete"}}),t=document.getElementById("runButton"),o=document.getElementById("output"),r=document.getElementById("loader-container");t.addEventListener("click",(()=>{const e=n.getValue();r.style.display="flex",o.innerHTML="";try{const n=new Blob(["\n            self.onmessage = function(event) {\n                const code = event.data;\n                let consoleOutput = [];\n\n                // Переопределяем console.log\n                const originalConsoleLog = console.log;\n                console.log = function(...args) {\n                    consoleOutput.push(args.join(' '));\n                    originalConsoleLog(...args);\n                };\n\n                try {\n                    eval(code); // Выполняем код\n                    self.postMessage({ result: consoleOutput.join('\\n') });\n                } catch (error) {\n                    self.postMessage({ error: error.message });\n                }\n            };\n        "],{type:"application/javascript"}),t=new Worker(URL.createObjectURL(n));t.postMessage(e),t.onmessage=function(e){e.data.error?o.innerHTML=`<pre style="color: red;">Ошибка: ${e.data.error}</pre>`:o.innerHTML=`<pre>${e.data.result}</pre>`,r.style.display="none"}}catch(e){o.innerHTML=`<pre style="color: red;">Ошибка: ${e.message}</pre>`,r.style.display="none"}}))}},e=>{var n;n=39,e(e.s=n)}]);