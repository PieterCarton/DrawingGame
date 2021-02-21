function Timer(parent, args){
    this.time;
    this.interval;
    this.timerDiv;
    this.parent = document.querySelector(parent);
    //retrieve audio file
    this.warningSound = new Audio("./sound/warning.wav");
    this.warningTime = 10;   //time from which 
    //generate component in parent node
    this.fill();
    //configure according to given arguments
    //{<time>}
    args = args.split(" ");
    this.setTime(args[0]);
}

//add all elements to parent node
Timer.prototype.fill = function(){
    this.timerDiv = document.createElement("div");
    this.timerDiv.classList.add("timer");
    this.parent.appendChild(this.timerDiv);
}

Timer.prototype.clear = function(){
    this.parent.removeChild(this.timerDiv);
}

Timer.prototype.acceptMsg = function(msg){
    if(!msg){
        console.log("ERROR: component recieved undefined message");
        return;
    }

    if(msg.type = Messages.T_START_TIMER){
        this.startTimer();
    }else{
        console.log("ERROR: message type unknown");
    }
}

Timer.prototype.setTime = function(time){
    if(!time){
        alert("ERROR: time not specified");
        return;
    }
    this.time = time;
    this.updateTime();
}

Timer.prototype.updateTime = function(){
    this.timerDiv.textContent = this.time;
}

Timer.prototype.decrementTimer = function(){
    if(this.time > 0){
        //as long as there is time left, decrement the timer
        this.time--;
        //notify player when time nears 0
        if(this.time < this.warningTime){
            //play warning sound
            this.warningSound.play();
        }

    }else{
        //stop timer when time reaches 0
        this.stopTimer();
    }
    this.updateTime();
}

Timer.prototype.startTimer = function(){
    this.interval = setInterval(function(){this.decrementTimer()}.bind(this), 1000);
}

Timer.prototype.stopTimer = function(){
    if(this.interval){
        clearInterval(this.interval);
        this.interval = false;
    }
}

export default Timer;