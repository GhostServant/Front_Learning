import './routes.js'
import './codeEditor.js'

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
        // Изменяем состояние кнопки
        button.classList.add('copied');
        button.textContent = 'Скопировано!';
        
        // Показываем уведомление
        notification.textContent = 'Код успешно скопирован!';
        notification.classList.add('show');
        
        // Возвращаем кнопку в исходное состояние
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

// Добавляем язык программирования к блокам кода
document.querySelectorAll('.code-block').forEach(block => {
    const code = block.querySelector('code');
    if (code) {
        const language = code.className.replace('language-', '');
        block.setAttribute('data-language', language);
    }
});

// Обработчики событий для кнопок копирования
document.querySelectorAll('.copy-button').forEach(button => {
    button.addEventListener('click', () => {
        const codeElement = button.previousElementSibling.querySelector('code');
        copyCode(codeElement, button);
    });
});

// Обработчик для кнопки переключения, если она существует
if (toggleButton) {
  toggleButton.addEventListener('click', function() {
      const isCollapsed = sidebar.classList.toggle('collapsed');
      toggleButton.innerHTML = isCollapsed ? '<strong>&#9664;</strong> Закрыть меню' : '<strong>&#9654;</strong> Открыть меню';
  });
}

// Обработчики для ссылок в сайдбаре, если они существуют
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

// Обработчик для контейнера редактора кода, если он существует
if (editContainerImg) {
  editContainerImg.addEventListener("click", () => {
      window.location.pathname = "./modules/codeEditor.html";
  });
}