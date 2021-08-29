const inputTheme = document.querySelector('#tema-input');
const listTheme = document.querySelector('#list-temas');
const playerName = document.querySelector('#player-name');

const initialAdd = () => {
  if (inputTheme.value !== '') {
    const theme = document.createElement('li');
    theme.innerText = inputTheme.value;
    listTheme.appendChild(theme);
    inputTheme.value = '';
  }
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
    select.className = 'select-play';
    smallLi.className = 'small-li';
    smallLi.innerHTML = inputPlay[i].value;
    if (smallLi.innerHTML === "") {
      select.appendChild(option0);
    } else {
      select.appendChild(option0);
      select.appendChild(option5);
      select.appendChild(option10);
    }
    smallLi.appendChild(select);
    div.appendChild(smallLi);
    div.appendChild(select);
    bigLi[i].appendChild(div);
    inputPlay[i].value = '';
  }
}

const stopBtn = document.querySelector('.stop');
stopBtn.addEventListener('click', stop);
let result = 0;

const sum = () => {
  const selectPoints = document.querySelectorAll('.select-play');
  if (selectPoints.length > 0) {
    const total = document.querySelector('.total-valor');
    let turnPoint = 0;
    for (let i = 0; i < selectPoints.length; i += 1) {
      const valor = selectPoints[i].value;
      result = parseInt(result) + parseInt(valor);
      const pPoint = document.createElement('p');
      pPoint.className = 'point-in-p'
      if (valor === 0) {
        pPoint.classList.add('zero');
      }
      pPoint.innerHTML = valor;
      selectPoints[i].parentNode.appendChild(pPoint);
      selectPoints[i].parentNode.removeChild(selectPoints[i]);
      turnPoint = (turnPoint + parseInt(valor));
    }
    const olTurns = document.querySelector('.turn-points');
    const liTurn = document.createElement('li');
    liTurn.innerText = turnPoint;
    olTurns.appendChild(liTurn);
    total.innerText = result;
    result = total.innerText;
  }
}

const sumBtn = document.querySelector('.sum');
sumBtn.addEventListener('click', sum);
