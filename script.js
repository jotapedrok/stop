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
    const inputPlay = document.createElement('input');
    inputPlay.className = 'input-play';
    bigLi.className = 'big-li';
    bigLi.innerText = listTheme.children[i].innerText;
    bigLi.appendChild(inputPlay);
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

const stop = () => {
  const bigLi = document.querySelectorAll('.big-li');
  const inputPlay = document.querySelectorAll('.input-play');
  for (let i = 0; i < inputPlay.length; i += 1) {
    const smallLi = document.createElement('li');
    const select = document.createElement('select');
    const option0 = document.createElement('option');
    const option5 = document.createElement('option');
    const option10 = document.createElement('option');
    const div = document.createElement('div');
    div.className = 'put-in-line';
    option0.innerHTML = '0';
    option5.innerHTML = '5';
    option10.innerHTML = '10';
    select.appendChild(option0);
    select.appendChild(option5);
    select.appendChild(option10);
    select.className = 'select-play';
    smallLi.className = 'small-li';
    smallLi.innerHTML = inputPlay[i].value;
    smallLi.appendChild(select);
    div.appendChild(smallLi);
    div.appendChild(select);
    bigLi[i].appendChild(div);
  }
}

const stopBtn = document.querySelector('.stop');
stopBtn.addEventListener('click', stop);