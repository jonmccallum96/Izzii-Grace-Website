



//selector declarations

const slider = $("#music-slider");

const musicPlayer = $(".music-player");

const toggle = $('.music-player__toggle');

const img = $('.album-image')


//Player up / down toggler

var playerUp = false;


toggle.click(function(){

playerToggle();

});

img.click(function(){

playerToggle();

});

function playerToggle() {
    if (!playerUp) {
        musicPlayer.css("bottom", "0vh");
        playerUp = true;
        $('.toggle-text').text('Close Player X');
    } else if (playerUp) {
        musicPlayer.css("bottom", "-10vh"); 
        playerUp = false;
        $('.toggle-text').html('Listen Now&darr;');
        pause();
    }
}

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

playBtn.click(function(){
    currentSong.sound.play();
    playBtn.hide();
    pauseBtn.show();
    paused = false;
});

function pause(){
    currentSong.sound.pause();
    playBtn.show();
    pauseBtn.hide();
    paused = true;
}

pauseBtn.click(function(){
    pause();
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


//playback handling

function stopSong(){
    currentSong.sound.pause();
    currentSong.sound.currentTime = 0;
}

function stepForward(){
    if (songSelector < 2 ){
        songSelector ++;
    } else { 
        songSelector = 0;
    };
    stopSong();
    songLoad();
    slider.attr('value', currentSong.sound.currentTime);
}

slider.change(function() {
    currentSong.sound.currentTime = slider.val();
    slider.val(currentSong.sound.currentTime);

});

//song loader
function songLoad(){
    currentSong = songs[songSelector];
    $('#albmcover').attr("src", currentSong.img);
    $('#song-title').text(currentSong.title);

    if (!paused) {
        currentSong.sound.play()
    };

    slider.attr('value', currentSong.sound.currentTime);
    slider.attr('max', currentSong.sound.duration);
};

//Tick handling
setInterval(function() {
    var mins = Math.floor(currentSong.sound.currentTime / 60);
    var secs = Math.floor(currentSong.sound.currentTime % 60);
    if (secs < 10) {
      secs = '0' + String(secs);
    }

    $('#timestamp').text(mins + ':' + secs);

    slider.attr('max', currentSong.sound.duration);
    slider.val(currentSong.sound.currentTime);

    if (currentSong.sound.ended === true){
        stepForward();
    }
}, 1000);

//initializer
function init(){
    $('#pause').hide();
    songLoad();
    $("#music-slider").value = "10";
}

init();