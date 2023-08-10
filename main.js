//Initialize timer
const countToDate = new Date();
countToDate.setDate(countToDate.getDate() + 2);

//Values to initialize flipcards
let formattedCurrentTime = convertTime((countToDate - new Date()) / 1000);
const flipcards = [];
flipcards.push(document.getElementById("days"));
flipcards.push(document.getElementById("hours"));
flipcards.push(document.getElementById("minutes"));
flipcards.push(document.getElementById("seconds"));

for (let i = 0; i < 4; i++) {
    initializeCard(flipcards[i], formattedCurrentTime[i]);
}
//Hacky fix for days overflow bug
initializeCard(flipcards[0], 2);

//Main loop of program
let previousTimeBetweenDates;
setInterval(() => {
    const currentDate = new Date();
    const timeBetweenDates = Math.ceil((countToDate - currentDate) / 1000);

    if (previousTimeBetweenDates !== timeBetweenDates) {
        checkForFlips(timeBetweenDates);
    }

    previousTimeBetweenDates = timeBetweenDates;
}, 250);

//Check if any flipcards need to update
function checkForFlips(time) {
    if(!time <= 0){
        formattedCurrentTime = convertTime(time);
    }
    flipcards.forEach((flipcard, i) => {
        const cardText = parseInt(flipcard.querySelector('.top').textContent);
        if(cardText !== formattedCurrentTime[i])
            flip(flipcard, i === 1 ? 23 : 59);
    })
}

//Parse time in seconds to an array of [days, hours, minutes, seconds]
function convertTime(time) {
    const timeArr = [];
    const seconds = time % 60;
    timeArr.unshift(seconds);
    time -= seconds;
    time = time / 60;
    const minutes = time % 60;
    timeArr.unshift(minutes);
    time -= minutes;
    time = time / 60;
    const hours = time % 24;
    timeArr.unshift(hours);
    time -= hours;
    const days = time / 24;
    timeArr.unshift(days);
    return timeArr;
}

//Handle flip animation and number decrementation for a passed flipcard
function flip(flipCard, max) {
    //Get references to child elements
    const topHalf = flipCard.querySelector(".top");
    const bottomHalf = flipCard.querySelector(".bottom");

    //Create and append elements to animate
    const topFlip = document.createElement("div")
    topFlip.classList.add('top-flip')
    const bottomFlip = document.createElement("div")
    bottomFlip.classList.add('bottom-flip')
    flipCard.append(topFlip, bottomFlip);

    //Get starting and target number
    const startNumber = parseInt(topHalf.textContent);
    const newNumber = startNumber !== 0 ? startNumber - 1 : max;
    //Ensure all elements display the correct text
    bottomHalf.textContent = makeString(startNumber);
    topFlip.textContent = makeString(startNumber);
    bottomFlip.textContent = makeString(newNumber);


    topFlip.addEventListener("animationstart", e => {
        topHalf.textContent = makeString(newNumber);
    });
    
    topFlip.addEventListener("animationend", e => {
        topFlip.remove();
    })
    
    bottomFlip.addEventListener("animationend", e => {
        bottomHalf.textContent = makeString(newNumber);
        bottomFlip.remove();
    }); 
}

//Helper function to parse number into string and add 0 before single digit number
function makeString(num) {
    if(num < 10) {
        return '0' + num;
    } else {
        return num.toString();
    }
}

//Sets both values on flip cards as properly formatted strings
function initializeCard(flipcard, value) {
    flipcard.querySelector('.top').textContent = makeString(value);
    flipcard.querySelector('.bottom').textContent = makeString(value);
}