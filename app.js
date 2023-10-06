let currMoleTile;
let currBadTile;
let score = 0;
let gameOver = false;
let moleTimer = 1000; //starting value, minimum 100
let badTimer = 2100; //starting value, minimum 125
let countdown = 25; //Checked Interval
let currMoleTimer = 1000; //Current Vega Move Countdown
let currBadTimer = 2100; //Current Rei Move Countdown
let hintTimer = 5000; //How often hints refresh
let hintShown = -1; //Hint Being Shown

window.onload = function () {
    setGame();
}

function setGame() {
    for (let i = 0; i < 9; i++) {
        let tile = document.createElement("div");
        tile.id = i.toString();
        tile.addEventListener("click", selectTile);
        document.getElementById("board").appendChild(tile);
    }

    setMole();
    setBad();
    hints();
    setInterval(actionCountdown, countdown);
    setInterval(hints, hintTimer);

    //setInterval(setMole, moleTimer);
    //setInterval(setBad, badTimer);
}

function hints() {
    hintShown += 1;
    if (hintShown >= 7) {
        hintShown = 0;
    }

    if (hintShown == 0) {
        document.getElementById("hint").innerText = "Vega is the drinking gnome. Rei is the cross-armed assassin.";
    } else if (hintShown == 1) {
        document.getElementById("hint").innerText = "Vega and Rei move faster after each successful click.";
    } else if (hintShown == 2) {
        document.getElementById("hint").innerText = "Vega and Rei may move immediately after a successful click.";
    } else if (hintShown == 3) {
        document.getElementById("hint").innerText = "Vega may not always be on-screen.";
    } else if(hintShown == 4) {
        document.getElementById("hint").innerText = "Rei may not always be on-screen.";
    } else if (hintShown == 5) {
        document.getElementById("hint").innerText = "This project was based on a design by Kenny Yip Coding on YouTube.";
    } else if (hintShown == 6) {
        document.getElementById("hint").innerText = "This project was created by Alex Holder using Javascript, CSS, and HTML.";
    }
}

function getRandomTile() {
    let num = Math.floor(Math.random() * 9);
    return num.toString();
}

function actionCountdown() {
    currMoleTimer -= countdown;
    currBadTimer -= countdown;

    if (currMoleTimer <= 0) {
        setMole();
        currMoleTimer = moleTimer;
    }

    if (currBadTimer <= 0) {
        setBad();
        currBadTimer = badTimer;
    }

}

function setMole() {
    if (gameOver == true) {
        return;
    }
    if (currMoleTile) {
        currMoleTile.innerHTML = " ";
    }

    let mole = document.createElement("img");
    mole.src = "./Vega.png";

    let num = getRandomTile();
    if (currBadTile && currBadTile.id == num) {
        return;
    }

    currMoleTile = document.getElementById(num);
    currMoleTile.appendChild(mole);
}

function setBad() {
    if (gameOver == true) {
        return;
    }
    if (currBadTile) {
        currBadTile.innerHTML = " ";
    }

    let baddy = document.createElement("img");
    baddy.src = "./Rei.png";

    let num = getRandomTile();
    if (currMoleTile && currMoleTile.id == num) {
        return;
    }

    currBadTile = document.getElementById(num);
    currBadTile.appendChild(baddy);
}

function selectTile() {
    if (gameOver == true) {
        return;
    }
    if (this == currMoleTile) {
        score += 10;
        document.getElementById("score").innerText = "Score: " + score.toString();

        //Moves Vega + Rei on each successful click
        setMole();
        setBad();

        //Increases the jump interval for both Rei + Vega on each successful click
        if (moleTimer > 100) {
            moleTimer -= 25;
        }
        if (badTimer > 125) {
            badTimer -= 25;
        }
    } else if (this == currBadTile) {
        document.getElementById("score").innerText = "GAME OVER -- Final Score: " + score.toString();
        gameOver = true;
    }
}