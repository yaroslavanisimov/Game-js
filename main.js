const MAX_ENEMY = 7;
const HEIGHT_ELEM = 100;
//  расстояние между линиями

const score = document.querySelector('.score'),
// get <div> .score class
	start = document.querySelector('.start'),
	gameArea = document.querySelector('.gameArea'),
	car = document.createElement('div'),
// div - car element creation
	btns = document.querySelectorAll('.btn');

const gameMenu = document.querySelector('.gameMenu')

const music = new Audio('audio.mp3');


car.classList.add('car');
//  добавление Класса  методом 'add' к car

const keys = {
	ArrowUp: false,
	ArrowDown: false,
	ArrowRight: false,
	ArrowLeft: false,
};

// keys - object , consists of (features and methods)
// keyboard names = features (feature name: feature meaning).
//  true -> action


const setting = {
	start: false,
	score: 0,
	speed: 3,
	traffic: 3,
//  плотность-сложность игры
	record: localStorage.getItem('best-record'),
};

// обьект setting and features (score, speed, traffic, record)


let startSpeed = 0;

const setEndText = (show) => {
	const endText = document.getElementById('endText');
	endText.className = show ? 'gameText' : 'gameTextHidden'
}
// Crash "looser" text show

const changeLevel = (lvl) => {

	switch (lvl) {
		case '1':
			setting.traffic = 4;
			setting.speed = 3;
			break;
		case '2':
			setting.traffic = 3;
			setting.speed = 6;
			break;
		case '3':
			setting.traffic = 3;
			setting.speed = 8;
			break;
	}

	startSpeed = setting.speed;
};

function getQuantityElements(heightElement) {
	return (gameArea.offsetHeight / heightElement) + 1;
}
// функция определяюшая какое количество элементов нужно для заполнения страницы (прибавляется 1 для запаса)
// параметр - heightElement (высота элемента) - количество элементов помещающихся в высоту на странице
// (высота страницы \ высоту элемента) , через return - возвращается значение вычислений в скобках



const getRandomEnemy = (max) => Math.floor((Math.random() * max) + 1);

function startGame(levelGame) {
	//music.play();
	changeLevel(levelGame);
	setEndText(false);
	btns.forEach(btn => btn.disabled = true);

	// gameArea.style.minHeight = Math.floor((document.documentElement.clientHeight - HEIGHT_ELEM) / HEIGHT_ELEM) *
	// 	HEIGHT_ELEM;

	start.classList.add('hide');
// hide start after input

	gameArea.innerHTML = '';
// очистка поля после столкновения

	for (let i = 0; i < getQuantityElements(HEIGHT_ELEM); i++) {
		const line = document.createElement('div');
// создаем линии в цикле и добавляем на страницу
		line.classList.add('line');
// добавление класса 'line'  (стили прописаны)
		line.style.top = (i * HEIGHT_ELEM) + 'px';
// добавление свойства top 
		line.style.height = (HEIGHT_ELEM / 2) + 'px';
		line.y = i * HEIGHT_ELEM;
// добавление свойства 'y' в 'line'
		gameArea.append(line);
// добавление линий на экране (на дороге)
	}



	for (let i = 0; i < getQuantityElements(HEIGHT_ELEM * setting.traffic); i++) {
		const enemy = document.createElement('div');
		enemy.classList.add('enemy');
		enemy.y = -HEIGHT_ELEM * setting.traffic * (i + 1);
		enemy.style.left = Math.floor(Math.random() * (gameArea.offsetWidth - 50)) + 'px';
		enemy.style.top = enemy.y + 'px';
		enemy.style.background = `
            transparent
            url(image/enemy${getRandomEnemy(MAX_ENEMY)}.png)
            center / contain
            no-repeat`;
//  добавление рандомно машин-соперников на дорогу 
		gameArea.append(enemy);
// расположение автомобилей на дороге
	}

// создаем автомобили в цикле
// расстояние между автомобилями = трафику
// создание автомобиля 'div' через createElem
// класс 'enemy' добалвяется через add
// расстояние между автомобилями (enemy.y) 



	setting.score = 0;
	setting.start = true;
	gameArea.append(car);
// gameArea - класс родитель , car - дочерний элемент ,который добавляется в класс -добавление на дорогу
	car.style.left = gameArea.offsetWidth / 2 - car.offsetWidth / 2;
// появление машины по центру дороги
	car.style.top = 'auto';
	car.style.bottom = '10px';
// появление машины в правильном месте при рестарте игры -> обнуление и размешение положения
	setting.x = car.offsetLeft;
// feature x added to the object - setting ; below append because car should be already on the road.
// offsetLeft -> значение от края блока родителя до элемента
	setting.y = car.offsetTop;
// Добавляем свойство 'y' , offsetTop - от верха блока до низа элемента.
	requestAnimationFrame(playGame);
}
// requestAnimationFrame - запускает (функцию) -> (playGame)
// плавная рекурсия

