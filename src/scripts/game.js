const gameArea = document.querySelector('.game-area');
const codeCollected = document.getElementById('code-collected');
const codeRequired = document.getElementById('code-required');
const gameLevel = document.getElementById('game-level');
const startButton = document.getElementById('start-game');
const gameOver = document.getElementById('game-over');
const restartButton = document.getElementById('restart-game');

let collected = 0;
let required = 10;
let level = 1;
let gameInterval;
const elementProperties = {
  div:"<div>",
  span:"<span>",
  const:"const",
  let:"let",
  padding:"padding",
}
function createRandomElement(){
  const gameElement = document.createElement('div');
  const randomKeyElement = Object.keys(elementProperties)[Math.round(Math.random()*4)];
  gameElement.className = `code-snippet-${randomKeyElement}`;
  gameElement.textContent = elementProperties[randomKeyElement];
  gameElement.style.left = `${Math.random() * (gameArea.offsetWidth - 50)}px`;
  gameElement.style.top = `${Math.random() * (gameArea.offsetHeight - 50)}px`;
  return gameArea.appendChild(gameElement);
}

function createCodeSnippet() {
    const snippet = createRandomElement();    

    snippet.addEventListener('click', () => {
        collected++;
        codeCollected.textContent = collected;
        snippet.remove();

        if (collected >= required) {
            if (level === 3) {
                clearInterval(gameInterval);
                gameOver.classList.add('visible');
                gameArea.innerHTML = '';
            } else {
                level++;
                gameLevel.textContent = level;
                collected = 0;
                codeCollected.textContent = collected;
                required += 5;
                codeRequired.textContent = required;
                clearInterval(gameInterval);
                startGame();
            }
        }
    });

    setTimeout(() => {
        snippet.remove();
    }, 1500);
}

function startGame() {
    gameInterval = setInterval(createCodeSnippet, 1000 - level * 150);
}

startButton.addEventListener('click', () => {
    collected = 0;
    required = 10;
    level = 1;
    codeCollected.textContent = collected;
    codeRequired.textContent = required;
    gameLevel.textContent = level;
    gameArea.innerHTML = '';
    gameOver.classList.remove('visible');
    startGame();
});

restartButton.addEventListener('click', () => {
    collected = 0;
    required = 10;
    level = 1;
    codeCollected.textContent = collected;
    codeRequired.textContent = required;
    gameLevel.textContent = level;
    gameArea.innerHTML = '';
    gameOver.classList.remove('visible'); 
    startGame();
});