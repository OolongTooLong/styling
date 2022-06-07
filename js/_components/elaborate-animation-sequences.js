let elaborateAnimationSequencesApp = (() => {
  let init = () => {
      $(function () {
        if ($('body.green-sock-elaborate-animation-sequences').length) {
          elaborateAnimationSequences();
        }
      })
    },
    elaborateAnimationSequences = () => {
      let tl = gsap.timeline({defaults: {ease: "power4.inOut", duration: 2}});
      let flagPoles = CSSRulePlugin.getRule(".card:before")

      tl.to('h1',
        {
          clipPath: 'polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)',
          opacity: 1,
          y: 0,
          duration: 2.2
        })
        .to('.form',
          {
            clipPath: 'polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)',
            opacity: 1,
            y: 0
          }, '-=2'
        )
        .from('.card',
          {
            scaleY: 0,
            stagger: .2
          }, '-=2'
        )
        .from(flagPoles, {stagger: 1, opacity: 0, transform: 'translateY(100px)'}, '-=2')
    }
  ;
  init();
  return {};
})();




