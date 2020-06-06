const video = document.getElementById('video');
const play = document.getElementById('play');
const stop = document.getElementById('stop');
const progress = document.getElementById('progress');
const timestamp = document.getElementById('timestamp');


// Play e pause video
function toggleVideoStatus(){
   if(video.paused){
      video.play();
   } else {
      video.pause();
   }
}

// update play/pause icon
function updatePlayIcon(){
   if(video.paused){
      play.innerHTML = '<i class="fas fa-play"></i>';
   } else {
      play.innerHTML = '<i class="fas fa-pause"></i>';
   }
}

// update progress and time stamp
function updateProgress(){
   

   progress.value = (video.currentTime / video.duration) * 100;

   console.log((video.currentTime / video.duration) * 100);


   // Get minutes
   let mins = Math.floor(video.currentTime / 60);
   if(mins < 10) {
      mins = '0' + String(mins);
   }

   // Get minutes
   let secs = Math.floor(video.currentTime % 60);
   if(secs < 10) {
      secs = '0' + String(secs);
   }

   timestamp.innerHTML = `${mins}:${secs}`;
   
}

// set video time to progress
function setVideoProgress(){
   video.currentTime = (+progress.value * video.duration) / 100;
}

// stop video
function stopVideo(){
   video.currentTime = 0;
   video.pause();
}

// Event Listeners
video.addEventListener('click', toggleVideoStatus);
video.addEventListener('pause', updatePlayIcon);
video.addEventListener('play', updatePlayIcon);
video.addEventListener('timeupdate', updateProgress);


play.addEventListener('click', toggleVideoStatus);

stop.addEventListener('click', stopVideo);

progress.addEventListener('change', setVideoProgress);
