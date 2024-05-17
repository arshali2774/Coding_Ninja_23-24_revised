// Load playlists from local storage
let playlistsLocal = JSON.parse(localStorage.getItem('playlists')) || [];
/* ------------------------------ theme toggle ------------------------------ */
const toggle = document.getElementById('toggle_checkbox');
const toggleBtn = document.getElementById('toggle_button');
const toggleText = document.getElementById('toggle_text');
const toggleContainer = document.getElementById('toggle_container');
toggle.addEventListener('change', function () {
  if (this.checked) {
    toggleBtn.style.transform = 'translateX(2rem)';
    toggleText.textContent = 'Light';
    document.body.setAttribute('data-theme', 'dark');
  } else {
    toggleBtn.style.transform = 'translateX(0rem)';
    toggleText.textContent = 'Dark';
    document.body.removeAttribute('data-theme');
  }
});

/* ------------------------------- songs array ------------------------------ */
const songs = [
  {
    id: 0,
    name: 'Stay',
    artist: 'Justin Bieber',
    img: './images/Stay.jpg',
    genre: 'Pop',
    source: './songs/Stay.mp3',
  },
  {
    id: 1,
    name: 'Shape Of You',
    artist: 'Ed Sheeran',
    img: './images/ShapeOfYou.webp',
    genre: 'Pop',
    source: './songs/ShapeOfYou.mp3',
  },
  {
    id: 2,
    name: 'Nasamjh',
    artist: 'Aditya Rikhari',
    img: './images/Nasamjh.webp',
    genre: 'Indie',
    source: './songs/Nasamjh.mp3',
  },
  {
    id: 3,
    name: 'My Eyes',
    artist: 'Travis Scott',
    img: './images/MyEyes.jpg',
    genre: 'Rap',
    source: './songs/MyEyes.mp3',
  },
];

/* ------------------------------- show songs ------------------------------- */
const songList = document.getElementById('songs_list');
const genreFilter = document.getElementById('genre_filter');
const showSongs = (genre) => {
  songList.innerHTML = '';
  const filteredSongs = genre
    ? songs.filter((song) => song.genre.toLowerCase() === genre)
    : songs;
  filteredSongs.forEach((song) => {
    const songBtn = document.createElement('button');
    songBtn.classList.add('song_name');
    songBtn.setAttribute('id', song.id);
    songBtn.textContent = `${song.name} - ${song.artist}`;
    songList.appendChild(songBtn);
    // Add event listener to each song button
    songBtn.addEventListener('click', playSong);
  });
};

genreFilter.addEventListener('change', function () {
  const genre = this.value;
  if (genre === 'all') {
    showSongs();
  } else {
    showSongs(genre);
  }
});

const albumCover = document.getElementById('cover');
const songName = document.getElementById('song_name');
const artistName = document.getElementById('artist_name');
const player = document.getElementById('player_control');
const source = document.getElementById('player_source');
let currentSongIndex = 0; // Keep track of the currently playing song index

// Define the function to play the song
function playSong(e) {
  let id = parseInt(e.target.id);
  const songToPlay = songs.find((song) => song.id === id);
  currentSongIndex = songToPlay.id;

  source.src = songToPlay.source;
  player.load();
  player.play();
  updateSongInfo(songToPlay);
}
function updateSongInfo(song) {
  albumCover.src = song.img;
  songName.textContent = song.name;
  artistName.textContent = song.artist;
}

// Function to play the next song
function playNextSong() {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  const nextSong = songs[currentSongIndex];
  source.src = nextSong.source;
  player.load();
  player.play();
  updateSongInfo(nextSong);
}

// Function to play the previous song
function playPreviousSong() {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  const previousSong = songs[currentSongIndex];
  source.src = previousSong.source;
  player.load();
  player.play();
  updateSongInfo(previousSong);
}
// Add event listener for next button
const nextBtn = document.getElementById('next_song');
nextBtn.addEventListener('click', playNextSong);

// Add event listener for previous button
const prevBtn = document.getElementById('prev_song');
prevBtn.addEventListener('click', playPreviousSong);

