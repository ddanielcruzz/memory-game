const cardItems = [
  'fries',
  'cheeseburger',
  'ice-cream',
  'pizza',
  'milkshake',
  'hotdog',
];

const grid = document.querySelector('.grid');
const result = document.querySelector('#result');
let cardsChosen = [];
let cardsChosenId = [];
let cardsWon = [];

const cardArray = cardItems
  .reduce((array, currentItem) => {
    const element = { name: currentItem, img: `images/${currentItem}.png` };
    array = [...array, element, element];
    return array;
  }, [])
  .sort(() => 0.5 - Math.random());

const checkMatch = () => {
  const cards = document.querySelectorAll('img');
  const [cardOne, cardTwo] = cardsChosen;
  const [cardOneId, cardTwoId] = cardsChosenId;
  console.log(cardOne, cardTwo);
  if (cardOne !== cardTwo) {
    alert('try again');
    cards[cardOneId].setAttribute('src', '/images/blank.png');
    cards[cardTwoId].setAttribute('src', '/images/blank.png');
  }
  if (cardOne === cardTwo) {
    alert('You found a match');
    cards[cardOneId].removeEventListener('click', flipCard);
    cards[cardTwoId].removeEventListener('click', flipCard);
    cardsWon = [...cardsWon, cardsChosen];
  }
  cardsChosen = [];
  cardsChosenId = [];
  result.textContent = cardsWon.length;
  if (cardsWon.length === cardArray.length / 2) {
    result.textContent = 'Congratulations! You found them all!';
  }
};

const flipCard = (e) => {
  const cardSelected = e.target;
  const cardId = cardSelected.getAttribute('data-id');
  const cardInArray = cardArray[cardId];
  cardsChosen = [...cardsChosen, cardInArray.name];
  cardsChosenId = [...cardsChosenId, cardId];
  cardSelected.setAttribute('src', cardInArray.img);
  if (cardsChosen.length === 2) setTimeout(checkMatch, 500);
};

const createBoard = () => {
  cardArray.forEach((_, idx) => {
    const card = document.createElement('img');
    card.setAttribute('src', 'images/blank.png');
    card.setAttribute('data-id', idx);
    card.addEventListener('click', flipCard);
    grid.appendChild(card);
  });
};

createBoard();
