let parallaxColumnsSetting = (() => {
  let init = () => {
      $(document).ready(function () {
        if ($(".columns-parallax").length) {
          parallaxColSlide();
        }
      });
    },
    parallaxColSlide = () => {
      gsap.registerPlugin(ScrollTrigger);

      gsap.to("[data-speed]", {
        y: (i, el) => (1 - parseFloat(el.getAttribute("data-speed"))) * ScrollTrigger.maxScroll(window),
        ease: "none",
        scrollTrigger: {
          trigger:"#trigger",
          end: "max",
          invalidateOnRefresh: true,
          scrub: 0
        }
      });

    }
  ;
  init();
  return {};
})();
