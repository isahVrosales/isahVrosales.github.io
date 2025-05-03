const dropZone = document.getElementById('drop-zone');
const message = document.getElementById('message');
const container = document.querySelector('.container');

let phoneNumber = '';
let requiredDigits = 10;

let timer;
let timeLeft = 60;
const timerDisplay = document.createElement('div');
timerDisplay.id = 'timer';
timerDisplay.textContent = `Time left: ${timeLeft}s`;
container.appendChild(timerDisplay);

function startTimer() {
  clearInterval(timer);
  timeLeft = 60;
  timerDisplay.textContent = `Time left: ${timeLeft}s`;

  timer = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = `Time left: ${timeLeft}s`;

    if (timeLeft <= 0) {
      clearInterval(timer);
      phoneNumber = '';
      updateDisplay();
      message.textContent = "Too slow. Try again 😈";
      startTimer();
    }
  }, 1000);
}

function createNumbers() {
  document.querySelectorAll('.number').forEach(el => el.remove());

  const containerRect = container.getBoundingClientRect();
  const bannerHeight = document.getElementById('instructions').offsetHeight;

  for (let i = 0; i <= 9; i++) {
    const num = document.createElement('div');
    num.classList.add('number');
    num.textContent = i;
    num.draggable = true;
    num.id = `num-${i}`;

    const setRandomPosition = () => {
      const numberWidth = 60;
      const numberHeight = 60;
      let x, y, attempts = 0;
      let overlaps = true;

      while (overlaps && attempts < 100) {
        x = Math.random() * (window.innerWidth - numberWidth);
        y = bannerHeight + Math.random() * (window.innerHeight - numberHeight - bannerHeight);
        attempts++;

        const numLeft = x;
        const numRight = x + numberWidth;
        const numTop = y;
        const numBottom = y + numberHeight;

        overlaps = !(
          numRight < containerRect.left ||
          numLeft > containerRect.right ||
          numBottom < containerRect.top ||
          numTop > containerRect.bottom
        );
      }

      num.style.left = `${x}px`;
      num.style.top = `${y}px`;
    };

    setRandomPosition();

    num.addEventListener('mouseover', () => {
      setTimeout(() => {
        setRandomPosition();
      }, 200);
    });

    num.addEventListener('dragstart', (e) => {
      e.dataTransfer.setData('text/plain', num.textContent);
      setRandomPosition();
    });

    document.body.appendChild(num);
  }
}

dropZone.addEventListener('dragover', (e) => {
  e.preventDefault();
});

dropZone.addEventListener('drop', (e) => {
  e.preventDefault();
  const num = e.dataTransfer.getData('text/plain');
  if (phoneNumber.length < requiredDigits) {
    phoneNumber += num;
    updateDisplay();

    if (phoneNumber.length === requiredDigits) {
      clearInterval(timer);
      message.textContent = "Success! You survived!";
    }
  }
});

function updateDisplay() {
  let formatted = phoneNumber
    .padEnd(10, '_')
    .split('')
    .map((char, index) => {
      if (index === 3 || index === 6) {
        return '-' + char;
      }
      return char;
    })
    .join('');
  dropZone.textContent = formatted;
}

createNumbers();
updateDisplay();
startTimer();
