/* =========================================================
   ELEMENTS
========================================================= */

const boxes = document.querySelectorAll(".box");

const resetBtn =
    document.querySelector("#reset_btn");

const newGameBtn =
    document.querySelector("#new-btn");

const homeBtn =
    document.querySelector("#home-btn");

const msgContainer =
    document.querySelector("#resultModal");

const msg =
    document.querySelector("#msg");

const resultDescription =
    document.querySelector("#resultDescription");

const resultIcon =
    document.querySelector("#resultIcon");

const resultLabel =
    document.querySelector("#resultLabel");

const startBtn =
    document.querySelector("#start-btn");

const playerScreen =
    document.querySelector("#playerScreen");

const gameScreen =
    document.querySelector("#gameScreen");

const playerOInput =
    document.querySelector("#playerO");

const playerXInput =
    document.querySelector("#playerX");

const playerODisplay =
    document.querySelector("#playerODisplay");

const playerXDisplay =
    document.querySelector("#playerXDisplay");

const scoreOElement =
    document.querySelector("#scoreO");

const scoreXElement =
    document.querySelector("#scoreX");

const turnText =
    document.querySelector("#turnText");

const playerCardO =
    document.querySelector(".player-card-o");

const playerCardX =
    document.querySelector(".player-card-x");


/* =========================================================
   GAME VARIABLES
========================================================= */

let turnO = true;

let moveCount = 0;

let playerOName = "Player O";

let playerXName = "Player X";

let scoreO = 0;

let scoreX = 0;


/* =========================================================
   WIN PATTERNS
========================================================= */

const winPatterns = [

    [0, 1, 2],

    [0, 3, 6],

    [0, 4, 8],

    [1, 4, 7],

    [2, 5, 8],

    [2, 4, 6],

    [3, 4, 5],

    [6, 7, 8]

];


/* =========================================================
   START GAME
========================================================= */

startBtn.addEventListener("click", () => {

    const pO =
        playerOInput.value.trim();

    const pX =
        playerXInput.value.trim();


    if (pO !== "") {

        playerOName = pO;

    } else {

        playerOName = "Player O";

    }


    if (pX !== "") {

        playerXName = pX;

    } else {

        playerXName = "Player X";

    }


    playerODisplay.textContent =
        playerOName;

    playerXDisplay.textContent =
        playerXName;


    playerScreen.classList.add("hidden");

    gameScreen.classList.remove("hidden");


    resetGame();

});


/* =========================================================
   BOX CLICK
========================================================= */

boxes.forEach((box) => {

    box.addEventListener("click", () => {

        if (box.disabled) {
            return;
        }


        if (turnO) {

            box.innerText = "O";

            box.classList.add("o");

            turnO = false;

        } else {

            box.innerText = "X";

            box.classList.add("x");

            turnO = true;

        }


        box.disabled = true;

        moveCount++;


        updateTurn();

        checkWinner();

    });

});


/* =========================================================
   CHECK WINNER
========================================================= */

function checkWinner() {

    for (const pattern of winPatterns) {

        const pos1 =
            boxes[pattern[0]].innerText;

        const pos2 =
            boxes[pattern[1]].innerText;

        const pos3 =
            boxes[pattern[2]].innerText;


        if (
            pos1 !== "" &&
            pos2 !== "" &&
            pos3 !== ""
        ) {

            if (
                pos1 === pos2 &&
                pos2 === pos3
            ) {

                pattern.forEach((index) => {

                    boxes[index]
                        .classList
                        .add("win");

                });


                showWinner(pos1);

                return;

            }

        }

    }


    /* DRAW */

    if (moveCount === 9) {

        showDraw();

    }

}


/* =========================================================
   SHOW WINNER
========================================================= */

function showWinner(winner) {

    disableBoxes();


    let winnerName;


    if (winner === "O") {

        winnerName = playerOName;

        scoreO++;

        scoreOElement.textContent =
            scoreO;

    } else {

        winnerName = playerXName;

        scoreX++;

        scoreXElement.textContent =
            scoreX;

    }


    resultIcon.textContent = "🏆";

    resultLabel.textContent =
        "VICTORY";

    msg.textContent =
        `${winnerName} wins!`;

    resultDescription.textContent =
        "What a brilliant move! 🎉";


    setTimeout(() => {

        msgContainer.classList.remove("hide");

    }, 500);

}


/* =========================================================
   SHOW DRAW
========================================================= */

function showDraw() {

    disableBoxes();


    resultIcon.textContent = "🤝";

    resultLabel.textContent =
        "DRAW GAME";

    msg.textContent =
        "It's a Draw!";

    resultDescription.textContent =
        "Both players fought brilliantly.";

    setTimeout(() => {

        msgContainer.classList.remove("hide");

    }, 300);

}


/* =========================================================
   DISABLE BOXES
========================================================= */

function disableBoxes() {

    boxes.forEach((box) => {

        box.disabled = true;

    });

}


/* =========================================================
   ENABLE BOXES
========================================================= */

function enableBoxes() {

    boxes.forEach((box) => {

        box.disabled = false;

        box.innerText = "";

        box.classList.remove(
            "o",
            "x",
            "win"
        );

    });

}


/* =========================================================
   RESET GAME
========================================================= */

function resetGame() {

    turnO = true;

    moveCount = 0;


    enableBoxes();


    msgContainer.classList.add("hide");


    updateTurn();

}


/* =========================================================
   UPDATE TURN
========================================================= */

function updateTurn() {

    if (turnO) {

        turnText.textContent =
            `${playerOName}'s Turn`;

        playerCardO.classList.add("active");

        playerCardX.classList.remove("active");

    } else {

        turnText.textContent =
            `${playerXName}'s Turn`;

        playerCardX.classList.add("active");

        playerCardO.classList.remove("active");

    }

}


/* =========================================================
   NEW GAME
========================================================= */

newGameBtn.addEventListener(
    "click",
    () => {

        resetGame();

    }
);


/* =========================================================
   RESET BUTTON
========================================================= */

resetBtn.addEventListener(
    "click",
    () => {

        resetGame();

    }
);


/* =========================================================
   HOME / CHANGE PLAYERS
========================================================= */

homeBtn.addEventListener(
    "click",
    () => {

        msgContainer.classList.add(
            "hide"
        );

        gameScreen.classList.add(
            "hidden"
        );

        playerScreen.classList.remove(
            "hidden"
        );

        scoreO = 0;

        scoreX = 0;

        scoreOElement.textContent = "0";

        scoreXElement.textContent = "0";

        resetGame();

    }
);

