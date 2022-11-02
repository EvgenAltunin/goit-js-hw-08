import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);
const VIDEO_CURRENT_TIME_KEY = "videoplayer-current-time";


const onPlay = function(event) {
    const currentTime = event.seconds;
    console.log(currentTime);
    localStorage.setItem(VIDEO_CURRENT_TIME_KEY, currentTime);
};

player.on('timeupdate', throttle(onPlay, 1000));

const savedCurrentTime = localStorage.getItem(VIDEO_CURRENT_TIME_KEY);

if (savedCurrentTime) {
    player.setCurrentTime(savedCurrentTime);
}
