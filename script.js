const inputTheme = document.querySelector('#tema-input');
const listTheme = document.querySelector('#list-temas');
const playerName = document.querySelector('#player-name');

const initialAdd = () => {
  const theme = document.createElement('li');
  theme.innerText = inputTheme.value;
  listTheme.appendChild(theme);
  inputTheme.value = '';
}
const addBtn = document.querySelector('#add-tema-btn');
addBtn.addEventListener('click', initialAdd);
const ulTemas = document.querySelector('.ul-temas');

const createThemes = () => {
  for (let i = 0; i < listTheme.children.length; i += 1) {
    const ulDiv = document.createElement('div');
    const bigLi = document.createElement('li');
    const smallLi = document.createElement('li');
    const inputPlay = document.createElement('input');
    inputPlay.className = 'input-play';
    bigLi.className = 'big-li';
    smallLi.className = 'small-li';
    bigLi.innerText = listTheme.children[i].innerText;
    smallLi.appendChild(inputPlay);
    bigLi.appendChild(smallLi);
    ulDiv.appendChild(bigLi);
    ulTemas.appendChild(ulDiv);
  }
}

const toStart = () => {
  const inicial = document.querySelector('.container-inicial');
  const inGame = document.querySelector('.game');
  const nameGame = document.querySelector('.name-player');

  if (playerName.value !== '' && listTheme.childElementCount > 0) {
    inicial.classList.add('hide');
    inGame.classList.remove('hide');
    nameGame.innerText = playerName.value;
    createThemes();
  }
}
const playBtn = document.querySelector('.play');
playBtn.addEventListener('click', toStart);

