function Timer(parent, args){
    this.time;
    this.interval;
    this.timerDiv;
    this.parent;
    //retrieve audio file
    this.warningSound = new Audio("warning.wav");
    this.warningTime = 10;   //time from which 
    //generate component in parent node
    this.fill(parent);
    //configure according to given arguments
    //{<time>}
    let arguments = args.split(" ");
    this.setTime(args[0]);
}

//add all elements to parent node
Timer.prototype.fill = function(parent){
    this.timerDiv = document.createElement("div");
    this.timerDiv.classList.add("timer");
    parent.appendChild(this.timerDiv);
    this.parent = parent;
}

Timer.prototype.clear = function(){
    this.parent.removeChild(this.timerDiv);
}

Timer.prototype.setTime = function(time){
    if(!time){
        alert("ERROR: time not specified");
        return;
    }
    this.time = time;
}

Timer.prototype.decrementTimer = function(){
    if(this.time > 0){
        //as long as there is time left, drecrement the timer
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
}

Timer.prototype.startTimer = function(){
    this.interval = setInterval(function(){this.time--;}.bind(this), 1000);
}

Timer.prototype.stopTimer = function(){
    if(this.interval){
        clearInterval(this.interval);
        this.interval = false;
    }
}