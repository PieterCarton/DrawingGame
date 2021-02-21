//import all modules 
//import * as test from "./exportTest.js"; example

import Timer from "./timer.js";
import CanvasContext from "./canvasContext.js";
import Lobby from "./lobby.js";
import Submission from "./submission.js";

let enabledComponents = [];

//helps to find constructor for components specified in message
let componentMap = {
    "TIMER":Timer,
    "CANVAS-CONTEXT":CanvasContext
}

//list of active components
let activeComponents = [];

//initialize lobby
let lobby = new Lobby(acceptMessage);
//give lobby reference to gameManager to pass on 
//lobby.onmessage = acceptMsg;


//acceptMessage function
function acceptMessage(msgObj){
    if(msgObj.type == Messages.T_ENABLE_COMPONENT){
        let component = componentMap[msgObj.component];
        activeComponents[msgObj.component] = new component("body", msgObj.args);
    }else if(msgObj.type == Messages.T_DISABLE_COMPONENT){

    }else if(msgObj.type == Messages.T_MESSAGE_COMPONENT){
        //check if component exists
        if(!activeComponents[msgObj.component]){
            console.log("ERROR: Messaged component not found!");
        }
        //get nested message and pass it to the target component
        let message = msgObj.message;
        activeComponents[msgObj.component].acceptMsg(message);
    }else if(msgObj.type == Messages.T_DRAWING_REQUEST){
        let msg = Messages.O_DRAWING_SUBMISSION;
        msg.imageData = activeComponents["CANVAS-CONTEXT"].getFrameSequence();
        msg.lobbyID = lobby.lobbyID;
        lobby.sendMessage(msg);
    }
}

//enable component function
function enableComponent(type, args){

}

//disableComponent function
function disableComponent(type){

}

//disableAll function
function disableAll(){

}