


//constructor for new songs
function Song(title, album, year, artist, aSrc, img){
    this.title = title,
    this.album = album,
    this.year = year,
    this.artist = artist,
    this.sound = aSrc,
    this.img = img
};

//creation of audio files
const ciylmAudio = new Audio('/audio/ciyl.wav');
const humanAudio = new Audio('/audio/human.wav');
const spaceAudio = new Audio('/audio/space.wav');

//construct song objects
const ciyl = new Song('Coz if You Love Me', 'Single', '2020', 'Izzii Grace', ciylmAudio, '../img/album-ciylm.jpg');
const human = new Song('Human Master', 'Single', '2020', 'Izzii Grace', humanAudio, '../img/album-human.jpg');
const space = new Song('Space', 'Single', '2020', 'Izzii Grace', spaceAudio, '../img/album-space.jpg');

//song objects into an array
const songs = [ciyl, human, space];

//Manages song selection
var songSelector = 0;
var currentSong = songs[songSelector];
var paused = true;



//control handling

const playBtn = $('#play');
const pauseBtn = $('#pause');
const fwdBtn = $('#forward');
const backBtn = $('#back');


function init(){
    $('#pause').hide();
    songLoad();
}

playBtn.click(function(){
    currentSong.sound.play();
    playBtn.hide();
    pauseBtn.show();
    paused = false;
});

pauseBtn.click(function(){
    currentSong.sound.pause();
    playBtn.show();
    pauseBtn.hide();
    paused = true;
});

fwdBtn.click(function(){
    stepForward();
});

backBtn.click(function(){
    if (songSelector > 0 ){
        songSelector --;
    } else { 
        songSelector = 2;
    };
    stopSong();
    songLoad();
});

function stopSong(){
    currentSong.sound.pause();
    currentSong.sound.currentTime = 0;
}

//song loader
function songLoad(){
    currentSong = songs[songSelector];
    $('#albmcover').attr("src", currentSong.img);
    $('#song-title').text(currentSong.title);

    if (!paused) {
        currentSong.sound.play()
    };
};


function stepForward(){
    if (songSelector < 2 ){
        songSelector ++;
    } else { 
        songSelector = 0;
    };
    stopSong();
    songLoad();
}

init();