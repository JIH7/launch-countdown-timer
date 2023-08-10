const countToDate = new Date();
countToDate.setDate(countToDate.getDate() + 2);

let [days, hours, minutes, seconds] = convertTime((countToDate - new Date()) / 1000);
console.log(`${days} ${hours} ${minutes} ${seconds}`)

const daysFlipCard = document.getElementById("days");
initializeCard(daysFlipCard, days);
const hoursFlipCard = document.getElementById("hours");
initializeCard(hoursFlipCard, hours);
const minutesFlipCard = document.getElementById("minutes");
initializeCard(minutesFlipCard, minutes);
const secondsFlipCard = document.getElementById("seconds");
initializeCard(secondsFlipCard, seconds);

let previousTimeBetweenDates;
setInterval(() => {
    const currentDate = new Date();
    const timeBetweenDates = Math.ceil((countToDate - currentDate) / 1000);

    if (previousTimeBetweenDates !== timeBetweenDates) {
        checkForFlips(timeBetweenDates);
    }

    previousTimeBetweenDates = timeBetweenDates;
}, 250);

function checkForFlips(time) {
    console.log(convertTime(time));
}

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

function flip(flipCard) {
    const topHalf = flipCard.querySelector(".top");
    const bottomHalf = flipCard.querySelector(".bottom");
    const topFlip = document.createElement("div")
    topFlip.classList.add('top-flip')
    const bottomFlip = document.createElement("div")
    bottomFlip.classList.add('bottom-flip')
    flipCard.append(topFlip, bottomFlip);
    const startNumber = parseInt(topHalf.textContent);

    topHalf.textContent = makeString(startNumber);
    bottomHalf.textContent = makeString(startNumber);
    topFlip.textContent = makeString(startNumber);
    bottomFlip.textContent = makeString(startNumber - 1);

    topFlip.addEventListener("animationstart", e => {
        topHalf.textContent = makeString(startNumber - 1);
    });
    
    topFlip.addEventListener("animationend", e => {
        topFlip.remove();
    })
    
    bottomFlip.addEventListener("animationend", e => {
        bottomHalf.textContent = makeString(startNumber - 1);
        bottomFlip.remove();
    }); 
}

function makeString(num) {
    if(num < 10) {
        return '0' + num;
    } else {
        return num.toString();
    }
}

function initializeCard(flipcard, value) {
    flipcard.querySelector('.top').textContent = makeString(value);
    flipcard.querySelector('.bottom').textContent = makeString(value);
}