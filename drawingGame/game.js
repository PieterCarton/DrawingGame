module.exports = function(players, rounds){
    this.rounds = rounds;
    this.currentRound;
    this.players = players;

    this.sendmessagetoall;
    this.sendmessagetoplayer;

    this.roundNumber;
    this.gameState = "waiting";

    this.start = function(){
        this.gameState = "started";
        this.nextRound();
    }

    this.nextRound = function(){
        if(!this.roundNumber){
            this.roundNumber = 0;
        }else if(roundNumber < rounds.length){
            this.roundNumber++;
        }else{
            this.end();
        }

        //initialize and start new round
        this.currentRound = new this.rounds[this.roundNumber](this.players);
        this.currentRound.sendmessagetoall = this.sendmessagetoall;
        this.currentRound.sendmessagetoplayer = this.sendmessagetoplayer;
        this.currentRound.onroundend = this.nextRound.bind(this);
        this.currentRound.start();

        this.gameState = `round ${this.roundNumber+1}`;
    }

    this.end = function(){
        //notify lobby of game ending

        //update game stated
        this.gameState = "ended";
    }

    this.acceptMsg = function(){
        //check if message is meant for game, otherwise pass on to round
        if(this.currentRound){
            this.currentRound.acceptMessageMsg();
        }
    }
}