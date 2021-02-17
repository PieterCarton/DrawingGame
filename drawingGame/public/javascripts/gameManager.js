//import all modules 
//import * as test from "./exportTest.js"; example

import Timer from "./timer.js";
import DrawingContext from "./drawingContext.js";
import Lobby from "./lobby.js";
import Submission from "./submission.js";

let enabledComponents = [];

//helps to find constructor for components specified in message
let componentMap = {
    "TIMER":Timer,
    "DRAWING-CONTEXT":DrawingContext
}

//initialize lobby
let lobby = new Lobby();
//give lobby reference to gameManager to pass on 
lobby.onmessage = acceptMsg;


//acceptMessage function
function acceptMessage(msg){

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