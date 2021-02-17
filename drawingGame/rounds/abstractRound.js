function abstractRound(players){
    //list of players
    this.players = players;
    //function used to send message to all players
    this.sendmessagetoall;
    //function used to send message to specific player
    this.sendmessagetoplayer;

    //callback for round ending
    this.onroundend;

    //input gathering
    this.submissionsReceived;
    this.isGatheringSubmissions = false;
    this.onAllGathered;
    this.submisionHistory = require("./submissionHistory");

    //contains main code for round
    this.start = function(){};

    //blocking method that collects all input and stores it in the input history, calls a passed function when all input was collected
    this.gatherSubmissions = function(callback){
        this.submissionHistory.addSubmissionGroup();

        this.onAllGathered = callback;
        this.gatherSubmissions = true;
        this.submissionsReceived = 0;
    }

    //called when accepting a message containing a submission
    this.addSubmission = function(sub){
        //check if submissions are being gathered
        if(!this.isGatheringSubmissions){
            return;
        }

        //add submission to history
        this.submisionHistory.addSubmission(sub);
        this.submissionsReceived++;

        //check if all submissions were received
        if(this.submissionsReceived == this.players.length){
            this.isGatheringSubmissions = false;
            //execute callback
            this.onAllGathered();
        }
    }



    //accepts messages sent by player
    this.acceptMessage = function(msg){};
}