module.exports = function(connectionID, websocket, username) {
    this.connectionID = connectionID;
    this.websocket = websocket;
    this.username = username;
    this.lobbyCode;
    this.lobbyID;

    this.setLobby = function(lobbyCode, lobbyID) {
        this.lobbyCode = lobbyCode;
        this.lobbyID = lobbyID;
    }
}