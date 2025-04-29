const startBtn = document.getElementById("startGameBtn");
const realNumberInput = document.getElementById("realNumber");
const gameArea = document.getElementById("gameArea");
const bubbleContainer = document.getElementById("bubbleContainer");
const instruction = document.getElementById("targetDigit");
const result = document.getElementById("result");

let phoneDigits = [];
let currentIndex = 0;
let activeTimeout = null;
let reshuffleInterval = null;

startBtn.addEventListener("click", () => {
  const val = realNumberInput.value.trim();
  if (!/^\d{10}$/.test(val)) {
    result.textContent = "Please enter a valid 10-digit number.";
    return;
  }

  phoneDigits = val.split("").map(Number);
  currentIndex = 0;
  result.textContent = "";
  result.style.color = "red";
  gameArea.classList.remove("hidden");
  showNextDigit();
});

function showNextDigit() {
  instruction.textContent = phoneDigits[currentIndex];
  bubbleContainer.innerHTML = "";

  const correctDigit = phoneDigits[currentIndex];
  const options = generateOptions(correctDigit);

  // Create and show bubbles
  options.forEach(digit => createBubble(digit));

  // Start reshuffle interval (1 second)
  clearInterval(reshuffleInterval);
  reshuffleInterval = setInterval(() => {
    shuffleBubbles();
  }, 1000); // reshuffles every 1 second

  // Hard timeout to end round if idle too long
  clearTimeout(activeTimeout);
  activeTimeout = setTimeout(() => {
    resetGame("⏳ Took too long overall. Start over.");
  }, 30000);
}

function generateOptions(correct) {
  const options = new Set([correct]);
  while (options.size < 6) {
    options.add(Math.floor(Math.random() * 10));
  }
  return Array.from(options).sort(() => Math.random() - 0.5);
}

function createBubble(digit) {
  const bubble = document.createElement("div");
  bubble.classList.add("bubble");
  bubble.textContent = digit;
  setBubblePosition(bubble);

  bubble.addEventListener("click", () => {
    if (digit === phoneDigits[currentIndex]) {
      clearTimeout(activeTimeout);
      clearInterval(reshuffleInterval);
      currentIndex++;
      if (currentIndex === phoneDigits.length) {
        winGame();
      } else {
        showNextDigit();
      }
    } else {
      resetGame("❌ Wrong digit! Start over.");
    }
  });

  bubbleContainer.appendChild(bubble);
}

function setBubblePosition(bubble) {
  const x = Math.random() * (bubbleContainer.offsetWidth - 50);
  const y = Math.random() * (bubbleContainer.offsetHeight - 50);
  bubble.style.left = `${x}px`;
  bubble.style.top = `${y}px`;
}

function shuffleBubbles() {
  const bubbles = document.querySelectorAll(".bubble");
  bubbles.forEach(bubble => setBubblePosition(bubble));
}

function resetGame(msg) {
  clearInterval(reshuffleInterval);
  clearTimeout(activeTimeout);
  result.textContent = msg;
  gameArea.classList.add("hidden");
}

function winGame() {
  clearInterval(reshuffleInterval);
  clearTimeout(activeTimeout);
  gameArea.classList.add("hidden");
  result.style.color = "green";
  result.textContent = "🎉 Success! You caught all the digits!";
}
