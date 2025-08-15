let box=document.querySelectorAll(".box");
let resetBtn=document.querySelector("#reset_btn");
let newGameBtn=document.querySelector("#new-btn");
let msgContainer= document.querySelector(".msg-container");
let msg=document.querySelector("#msg")
let turnO=true;
const winPatterns=[
    [0 ,1 ,2],
    [0 ,3 ,6],
    [0 ,4 ,8],
    [1 ,4 ,7],
    [2 ,5 ,8],
    [2 ,4 ,6],
    [3 ,4 ,5],
    [6 ,7 ,8],
];

const resetGame = () => {
    turnO= true;
    moveCount=0;
    enabledBox();
    msgContainer.classList.add("hide");
}


let moveCount=0;

box.forEach((box)=>{
    box.addEventListener("click", ()=>{
      
        if(turnO){
            box.innerText= 'O';
            turnO= false;
        }else{
            box.innerText= "X";
            turnO= true;
        }
        box.disabled= true;
        moveCount++;
        checkWinner();
    })
})


const disabledBox=()=>{
    for(let boxes of box){
        boxes.disabled=true;
    }
}

const enabledBox = () => {
    for (let boxes of box) {
        boxes.disabled=false;
        boxes.innerText= "";
    }
}


//const showWinner = (winner) => {
//     msg.innerText= `Congratulations, Winner is ${winner}`;
//     msgContainer.classList.remove("hide");
//     disabledBox();
//}

const showWinner = (winner) => {
    let name = winner === 'O' ? playerOName : playerXName;
    msg.innerText=` 🎉 Congratulations, ${name} wins!`;
    msgContainer.classList.remove("hide");
    disabledBox();
}

const showDraw = () => {
  msg.innerText = "😐 It's a Draw!";
  msgContainer.classList.remove("hide");
  disabledBox();
};



const checkWinner= () =>{
    for(let pattern of winPatterns){
        let pasVal1=box[pattern[0]].innerText;
        let pasVal2=box[pattern[1]].innerText;
        let pasVal3=box[pattern[2]].innerText;
        if(pasVal1 != "" && pasVal2 !="" && pasVal3 != ""){
            if(pasVal1 == pasVal2 && pasVal2 == pasVal3){
                showWinner(pasVal1);
                return;
            }
        }
        let allFilled = true;
  box.forEach((b) => {
    if (b.innerText === "") {
      allFilled = false;
    }
  });

  if (allFilled) {
    showDraw();
  }
};
 }




newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);

let playerOName = "Player O";
let playerXName = "Player X";

document.querySelector("#start-btn").addEventListener("click", () => {
    let pO = document.querySelector("#playerO").value;
    let pX = document.querySelector("#playerX").value;

    if (pO.trim() !== "") playerOName = pO;
    if (pX.trim() !== "") playerXName = pX;

    document.querySelector(".player-input").style.display = "none";
});



