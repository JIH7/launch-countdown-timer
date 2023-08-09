const startNumber = 8;
const flipCard = document.querySelector(".flip-card");



flip(flipCard);
flip(flipCard);
flip(flipCard);
flip(flipCard);
flip(flipCard);

function flip(flipCard) {
    const topHalf = flipCard.querySelector(".top");
    const bottomHalf = flipCard.querySelector(".bottom");
    const topFlip = document.createElement("div")
    topFlip.classList.add('top-flip')
    const bottomFlip = document.createElement("div")
    bottomFlip.classList.add('bottom-flip')
    flipCard.append(topFlip, bottomFlip);
    const startNumber = parseInt(topHalf.textContent);

    topHalf.textContent = startNumber;
    bottomHalf.textContent = startNumber;
    topFlip.textContent = startNumber;
    bottomFlip.textContent = startNumber - 1;

    topFlip.addEventListener("animationstart", e => {
        topHalf.textContent = startNumber - 1;
        console.log(`Animation start: ${startNumber - 1} Top Half Text = ${topHalf.textContent}`)
    });
    
    topFlip.addEventListener("animationend", e => {
        topFlip.remove();
    })
    
    bottomFlip.addEventListener("animationend", e => {
        bottomHalf.textContent = startNumber - 1;
        bottomFlip.remove();
    });
    
}