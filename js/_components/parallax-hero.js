let parallaxHeroSetting = (() => {
  let init = () => {
      $(document).ready(function () {
        if ($(".parallax-hero").length) {
          parallaxHero();
        }
      });
    },
    parallaxHero = () => {
      gsap.registerPlugin(ScrollTrigger);

      ScrollTrigger.create({
        trigger: "#hero",
        start: "top top",
        pin: true,
        pinSpacing: false
      });
      // move text in Y direction
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
      //from now on, we can animate "blur" as a number! (Well, in browsers that support filter)
      gsap.to(".hero-text", {
        duration: 1,
        filter:"blur(20px)",
        ease: "none",
        scrollTrigger: {
          start: "top top",
          end: "bottom top",
          scrub: true,
          markers:true
        }
      });



    }
  ;
  init();
  return {};
})();
