const websocket = require("ws");
const messages = require("./public/javascripts/messages.js");

module.exports = function(server) {
    const wss = new websocket.Server({server});

    wss.on("connection", function(ws) {
        ws.send(messages.S_CONNECTION_STARTED);

        ws.on("message", function(message) {
            console.log(`Received: ${message}`);

            let jsonData = JSON.parse(message);

            if (jsonData.type == messages.T_JOIN_LOBBY) {
                console.log(`Player Joined: username=${jsonData.username}, code=${jsonData.code}`);
            }
        });
    });
}