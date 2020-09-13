const playBtn = $('#play');
const pauseBtn = $('#pause');

init();


function init(){
    $('#pause').hide();
}

playBtn.click(function(){
    playBtn.hide();
    pauseBtn.show();
});

pauseBtn.click(function(){
    playBtn.show();
    pauseBtn.hide();
});

