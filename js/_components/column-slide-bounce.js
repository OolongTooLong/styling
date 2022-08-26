let columnSlideBounceSetting = (() => {
  let init = () => {
      $(document).ready(function () {
        if ($(".column-slide-bounce").length) {
          columnSlideBounce();
        }
      });
    },
    columnSlideBounce = () => {
      gsap.registerPlugin(ScrollTrigger);
      const onUpdateTL = gsap.timeline();
      function myFuncTL() {
        onUpdateTL
        .to(".col", {
          y: 0,
          ease: "power1.inOut",
          yoyo: true,
          stagger: {
            amount: .2,
            axis: "center",
            ease: "power1.inOut",
            from: null
          }
        })
      }

      ScrollTrigger.create({
        trigger: "#trigger",
        start: 'top top',
      });
      ScrollTrigger.addEventListener("scrollEnd", myFuncTL);

      gsap.to("[data-y]", {
        y: (i, el) => (1 - parseFloat(el.getAttribute("data-y"))) * ScrollTrigger.maxScroll(window),
        ease: "none",
        yoyo: true,
        scrollTrigger: {
          trigger:"#trigger",
          end: "max",
          scrub: 0

        }
      })
    }

  ;
  init();
  return {};
})();
