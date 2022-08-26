let columnScrollStaggerSetting = (() => {
  let init = () => {
      $(document).ready(function () {
        if ($(".column-scroll-snap-stagger").length) {
          columnScrollSnapStagger();

        }
      });
    },
    columnScrollSnapStagger = () => {

      gsap.registerPlugin(ScrollTrigger);
      let clamp = gsap.utils.clamp(-100, 100);
      const tl = gsap.timeline({defaults: { ease: "none"}})
      tl
        .to('.stack', {
          y: (i, el) => (1 - parseFloat(el.getAttribute("data-speed"))) * ScrollTrigger.maxScroll(window),
          stagger: 0.1,
        })

      ScrollTrigger.create({
        trigger: '#trigger',
        start: '100px 150px',
        markers: true,
        animation: tl,
        scrub: 1,
        invalidateOnRefresh: true
      })

      const tl2 = gsap.timeline({defaults: { ease: "none"}})
      tl2
        .to('.image-wrapper', {
          marginTop: (i, el) => (parseFloat(el.getAttribute("data-margin"))),
          stagger: 0.1,
        })
        .to('.image-wrapper', {
          marginTop:10,
          stagger: 0.1,
        })

      ScrollTrigger.create({
        trigger: '#trigger',
        start: '100px 150px',
        markers: true,
        animation: tl2,
        scrub: 1,
        invalidateOnRefresh: true
      })



    }

  ;
  init();
  return {};
})();
