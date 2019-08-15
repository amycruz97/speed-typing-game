
window.addEventListener('load', init);

const levels = {
	easy: 7,
	medium: 5,
	hard: 3
};

let currentLevel = levels.easy;



//GLOBALS

let time = currentLevel;
let score = 0;
let highScore = 0;
let isPlaying;


const wordInput = document.querySelector('#word-input');
const currentWord = document.querySelector('#current-word');
const scoreDisplay = document.querySelector('#score');
const highScoreDisplay = document.querySelector('#high-score');
const timeDisplay = document.querySelector('#time');
const mesaage = document.querySelector('#mesaage');
const seconds = document.querySelector('#seconds');


const levelSelector = document.querySelector("#level")



/*const words = [
// 'hat',
// 'river',
// 'statue',
// 'generate',
// 'stubborn',
// 'cocktail',
// 'sugar',
// 'nonsense',
// 'jealous',
// 'impatient',
// 'joke',
// 'css',
// 'vue',
// 'javascript',
// 'algorithm',
// "own",
// "other",
// "old",
// "right",
// "big",
// "high",
// "different",
// "small",
// "large",
// "next",
// "early",
// "young",
// "important",
// "few",
// "public",
// "bad",
// "same",
// "able"


];*/

let words = []


//Initialize game

function init() {
	fetch('https://random-word-api.herokuapp.com/word?key=A92JRX9N&number=100 ')
	.then((res) => res.json())
	.then((data) => {
		//console.log(data)
		words = [...data]
		showWord(words)
	})
	.catch((err) => console.log(err))



	seconds.innerHTML = currentLevel;
	
	showWord(words);

	wordInput.addEventListener('input', startMatch);

	levelSelector.addEventListener('click', selectLevel)

	setInterval(countdown, 1000);

	setInterval(checkStatus, 50);


}

// pick & show random word

function showWord(words){

	const randIndex = Math.floor(Math.random() * words.length);

	currentWord.innerHTML = words[randIndex]
};

//COUNTDOWN TIME

function countdown(){

	if(time > 0){
		time--

	}else if(time === 0){
		isPlaying = false;
	}

	//showTime

	timeDisplay.innerHTML = time;
}

function checkStatus(){
	if(!isPlaying && time === 0){
		message.innerHTML = 'Game Over!! Try Again';
		if (score > highScore) {
			highScore = score;
		} 
		highScoreDisplay.innerHTML = highScore;
		score = -1;
	}
}


function startMatch() {
	if (matchWord()) {
		isPlaying = true;
		time = currentLevel + 1;
		showWord(words);
		wordInput.value = '';
		score++;
	}

	if (score === -1) {
		scoreDisplay.innerHtml = 0;
	} else {
		scoreDisplay.innerHTML = score;
	}

}

function matchWord() {
	if(wordInput.value === currentWord.innerHTML){
		message.innerHTML = "CORRECT";
		return true;

	}else{
		message.innerHTML = " typing";
		return false;
	}

}

function selectLevel(e) {
	currentLevel = levels[e.target.value]

	showWord(words)

	time = currentLevel

	seconds.innerHTML = currentLevel
}








