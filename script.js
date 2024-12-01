const songs = [
    { title: "Hanuman Chalisa", author: "Hariharan", src: "1.mp3", cover: "1.jpg" },
    { title: "Ve Kamleya", author: "Arijit Singh and Shreya Ghoshal", src: "2.mp3", cover: "2.jpeg" },
    { title: "Desh Mere", author: "Arijit Singh and Arko", src: "3.mp3", cover: "3.jpeg" },
  ];
  
  let songIndex = 0;
  const audio = document.getElementById("audio");
  const songTitle = document.getElementById("song-title");
  const songAuthor = document.getElementById("song-author");
  const coverArt = document.getElementById("cover-art");
  const playButton = document.getElementById("play");
  const prevButton = document.getElementById("prev");
  const nextButton = document.getElementById("next");
  const progressBar = document.getElementById("progress-bar");
  const currentTimeEl = document.getElementById("current-time");
  const durationEl = document.getElementById("duration");
  
  // Load the song initially
  function loadSong(index) {
    const song = songs[index];
    songTitle.textContent = song.title;
    songAuthor.textContent = song.author;
    coverArt.src = song.cover;
    audio.src = song.src;
  }
  
  // Play or pause the song
  function togglePlay() {
    audio.paused ? audio.play() : audio.pause();
    playButton.textContent = audio.paused ? "▶️" : "⏸️";
  }
  
  // Go to the previous song
  function prevSong() {
    songIndex = (songIndex > 0) ? songIndex - 1 : songs.length - 1;
    loadSong(songIndex);
    audio.play();
    playButton.textContent = "⏸️";
  }
  
  // Go to the next song
  function nextSong() {
    songIndex = (songIndex < songs.length - 1) ? songIndex + 1 : 0;
    loadSong(songIndex);
    audio.play();
    playButton.textContent = "⏸️";
  }
  
  // Update the progress bar
  function updateProgress() {
    const progressPercent = (audio.currentTime / audio.duration) * 100;
    progressBar.style.width = `${progressPercent}%`;
  
    const currentMinutes = Math.floor(audio.currentTime / 60);
    const currentSeconds = Math.floor(audio.currentTime % 60);
    const durationMinutes = Math.floor(audio.duration / 60);
    const durationSeconds = Math.floor(audio.duration % 60);
  
    currentTimeEl.textContent = `${currentMinutes}:${currentSeconds < 10 ? '0' : ''}${currentSeconds}`;
    durationEl.textContent = `${durationMinutes}:${durationSeconds < 10 ? '0' : ''}${durationSeconds}`;
  }
  
  // Set song progress on user click
  function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    audio.currentTime = (clickX / width) * audio.duration;
  }
  
  // Event listeners
  playButton.addEventListener("click", togglePlay);
  prevButton.addEventListener("click", prevSong);
  nextButton.addEventListener("click", nextSong);
  audio.addEventListener("timeupdate", updateProgress);
  progressBar.parentElement.addEventListener("click", setProgress);
  audio.addEventListener("ended", nextSong);
  
  // Initial song load
  loadSong(songIndex);
  