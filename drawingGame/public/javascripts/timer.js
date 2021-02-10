function Timer(parent, args){
    this.time;
    this.interval;
    this.timerDiv;
    this.warningSound;
    this.warningTime;   //time from which 
    //generate component in parent node
    this.fill(parent);
    //configure according to given arguments
    //arguments should be given as:
    //<time>

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
    this.time = time;
}

Timer.prototype.startTimer = function(){
    this.interval = setInterval(function(){this.time--;}.bind(this), 1000);
}

Timer.prototype.stopTimer = function(){
    if(this.interval){
        clearInterval(this.interval);
    }
}