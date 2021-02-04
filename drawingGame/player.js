module.exports = function(connectionID, username) {
    this.connectionID = connectionID;
    this.username = username;
    this.lobbyCode;
    this.lobbyID;

    this.setLobby = function(lobbyCode, lobbyID) {
        this.lobbyCode = lobbyCode;
        this.lobbyID = lobbyID;
    }
}