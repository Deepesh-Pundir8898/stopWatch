const buttons =document.querySelectorAll(".btn");
const hoursContainer =document.querySelector(".hours h1");
const minutesContainer =document.querySelector(".minutes h1");
const secondContainer =document.querySelector(".second h1");
const miniSecContainer =document.querySelector(".mini-sec h1");
const timer =document.querySelector(".timer");
const setTimer =document.querySelector(".timer-btn");
const timerSound=document.querySelector("#timer-sound");

let count =0;
let interval;

let hours=0;
let minutes=0;
let seconds=0;
let miniSec=0;


buttons.forEach((ele)=>{
    ele.addEventListener("click",(e)=>{
       if(e.target.value ==="start"){
            startTimer();
            
       }else if(e.target.value ==="stop"){
            stopTimer();
       }else if(e.target.value ==="reset"){
            resetTimer();
       }
    })
})

setTimer.addEventListener("click" , (e)=>{
    if(timer.value !== ""){
        let timerInput = (timer.value).split(":");
        hours = parseInt(timerInput[0]);
        minutes = parseInt(timerInput[1]);
        seconds = parseInt(timerInput[2]);
        updateUi();
    }
    if(e.target.value ==="start"){
        startTimer();
        
   }else if(e.target.value ==="stop"){
        stopTimer();
   }else if(e.target.value ==="reset"){
        timer.value="";
        resetTimer();
   }
    
})

function updateUi(){
    hoursContainer.innerText = String(hours).padStart(2, '0');
    minutesContainer.innerText = String(minutes).padStart(2, '0');
    secondContainer.innerText = String(seconds).padStart(2, '0');
    miniSecContainer.innerText = String(miniSec).padStart(2, '0');
}


function startTimer(){
    if(!interval){
        if(timer.value ===""){
        interval=setInterval(() => {

            miniSec++;

            if(miniSec === 100){
                miniSec = 0;
                seconds++;
            }
            if(seconds === 59){
                seconds=0;
                minutes++;
            }
            if(minutes === 59){
                hours++;
                minutes=0;
            }
            updateUi();
        },10)
        }else{
            interval=setInterval(() => {

                if(miniSec === 0){
                    if(seconds>0){
                        miniSec = 99;

                        seconds-- ;
                    }
                }
                if(seconds === 0){
                    if(minutes>0){
                        seconds=59;

                        minutes--;
                    }
                }
                if(minutes === 0){
                    if(hours>0){

                        hours--;
                        minutes=59;
                    }
                }

                if(seconds==10 && hours==0 && minutes==0){
                    timerSound.currentTime = 1;
                    timerSound.play();
                }
                if(seconds == 0 && minutes == 0 && hours == 0){
                    resetTimer();
                    // timerSound.currentTime = 3;
                    // timerSound.play();
                }else{
                    miniSec--;
                }
                updateUi();
                timer.value=""
            },10)
        }  
    }
}


function stopTimer() {
    clearInterval(interval);
    interval = null;
}


function resetTimer(){
    hours=0;
    minutes=0;
    seconds=0;
    miniSec=0;
    stopTimer()
    updateUi();
}