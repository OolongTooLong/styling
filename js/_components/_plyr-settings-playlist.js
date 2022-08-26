let videoPlaylist = (() => {
  let init = () => {
      $(document).ready(function () {
        if ($("#video_player").length) {
          videoPlaylist();
        }
      });
    },
    videoPlaylist = () => {
      const controls = `
        <div class="plyr__controls">
          <button type="button" class="plyr__control" aria-label="Play, {title}" data-plyr="play">
              <svg class="icon--pressed" role="presentation"><use xlink:href="#plyr-pause"></use></svg>
              <svg class="icon--not-pressed" role="presentation"><use xlink:href="#plyr-play"></use></svg>
              <span class="label--pressed plyr__tooltip" role="tooltip">Pause</span>
              <span class="label--not-pressed plyr__tooltip" role="tooltip">Play</span>
          </button>
          <button type="button" class="plyr__control" aria-label="Mute" data-plyr="mute">
              <svg class="icon--pressed" role="presentation"><use xlink:href="#plyr-muted"></use></svg>
              <svg class="icon--not-pressed" role="presentation"><use xlink:href="#plyr-volume"></use></svg>
              <span class="label--pressed plyr__tooltip" role="tooltip">Unmute</span>
              <span class="label--not-pressed plyr__tooltip" role="tooltip">Mute</span>
          </button>
          <div class="plyr__progress">
              <input data-plyr="seek" type="range" min="0" max="100" step="0.01" value="0" aria-label="Seek">
              <progress class="plyr__progress__buffer" min="0" max="100" value="0">% buffered</progress>
              <span role="tooltip" class="plyr__tooltip">00:00</span>
          </div>

          <div class="plyr__time plyr__time--current" aria-label="Current time">00:00</div>

          <button type="button" class="plyr__control" data-plyr="fullscreen">
              <svg class="icon--pressed" role="presentation"><use xlink:href="#plyr-exit-fullscreen"></use></svg>
              <svg class="icon--not-pressed" role="presentation"><use xlink:href="#plyr-enter-fullscreen"></use></svg>
              <span class="label--pressed plyr__tooltip" role="tooltip">Exit fullscreen</span>
              <span class="label--not-pressed plyr__tooltip" role="tooltip">Enter fullscreen</span>
          </button>
      </div>
      `;
      const player = new Plyr('#video', {
        controls: controls,
        blankVideo: 'blank.mp4',
        fullscreen: {enabled: false},
        hideControls: true,
        keyboard: {focused: true, global: false},
        storage: {enabled: false},
        seekTime: 10,
        resetOnEnd: true
      });

      var video_player = document.getElementById("video_player"),
        links = video_player.getElementsByTagName('a');
      for (var i = 0; i < links.length; i++) {
        links[i].onclick = handler;
      }

      function handler(e) {
        e.preventDefault();
        videotarget = this.getAttribute("href");
        filename = videotarget.substr(0, videotarget.lastIndexOf('.')) || videotarget;
        video = document.querySelector("#video_player video");
        video.removeAttribute("poster");
        source = document.querySelectorAll("#video_player video source");
        source[0].src = filename + ".mp4";
        video.load();
        video.play();
      }
    }

  ;
  init();
  return {};
})();
