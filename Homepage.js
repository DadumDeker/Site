// Song array with titles and sources
const songs = [
    {title: 'Olsen Olsen - Sigur Ros', src: 'https://t4.bcbits.com/stream/f9c8cdcca0d4b6ccc9b892b0cc7b3f0b/mp3-128/1476455887?p=0&ts=1723899607&t=accc30242ac5d517baa1f38cdbce4d52debb7f33&token=1723899607_577b55ab4942f1b6e8587f01a4c9566ee26f2db4'},
    {title: 'Jalouse - Ecco2k', src: 'https://archive.org/download/pxe_20220407/2021%20-%20Ecco2K%20-%20PXE/03.%20Jalouse.mp3'},
    {title: 'Father Stretch My Hands Pt 1 & 2 - Kanye West', src: 'https://archive.org/download/father-stretch-my-hands-pt-1-2/Father%20Stretch%20My%20Hands%20Pt%201%20%26%202.mp3'},
    {title: 'Thug Power - Young Thug', src: 'https://archive.org/download/YoungThug_201802/Young%20-%20Thug%20memo.mp3'}
];

const player = document.getElementById('music-player');
const currentTimeDisplay = document.getElementById('current-time');
const durationDisplay = document.getElementById('duration');
const skipButton = document.getElementById('skip-track');
const pausePlayButton = document.getElementById('pause-play');

let isPlaying = true;

// Function to format time as mm:ss
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

// Function to update time displays
function updateTime() {
    currentTimeDisplay.textContent = formatTime(player.currentTime);
    durationDisplay.textContent = formatTime(player.duration);
}

// Function to select and play a random song
function playRandomSong() {
    const randomSong = songs[Math.floor(Math.random() * songs.length)];
    document.getElementById('track-title').innerText = randomSong.title;
    document.getElementById('audio-source').src = randomSong.src;
    player.load();
    player.play();
    isPlaying = true;
    pausePlayButton.textContent = 'Pause ⏸️';
}

// Toggle play/pause function
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

// Set random song on page load
window.onload = playRandomSong;

// Add event listeners to buttons
skipButton.addEventListener('click', playRandomSong);
pausePlayButton.addEventListener('click', togglePlayPause);

// Update the time displays as the song plays
player.addEventListener('timeupdate', updateTime);

// Update the duration display when metadata is loaded
player.addEventListener('loadedmetadata', () => {
    durationDisplay.textContent = formatTime(player.duration);
});
