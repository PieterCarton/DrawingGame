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
        data: ""
    };
    exports.S_JOIN_LOBBY = JSON.stringify(exports.O_JOIN_LOBBY);

    /*
     * Server to player: Player joined lobby with code and username.
     */
    exports.T_PLAYER_JOINED = "PLAYER-JOINED";
    exports.O_PLAYER_JOINED = {
        type: exports.T_PLAYER_JOINED,
        username: "",
        code: ""
    };
    exports.S_PLAYER_JOINED = JSON.stringify(exports.O_PLAYER_JOINED);

})(typeof exports === "undefined" ? (this.Messages = {}) : exports);