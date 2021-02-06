function abstractRound(players){
    //list of players
    this.players = players;
    //function used to send message to all players
    this.sendmessagetoall;
    //function used to send message to specific player
    this.sendmessagetoplayer;

    //callback for round ending
    this.onroundend;

    //contains main code for round
    this.start = function(){};

    //accepts messages sent by player
    this.acceptMessage = function(msg){};
}