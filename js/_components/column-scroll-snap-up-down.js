let columnScrollSnapUpDownSetting = (() => {
  let init = () => {
      $(document).ready(function () {
        if ($(".column-scroll-snap-up-down").length) {
          columnScrollSnapUpDown();
        }
      });
    },
    columnScrollSnapUpDown = () => {

      gsap.registerPlugin(ScrollTrigger);
      //up animation
      let proxy = {y: 0};
      let ySetter = gsap.quickSetter(".upCol", "y", "px");
      let clamp = gsap.utils.clamp(-100, 100);

      ScrollTrigger.create({
        onUpdate: (self) => {
          let yPos = clamp(self.getVelocity()/-150);
            proxy.y = yPos;
            gsap.to(proxy, {
              y:0,
              ease: "none",
              overwrite: true,
              onUpdate: () => ySetter(proxy.y)
            });
        }
      });

      //down animation
      let proxyAlt = {y: 0};
      let ySetterAlt = gsap.quickSetter(".downCol", "y", "px");
      let clampAlt = gsap.utils.clamp(-100, 100);

      ScrollTrigger.create({
        onUpdate: (self) => {
          let yPosAlt = clamp(self.getVelocity()/-150);
            proxyAlt.y = -yPosAlt;
            gsap.to(proxyAlt, {
              y:0,
              ease: "none",
              overwrite: true,
              onUpdate: () => ySetterAlt(proxyAlt.y)
            });
        }
      });

    }
  ;
  init();
  return {};
})();
