let listingPage = (() => {
  let init = () => {
      $(document).ready(function () {
        cardFadeScroll();
        previewPlayer();

      });
    },

    cardFadeScroll = () => { // fade cards images in on scroll

      const images = gsap.utils.toArray('.image-wrapper');
      images.forEach((image, i) => {
        const fadeAnim = gsap.to(image,{duration: 0.5, autoAlpha: 1});
        ScrollTrigger.create({
          trigger: image,
          animation: fadeAnim,
          toggleActions: 'play none none none',
          once: true,
        });
      });

      gsap.utils.toArray(".card").forEach((card, i) => {
        let tl = gsap.timeline({defaults: {ease: "none"}});
        ScrollTrigger.create({
          trigger: card,
          animation: tl,
          toggleActions: 'play none none reverse',
          toggleClass: "active",
          markers: true,
          scrub: true,
        });
        tl.to( card, { width:"100%" })
          .to( card,{ width:"60%" });

        let innerCard = $(card).children(".inner-card");

        let tl2 = gsap.timeline({defaults: {ease: "none"}});
        ScrollTrigger.create({
          trigger: card,
          animation: tl2,
          toggleActions: 'play none none reverse',
          toggleClass: "active",
          markers: true,
          scrub: true,
        });
        tl2.to(innerCard, { scale:1.2, transformOrigin:"left" })
          .to(innerCard, { scale:1 })
      });


    };
    previewPlayer = () => {
      const controls = `
            <div class="plyr__controls">
               <button type="button" class="plyr__control" data-plyr="fullscreen">
                  <svg class="icon--pressed" role="presentation"><use xlink:href="#plyr-exit-fullscreen"></use></svg>
                  <svg class="icon--not-pressed" role="presentation"><use xlink:href="#plyr-enter-fullscreen"></use></svg>
              </button>
              <button type="button" class="plyr__control" aria-label="Play, {title}" data-plyr="play">
                  <svg class="icon--pressed" role="presentation"><use xlink:href="#plyr-pause"></use></svg>
                  <svg class="icon--not-pressed" role="presentation"><use xlink:href="#plyr-play"></use></svg>
              </button>
              <button type="button" class="plyr__control" aria-label="Mute" data-plyr="mute">
                  <svg class="icon--pressed" role="presentation"><use xlink:href="#plyr-muted"></use></svg>
                  <svg class="icon--not-pressed" role="presentation"><use xlink:href="#plyr-volume"></use></svg>
              </button>
              <div class="plyr__progress">
                  <input data-plyr="seek" type="range" min="0" max="100" step="0.01" value="0" aria-label="Seek">
                  <progress class="plyr__progress__buffer" min="0" max="100" value="0">% buffered</progress>
              </div>
              <div class="plyr__time plyr__time--current" aria-label="Current time">00:00</div>
            </div>
        `;
      let options = {
        controls: false,
        invertTime: true,
        hideControls: true,
        disableContextMenu: true,
        autoplay:true,
        muted:true,
        storage: {enabled: false}
      }
      let potentialPlayers = document.getElementsByClassName("card");
      let playerHandler = function() {
        let id = this.getAttribute("id");
        let panelSelector ="#"+id+" .preview-panel";

        const player = new Plyr("#"+id+".preview-player", options); // create player

        gsap.to(panelSelector, {duration: 0.5, autoAlpha: 1}); // animate opacity

        function on(selector, type, callback) {
          document.querySelector(selector).addEventListener(type, callback, false);
        }
        on("#"+id, 'mouseleave', () => { // event listener to pause when leaving player
          gsap.to(panelSelector, {duration: 0.5, opacity: 0, onComplete: mouseLeaveTweenComplete});// animate opacity
          function mouseLeaveTweenComplete() { // on animation complete
            player.pause();
          }
        });
        on("#"+id, 'mouseenter', () => { // event listener to play when re-entering the player
          player.play();
          gsap.to(panelSelector, {duration: 0.5, autoAlpha: 1}); // animate opacity
        });
      };
      "click mouseenter".split(" ").forEach(function(e){ // add event listeners to all potential players to create player
        for (let i = 0; i < potentialPlayers.length; i++) {
          potentialPlayers[i].addEventListener(e, playerHandler, {passive: true});
        }
      });
    }

  init();
  return {};
})();
