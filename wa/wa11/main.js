const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');

const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');

/* Declare an array of image filenames */
const imageFilenames = ['Isah1.jpg', 'Isah2.jpg', 'Isah3.jpg', 'Isah4.jpg', 'Isah5.jpg'];

/* Declare an object with alternative text for each image */
const altText = {
  'Isah1.jpg': 'Closeup of a human eye',
  'Isah2.jpg': 'Rock that looks like a wave',
  'Isah3.jpg': 'Purple and white pansies',
  'Isah4.jpg': 'Section of wall from a pharaoh’s tomb',
  'Isah5.jpg': 'Large moth on a leaf'
};

/* Looping through images */
for (const fileName of imageFilenames) {
  const newImage = document.createElement('img');
  newImage.setAttribute('src', fileName); // no "images/" prefix anymore
  newImage.setAttribute('alt', altText[fileName]);
  thumbBar.appendChild(newImage);

  // Click event to update the main image and alt text
  newImage.addEventListener('click', () => {
    displayedImage.setAttribute('src', fileName);
    displayedImage.setAttribute('alt', altText[fileName]);
  });
}

/* Wiring up the Darken/Lighten button */
btn.addEventListener('click', () => {
  const currentClass = btn.getAttribute('class');

  if (currentClass === 'dark') {
    btn.setAttribute('class', 'light');
    btn.textContent = 'Lighten';
    overlay.style.backgroundColor = 'rgb(0 0 0 / 50%)';
  } else {
    btn.setAttribute('class', 'dark');
    btn.textContent = 'Darken';
    overlay.style.backgroundColor = 'rgb(0 0 0 / 0%)';
  }
});
