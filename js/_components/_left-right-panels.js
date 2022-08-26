let leftRightSettings = (() => {
    let init = () => {
        $(document).ready(function() {
          if ($('body.left-right-panel').length) {
            // initPinning();
          }
        });

    },
    initPinning=()=>{

      gsap.utils.toArray(".animate-panel").forEach((section, i) => {

        // IMAGE ANIMATION
        section.img = section.querySelector(".image-block");
        // ScrollTrigger.create({
        //   trigger: section.img,
        //   start: "top top",
        //   pin: true,
        //   pinSpacing: false,
        //   markers: {
        //     startColor: "red",
        //     endColor: "red",
        //     fontSize: "18px",
        //     fontWeight: "bold", indent: 200}
        // });

        // TEXT ANIMATION
        section.text = section.querySelector(".text-block");
        const fadeAnim = gsap.to(section.text,{duration: 0.5, autoAlpha: 1});
        ScrollTrigger.create({
          trigger: section.text,
          animation: fadeAnim,
          start: "top top",
          invalidateOnRefresh: true,
          pin: true,
          pinSpacing: false,
          toggleActions: "play none none reverse",
          markers: {
            startColor: "green",
            endColor: "green",
            fontSize: "18px",
            fontWeight: "bold", indent: 0
          }
        });

      });

    }
    ;
    init();
    return {};
})();
