let parallaxHeroSplitSetting = (() => {
  let init = () => {
      $(document).ready(function () {
        if ($(".parallax-hero-split").length) {
          parallaxSplitHero();
        }
      });
    },
    parallaxSplitHero = () => {
      gsap.registerPlugin(ScrollTrigger);

      ScrollTrigger.create({
        trigger: "#hero",
        start: "top top",
        pin: true,
        pinSpacing: false
      });
      // move background image wrapper in Y direction
      gsap.to("#backGround",{
        y:"-20px",
        scrollTrigger: {
          start: "top top",
          end: "bottom top",
          scrub: true,
          invalidateOnRefresh: true
        }
      });
      gsap.to('.hero-text',{
        y:'-100px',
        scrollTrigger: {
          start: "top top",
          end: "bottom top",
          scrub: true,
          invalidateOnRefresh: true
        }
      })
      gsap.to(".hero-text", {
        duration: 1,
        filter:"blur(20px)",
        ease: "none",
        scrollTrigger: {
          start: "top top",
          end: "center top",
          scrub: true
        }
      });
    }
  ;
  init();
  return {};
})();
