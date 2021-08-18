
import firebase from 'firebase/app'
import 'firebase/auth'

firebase.initializeApp({
	apiKey: "AIzaSyCl5D4V8U8Nic0KxDE9EtoxuuRx2lR4neU",
	authDomain: "nfjs-dade4.firebaseapp.com",
	projectId: "nfjs-dade4",
	storageBucket: "nfjs-dade4.appspot.com",
	messagingSenderId: "975548203383",
	appId: "1:975548203383:web:c5db520f8af0564c9ee172"
  });

const authGoogle = document.querySelector('.auth-google')
const isLoggedIn = document.querySelector('.is-logged-in > span')
const signOut = document.querySelector('.signOut')


authGoogle.addEventListener('click', async ()=> {
	// const provider = new firebase.auth.GoogleAuthProvider();
	// const userData = await firebase.auth().signInWithPopup(provider)
	await firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider())
	// await firebase.auth().createUserWithEmailAndPassword(email, password)
})

firebase.auth().onAuthStateChanged(user =>{
	if (user) {
		isLoggedIn.textContent = true

	} else {
		isLoggedIn.textContent = false
	}
})

signOut.addEventListener('click', ()=>{
	firebase.auth().signOut()
})




const register = document.querySelector('.register')
const login = document.querySelector('.login')


register.addEventListener('click', async () => {
	const res = await fetch ('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCl5D4V8U8Nic0KxDE9EtoxuuRx2lR4neU	')
		method: 'POST';
		headers: {
			'Content-Type': 'application/json'
		};
		body: JSON.stringify ({
			email: ' ',
			password: '123', 
			returnSecureToken: true,
		})
		// JSON.stringify - convert 'body' in string

	const data = await res.json()
		// await - wait for download
		// res.json - parsing in readable type
	})


const url ='https://nfjs-dade4-default-rtdb.firebaseio.com/users'

const body = {
	name: 'yaro',
	bio: 'bio'
}

let idToken =''

set.addEventListener('click', async ()=>{
	const res = await fetch(`${url}/${body.name}.json?auth=${idToken}`, {
		method:'PUT',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(body)
	})
	const data = await res.json()
})

login.addEventListener('click',async ()=>{
	const res = await fetch ('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCl5D4V8U8Nic0KxDE9EtoxuuRx2lR4neU', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify ({
			email: 'yaroslavanisimow@gmail.com',
			password: '123', 
			returnSecureToken: true,
		})
	})
	const data = await res.json()
	idToken = data.idToken
})


 

const MAX_ENEMY = 7;
const HEIGHT_ELEM = 100;
let SOMETHING = 50;
//  distance between lines



ontouchstart, ontouchmove
ondragstart

// OOP structure
// // struktura gry:
// {
// 	Game : {
// 		car : {
// 			x,
// 			y,
// 			speed
// 		},
// 		enemies : [{
// 			x,
// 			y,
// 			speed,
// 			color
// 		}],


// }}



function Car(){

}

function Player(){
	this.prototype = Car;

}

function Game(){
	this.enemies = [];

	this.moveEnemies();
	this.score = 100;
	this.speed = 100;

	this.gameState = ['playing', 'game over', 'paused']
	addEnemy(){
		this.enemies.push( new Enemy() )
	};


	this.displayGame = () => {
		this.player.updatePosition();
		this.enemies.forEach((enemy)=>enemy.updatePosition());
		this.detectCollision();
		this.displayGameControls(this.gameState);
	}
	this.settings = {}
}

enemy.move()

const game = new Game();
game.init();


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
//  adding a Class to car with the 'add' method 

const keys = {
	ArrowUp: false,
	ArrowDown: false,
	ArrowRight: false,
	ArrowLeft: false,
};

// keys - object , consists of (features and methods)
// keyboard names = features (feature name: feature meaning).
// true -> action


const setting = {
	start: false,
	score: 0,
	speed: 3,
	traffic: 3,
//  density-difficulty of the game
	record: localStorage.getItem('best-record'),
};

// object setting and features (score, speed, traffic, record)


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
// function that determines how many elements are needed to fill the page (1 is added for the stock)
// parameter - heightElement (element height) - number of elements to fit in height on the page
// (page height \ element height), via return - the value of calculations in brackets is returned



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
// clearing the field after collision

	drawLines();
	drawCars();
	newGameSettings();

	requestAnimationFrame(playGame);
} // startGame

function newGameSettings() {
	setting.score = 0;
	setting.start = true;
	gameArea.append(car);
	// gameArea is the parent class, car is the child that is added to the add to the road class	car.style.left = gameArea.offsetWidth / 2 - car.offsetWidth / 2;
	// the car will appear in the center of the road
	car.style.top = 'auto';
	// the car will appear in the right place when the game is restarted -> zeroing and positioning	setting.x = car.offsetLeft;
	car.style.bottom = '10px';
	// feature x added to the object - setting; below append because car should be already on the road.
	// offsetLeft -> value from the edge of the parent block to the element
	setting.y = car.offsetTop;
	// Add the 'y' property, offsetTop - from the top of the block to the bottom of the element.
}

function drawCars() {
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
		// add randomly enemy cars to the road
		gameArea.append(enemy);
		// location of cars on the road
	}
}
// we create cars in a cycle
// distance between cars = traffic
// create a car 'div' via createElem
// class 'enemy' is added via add
// distance between vehicles (enemy.y)

