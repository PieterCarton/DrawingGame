(function setup() {
    const urlParams = new URLSearchParams(window.location.search);
    let socket = new WebSocket(`ws:${location.host}`);

    socket.onmessage = function(event) {
        console.log(`Received: ${event.data}`);

        let jsonData = JSON.parse(event.data);

        if (jsonData.type == Messages.T_CONNECTION_STARTED) {
            console.log(`Connection started!`);

            let msg = Messages.O_JOIN_LOBBY;
            msg.username = urlParams.get('username');
            msg.code = urlParams.get('lobby');
            socket.send(JSON.stringify(msg));
        } else if (jsonData.type == Messages.T_PLAYER_JOINED) {
            console.log(`Player Joined: ${jsonData.data}`);
        }
    }
})();