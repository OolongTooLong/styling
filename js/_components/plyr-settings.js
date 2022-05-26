'use strict';
(function ($) {
    if ($('#hero-player').length) {
        document.addEventListener('DOMContentLoaded', () => {

            const players = Array.from(document.querySelectorAll('.js-player')).map(p => new Plyr(p));
            const player = new Plyr('#hero-player', {
                muted: true,
                autoplay: true,
                hideControls: true,
                disableContextMenu: true
            });
            window.addEventListener('load', function () {
                player.play();
            });
            let heroVid = $("#hero-player .plyr__video-wrapper iframe");
            heroVid.muted = true;
        });
    }
})(jQuery); // Fully reference jQuery after this point.

// // Expose
// window.player = player;
//
// // Bind event listener
// function on(selector, type, callback) {
//     document.querySelector(selector).addEventListener(type, callback, false);
// }
//
// // Play
// on('.js-play', 'click', () => {
//     player.play();
// });
//
// // Pause
// on('.js-pause', 'click', () => {
//     player.pause();
// });
//
// // Stop
// on('.js-stop', 'click', () => {
//     player.stop();
// });
//
// // Rewind
// on('.js-rewind', 'click', () => {
//     player.rewind();
// });
//
// // Forward
// on('.js-forward', 'click', () => {
//     player.forward();
// });