function drawLines(){
	for (let i = 0; i < getQuantityElements(HEIGHT_ELEM); i++) {
		const line = document.createElement('div');
		// create lines in a loop and add to the page
		line.classList.add('line');
		// add class 'line' (styles are written)
		line.style.top = (i * HEIGHT_ELEM) + 'px';
		// add the top property
		line.style.height = (HEIGHT_ELEM / 2) + 'px';
		line.y = i * HEIGHT_ELEM;
		line.style.left = gameArea.clientWidth/2;
		// add property 'y' to 'line'
		gameArea.append(line);
		// add lines on the screen (on the road)
	}
}

// requestAnimationFrame - runs (function) -> (playGame)
// smooth recursion

function playGame() {

	if (setting.start) {
		setting.score += setting.speed;
// increase in points after the start depending on the difficulty - on the speed
		score.innerHTML = `
            <p>SCORE: ${setting.score}</p>
            ${setting.record ? `<p>Best record: ${setting.record}</p>` : ''}`;
// display the score on the page

		setting.speed = startSpeed + Math.floor(setting.score / 5000);

		moveRoad();
		moveEnemy();
		carMoveLocation();
		carSetDisplayLocation();


		requestAnimationFrame(playGame);
	} else {
		music.pause();
		btns.forEach(btn => btn.disabled = false);
	}
}

function carSetDisplayLocation() {
	car.style.left = setting.x + 'px';
	// car -> change style by .style.left ;  position changing in 'px' length
	car.style.top = setting.y + 'px';
}

function carMoveLocation() {
	// keyboard movement
	if (keys.ArrowLeft && setting.x > 0) {
		moveCarLeft();
	}
	// if keys.ArrowLeft (true) ->  (pressed) -> - setting speed
	if (keys.ArrowRight && setting.x < (gameArea.offsetWidth - car.offsetWidth)) {
		moveCarRight();
	}
	// offsetWidth - width of the element
	if (keys.ArrowUp && setting.y > 0) {
		moveCarUp();
	}
	// stop executing the operation if the car hits the top edge
	if (keys.ArrowDown && setting.y < (gameArea.offsetHeight - car.offsetHeight)) {
		moveCarDown();
	}

	// mouse movement
	// mouse move handler


}

function moveCarDown() {
	if (setting.x > 0 && setting.x < gameArea.clientWidth)
		setting.y += setting.speed;
}

function moveCarUp() {
	setting.y -= setting.speed;
}

function moveCarRight() {
	if (setting.x > 0 && setting.x < gameArea.clientWidth)
		setting.x += setting.speed;
}

function moveCarLeft() {
	if (setting.x > 0 && setting.x < gameArea.clientWidth)
		setting.x -= setting.speed;
}

function handleGameAreaMouseMove(e){
	console.log(e);
	if (e.offsetX > gameArea.clientWidth/2){
		moveCarRight()
	} else {
		moveCarLeft()
	}

	if (e.offsetY > gameArea.clientHeight/2){
		moveCarDown();
	} else {
		moveCarDown();
	}
	
	
}

if (gameArea){
	gameArea.addEventListener('mousemove', handleGameAreaMouseMove);
}
// if setting.start = true -> function restarting
// requestAnimationFrame - runs (function) -> (playGame)



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
// get ALL the lines that are on the page with the '.line' class
// when starting moveRoad (); the position of the lines changes
// iteration method forEach - takes a function
// line changes position via setting.speed (3px)
// line.style.top - set to Line.y
// condition -> when the line leaves at the bottom of the page, 
// then it returns from the top with (-) so that the moment of returning is not visible




function moveEnemy() {
	let enemy = document.querySelectorAll('.enemy');
// get cars
	enemy.forEach(function (item) {
// iterate over cars in a forEach loop
		let carRect = car.getBoundingClientRect();
// let carRect - get car parameters
// add the getBoundingClientRect method, which returns the size and 
// position of the element as an object

		let enemyRect = item.getBoundingClientRect();
// Access each car item that now has item position properties

		if (carRect.top <= enemyRect.bottom &&
			carRect.right >= enemyRect.left &&
			carRect.left <= enemyRect.right &&
			carRect.bottom >= enemyRect.top) {
// calculating the dimensions of the element parameters (the ratio of these parameters) to calculate when cars (elements)
// interact with each other and then we assume a collision - when elements bump into each other
			setting.start = false;
// when Start = true, then when Stop = false -> the condition is below
			if (setting.score > setting.record || true) {
				localStorage.setItem('best-record', setting.score);
				alert(`Wow, Its a new record you have scored on ${setting.score - setting.record} more!`);
				setEndText(true);
				setting.record = setting.score;
			} else {
				//gameMenu.innerHTML = `<div>Your score is ${setting.score}</div>`
			}
			start.classList.remove('hide');		
}
// remove - remove score after collision

		item.y += setting.speed / 2;
// moveEnemy restarting and y + speed (3px.)
// setting.speed/2 - change the speed of cars in relation to the lines
		item.style.top = item.y + 'px';
// top value changes to y + px value.
		if (item.y >= gameArea.offsetHeight) {
			item.y = -HEIGHT_ELEM * setting.traffic;
// move cars, as well as lines, in a loop
			item.style.left = Math.floor(Math.random() * (gameArea.offsetWidth - SOMETHING)) + 'px';
// determining the random location of cars on the road (within the layout), 
// by subtracting the width of the car (50)
// floor - rounding values
		}
	});
}


// start event
document.addEventListener('keydown', startRun);
document.addEventListener('keyup', stopRun);
// event of pressing and releasing the button


const addButtonsEvents = () => {
	for(let i = 1; i<=btns.length; i++){
		btns[i-1].addEventListener('click', () => {
			startGame(i)
		})
	}
}
addButtonsEvents();