function playGame() {

	if (setting.start) {
		setting.score += setting.speed;
// увеличение очков после Старта в зависимости от сложности - от скорости
		score.innerHTML = `
            <p>SCORE: ${setting.score}</p>
            ${setting.record ? `<p>Best record: ${setting.record}</p>` : ''}`;
// выводим показание счета на страницу
// 

		setting.speed = startSpeed + Math.floor(setting.score / 5000);

		moveRoad();
		moveEnemy();
		if (keys.ArrowLeft && setting.x > 0) {
			setting.x -= setting.speed;
		}
// if keys.ArrowLeft (true) ->  (pressed) -> - setting speed

		if (keys.ArrowRight && setting.x < (gameArea.offsetWidth - car.offsetWidth)) {
			setting.x += setting.speed;
		}
// offsetWidth - ширина элемента

		if (keys.ArrowUp && setting.y > 0) {
			setting.y -= setting.speed;
		}
// прекрашение выполнения операции если машина упирается в верхний край

		if (keys.ArrowDown && setting.y < (gameArea.offsetHeight - car.offsetHeight)) {
			setting.y += setting.speed;
		}


		car.style.left = setting.x + 'px';
// car -> change style by .style.left ;  position changing in 'px' length
		car.style.top = setting.y + 'px';


		requestAnimationFrame(playGame);
	} else {
		music.pause();
		btns.forEach(btn => btn.disabled = false);
	}
}

// if setting.start = true -> function restarting
// requestAnimationFrame - запускает (функцию) -> (playGame)



function startRun(event) {
	if (keys.hasOwnProperty(event.key)) {
		event.preventDefault();
		keys[event.key] = true;
	}
}
//  keys = object
//  appeal to oject features by [object.feature] ([event.key])
//  if true = event = startRun


function stopRun(event) {
	if (keys.hasOwnProperty(event.key)) {
		event.preventDefault();
		keys[event.key] = false;
	}
}

//  if false = event = stopRun

// event -> parametr ; keyboard events
// preventDefault -> default browser features are prevented and depends on event keyboard action (key)


function moveRoad() {
	let lines = document.querySelectorAll('.line');
	lines.forEach(function (line) {
		line.y += setting.speed;
		line.style.top = line.y + 'px';

		if (line.y >= gameArea.offsetHeight) {
			line.y = -HEIGHT_ELEM;
		}

	});
}
//  получаем ВСЕ линии, которые есть на странице с классом '.line'
//  при запуске moveRoad(); меняется положение линий
//  метод перебора forEach - принимает функцию     
//  line меняет расположение через setting.speed (3px)
//  line.style.top - присваивается значение Line.y
//  условие -> когда линия уезжает внизу страницы, тогда она возвращается сверху с (-) чтобы не было видно момента возврата




function moveEnemy() {
	let enemy = document.querySelectorAll('.enemy');
//  получаем машины
	enemy.forEach(function (item) {
//  перебираем машины в цикле forEach
		let carRect = car.getBoundingClientRect();
//  let carRect - получает параметры автомобиля
//  добавление метода getBoundingClientRect , который возвращает размеры и позици элемента в виде обьекта
		let enemyRect = item.getBoundingClientRect();
//  Обращаемся к кажому автомобилю item , который теперь обладает свойствами позициями элемента

		if (carRect.top <= enemyRect.bottom &&
			carRect.right >= enemyRect.left &&
			carRect.left <= enemyRect.right &&
			carRect.bottom >= enemyRect.top) {
// вычисление рамеров параметров элемента (соотношение этих параметров) , чтобы вычислить когда автомобили (элементы)
// взаимодействуют друг с другом и тогда мы предполагаем столкновение - когда элементы наезжают друг на друга
			setting.start = false;
// когда Старт = true , значит окгда Стоп = false -> условие ниже
			if (setting.score > setting.record || true) {
				localStorage.setItem('best-record', setting.score);
				//alert(`Ура новый рекорд вы набрали на ${setting.score - setting.record} очков больше!`);
				setEndText(true);
				setting.record = setting.score;
			} else {
				//gameMenu.innerHTML = `<div>Your score is ${setting.score}</div>`
			}
			start.classList.remove('hide');
// remove - убираем очки после столкновения
		}

		item.y += setting.speed / 2;
// moveEnemy restarting and y + speed (3px.)
// setting.speed/2 - изменить скорость машин по отношению к линиям
		item.style.top = item.y + 'px';
// значение top меняется на значение y + px.
		if (item.y >= gameArea.offsetHeight) {
			item.y = -HEIGHT_ELEM * setting.traffic;
//  перемешение машин, также как и линий, в цикле
			item.style.left = Math.floor(Math.random() * (gameArea.offsetWidth - 50)) + 'px';
//  определение случайного расположения машинок на дороге (в пределах верстки) , через вычитание ширины машины (50)
//  floor - округление значений
		}
	});
}


// start event
document.addEventListener('keydown', startRun);
document.addEventListener('keyup', stopRun);
// событие нажатия и отпускания кнопки


const addButtonsEvents = () => {
	for(let i = 1; i<=btns.length; i++){
		btns[i-1].addEventListener('click', () => {
			startGame(i)
		})
	}
}

addButtonsEvents();
