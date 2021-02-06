const Messages = require("./public/javascripts/messages.js");

function lobby(code) {
    this.code = code;
    this.playerIDcounter = 0;

    this.players = {};

    this.addPlayer = function(player) {
        player.setLobby(this.code, this.playerIDcounter);
        this.players[this.playerIDcounter++] = player;
        console.log(`${player.username} joined lobby ${this.code}`);
        return true;
    }

    this.removePlayer = function(player) {
        delete this.players[player.lobbyID];
        return this.players.length;
    }

    this.getPlayers = function() {
        return Object.values(this.players);
    }

    this.isEmpty = function() {
        return this.players.length == 0;
    }

    this.sendMsgToAllPlayers = function(msg) {
        if (this.isEmpty()) {
            return;
        }
        for (let player of this.getPlayers()) {
            player.websocket.send(JSON.stringify(msg));
        }
    }

    this.sendMsgToPlayer = function(lobbyID, msg) {
        this.players[lobbyID].websocket.send(JSON.stringify(msg));
    }
}

//generate a random string of length `length` made of capital letters.
function generateLobbyCode(length) {
    var result = '';
    var characters  = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

module.exports = new (function() {
    this.lobbies = {}

    this.createLobby = function() {
        //generate random code till an unused code is found.
        let code = generateLobbyCode(4);
        let i = 0;

        while (this.lobbies[code] && i < 100) {
            code = generateLobbyCode(4);
            i++;
        }

        if (i == 100) {
            return false;
        }

        //create a lobby object and store it in lobbies.
        this.lobbies[code] = new lobby(code);

        return code;
    }

    this.addPlayerToLobby = function(newPlayer, code) {
        if (!this.lobbies[code]) {
            console.log("Player tried to join lobby that does not exist.");
            let msg = Messages.O_JOIN_SUCCESSFUL;
            msg.status = "failed";
            ws.send(JSON.stringify(msg));
            return false;
        }

        if (!this.lobbies[code].addPlayer(newPlayer)) {
            return false;
        }

        let msg = Messages.O_JOIN_SUCCESSFUL;
        msg.status = "successful";
        msg.lobbyID = newPlayer.lobbyID;
        newPlayer.websocket.send(JSON.stringify(msg));

        //Send message to previously joined players that the player has joined.
        //And send messages for every player that has already joined.
        for (let player of this.getPlayersInLobby(code)) {
            if (player == newPlayer) {
                continue;
            }
            let msg = Messages.O_PLAYER_JOINED;

            //send message to previously joined player
            msg.lobbyID = newPlayer.lobbyID;
            msg.username = newPlayer.username;
            console.log(`Sending ${JSON.stringify(msg)} ...`);
            player.websocket.send(JSON.stringify(msg));

            //send message to joining player
            msg.username = player.username;
            msg.lobbyID = player.lobbyID;
            console.log(`Sending ${JSON.stringify(msg)} ...`);
            newPlayer.websocket.send(JSON.stringify(msg));
        }

        return true;
    }

    this.removePlayerFromLobby = function(player) {
        if (player == undefined) {
            return false;
        }

        let code = player.lobbyCode;

        if (!this.lobbies[code]) {
            return false;
        }

        this.lobbies[code].removePlayer(player);

        setTimeout(this.deleteIfEmpty, 10000, this.lobbies, code);

        //send message that the player left.
        let msg = Messages.O_PLAYER_LEFT;
        msg.lobbyID = player.lobbyID;

        console.log(`Sending ${JSON.stringify(msg)} to all players in lobby...`);

        this.lobbies[code].sendMsgToAllPlayers(msg);

        return true;
    }

    this.getPlayersInLobby = function(code) {
        return this.lobbies[code].getPlayers();
    }

    this.deleteIfEmpty = function(lobbies, code) {
        if (lobbies[code] && lobbies[code].isEmpty()) {
            console.log(`Removing lobby: ${code}`);
            delete lobbies[code];
        }
    }

    this.lobbyExists = function(code) {
        if (this.lobbies[code]) {
            return true;
        }
        return false;
    }

    //Send chat message all players in lobby.
    this.sendChatMessage = function(lobbyCode, lobbyID, message) {
        let msg = Messages.O_CHAT_MESSAGE;
        msg.lobbyID = lobbyID;
        msg.message = message;

        for (let player of this.getPlayersInLobby(lobbyCode)) {
            player.websocket.send(JSON.stringify(msg));
        }
    }
   
})();