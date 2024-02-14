 // Dados para cada ano
 const yearData = {
  2015: ["I", "Love", "Apple", "You", "Red", "Blue", "Pink", "Green"],
  2022: ["Apple", "Banana", "Orange", "Grape", "Pineapple", "Foot", "Hand", "Numbers", "Air"],
  2023: ["Dog", "Cat", "Bird", "Fish", "Turtle", "Rabbit", "Hamster", "Guinea Pig", "Parrot", "Mouse", "hand", "Numbers", "Numbers", "Air"],
  2024: ["Dog", "Cat", "Bird", "Fish", "Turtle", "Rabbit", "Car", "Hand", "Bicycle", "Motorcycle", "Bus", "Truck", "Train", "Airplane", "Numbers", "Air", "Boat", "Helicopter", "Subway", "Us", "They", "Tree", "Chair", "Fan", "Computer", "Door", "Television", "How", "Where", "People", "Person", "laptop", "Padlock", "Garden", "Gate", "Am", "be", "light", "Table", "Foot", "Hand", "Shoes", "Glass", "Hair", "Head", "Finger"]
};

const container = document.getElementById('container');
let words = []; // Array para armazenar as palavras
let wordData = []; // Array para armazenar informações de movimento das palavras

function createWords(wordsArray) {
  // Limpa o conteúdo do container
  container.innerHTML = '';

  // Cria as palavras dinamicamente a partir do array
  wordsArray.forEach((word, index) => {
    const newWord = document.createElement('div');
    newWord.classList.add('word');
    newWord.textContent = word;
    container.appendChild(newWord);
    words.push(newWord);
  });

  // Inicializa as posições e direções de cada palavra
  words.forEach((word, index) => {
    const initialX = Math.random() * container.offsetWidth;
    const initialY = Math.random() * container.offsetHeight;
    const dx = Math.random() * 2 - 1; // Define uma velocidade inicial aleatória em x
    const dy = Math.random() * 2 - 1; // Define uma velocidade inicial aleatória em y
    wordData.push({ element: word, x: initialX, y: initialY, dx, dy, color: 'black' });
  });
}

function changeYear(year) {
  createWords(yearData[year]); // Atualiza as palavras com base no ano selecionado
}

// Inicializa as palavras com o ano de 2015
changeYear(2015);

function updatePosition() {
  const containerWidth = container.offsetWidth;
  const containerHeight = container.offsetHeight;

  wordData.forEach(wordInfo => {
    const { element, x, y, dx, dy, color } = wordInfo;
    const wordWidth = element.offsetWidth;
    const wordHeight = element.offsetHeight;

    let newX = x + dx;
    let newY = y + dy;

    // Verifica se a palavra atingiu os limites horizontais
    if (newX <= 0 || newX + wordWidth >= containerWidth) {
      wordInfo.dx = -dx; // Inverte a direção em x
      wordInfo.color = getRandomColor(); // Muda a cor
      newX = Math.max(0, Math.min(containerWidth - wordWidth, newX)); // Garante que a palavra não ultrapasse os limites
    }

    // Verifica se a palavra atingiu os limites verticais
    if (newY <= 0 || newY + wordHeight >= containerHeight) {
      wordInfo.dy = -dy; // Inverte a direção em y
      wordInfo.color = getRandomColor(); // Muda a cor
      newY = Math.max(0, Math.min(containerHeight - wordHeight, newY)); // Garante que a palavra não ultrapasse os limites
    }

    wordInfo.x = newX;
    wordInfo.y = newY;

    element.style.left = `${newX}px`;
    element.style.top = `${newY}px`;
    element.style.color = color;
  });
}

// Função para gerar cores aleatórias
function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

setInterval(updatePosition, 10); // Atualiza a posição a cada 10 milissegundos