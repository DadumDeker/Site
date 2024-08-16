// Array of songs with title and source
const songs = [
  { title: 'Olsen_Olsen_-_Sigur_Ros', src: 'https://t4.bcbits.com/stream/f9c8cdcca0d4b6ccc9b892b0cc7b3f0b/mp3-128/1476455887?p=0&ts=1723899607&t=accc30242ac5d517baa1f38cdbce4d52debb7f33&token=1723899607_577b55ab4942f1b6e8587f01a4c9566ee26f2db4' },
  { title: 'Jalouse_-_Ecco2k', src: 'https://archive.org/download/pxe_20220407/2021%20-%20Ecco2K%20-%20PXE/03.%20Jalouse.mp3' },
  { title: 'Father_Stretch_My_Hands_Pt_1_&_2_-_Kanye_West', src: 'https://archive.org/download/father-stretch-my-hands-pt-1-2/Father%20Stretch%20My%20Hands%20Pt%201%20%26%202.mp3' },
  { title: 'Power_-_Young_Thug', src: 'https://archive.org/download/YoungThug_201802/Young%20-%20Thug%20memo.mp3' },
  { title: 'Be_Quiet_and_Drive_-_Deftones', src: 'https://archive.org/download/3131BEQUIETAndDRIVE/02%20Digital%20Bath.mp3' },
  { title: 'Dagger_-_Slowdive', src: 'https://soundcloud.com/vboysstockholm/punk-rock-loser' },
];

// Initialize variables
let isPlaying = false;
let songQueue = [];
let currentSongIndex = -1;

// Get HTML elements
const player = document.getElementById('music-player');
const trackTitleElement = document.getElementById('track-title');
const currentTimeDisplay = document.getElementById('current-time');
const durationDisplay = document.getElementById('duration');
const skipButton = document.getElementById('skip-track');
const pausePlayButton = document.getElementById('pause-play');

// Function to format time as mm:ss
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

// Function to update time displays
function updateTime() {
  if (!isNaN(player.duration)) { // Ensure duration is a number
    currentTimeDisplay.textContent = formatTime(player.currentTime);
    durationDisplay.textContent = formatTime(player.duration);
  }
}

// Function to shuffle the songs
function shuffleSongs() {
  songQueue = [...songs].sort(() => Math.random() - 0.5);
  currentSongIndex = -1;
}

// Function to play the next song
function playNextSong() {
  if (songQueue.length === 0) {
    shuffleSongs();
    if (songQueue.length === 0) {
      console.error('No songs to play.');
      return;
    }
  }

  currentSongIndex = (currentSongIndex + 1) % songQueue.length;
  const nextSong = songQueue[currentSongIndex];
  trackTitleElement.textContent = nextSong.title;
  player.src = nextSong.src;
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

// Set up player and start with a shuffled song list
window.onload = function() {
  if (songs.length === 0) {
    console.error('No songs available.');
    return;
  }
  shuffleSongs();
  playNextSong();
  trackTitleElement.textContent = songQueue[0]?.title || 'No track';
};

// Add event listeners to buttons
skipButton.addEventListener('click', playNextSong);
pausePlayButton.addEventListener('click', togglePlayPause);

// Update the time displays as the song plays
player.addEventListener('timeupdate', updateTime);

// Update the duration display when metadata is loaded
player.addEventListener('loadedmetadata', () => {
  durationDisplay.textContent = formatTime(player.duration);
});

// Move to the next song when the current song ends
player.addEventListener('ended', playNextSong);

// Handle errors gracefully
player.addEventListener('error', () => {
  console.error('An error occurred while trying to play the audio.');
  playNextSong(); // Optionally move to the next song
});
