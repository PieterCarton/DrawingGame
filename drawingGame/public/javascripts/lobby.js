(function() {
    const urlParams = new URLSearchParams(window.location.search);
    let socket = new WebSocket(`ws:${location.host}`);

    let playerListEl = document.getElementById("playerList");
    let chatMessageBox = document.getElementById("chatMessageBox");
    let chatInput = document.getElementById("chatInput");

    // Create the copyable lobby link.
    document.getElementById("lobbyLink").addEventListener("click", function(event) {
        let textArea = document.createElement("textarea");

        textArea.value = `${window.location.href.split('?')[0]}?lobby=${urlParams.get("lobby")}`;

        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        document.execCommand("copy");

        document.body.removeChild(textArea);
    });

    //send chat messages when pressing enter on the chatInput.
    chatInput.addEventListener("keydown", function(e) {
        if (e.key == 'Enter') {
            let msg = Messages.O_CHAT_MESSAGE;
            msg.username = urlParams.get('username');
            msg.message = chatInput.value;
            chatInput.value = "";
            socket.send(JSON.stringify(msg));
        }
    });

    //function to remove a player from the player list.
    let removeFromPlayerList = function(username) {
        for (let el of playerListEl.children) {
            if (el.innerHTML == username) {
                el.remove();
            }
        }
    }

    //handle incomming messages.
    socket.onmessage = function(event) {
        console.log(`Received: ${event.data}`);

        let jsonData = JSON.parse(event.data);

        if (jsonData.type == Messages.T_CONNECTION_STARTED) {
            console.log(`Connection started!`);

            let msg = Messages.O_JOIN_LOBBY;

            if (!urlParams.has('username')) {
                urlParams.set('username', prompt("Enter a username", "username"));
                window.location.href = `/lobby?${urlParams.toString()}`;
            }

            msg.username = urlParams.get('username');
            msg.code = urlParams.get('lobby');
            socket.send(JSON.stringify(msg));
        } else if (jsonData.type == Messages.T_PLAYER_JOINED) {
            console.log(`Player Joined: ${jsonData.username}`);

            let playerEl = document.createElement("li");
            playerEl.innerHTML = jsonData.username;
            
            playerListEl.appendChild(playerEl);
        } else if (jsonData.type == Messages.T_PLAYER_LEAVED) {
            console.log(`Player Leaved: ${jsonData.username}`);

            removeFromPlayerList(jsonData.username);
        } else if (jsonData.type == Messages.T_CHAT_MESSAGE) {
            console.log(`${jsonData.username}: ${jsonData.message}`);

            let newChatMsg = document.createElement("li");
            newChatMsg.innerHTML = `<b>${jsonData.username}:</b> ${jsonData.message}`

            chatMessageBox.appendChild(newChatMsg);
            newChatMsg.scrollIntoView();
        }
    }
})();