// Function to create a new playlist
function createPlaylist() {
  const playlistNameInput = document.getElementById('playlist_name');
  const playlistName = playlistNameInput.value.trim();
  if (playlistName !== '') {
    const playlistList = document.getElementById('all_playlist');
    const playlist = document.createElement('button');
    playlist.classList.add('song_name');
    playlist.textContent = playlistName;
    playlist.dataset.playlistName = playlistName;
    playlistList.appendChild(playlist);
    // Add event listener to the newly created playlist
    playlist.addEventListener('click', displayPlaylist);
    // Save playlist to local storage
    playlistsLocal[playlistName] = [];
    localStorage.setItem('playlists', JSON.stringify(playlistsLocal));
    // Clear input field
    playlistNameInput.value = '';
  }
  // Add event listener for playlist buttons
  const playlistButtons = document.querySelectorAll('#all_playlist button');
  playlistButtons.forEach((playlistButton) => {
    playlistButton.addEventListener('click', handlePlaylistClick);
  });
}
// Function to display songs of a playlist
function displayPlaylist(e) {
  const playlistName = e.target.dataset.playlistName;
  // const currentPlaylistSongsLocal = playlistsLocal[playlistName];
  const currentPlaylistDiv = document.getElementById('current_playlist');
  currentPlaylistDiv.innerHTML = '';
  // currentPlaylistSongsLocal.forEach((songId) => {
  //   const song = songs.find((song) => song.id === songId);
  //   const songDiv = document.createElement('button');
  //   songDiv.classList.add('song_name');
  //   songDiv.textContent = `${song.name} - ${song.artist}`;
  //   currentPlaylistDiv.appendChild(songDiv);
  // });
  const currentPlaylistSongs = songs.filter(
    (song) => song.playlist && song.playlist.includes(playlistName)
  );

  currentPlaylistSongs.forEach((song) => {
    const songDiv = document.createElement('button');
    songDiv.classList.add('song_name');
    songDiv.textContent = `${song.name} - ${song.artist}`;
    currentPlaylistDiv.appendChild(songDiv);
  });
}
function getCurrentSongId() {
  console.log(currentSongIndex);
}
// Variable to hold the name of the active playlist
let activePlaylist = 'New Playlist';
// Function to add a song to a playlist
function addToPlaylist() {
  // Add event listener for playlist buttons
  const playlistButtons = document.querySelectorAll('#all_playlist button');
  playlistButtons.forEach((playlistButton) => {
    playlistButton.addEventListener('click', handlePlaylistClick);
  });
  const playlistName = activePlaylist; // Default playlist name
  const currentSongId = currentSongIndex;
  const currentSong = songs.find((song) => song.id === currentSongId);
  if (!currentSong.playlist) {
    currentSong.playlist = [];
  }
  // Check if there are no playlists
  const playlistList = document.getElementById('all_playlist');
  if (!playlistList.children.length) {
    // Create a new playlist button
    const playlist = document.createElement('button');
    playlist.classList.add('song_name', 'playlist_item');
    playlist.textContent = playlistName;
    playlist.dataset.playlistName = playlistName;

    // Add event listener to the newly created playlist
    playlist.addEventListener('click', displayPlaylist);

    // Append the playlist button to the playlist list
    playlistList.appendChild(playlist);
  }
  // Add playlist property to the song object
  currentSong.playlist.push(playlistName);
  // Display the song in the "Current Playlist" section
  const currentPlaylistDiv = document.getElementById('current_playlist');
  const songDiv = document.createElement('button');
  songDiv.classList.add('song_name');
  songDiv.textContent = `${currentSong.name} - ${currentSong.artist}`;
  currentPlaylistDiv.appendChild(songDiv);
}

// Add event listener for creating a new playlist
const createPlaylistBtn = document.getElementById('create_playlist_btn');
createPlaylistBtn.addEventListener('click', createPlaylist);

// Add event listener for "Add To Playlist" button
const addToPlaylistBtn = document.getElementById('add_to_playlist');
addToPlaylistBtn.addEventListener('click', addToPlaylist);
// Function to handle clicks on playlist buttons
function handlePlaylistClick(e) {
  activePlaylist = e.target.dataset.playlistName;
  console.log(`Active Playlist: ${activePlaylist}`);
}

// Initially show all songs
showSongs();
