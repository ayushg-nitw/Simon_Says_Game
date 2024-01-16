let gameSeq=[];
let userSeq=[];
let started=false;
let level=0;
let highestScore=0;
let h2=document.querySelector("h2");
let h3=document.querySelector("h3");
let btns=["c1","c2","c3","c4"];

document.addEventListener("keypress",function(){
if(!started) {
    console.log("Game started");
    started=true;
    levelUp();
  }
});

//flashing btn

function btnflash(btn){
btn.classList.add("flash");
setTimeout(function(){
    btn.classList.remove("flash");
},250);
}

function userflash(btn){
    btn.classList.add("userflash");
    setTimeout(function(){
        btn.classList.remove("userflash");
    },250);
}

//checking ans of user and game sequence

function checkans(idx){
    if(gameSeq[idx]=== userSeq[idx]){
        if(gameSeq.length==userSeq.length) {
            setTimeout(levelUp,1000);
        }
    }
    else{
        let score=level-1;
        h2.innerText=`GAME OVER! Your Score is ${score} \nPress any key to restart`;
          
        document.querySelector("body").style.backgroundColor="red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor= `rgb(141, 191, 191)`; 
        },150);

        if (score > highestScore) {
            highestScore = score;
            h3.textContent = `Your Highest Score is : ${highestScore}`;
        }

        reset();
    }
}

//btnpressing by user

function btnpress(){
   userflash(this);
   let usercolor=this.getAttribute('id');
   userSeq.push(usercolor);
   console.log(`user seq : ${userSeq}`);
   checkans(userSeq.length-1);
}

//choosing a random button by system;

let allbtns=document.querySelectorAll(".btn");
for(let btn of allbtns){
    btn.addEventListener("click",btnpress);
}

function levelUp(){
    userSeq=[];
    level++;
h2.innerText=`Level ${level}`;
let randIdx= Math.floor(Math.random()*4);   //0-3
let randcolor=btns[randIdx];
let flashbtn=document.querySelector(`.${randcolor}`);
gameSeq.push(randcolor);
console.log(`game seq : ${gameSeq}`);
btnflash(flashbtn);
}

function reset(){
     gameSeq=[];
     userSeq=[];
     started=false;
     level=0;
}

