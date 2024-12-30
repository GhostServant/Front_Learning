const currentUrl = window.location.pathname;

const dataRoutes = [
  { name: "Главная", link: "./../index.html" },
  { name: "Модуль 1", link: "./module1.html" },
  { name: "Модуль 2", link: "./module2.html" },
  { name: "Модуль 3", link: "./module3.html" },
  { name: "Модуль 4", link: "./module4.html" },
  { name: "Модуль 5", link: "./module5.html" },
  { name: "Модуль 6", link: "./module6.html" },
];

const dataTitlePage = [
  { name: "Модуль 1: Введение в HTML", link: "/module1.html" },
  { name: "Модуль 2: Введение в HTML", link: "/module2.html" },
  { name: "Модуль 3: Базовый CSS", link: "/module3.html" },
  { name: "Модуль 4: JS: база", link: "/module4.html" },
  { name: "Модуль 5: JS: база", link: "/module5.html" },
  { name: "Модуль 6: JS: база", link: "/module6.html" },
  { name: "Редактор кода для практики", link: "/codeEditor.html" }
];

async function loadTemplates() {
  try {
    await Promise.all([
      loadTemplate("header", ".site-header", ".header-container"),
      loadTemplate("footer", ".site-footer", ".footer-content"),
    ]);
  } catch (error) {
    console.error("Error loading templates:", error);
  } finally {
    hideLoader();
  }
}

async function loadTemplate(templateName, templateId, templateContainer) {
  try {
    const response = await fetch(`./${templateName}.html`);
    if (response.ok) {
      const content = await response.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(content, "text/html");
      const elementContainer = doc.querySelector(templateContainer);

      if (elementContainer) {
        if (templateName === "header") {
          const moduleTitle = dataTitlePage.find((title) =>
            currentUrl.includes(title.link)
          );
          if (moduleTitle) {
            doc.querySelector(".module-title").textContent = moduleTitle.name;
          } else {
            console.error(`Module title not found for ${templateName}`);
          }
        }
        document.querySelector(templateId).innerHTML = elementContainer.outerHTML;
        if (templateName === "header") renderModules();
      } else {
        console.error(
          `Element container ${templateContainer} not found in ${templateName}`
        );
      }
    } else {
      console.error(`Template ${templateName} not found`);
    }
  } catch (error) {
    console.error("Error loading page:", error);
  }
}

function renderModules() {
  if (currentUrl && currentUrl.includes("/modules/")) {
    const linkArr = currentUrl.split("/");
    const renderInCurrentRoutes = dataRoutes.filter(
      (route) => route.link.split("/")[1] !== linkArr[linkArr.length - 1]
    );
    const navList = document.querySelector(".nav-list") ?? false;
    if (navList) {
      navList.innerHTML = renderInCurrentRoutes
        .map(
          (route) =>
            `<li class="nav-item"><a class="nav-link" href="${route.link}">${route.name}</a></li>`
        )
        .join(" ");
    }
  }
}


function hideLoader() {
  document.getElementById("loader-container").style.display = "none";
}

window.addEventListener("load", async function () {
  if (currentUrl.includes("modules")) {
    await loadTemplates();
  }
});