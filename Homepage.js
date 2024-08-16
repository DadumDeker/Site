const songs = [
    { title: 'Olsen Olsen - Sigur Ros', src: 'https://t4.bcbits.com/stream/f9c8cdcca0d4b6ccc9b892b0cc7b3f0b/mp3-128/1476455887?p=0&ts=1723899607&t=accc30242ac5d517baa1f38cdbce4d52debb7f33&token=1723899607_577b55ab4942f1b6e8587f01a4c9566ee26f2db4' },
    { title: 'Jalouse - Ecco2k', src: 'https://archive.org/download/pxe_20220407/2021%20-%20Ecco2K%20-%20PXE/03.%20Jalouse.mp3' },
    { title: 'Father Stretch My Hands Pt 1 & 2 - Kanye West', src: 'https://archive.org/download/father-stretch-my-hands-pt-1-2/Father%20Stretch%20My%20Hands%20Pt%201%20%26%202.mp3' },
    { title: 'Power - Young Thug', src: 'https://archive.org/download/YoungThug_201802/Young%20-%20Thug%20memo.mp3' },
    { title: 'Texas Holdem - Beyonce', src: 'https://ia903401.us.archive.org/10/items/2020s/218.BEYONCE%20-%20Texas%20Holdem.mp3' },
    { title: 'Be Quiet and Drive - Deftones', src: 'https://archive.org/download/3131BEQUIETAndDRIVE/02%20Digital%20Bath.mp3' },
    { title: 'Dagger - Slowdive', src: 'https://soundcloud.com/vboysstockholm/punk-rock-loser' }, // Note: SoundCloud links may require additional handling
];

const player = document.getElementById('music-player');
const currentTimeDisplay = document.getElementById('current-time');
const durationDisplay = document.getElementById('duration');
const skipButton = document.getElementById('skip-track');
const pausePlayButton = document.getElementById('pause-play');

let isPlaying = false;
let songQueue = [];
let currentSongIndex = -1;

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

function updateTime() {
    if (player.duration) { // Check if duration is available
        currentTimeDisplay.textContent = formatTime(player.currentTime);
        durationDisplay.textContent = formatTime(player.duration);
    }
}

function shuffleSongs() {
    songQueue = [...songs].sort(() => Math.random() - 0.5);
    currentSongIndex = -1;
}

function playNextSong() {
    if (songQueue.length === 0) {
        shuffleSongs();
    }

    currentSongIndex = (currentSongIndex + 1) % songQueue.length;
    const nextSong = songQueue[currentSongIndex];
    document.getElementById('track-title').innerText = nextSong.title;
    document.getElementById('audio-source').src = nextSong.src;
    player.load();
    player.play();
    isPlaying = true;
    pausePlayButton.textContent = 'Pause ⏸️';
}

function togglePlayPause() {
    if (isPlaying) {
        player.pause();
        pausePlayButton.textContent = 'Play ▶️';
    } else {
        player.play();
        pausePlayButton.textContent = 'Pause ⏸️';
    }
    isPlaying = !isPlaying;
}

window.onload = function() {
    shuffleSongs();
    playNextSong();
};

skipButton.addEventListener('click', playNextSong);
pausePlayButton.addEventListener('click', togglePlayPause);
player.addEventListener('timeupdate', updateTime);
player.addEventListener('loadedmetadata', () => {
    durationDisplay.textContent = formatTime(player.duration);
});
player.addEventListener('ended', playNextSong);
