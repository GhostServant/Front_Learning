import './routes.js'

const toggleButton = document.querySelector('.toggle-button');
const sidebar = document.querySelector('.sidebar');
const container = document.querySelector(".container");
const editContainerImg = document.querySelector(".code-editor__container")

function createNotification() {
    const notification = document.createElement('div');
    notification.className = 'copy-notification';
    container.appendChild(notification);
    return notification;
}

const notification = createNotification();

function copyCode(codeElement, button) {
    const code = codeElement.innerText;
    
    navigator.clipboard.writeText(code).then(() => {
        button.classList.add('copied');
        button.textContent = 'Скопировано!';
        

        notification.textContent = 'Код успешно скопирован!';
        notification.classList.add('show');
        
        setTimeout(() => {
            button.classList.remove('copied');
            button.textContent = 'Скопировать код';
            notification.classList.remove('show');
        }, 2000);
    }).catch(_ => {
        notification.textContent = 'Ошибка при копировании';
        notification.style.backgroundColor = '#dc3545';
        notification.classList.add('show');
        setTimeout(() => {
            notification.classList.remove('show');
        }, 2000);
    });
}

document.querySelectorAll('.code-block').forEach(block => {
    const code = block.querySelector('code');
    if (code) {
        const language = code.className.replace('language-', '');
        block.setAttribute('data-language', language);
    }
});

document.querySelectorAll('.copy-button').forEach(button => {
    button.addEventListener('click', () => {
        const codeElement = button.previousElementSibling.querySelector('code');
        copyCode(codeElement, button);
    });
});

if (toggleButton) {
  toggleButton.addEventListener('click', function() {
      const isCollapsed = sidebar.classList.toggle('collapsed');
      toggleButton.innerHTML = isCollapsed ? '<strong>&#9664;</strong> Закрыть меню' : '<strong>&#9654;</strong> Открыть меню';
  });
}

if (sidebar) {
  sidebar.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', function(e) {
          e.preventDefault();
          const targetId = e.target.getAttribute('href');
          const targetElement = document.querySelector(targetId);
          targetElement.scrollIntoView({ behavior: 'smooth' });
      });
  });
}

if (editContainerImg) {
  editContainerImg.addEventListener("click", () => {
      window.location.pathname = "./modules/codeEditor.html";
  });
}