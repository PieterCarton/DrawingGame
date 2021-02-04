function lobby(code) {
    this.code = code;
    this.playerIDcounter = 0;

    this.players = {};

    this.addPlayer = function(player) {
        player.setLobby(this.code, this.playerIDcounter);
        this.players[this.playerIDcounter++] = player;
        console.log(`${player.username} joined lobby ${this.code}`);
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

    this.addPlayerToLobby = function(player, code) {
        if (!this.lobbies[code]) {
            return false;
        }

        this.lobbies[code].addPlayer(player);

        return true;
    }

    this.removePlayerFromLobby = function(player) {
        if (player == undefined) {
            return false;
        }

        if (!this.lobbies[player.lobbyCode]) {
            return false;
        }

        this.lobbies[player.lobbyCode].removePlayer(player);

        setTimeout(this.deleteIfEmpty, 10000, this.lobbies, player.lobbyCode);

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
})();