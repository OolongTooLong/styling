let greenSockFadeApp = (() => {
  let init = () => {
      $(function () {
        if ($('body.sock-fade').length) {
          greenSockFade();
          parallaxViewport();
        }
      })
    },
    greenSockFade = () => {

      const imgs = gsap.utils.toArray("#backGround .image-wrap");
      const next = 5; // time to change
      const fade = 1.5; // fade time
//only for the first
      gsap.set(imgs[0], {autoAlpha: 1})

// ====================
      function crossfade() {
        const action = gsap.timeline()
          .to(imgs[0], {autoAlpha: 0, duration: fade})
          .to(imgs[1], {autoAlpha: 1, duration: fade}, 0)
        imgs.push(imgs.shift());
        // start endless run
        gsap.delayedCall(next, crossfade);
      }

// start the crossfade after next = 3 sec
      gsap.delayedCall(next, crossfade);


    }
    parallaxViewport = () => {
    gsap.registerPlugin(ScrollTrigger);

    let getRatio = el => window.innerHeight / (window.innerHeight + el.offsetHeight);

    gsap.utils.toArray(".image-wrap").forEach((section, i) => {

      section.bg = section.querySelector(".img");

      gsap.fromTo(section.bg, {
        // backgroundPosition: "50% 0px"
        backgroundPosition: (i, el) => (parseFloat(el.getAttribute("data-hotspotX"))) + "% 0px"

      }, {
        // backgroundPosition: () => `50% ${window.innerHeight * (1 - getRatio(section))}px`,
        backgroundPosition: (i, el) => (parseFloat(el.getAttribute("data-hotspotX"))) + `% ${window.innerHeight * (1 - getRatio(section))}px`,

        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: true,
          invalidateOnRefresh: true
        }
      });

    });

  }
  ;
  init();
  return {};
})();




