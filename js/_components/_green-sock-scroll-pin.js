let greenSockScrollApp = (() => {
  let init = () => {
      $(function () {
        if ($('body.green-sock-scroll-pin').length) {
          greenSockScrollPin();
        }
      })
    },
    greenSockScrollPin = () => {

      gsap.registerPlugin(ScrollTrigger);
      gsap.defaults({ease: "none", duration: 2});

      const tLeft = gsap.timeline();
      tLeft.from(".left-two", {yPercent: 100})
        .from(".left-three", {yPercent: 100})
        .from(".left-four", {yPercent: 100})

      ScrollTrigger.create({
        animation: tLeft,
        trigger: "#left-wrapper",
        start: "top top",
        end: "+=4000",
        scrub: true,
        pin: true,
        anticipatePin: 1
      });

      const tRight = gsap.timeline();
      tRight.to(".right-one",
        {opacity: 0, delay: 0.3, duration: 0.2}
      )
      .fromTo(".right-two",
        {y: 100, opacity: 0, ease: "power2",},
        {y: 0, opacity: 1,}
      )
      .fromTo(".right-three",
        {y: 100, opacity: 0, ease: "power2",},
        {y: 0, opacity: 1,}
      )
      .fromTo(".right-four",
        {y: 100, opacity: 0, ease: "power2",},
        {y: 0, opacity: 1,}
      )

      // pin the container and link the animation to the scrollbar (scrub: true).
      ScrollTrigger.create({
        animation: tRight,
        trigger: "#right-wrapper",
        start: "top top",
        end: "+=4000",
        scrub: true,
        pin: true,
        anticipatePin: 1
      });

    }
  ;
  init();
  return {};
})();




