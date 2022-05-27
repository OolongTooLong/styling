let greenSockApp=(()=>{
  let init=()=>{
      $(function() {
        if ($('body.green-sock').length) {
          greenSock();
        }
      })
    },
    greenSock=()=>{

      gsap.registerPlugin(ScrollTrigger);

      ScrollTrigger.defaults({
        toggleActions: "restart pause resume pause",
        scroller: ".green-sock"
      });

      gsap.to(".spin h3", {
        scrollTrigger: ".spin",
        duration: 2,
        rotation: 360
      });

      gsap.to(".background-color", {
        scrollTrigger: {
          trigger: ".background-color",
          toggleActions: "restart pause reverse pause"
        },
        duration: 1,
        backgroundColor: "#FFA500",
        ease: "none"
      });

      gsap.to(".scale h3", {
        scrollTrigger: ".scale",
        scale: 2,
        repeat: -1,
        yoyo: true,
        ease: "power2"
      });
    }
  ;
  init();
  return {};
})();




