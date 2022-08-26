let parallaxNewSetting = (() => {
  let init = () => {
      $(document).ready(function () {
        if ($(".parallax-new").length) {
          parallaxNew();
        }
      });
    },
    parallaxNew = () => {
      gsap.registerPlugin(ScrollTrigger);

      ScrollTrigger.defaults({
        toggleActions: "restart pause resume pause",
        scroller: ".parallax-new"
      });

      let getRatio = el => window.innerHeight / (window.innerHeight + el.offsetHeight);
      let wrap = $('#para-wrap');
      let img = $('#para-image');

      gsap.fromTo(img, {
        backgroundPosition: "50% 0px"
      }, {
        // backgroundPosition: "50% 100px",
        backgroundPosition: () => `50% ${window.innerHeight * (1 - getRatio(wrap))}px`,
        ease: "none",
        scrollTrigger: {
          trigger: wrap,
          start: "top top",
          end: "bottom top",
          scrub: true,
          invalidateOnRefresh: true
        }
      });
    }

  ;
  init();
  return {};
})();
