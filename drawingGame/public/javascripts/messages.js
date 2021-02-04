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
     * Server to player: Player joined lobby.
     */
    exports.T_PLAYER_JOINED = "PLAYER-JOINED";
    exports.O_PLAYER_JOINED = {
        type: exports.T_PLAYER_JOINED,
        username: ""
    };
    exports.S_PLAYER_JOINED = JSON.stringify(exports.O_PLAYER_JOINED);

    /*
     * Server to player: Player leaved lobby.
     */
    exports.T_PLAYER_LEAVED = "PLAYER-LEAVED";
    exports.O_PLAYER_LEAVED = {
        type: exports.T_PLAYER_LEAVED,
        username: ""
    };
    exports.S_PLAYER_LEAVED = JSON.stringify(exports.O_PLAYER_LEAVED);

    /*
     * Player to server and player to server: a chat message send by username;
    */
    exports.T_CHAT_MESSAGE = "CHAT-MESSAGE";
    exports.O_CHAT_MESSAGE = {
        type: exports.T_CHAT_MESSAGE,
        username: "",
        message: ""
    };
    exports.S_CHAT_MESSAGE = JSON.stringify(exports.O_CHAT_MESSAGE);

})(typeof exports === "undefined" ? (this.Messages = {}) : exports);