let simplePinSettings = (() => {
    let init = () => {
        $(document).ready(function() {
            // simplePin();
        });

    },
    simplePin = () => {
        gsap.registerPlugin(ScrollTrigger);

        let pinLeftPanels = gsap.utils.toArray(".pinLeft");

        pinLeftPanels.forEach((panel, i) => { // left panel - image
            panel.quote = panel.querySelectorAll(".quote-block");
            const quotesTl = gsap.timeline({defaults: { ease: "none"}})
            quotesTl
                .fromTo(panel.quote,{ autoAlpha:0 },{ duration: 1, autoAlpha: 1}) // fade in panel
            ScrollTrigger.create({
                animation:quotesTl,
                trigger: panel.quote,
                pin: panel.quote,
                start: "bottom center",
                end: "top top",
                scrub:true,
                markers: {
                    startColor: "green",
                    endColor: "green",
                    fontSize: "18px",
                    fontWeight: "bold", indent: 50
                }
            });

        });



    }
    ;
    init();
    return {};
})();
