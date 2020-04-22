let msToTime = (ms) => {


    let milliseconds = parseInt((ms % 1000) / 100),
        seconds = Math.floor((ms / 1000) % 60),
        minutes = Math.floor((ms / (1000 * 60)) % 60),
        hours = Math.floor((ms / (1000 * 60 * 60)) % 24);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    return hours + ":" + minutes + ":" + seconds;

}

let msToMinutes = (ms) => {
    let milliseconds = parseInt((ms % 1000) / 100),
        seconds = Math.floor((ms / 1000) % 60),
        minutes = Math.floor((ms / (1000 * 60)) % 60)

    minutes = (minutes < 10) ? minutes : minutes;
    seconds = (seconds < 10) ? seconds : seconds;

    return minutes

}
export {
    msToTime,
    msToMinutes
}