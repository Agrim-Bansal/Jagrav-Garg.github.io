const RANDOM = 'http://api.quotable.io/random'
const quoteDisplayElement = document.getElementById('quote-display')
const quoteInputElement = document.getElementById('quoteInput')
const timerElement = document.getElementById('timer')

quoteInputElement.addEventListener('input', () =>{
	const arrayQuote = quoteDisplayElement.querySelectorAll('span')
	const arrayValue = quoteInputElement.value.split('')
	let correct = true;

	   arrayQuote.forEach((characterSpan, index) => {
			const character = arrayValue[index]
			if(character == null) {
			   characterSpan.classList.remove('correct')
			   characterSpan.classList.remove('incorrect')
			   correct = false;
			}
			else if (character == characterSpan.innerText){
			   characterSpan.classList.add('correct')
			   characterSpan.classList.remove('incorrect')
			} else{
			   characterSpan.classList.add('incorrect')
			   characterSpan.classList.remove('correct')
			   correct = false;
		}
	})

	   if (correct) getNextQuote()
})

	function getRandomQuote() {
	   return fetch(RANDOM)
	   .then(response => response.json())
	   .then(data => data.content)
	}

	async function getNextQuote() {
		 const quote = await getRandomQuote();
		 quoteDisplayElement.innerHTML = '';
		 
		 quote.split('').forEach(character => {
			const characterSpan = document.createElement('span')
			characterSpan.innerText = character
			quoteDisplayElement.appendChild(characterSpan)
		 })

		 quoteInputElement.value = null;
		 startTimer()
		 
	}

let startTime
function startTimer(){
	timerElement.innerText = 0;
	startTime = new Date()
	setInterval(() => {
      timer.innerText = getTimerTime()
	}, 1000)
	if((document.getElementById('timer').value) > 5){
	window.alert("time over");
}
}

function getTimerTime(){
	return Math.floor((new Date() - startTime)/1000)
}

getNextQuote()
