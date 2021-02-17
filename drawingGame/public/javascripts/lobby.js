function Player(username, lobbyID) {
    this.username = username;
    this.lobbyID = lobbyID;

    this.class = `p${lobbyID % 8 + 1}`;
}

(function() {
    const urlParams = new URLSearchParams(window.location.search);
    let socket = new WebSocket(`ws:${location.host}`);

    let lobbyID = 0;
    let username = "";
    let code = "";

    let players = {};

    let playerListEl = document.getElementById("playerList");
    let chatMessageBox = document.getElementById("chatMessageBox");
    let chatInput = document.getElementById("chatInput");

    //Ask for username if it wasn't provided.
    if (!urlParams.has('username')) {
        urlParams.set('username', prompt("Enter a username", "username"));
        //window.location.href = `/lobby?${urlParams.toString()}`;
    }

    username = urlParams.get('username');
    code = urlParams.get('lobby');

    // Create the copyable lobby link.
    document.getElementById("lobbyLink").addEventListener("click", function(event) {
        let textArea = document.createElement("textarea");

        textArea.value = `${window.location.href.split('?')[0]}?lobby=${code}`;

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
            msg.lobbyID = lobbyID;
            msg.message = chatInput.value;
            chatInput.value = "";
            socket.send(JSON.stringify(msg));
        }
    });

    //function to remove a player from the player list.
    let removeFromPlayerList = function(lobbyID) {
        for (let el of playerListEl.children) {
            if (el.innerHTML == players[lobbyID].username) {
                el.remove();
            }
        }
    }

    //function to remove a player from the player list.
    let addPlayerToPlayerList = function(lobbyID) {
        let playerEl = document.createElement("li");
        playerEl.innerHTML = players[lobbyID].username;
        playerEl.classList.add(players[lobbyID].class);
        playerEl.classList.add("username");
        
        playerListEl.appendChild(playerEl);
    }

    let createChatMessage = function(lobbyID, message, isServerMsg = false) {
        console.log(`${players[lobbyID].username}: ${message}`);

        let usernameEl = document.createElement("span");
        usernameEl.innerHTML = players[lobbyID].username;
        usernameEl.classList.add("username");

        if (!isServerMsg) {
            usernameEl.classList.add(players[lobbyID].class);
        }

        let newChatMsg = document.createElement("li");
        newChatMsg.appendChild(usernameEl);
        newChatMsg.innerHTML += `: ${message}`;

        if (isServerMsg) {
            newChatMsg.classList.add(players[lobbyID].class);
        }

        chatMessageBox.appendChild(newChatMsg);
        newChatMsg.scrollIntoView();
    }

    socket.onopen = function() {
        //Send message to request to join lobby with code.
        let msg = Messages.O_JOIN_LOBBY;
        msg.username = username;
        msg.code = code;
        socket.send(JSON.stringify(msg));
    }

    //handle incomming messages.
    socket.onmessage = function(event) {
        console.log(`Received: ${event.data}`);

        let jsonData = JSON.parse(event.data);

        if (jsonData.type == Messages.T_CONNECTION_STARTED) {
            console.log(`Connection started!`);
        } else if (jsonData.type == Messages.T_JOIN_SUCCESSFUL) {
            if (jsonData.status == "failed") {
                console.log("Failed to join lobby!");
            } else if (jsonData.status == "successful") {
                lobbyID = jsonData.lobbyID;
                players[lobbyID] = new Player(username, jsonData.lobbyID);

                addPlayerToPlayerList(jsonData.lobbyID);
                createChatMessage(jsonData.lobbyID, "joined!", true);
            }
        } else if (jsonData.type == Messages.T_PLAYER_JOINED) {
            console.log(`Player Joined (lobbyID=${jsonData.lobbyID}): ${jsonData.username}`);

            players[jsonData.lobbyID] = new Player(jsonData.username, jsonData.lobbyID);

            addPlayerToPlayerList(jsonData.lobbyID);
            createChatMessage(jsonData.lobbyID, "joined!", true);
        } else if (jsonData.type == Messages.T_PLAYER_LEFT) {
            console.log(`Player Left: ${players[jsonData.lobbyID].username}`);

            removeFromPlayerList(jsonData.lobbyID);
            +
            createChatMessage(jsonData.lobbyID, "left!", true);

            delete players[jsonData.lobbyID];
        } else if (jsonData.type == Messages.T_CHAT_MESSAGE) {
            createChatMessage(jsonData.lobbyID, jsonData.message);
        }else{
            //if lobby doesn't know how to interpret message, send to gameManager
        }
    }
})();