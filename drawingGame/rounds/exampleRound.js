/*Simple drawing round: players are asked to draw themselves*/
module.exports = function(players){
    //messages object
    this.messages = require("../public/javascripts/messages");
    //component object
    this.components = require("../public/javascripts/components");


    //list of players
    this.players = players;
    //function used to send message to all players
    this.sendmessagetoall;
    //function used to send message to specific player
    this.sendmessagetoplayer;
    //callback for round ending
    this.onroundend;

    //temp
    this.hasSentMessage = false;

    //contains main code for round
    this.start = function(){
        //let all players draw themselves
        //enable required components: canvasContext, timer
        let msg = this.messages.O_ENABLE_COMPONENT;
        msg.component = this.components.CANVAS_CONTEXT;
        //1 frame
        msg.args = "1";
        this.sendmessagetoall(msg);

        msg.component = this.components.TIMER;
        //30s countdown
        msg.args = "30";
        this.sendmessagetoall(msg);

        //update info box
        msg = this.messages.O_UPDATE_INFO_BOX;
        msg.info = "Draw yourself!"
        this.sendmessagetoall(msg);

        //start client timer
        msg = this.messages.O_START_TIMER;
        let msg2 = this.messages.O_MESSAGE_COMPONENT;
        msg2.message = msg;
        msg2.component = this.components.TIMER;
        this.sendmessagetoall(msg2);

        //wait for 10s, then continue
        setTimeout(this.gatherDrawings.bind(this), 32*1000);
    };

    this.gatherDrawings = function(){
        //request all drawings from players
        let msg = this.messages.O_DRAWING_REQUEST;
        this.sendmessagetoall(msg);

        //update 
    }

    //accepts messages sent by player
    this.acceptMsg = function(msg){
        //send drawings to other players
        if(msg.type == this.messages.T_DRAWING_SUBMISSION){
            if(this.hasSentMessage){
                return;
            }
            let frameSequence = msg.imageData;

            let outerMessage = this.messages.O_MESSAGE_COMPONENT;
            outerMessage.component = this.components.CANVAS_CONTEXT;

            let innerMessage = this.messages.O_DISPLAY_FRAME_SEQUENCE;
            innerMessage.frameSequence = frameSequence;

            outerMessage.message = innerMessage;
            this.sendmessagetoall(outerMessage);
            this.hasSentMessage = true;
        }
    };
}