const dropZone = document.getElementById('drop-zone');
const numbersDiv = document.getElementById('numbers');
const message = document.getElementById('message');

let phoneNumber = '';
let requiredDigits = 10;

function createNumbers() {
  numbersDiv.innerHTML = '';
  for (let i = 0; i <= 9; i++) {
      const num = document.createElement('div');
      num.classList.add('number');
      num.textContent = i;
      num.draggable = true;
      num.id = `num-${i}`;

      const containerWidth = numbersDiv.clientWidth - 50; 
      const containerHeight = numbersDiv.clientHeight - 50;
      num.style.left = `${Math.random() * containerWidth}px`;
      num.style.top = `${Math.random() * containerHeight}px`;

      num.addEventListener('mouseover', () => {
          const randomX = Math.random() * containerWidth;
          const randomY = Math.random() * containerHeight;
          num.style.left = `${randomX}px`;
          num.style.top = `${randomY}px`;
      });

      num.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', num.textContent);
    });

      numbersDiv.appendChild(num);
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
