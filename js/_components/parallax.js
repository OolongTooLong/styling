let parallaxSetting = (() => {
  let init = () => {
      $(document).ready(function () {
        if ($(".parallax").length) {
          parallax();
        }
      });
    },
    parallax = () => {
      gsap.registerPlugin(ScrollTrigger);

      ScrollTrigger.defaults({
        toggleActions: "restart pause resume pause",
        scroller: ".parallax"
      });

      let getRatio = el => window.innerHeight / (window.innerHeight + el.offsetHeight);

      gsap.utils.toArray("#para-wrap").forEach((section, i) => {

        section.bg = section.querySelector("#para-image");

        gsap.fromTo(section.bg, {
          backgroundPosition: "50% 0px"
        }, {
          backgroundPosition: () => `50% ${window.innerHeight * (1 - getRatio(section))}px`,
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
