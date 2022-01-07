var player;

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

function onPlayerStateChange() {
    console.log("stateChange");
    let state = player.getPlayerState();
    updateState(state);
}

function updateState(state) {
    fetch("http://localhost:3000/playerState/1", {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: 1,
            state: state,
            time: player.playerInfo.currentTime
        })
    })
}

setInterval(async () => {
    console.log("Checked state at ");
    let url = "http://localhost:3000/playerState/1";
    const res = await fetch(url);
    const getPlayerState = await res.json();
    let state = getPlayerState.state;
    let time = getPlayerState.time;
    if(state != 1) player.pauseVideo();
    else player.playVideo();
}, 400);

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