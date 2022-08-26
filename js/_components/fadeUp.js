let fadeUpSetting = (() => {
  let init = () => {
      $(document).ready(function () {
        if ($(".fade-up").length) {
          fadeUp();
        }
      });
    },
    fadeUp = () => {
      gsap.registerPlugin(ScrollTrigger);

      gsap.utils.toArray(".fadeUp").forEach((section, i) => {
        gsap.fromTo(section, {
          y:20,
          opacity:0,
        }, {
          y:0,
          opacity:1,
          ease: "back.out(1.7)",
          duration:0.6,
          scrollTrigger: {
            trigger: section,
            start: "+=150 90%",
            end: "+=200 40%",
            markers: true,
          }
        });
      });
    }

  ;
  init();
  return {};
})();
