(function(exports) {

    /*
     * Server to player: Connection started. (Temp)
     */
    exports.T_CONNECTION_STARTED = "CONNECTION-STARTED";
    exports.O_CONNECTION_STARTED = {
        type: exports.T_CONNECTION_STARTED
    };
    exports.S_CONNECTION_STARTED = JSON.stringify(exports.O_CONNECTION_STARTED);

    /*
     * Player to server: Join a lobby, gets send when entering a lobby. (Can maybe be deleted later)
     */
    exports.T_JOIN_LOBBY = "JOIN-LOBBY";
    exports.O_JOIN_LOBBY = {
        type: exports.T_JOIN_LOBBY,
        username: "",
        code: ""
    };
    exports.S_JOIN_LOBBY = JSON.stringify(exports.O_JOIN_LOBBY);

    /*
     * Server to player: Message stating if the join was successful and if so containing lobbyID.
     */
    exports.T_JOIN_SUCCESSFUL = "JOIN-SUCCESSFUL";
    exports.O_JOIN_SUCCESSFUL = {
        type: exports.T_JOIN_SUCCESSFUL,
        status: "",     //either 'successful' or 'failed'
        lobbyID: 0      //the lobbyID of the player
    };
    exports.S_JOIN_SUCCESSFUL = JSON.stringify(exports.O_JOIN_SUCCESSFUL);

    /*
     * Server to player: Player joined lobby.
     */
    exports.T_PLAYER_JOINED = "PLAYER-JOINED";
    exports.O_PLAYER_JOINED = {
        type: exports.T_PLAYER_JOINED,
        lobbyID: 0,
        username: ""
    };
    exports.S_PLAYER_JOINED = JSON.stringify(exports.O_PLAYER_JOINED);

    /*
     * Server to player: Player left lobby.
     */
    exports.T_PLAYER_LEFT = "PLAYER-LEFT";
    exports.O_PLAYER_LEFT = {
        type: exports.T_PLAYER_LEFT,
        lobbyID: 0
    };
    exports.S_PLAYER_LEFT = JSON.stringify(exports.O_PLAYER_LEFT);

    /*
     * Player to server and player to server: a chat message send by username;
    */
    exports.T_CHAT_MESSAGE = "CHAT-MESSAGE";
    exports.O_CHAT_MESSAGE = {
        type: exports.T_CHAT_MESSAGE,
        lobbyID: 0,
        message: ""
    };
    exports.S_CHAT_MESSAGE = JSON.stringify(exports.O_CHAT_MESSAGE);

})(typeof exports === "undefined" ? (this.Messages = {}) : exports);