const words = document.querySelectorAll('.word');
const container = document.getElementById('container');

// Array para armazenar informações de cada palavra
const wordData = [];

// Inicializa as posições e direções de cada palavra
words.forEach((word, index) => {
  const initialX = Math.random() * container.offsetWidth;
  const initialY = Math.random() * container.offsetHeight;
  const dx = Math.random() * 2 - 1; // Define uma velocidade inicial aleatória em x
  const dy = Math.random() * 2 - 1; // Define uma velocidade inicial aleatória em y
  wordData.push({ element: word, x: initialX, y: initialY, dx, dy });
});

function updatePosition() {
  const containerWidth = container.offsetWidth;
  const containerHeight = container.offsetHeight;

  wordData.forEach(wordInfo => {
    const { element, x, y, dx, dy } = wordInfo;
    const wordWidth = element.offsetWidth;
    const wordHeight = element.offsetHeight;

    let newX = x + dx;
    let newY = y + dy;

    // Verifica se a palavra atingiu os limites horizontais
    if (newX <= 0 || newX + wordWidth >= containerWidth) {
      wordInfo.dx = -dx; // Inverte a direção em x
      newX = Math.max(0, Math.min(containerWidth - wordWidth, newX)); // Garante que a palavra não ultrapasse os limites
    }

    // Verifica se a palavra atingiu os limites verticais
    if (newY <= 0 || newY + wordHeight >= containerHeight) {
      wordInfo.dy = -dy; // Inverte a direção em y
      newY = Math.max(0, Math.min(containerHeight - wordHeight, newY)); // Garante que a palavra não ultrapasse os limites
    }

    wordInfo.x = newX;
    wordInfo.y = newY;

    element.style.left = `${newX}px`;
    element.style.top = `${newY}px`;
  });
}

setInterval(updatePosition, 10); // Atualiza a posição a cada 10 milissegundos
