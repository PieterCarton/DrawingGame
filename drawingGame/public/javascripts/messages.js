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

    /**
     * Server to player: Server request the player to immediatly send their drawing
     */
    exports.T_DRAWING_REQUEST = "DRAWING-REQUEST";
    exports.O_DRAWING_REQUEST = {
        type: exports.T_DRAWING_REQUEST
    };
    exports.S_DRAWING_REQUEST = JSON.stringify(exports.O_DRAWING_REQUEST);

    /**
     * Player to server: Player sends their drawing to the server
     */
    exports.T_DRAWING_SUBMISSION = "DRAWING-SUBMISSION";
    exports.O_DRAWING_SUBMISSION = {
        type: exports.T_DRAWING_SUBMISSION,
        lobbyID: 0,
        imageData: null
    };
    exports.S_DRAWING_SUBMISSION = JSON.stringify(exports.O_DRAWING_SUBMISSION);

    /**
     * Server to player: Server enables UI component on the client's screen
     */
    exports.T_ENABLE_COMPONENT = "ENABLE-COMPONENT";
    exports.O_ENABLE_COMPONENT = {
        type: exports.T_ENABLE_COMPONENT,
        //type of component
        component: "",
        //arguments for creating component: eg starting value of a timer
        args: ""
    };
    exports.S_ENABLE_COMPONENT = JSON.stringify(exports.O_ENABLE_COMPONENT);

    /**
     * Server to player: Server disables UI component on the client's screen
     */
    exports.T_DISABLE_COMPONENT = "DISABLE-COMPONENT";
    exports.O_DISABLE_COMPONENT = {
        type: exports.T_DISABLE_COMPONENT,
        component: ""
    };
    exports.S_DISABLE_COMPONENT = JSON.stringify(exports.O_DISABLE_COMPONENT);

     /**
     * Server to player: Start timer component, if present
     */
    exports.T_START_TIMER = "START-TIMER";
    exports.O_START_TIMER = {
        type: exports.T_START_TIMER
    };
    exports.S_START_TIMER = JSON.stringify(exports.O_START_TIMER);

    /**
     * Server to player: Updates the client side status bar, which informs the player about what is happening
     */
    exports.T_UPDATE_INFO_BOX = "UPDATE-INFO-BOX";
    exports.O_UPDATE_INFO_BOX = {
        type: exports.T_UPDATE_INFO_BOX,
        info: ""
    };
    exports.S_UPDATE_INFO_BOX = JSON.stringify(exports.O_UPDATE_INFO_BOX);
    

})(typeof exports === "undefined" ? (this.Messages = {}) : exports);