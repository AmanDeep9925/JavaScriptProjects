const musicContainer = document.getElementById('music-container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');

// songa
const songs = [
    {
        title: 'Blinding Lights',
        src: './music/BlindingLights.mp3',
        cover: './images/BlindinglightsCover.png',
    },
    {
        title: 'Circles',
        src: './music/Circles.mp3',
        cover: './images/Circles.png',
    },
    {
        title: 'Death bed',
        src: './music/deathbed.mp3',
        cover: './images/DeathBed.png',
    },
    {
        title: 'Roses',
        src: './music/Roses.mp3',
        cover: './images/Roses.png',
    },
    {
        title: 'So Am I',
        src: './music/SoAmI.mp3',
        cover: './images/So_Am_I.png',
    },
];

// keeping track of the song
let songIndex = 1;

// Initially load song details  into DOM

loadSong(songs[songIndex]);

// Update songs details to DOm

function loadSong(song) {
    title.innerText = song.title;
    audio.src = song.src;
    cover.src = song.cover;
}

function playSong() {
    musicContainer.classList.add('play');
    playBtn.querySelector('i.fas').classList.remove('fa-play');
    playBtn.querySelector('i.fas').classList.add('fa-pause');

    audio.play();
}

function pauseSong() {
    musicContainer.classList.remove('play');
    playBtn.querySelector('i.fas').classList.remove('fa-pause');
    playBtn.querySelector('i.fas').classList.add('fa-play');

    audio.pause();
}

// prevsong

function prevSong() {
    songIndex--;

    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }

    loadSong(songs[songIndex]);

    playSong();
}

// Next song

function nextSong() {
    songIndex++;

    if (songIndex > songs.length - 1) {
        songIndex = 0;
    }

    loadSong(songs[songIndex]);

    playSong();
}

// Adding Eventlistener

playBtn.addEventListener('click', () => {
    const isPlaying = musicContainer.classList.contains('play');
    console.log(isPlaying);

    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
});

// Update progress

function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;

    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
}

// Setprogress

function setProgress(e) {
    const width = this.clientWidth;
    const clickOffset = e.offsetX;
    const duration = audio.duration;

    audio.currentTime = (clickOffset / width) * duration;
}

// Change songs

prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

// Time/song update

audio.addEventListener('timeupdate', updateProgress);

// Click on progress

progressContainer.addEventListener('click', setProgress);

// When song ends

audio.addEventListener('ended', nextSong);
