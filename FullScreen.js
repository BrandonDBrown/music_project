function goFullScreen(){
    var canvas = document.getElementById("container");
    if(canvas.requestFullScreen)
        canvas.requestFullScreen();
    else if(canvas.webkitRequestFullScreen)
        canvas.webkitRequestFullScreen();
    else if(canvas.mozRequestFullScreen)
        canvas.mozRequestFullScreen();
}

//myAudio is declared at a global scope, so it doesn't get garbage collected.
myAudio = new Audio('spacearth.mp3');
myAudio.volume = 0.5;
myAudio.loop = true;
myAudio.play();