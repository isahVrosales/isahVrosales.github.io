const customName = document.getElementById('customname');
const randomize = document.querySelector('.randomize');
const story = document.querySelector('.story');

function randomValueFromArray(array){
  return array[Math.floor(Math.random() * array.length)];
}

const storyText = "A strange glow filled the sky as :insertx: wandered into :inserty:. Suddenly, they :insertz:. Bob watched from a distance, shaking their head—nothing surprised them anymore.";

const insertX = [
    "Elijah Hewson",
    "Luke Hemmings",
    "Vic Fuentes"
    ];

const insertY = [
    "a mysterious underground bunker",
"a floating castle in the sky",
"the middle of a chaotic food fight"
];

const insertZ = [
    "vanished into thin air with a loud pop",
"transformed into a giant marshmallow and bounced away",
"started breakdancing uncontrollably until sunset"

];

randomize.addEventListener('click', result);

function result() {
    let newStory = storyText;

  const xItem = randomValueFromArray(insertX);
  const yItem = randomValueFromArray(insertY);
  const zItem = randomValueFromArray(insertZ);

  newStory = newStory.replaceAll(':insertx:', xItem);
  newStory = newStory.replace(':inserty:', yItem);
  newStory = newStory.replace(':insertz:', zItem);

  if(customName.value !== '') {
    const name = customName.value;
    newStory = newStory.replace('Bob', name);
  }

  if(document.getElementById("uk").checked) {
    const weight = Math.round(300 * 0.071429) + " stone";
    const temperature =  Math.round((94 - 32) * 5/9) + " centigrade";

    newStory = newStory.replace('300 pounds', weight);
    newStory = newStory.replace('94 fahrenheit', temperature);
  }

  story.textContent = newStory;
  story.style.visibility = 'visible';
}
