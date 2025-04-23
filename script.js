console.log("Welcome to your own Music Player");

let isShuffling = false;
let isLooping = false;
let songIndex = 0;
let audioElement = new Audio();
let masterPlay = document.getElementById("masterplay");
let myProgressBar = document.getElementById("myProgressBar");
let gif = document.getElementById("gif");
let masterSongName = document.getElementById("masterSongName");
let container = document.getElementById("songItemContainer");

// Cover extensions
const coverExtensions = {
  1: "png",
  2: "jpg",
  3: "avif",
  4: "jpg"
};

// Format song title
function formatTitle(fileName) {
  const match = fileName.match(/^[\d]+-(.+)\.(m4a|webm)$/i);
  if (!match) return fileName;
  const rawName = match[1];
  return rawName.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase());
}

// List of filenames
const songFileNames = [
  "1-Alibi.m4a", "2-Blood Water.webm", "3-I wanna be yours.webm", "4-Sparkle.m4a",
  "5-Courtesy Call.webm", "6-Cherri Cherri Lady.m4a", "7-I wanna be your Slave.m4a", "8-Jalebi Baby.m4a",
  "9-Sanson ki Mala.webm", "10-Millionaire.m4a", "11-Sau Tarah ke.webm", "12-Move.m4a",
  "13-Paro.m4a", "14-Toh Dishoom.webm", "15-Ek Aisa Woh Jaha tha.webm", "16-Popular.m4a",
  "17-Choose Your Fighter.webm", "18-SweetHeart.m4a", "19-People.webm", "20-Night.m4a",
  "21-Blue Bird.webm", "22-We'll Be Alright.webm", "23-Grand Escape.webm", "24-Shinunoga E-wa.webm",
  "25-Suzume.webm", "26-Die with a Smile.webm", "27-HoneyPie.webm", "28-Rise UP.webm",
  "29-Dard Aur Dava.webm", "30-Perfect.webm", "31-Favorite.webm", "32-Line without a Hook.webm",
  "33-Zindagi bata de.webm", "34-Jhol.webm", "35-Khata.webm", "36-Soulmate.webm",
  "37-Zinda.webm", "38-Aakhri Saans.webm", "39-Paaro.webm", "40-Paro by Aditya Rikhari.webm",
  "41-Krishna ki Chetavani.webm", "42-Izhaar.webm", "43-Izhaar Valentine Special.webm", "44-She Dont Give A.webm",
  "45-Suniyan Suniyan.webm", "46-Sahiba.webm", "47-Katsuri.webm", "48-Pal.webm",
  "49-Cheap Thrills X  Saathiyaa.webm", "50- Saathiyaa.webm", "51-Let me down Slowly.webm", "52-Let Me Love You x Tum Hi Ho.webm",
  "53-Tum Hi ho.webm", "54-Kya Mujhe Pyaar hai.webm", "55-Mann Mera.webm", "56-Tu Junooniyat.webm",
  "57-Maan Meri Jaan.webm"
];

let songs = [];

songFileNames.forEach((fileName, i) => {
  const songTitle = formatTitle(fileName);
  const filePath = `songs/${fileName}`;
  const coverNum = (i + 1) % 4 === 0 ? 4 : (i + 1) % 4;
  const coverExt = coverExtensions[coverNum] || "jpg";
  const coverPath = `covers/${coverNum}.${coverExt}`;

  songs.push({ songName: songTitle, filePath, coverPath });

  const songItem = document.createElement("div");
  songItem.className = "songItem";
  songItem.setAttribute("data-index", i); // for easy tracking
  songItem.innerHTML = `
    <img src="${coverPath}" alt="Cover ${i + 1}">
    <span class="songname">${songTitle}</span>
    <span class="songlistplay">
      <span class="timestamp">02:30 
        <i class="far songItemPlay fa-play-circle"></i>
      </span>
    </span>
    <a class="downloadBtn" href="${filePath}" download>
      <i class="fa fa-download"></i>
    </a>
  `;
  console.log(`Rendering song #${i + 1}:`, songTitle);

  container.appendChild(songItem);
});

// Reset play icons
function makeAllPlays() {
  document.querySelectorAll(".songItemPlay").forEach(el => {
    el.classList.remove("fa-pause-circle");
    el.classList.add("fa-play-circle");
  });
}

// Event: Click on any songItem (full div)
container.addEventListener("click", (e) => {
  const item = e.target.closest(".songItem");
  if (!item) return;
  const index = parseInt(item.getAttribute("data-index"));
  if (!isNaN(index)) {
    songIndex = index;
    playCurrentSong();
  }
});

// Master Play button
masterPlay.addEventListener("click", () => {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    playCurrentSong();
  } else {
    audioElement.pause();
    masterPlay.classList.remove("fa-pause-circle");
    masterPlay.classList.add("fa-play-circle");
    gif.style.opacity = 0;
    makeAllPlays();
  }
});

// Play current song
function playCurrentSong() {
  audioElement.src = songs[songIndex].filePath;
  masterSongName.innerText = songs[songIndex].songName;
  audioElement.currentTime = 0;
  audioElement.play();
  gif.style.opacity = 1;
  masterPlay.classList.remove("fa-play-circle");
  masterPlay.classList.add("fa-pause-circle");
  makeAllPlays();
  const currentPlayBtn = document.querySelectorAll(".songItemPlay")[songIndex];
  if (currentPlayBtn) {
    currentPlayBtn.classList.remove("fa-play-circle");
    currentPlayBtn.classList.add("fa-pause-circle");
  }
}

// Load current song without autoplay
function loadCurrentSong() {
  audioElement.src = songs[songIndex].filePath;
  masterSongName.innerText = songs[songIndex].songName;
  audioElement.currentTime = 0;
  gif.style.opacity = 0;
  masterPlay.classList.add("fa-play-circle");
  masterPlay.classList.remove("fa-pause-circle");
  makeAllPlays();
}

// Progress bar
audioElement.addEventListener("timeupdate", () => {
  let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
  myProgressBar.value = progress;
});
myProgressBar.addEventListener("change", () => {
  audioElement.currentTime = (myProgressBar.value * audioElement.duration) / 100;
});

// Next & Previous
document.getElementById("next").addEventListener("click", () => {
  songIndex = isShuffling ? Math.floor(Math.random() * songs.length) : (songIndex + 1) % songs.length;
  playCurrentSong();
});
document.getElementById("previous").addEventListener("click", () => {
  songIndex = songIndex <= 0 ? songs.length - 1 : songIndex - 1;
  playCurrentSong();
});

// Shuffle & Loop
document.getElementById("shuffle").addEventListener("click", () => {
  isShuffling = !isShuffling;
  document.getElementById("shuffle").classList.toggle("active");
});
document.getElementById("loop").addEventListener("click", () => {
  isLooping = !isLooping;
  audioElement.loop = isLooping;
  document.getElementById("loop").classList.toggle("active");
});

// Auto-play next
audioElement.addEventListener("ended", () => {
  if (isLooping) {
    audioElement.currentTime = 0;
    audioElement.play();
  } else {
    songIndex = isShuffling ? Math.floor(Math.random() * songs.length) : (songIndex + 1) % songs.length;
    playCurrentSong();
  }
});

// Load only on DOM ready
window.addEventListener("DOMContentLoaded", () => {
  loadCurrentSong();
});
