class Memorama {

    constructor() {

        this.canPlay = false;
        this.counter = 0;

        this.card1 = null;
        this.card2 = null;
        this.images1=  [1,10,3,12,5,14,7,16];
        this.images2 = [9,2,11,4,13,6,15,8];
        this.images3 = [25,18,27,20,29,22,31,24];
        this.images4 = [17,26,19,28,21,30,23,32];
        this.availableImages = [this.images1, this.images2, this.images3, this.images4];
        this.randomImages = 0;
        this.orderForThisRound = [];
        this.cards = Array.from( document.querySelectorAll(".board-game figure") );
        this.maxPairNumber = 8;

        this.startGame();

    }

    startGame() {
        this.foundPairs = 0;
        this.counter= 0;
        document.getElementById("intentos").innerHTML = "Intentos: " + this.counter
        this.setNewOrder();
        this.setImagesInCards();
        this.openCards();

    }

    setNewOrder() {
        this.randomImages = Math.floor(Math.random() * 4);
        this.orderForThisRound = this.availableImages[this.randomImages].concat(this.availableImages[this.randomImages]);
        this.orderForThisRound.sort( () => Math.random() - 0.5 );

    }

    setImagesInCards() {

        for (const key in this.cards) {
            
            const card = this.cards[key];
            const image = this.orderForThisRound[key];
            const imgLabel = card.children[1].children[0];

            card.dataset.image = image;
            imgLabel.src = `./images/${image}.jpg`;

        }

    }

    openCards() {

        this.cards.forEach(card => card.classList.add("opened"));

        setTimeout(() => {
            this.closeCards();
        }, 1000);

    }

    closeCards() {

        this.cards.forEach(card => card.classList.remove("opened"));
        this.addClickEvents();
        this.canPlay = true;

    }

    addClickEvents() {

        this.cards.forEach(_this => _this.addEventListener("click", this.flipCard.bind(this)));

    }

    removeClickEvents() {

        this.cards.forEach(_this => _this.removeEventListener("click", this.flipCard));

    }

    flipCard(e) {

        const clickedCard = e.target;

        if (this.canPlay && !clickedCard.classList.contains("opened")) {
            
            clickedCard.classList.add("opened");
            this.checkPair( clickedCard.dataset.image );

        }

    }

    checkPair(image) {


        if (!this.card1){ this.card1 = image;

        }else{ this.card2 = image;}

        if (this.card1 && this.card2) {
            this.counter++;
            document.getElementById("intentos").innerHTML = "Intentos: " + this.counter
            console.log(this.counter);
            
            if (this.card1 == this.card2) {

                this.canPlay = false;
                setTimeout(this.checkIfWon.bind(this), 300)
                
            }
            else {
                const firstOpened = document.querySelector(`.board-game figure.opened[data-image='${this.card1}']`);
                const secondOpened = document.querySelector(`.board-game figure.opened[data-image='${this.card2}']`);
                firstOpened.classList.add("shake");
                secondOpened.classList.add("shake");
                this.canPlay = false;
                setTimeout(this.resetOpenedCards.bind(this), 2000)

            }

        }

    }

    resetOpenedCards() {
        
        const firstOpened = document.querySelector(`.board-game figure.opened[data-image='${this.card1}']`);
        const secondOpened = document.querySelector(`.board-game figure.opened[data-image='${this.card2}']`);

        firstOpened.classList.remove("opened");
        secondOpened.classList.remove("opened");

        firstOpened.classList.remove("shake");
        secondOpened.classList.remove("shake");

        this.card1 = null;
        this.card2 = null;

        this.canPlay = true;

    }

    checkIfWon() {

        this.foundPairs++;

        this.card1 = null;
        this.card2 = null;
        this.canPlay = true;

        if (this.maxPairNumber == this.foundPairs) {

            alert("¡Ganaste! Ronda terminada en "+this.counter+" Intentos");
            this.setNewGame();
            
        }

    }

    setNewGame() {
        this.removeClickEvents();
        this.cards.forEach(card => card.classList.remove("opened"));
        setTimeout(this.startGame.bind(this), 1000);

    }

}

document.addEventListener("DOMContentLoaded", () => {

    new Memorama();

});