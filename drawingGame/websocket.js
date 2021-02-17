const websocket = require("ws");
const Messages = require("./public/javascripts/messages.js");
const lobbyManager = require("./lobbyManager.js");
const Player = require("./player.js");

let websockets = {};
let connectionID = 0;

module.exports = function(server) {
    const wss = new websocket.Server({server});

    wss.on("connection", function(ws) {
        ws.send(Messages.S_CONNECTION_STARTED);

        ws.id = connectionID;
        websockets[connectionID++] = ws;

        ws.on("message", function(message) {
            console.log(`Received: ${message}`);
            let jsonData = JSON.parse(message);

            if (jsonData.type == Messages.T_JOIN_LOBBY) {
                let username = jsonData.username;
                let code = jsonData.code;
                let newPlayer = new Player(ws.id, ws, username);
                ws.player = newPlayer;

                console.log(`Player Joining...: username=${username}, code=${code}`);

                lobbyManager.addPlayerToLobby(newPlayer, code)
            } else if (!lobbyManager.lobbyExists(ws.player.lobbyCode)) {
                console.log(`lobby (${ws.player.lobbyCode}) of player doesn't exist anymore!`);
                return;
            } else if (jsonData.type == Messages.T_CHAT_MESSAGE) {
                let lobbyID = jsonData.lobbyID;
                let message = jsonData.message;

                let lobbyCode = ws.player.lobbyCode;

                //temporary way to start game
                if(message == "start"){
                    lobbyManager.startGame(lobbyCode);
                }

                if (message.length > 500) {
                    message = message.substr(0, 500);
                }

                lobbyManager.sendChatMessage(lobbyCode, lobbyID, message);
            } else {
                //send message to lobbyManager to handle
                let lobbyCode = ws.player.lobbyCode;
                lobbyManager.acceptMsg(msg, lobbyCode);
            }
        });

        ws.on("close", function() {
            
            let leavingPlayer = ws.player;

            if (leavingPlayer == null) {
                return;
            }

            if (!lobbyManager.lobbyExists(leavingPlayer.lobbyCode)) {
                console.log("lobby of player doesn't exist anymore!");
                return;
            }

            //remove player from lobby.
            lobbyManager.removePlayerFromLobby(leavingPlayer);
        });
    });
}