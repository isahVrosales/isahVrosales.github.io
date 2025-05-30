const text = document.querySelector('.text');
const light = document.querySelector('#light');

document.addEventListener('mousemove', (e) => {
  const rect = text.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  
  if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
    light.setAttribute('x', x);
    light.setAttribute('y', y);
  }
});

text.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
  }
});
