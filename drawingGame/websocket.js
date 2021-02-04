const websocket = require("ws");
const messages = require("./public/javascripts/messages.js");
const lobbyManager = require("./lobbyManager.js");
const Player = require("./player.js");
const player = require("./player.js");

let websockets = {};
let connectionID = 0;

module.exports = function(server) {
    const wss = new websocket.Server({server});

    wss.on("connection", function(ws) {
        ws.send(messages.S_CONNECTION_STARTED);

        ws.id = connectionID;
        websockets[connectionID++] = ws;

        ws.on("message", function(message) {
            console.log(`Received: ${message}`);

            let jsonData = JSON.parse(message);

            if (jsonData.type == messages.T_JOIN_LOBBY) {
                let username = jsonData.username;
                let code = jsonData.code;
                let newPlayer = new Player(ws.id, username, code);
                ws.player = newPlayer;

                console.log(`Player Joining...: username=${username}, code=${code}`);

                if (!lobbyManager.addPlayerToLobby(newPlayer, code)) {
                    console.log("Player tried to join lobby that does not exist.");
                    return;
                }

                //Send message to players that the player has joined.
                //And send messages for every player that has already joined.
                for (let player of lobbyManager.getPlayersInLobby(code)) {
                    if (player == newPlayer) {
                        continue;
                    }
                    let msg = messages.O_PLAYER_JOINED;

                    //send message to previously joined player
                    msg.username = username;
                    console.log(`Sending ${JSON.stringify(msg)} ...`);
                    websockets[player.connectionID].send(JSON.stringify(msg));

                    //send message to joining player
                    msg.username = player.username;
                    console.log(`Sending ${JSON.stringify(msg)} ...`);
                    ws.send(JSON.stringify(msg));
                }
            } else if (jsonData.type == messages.T_CHAT_MESSAGE) {
                let username = jsonData.username;
                let message = jsonData.message;
                let lobbyCode = ws.player.lobbyCode;

                let msg = messages.O_CHAT_MESSAGE;
                msg.username = username;
                msg.message = message;

                //Send chat message all players in lobby.
                for (let player of lobbyManager.getPlayersInLobby(lobbyCode)) {
                    websockets[player.connectionID].send(JSON.stringify(msg));
                }
            }
        });

        ws.on("close", function() {
            let leavingPlayer = ws.player;

            if (ws.player == null) {
                return;
            }

            //remove player from lobby.
            lobbyManager.removePlayerFromLobby(leavingPlayer);

            //send message that the player left.
            let msg = messages.O_PLAYER_LEAVED;
            msg.username = leavingPlayer.username;

            console.log(`Sending ${JSON.stringify(msg)} to all players in lobby...`);

            for (let player of lobbyManager.getPlayersInLobby(leavingPlayer.lobbyCode)) {
                websockets[player.connectionID].send(JSON.stringify(msg));
            }
        });
    });
}