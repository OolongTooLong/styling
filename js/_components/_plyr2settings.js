let templateAppTwo = (() => {
  let init = () => {
      $(document).ready(function () {
        if ($(".videoTwo").length) {
          videoTwo();
        }
      });
    },
    videoTwo = () => {
        // This is the bare minimum JavaScript. You can opt to pass no arguments to setup.
        const player = new Plyr('#player2');

        // Expose
        window.player = player;

        $('.player-src').on('click', function () {

          src = $(this).data("src");
          type = 'video/' + $(this).data("type");
          poster = $(this).data("poster")||"";

          player.source = {
            type: 'video',
            title: 'Example title',
            sources: [
              {
                src: src,
                type: type,
                size: 720
              }
            ],
            poster: poster
          };
          player.play();
        });


    }

  ;
  init();
  return {};
})();
