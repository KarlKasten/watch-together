var player;

function onPlayerStateChange() {
    console.log("stateChange");
    let state = player.getPlayerState();
    let time = player.playerInfo.currentTime;
    console.log(player.playerInfo.currentTime);
    updateState(state, time);
}

function updateState(state, time) {
    fetch("http://localhost:3000/playerState/1", {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: 1,
            state: state,
            time: time
        })
    })
}

setInterval(async () => {
    let url = "http://localhost:3000/playerState/1";
    const res = await fetch(url);
    const getPlayerState = await res.json();
    let state = getPlayerState.state;
    let time = getPlayerState.time;
    console.log("Checked state. State: " + state + " Time: " + time);
    console.log(state + " == " + player.getPlayerState() + " = " + (state == player.getPlayerState()).toString());
    if(state == 2) player.pauseVideo();
    if(state == 1) player.playVideo();
    /*
    if(state != player.getPlayerState) {
        if (state == 1) {
            player.seekTo(time);
            player.playVideo();
        }
        else if(state == 2) {
            player.seekTo(time);
            player.pauseVideo();
        }
    }
    */
}, 400);

// the following code is mostly stolen

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
            onReady: initialize,
            onStateChange: onPlayerStateChange
        }
    });
    console.log("onYouTubeIframeAPIReady");
}

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