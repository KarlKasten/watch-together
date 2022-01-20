var state;
var time;

var player;

var socket = new WebSocket("ws://127.0.0.1:7890/Service", "protocolOne");

console.log("Socket initialized.")

socket.onopen = function(event) {
}

socket.onmessage = function(event) {
    state = parseInt(String(event.data).substring(0, 1));
    time = parseFloat(String(event.data).substring(1, event.data.length));

    console.log("-----------------------");    
    console.log("Received Message: " + event.data);
    console.log("State: " + state + " Time: " + time);

    console.log("if " + player.getPlayerState() + " == " + state);
    if(player.getPlayerState() != state) {
        switch(state) {
            case 0:
                player.pauseVideo();
                break;
            case 1:
                player.seekTo(time, true);
                player.playVideo();
                break;
            case 2:
                player.pauseVideo();
                break;
            case 3:
                player.pauseVideo();
                break;
            case 5:
                player.pauseVideo();
                break;
            default:
                player.pauseVideo();
                break;
        }
    }

}

socket.onclose = function(event) {
    console.log("Connection closed.");
}

socket.onerror = function(event) {
    console.log("Error");
}

function onYouTubeIframeAPIReady() {
    player = new YT.Player('video-placeholder', {
        width: 600,
        height: 400,
        videoId: 'Xa0Q0J5tOP0',
        playerVars: {
            color: 'white',
            playlist: 'taJ60kskkns,FG0fTKAqZ5g'
        },
        events: {
            //onReady: initialize,
            onStateChange: onPlayerStateChange
        }
    });
    console.log("onYouTubeIframeAPIReady");
}

function onPlayerStateChange() {

    console.log("-----------------------");
    if(player.getPlayerState() < 0){
        console.log("problematic state");
        console.log("Sending Message: " + String(2) + String(player.playerInfo.currentTime));
        socket.send(String(6) + String(player.playerInfo.currentTime));
    }
    else if(player.getPlayerState() != 3){
        console.log("Sending Message: " + String(player.getPlayerState()) + String(player.playerInfo.currentTime));
        socket.send(String(player.getPlayerState()) + String(player.playerInfo.currentTime));
    } 
    else {

    } 
}

/*
function initialize(){

    // Update the controls on load
    updateTimerDisplay();
    updateProgressBar();

    // Clear any old interval.
    clearInterval(time_update_interval);

    // Start interval to update elapsed time display and
    // the elapsed part of the progress bar every second.
    time_update_interval = setInterval(function () {
        updateTimerDisplay();
        updateProgressBar();
    }, 1000)

}

// This function is called by initialize()
function updateTimerDisplay(){
    // Update current time text display.
    $('#current-time').text(formatTime( player.getCurrentTime() ));
    $('#duration').text(formatTime( player.getDuration() ));
}

function formatTime(time){
    time = Math.round(time);

    var minutes = Math.floor(time / 60),
    seconds = time - minutes * 60;

    seconds = seconds < 10 ? '0' + seconds : seconds;

    return minutes + ":" + seconds;
}
*/