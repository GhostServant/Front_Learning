(self.webpackChunkfrontend_learning=self.webpackChunkfrontend_learning||[]).push([[23,910,957],{525:()=>{const e=window.location.pathname,t=[{name:"Главная",link:"./../index.html"},{name:"Модуль 1",link:"./module1.html"},{name:"Модуль 2",link:"./module2.html"},{name:"Модуль 3",link:"./module3.html"},{name:"Модуль 4",link:"./module4.html"},{name:"Модуль 5",link:"./module5.html"},{name:"Модуль 6",link:"./module6.html"}],n=[{name:"Модуль 1: Введение в HTML",link:"/module1.html"},{name:"Модуль 2: Введение в HTML",link:"/module2.html"},{name:"Модуль 3: Базовый CSS",link:"/module3.html"},{name:"Модуль 4: JS: база",link:"/module4.html"},{name:"Модуль 5: JS: база",link:"/module5.html"},{name:"Модуль 6: JS: база",link:"/module6.html"},{name:"Редактор кода для практики",link:"/codeEditor.html"}];async function o(){try{await Promise.all([l("header",".site-header",".header-container"),l("footer",".site-footer",".footer-content")])}catch(e){console.error("Error loading templates:",e)}finally{document.getElementById("loader-container").style.display="none"}}async function l(o,l,r){try{const c=await fetch(`./${o}.html`);if(c.ok){const i=await c.text(),a=(new DOMParser).parseFromString(i,"text/html"),s=a.querySelector(r);if(s){if("header"===o){const t=n.find((t=>e.includes(t.link)));t?a.querySelector(".module-title").textContent=t.name:console.error(`Module title not found for ${o}`)}document.querySelector(l).innerHTML=s.outerHTML,"header"===o&&function(){if(e&&e.includes("/modules/")){const n=e.split("/"),o=t.filter((e=>e.link.split("/")[1]!==n[n.length-1])),l=document.querySelector(".nav-list")??!1;l&&(l.innerHTML=o.map((e=>`<li class="nav-item"><a class="nav-link" href="${e.link}">${e.name}</a></li>`)).join(" "))}}()}else console.error(`Element container ${r} not found in ${o}`)}else console.error(`Template ${o} not found`)}catch(e){console.error("Error loading page:",e)}}window.addEventListener("load",(async function(){e.includes("modules")&&await o()}))},144:(e,t,n)=>{"use strict";n(525);const o=document.querySelector(".toggle-button"),l=document.querySelector(".sidebar"),r=document.querySelector(".container"),c=document.querySelector(".code-editor__container");const i=function(){const e=document.createElement("div");return e.className="copy-notification",r.appendChild(e),e}();document.querySelectorAll(".code-block").forEach((e=>{const t=e.querySelector("code");if(t){const n=t.className.replace("language-","");e.setAttribute("data-language",n)}})),document.querySelectorAll(".copy-button").forEach((e=>{e.addEventListener("click",(()=>{!function(e,t){const n=e.innerText;navigator.clipboard.writeText(n).then((()=>{t.classList.add("copied"),t.textContent="Скопировано!",i.textContent="Код успешно скопирован!",i.classList.add("show"),setTimeout((()=>{t.classList.remove("copied"),t.textContent="Скопировать код",i.classList.remove("show")}),2e3)})).catch((e=>{i.textContent="Ошибка при копировании",i.style.backgroundColor="#dc3545",i.classList.add("show"),setTimeout((()=>{i.classList.remove("show")}),2e3)}))}(e.previousElementSibling.querySelector("code"),e)}))})),o&&o.addEventListener("click",(function(){const e=l.classList.toggle("collapsed");o.innerHTML=e?"<strong>&#9664;</strong> Закрыть меню":"<strong>&#9654;</strong> Открыть меню"})),l&&l.querySelectorAll('a[href^="#"]').forEach((e=>{e.addEventListener("click",(function(e){e.preventDefault();const t=e.target.getAttribute("href");document.querySelector(t).scrollIntoView({behavior:"smooth"})}))})),c&&c.addEventListener("click",(()=>{window.location.pathname="./modules/codeEditor.html"}))}},e=>{var t;t=144,e(e.s=t)}]);