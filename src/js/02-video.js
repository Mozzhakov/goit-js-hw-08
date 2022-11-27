import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');

const player = new Player(iframe);

const STORAGE_KEY = 'videoplayer-current-time';

const setTimeCode = ({ seconds, duration }) => {
  if (seconds === duration) {
    return localStorage.removeItem(STORAGE_KEY);
  }
  localStorage.setItem(STORAGE_KEY, seconds);
};

player.setCurrentTime(localStorage.getItem(STORAGE_KEY) || 0);

player.on('timeupdate', throttle(setTimeCode, 1000));
