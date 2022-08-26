let columnScrollMarginStaggerSetting = (() => {
  let init = () => {
      $(document).ready(function () {
        if ($(".column-scroll-margin-stagger").length) {
          columnScrollMarginStagger();

        }
      });
    },
    columnScrollMarginStagger = () => {

      gsap.registerPlugin(ScrollTrigger);
// timeline for columns Y move
      const colsTimeLine = gsap.timeline({defaults: { ease: "power1.out"}})
      colsTimeLine
        .to('.col', {
          y:10,
          stagger: 0.05,
        })

      ScrollTrigger.create({
        trigger: '#trigger',
        markers: true,
        animation: colsTimeLine,
        start: "top center",
        end: "bottom bottom",
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          // self.direction === -1 ? colsTimeLine.play() : colsTimeLine.reverse()
          colsTimeLine.play()
        }
      })
// timeline for cards margin top
      const cardsTimeLine = gsap.timeline({defaults: { ease: "power1.out"}})
      cardsTimeLine
        .to('.image-wrapper', {
          marginTop: "1.2rem",
          stagger: 0.01,
        })
      ScrollTrigger.create({
        trigger: '#trigger',
        markers: true,
        animation: cardsTimeLine,
        start: "top center",
        end: "bottom bottom",
        onUpdate: (self) => {
          cardsTimeLine.play()
        },
        invalidateOnRefresh: true
      })
// reverse on scroll stop
      ScrollTrigger.addEventListener("scrollEnd", function() {
        colsTimeLine.reverse()
        cardsTimeLine.reverse()

      });
    }


  ;
  init();
  return {};
})();
