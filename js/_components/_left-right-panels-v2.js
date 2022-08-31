let pixHomeSettings = (() => {
  let init = () => {
    $(document).ready(function() {
      if ($('.pix-home').length) {
        javascriptChecker();
        panelAnimation();
        caseStudySlider();
        testimonialSlider()
        menuHandler();

      }
    });
  },
  javascriptChecker = () => {
    const html = document.querySelector("html");
    html.classList.remove('no-js');
    html.classList.add('js');
  }

  menuHandler=()=>{
      gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)
      let scrollDeadzone = 80;
      let lastScrollTop = 0;

      let menuTrigger = ScrollTrigger.create;
      lastScrollTop = $(window).scrollTop();
      $(window).scroll(menuScrollHandler);

      function menuScrollHandler(e) {
        scrollTop = $(e.currentTarget).scrollTop();
        if(scrollTop > lastScrollTop + scrollDeadzone){
          hideMenu();
          lastScrollTop = scrollTop;
          return;
        }
        if((scrollTop < lastScrollTop - scrollDeadzone) || scrollTop < scrollDeadzone){
          showMenu();
          lastScrollTop = scrollTop;
          return;
        }
      }
      function hideMenu() {
        gsap.to(".strip",{ y : "-100%"});
      }
      function showMenu(){
        gsap.to(".strip",{ y : "0%"});
      }

      gsap.utils.toArray("#page-navigation a ").forEach(function(a) {
        a.addEventListener("click", function(e) {
          e.preventDefault();
          const id = e.target.getAttribute("href"), trigger = ScrollTrigger.getById(id);
          gsap.to(window, {
            duration: 1,
            scrollTo: trigger ? trigger.start : id,
          });
        });
      });
    }

  panelAnimation=()=>{

    ScrollTrigger.matchMedia({

      "(min-width: 1000px)": function () { // desktop

        let pinRightPanels = gsap.utils.toArray(".pinRight");
        pinRightPanels.forEach((pinRight, i) => { // right panel - text - get all items to fade in
          ScrollTrigger.create({
            trigger: pinRight,
            start: "top top",
            pin: true,
            end: "max",
            pinSpacing:false,
            id: "pinRight"+i,
          });
        });

        let imgTrig = gsap.utils.toArray(".rightTrigger");
        let panelAnimation = gsap.utils.toArray(".panelAnimation");
        panelAnimation.forEach((rightBlock, i) => { // right panel - text - get all items to fade in
          rightBlock.text = rightBlock.querySelectorAll(".staggerAnimateUp"); // get all child items to stagger in
          const panelTimeline = gsap.timeline({defaults: { ease: "none"}})
          panelTimeline
            .fromTo(rightBlock,{ autoAlpha:0 },{ duration: 1, autoAlpha: 1}) // fade in panel
            .fromTo(rightBlock.text,{ y: '60vh', autoAlpha:0 },{ duration: 0.5, autoAlpha:1, y: 0, stagger: 0.2}, ">-0.2"); // move from y 60vh to 0vh staggered
          ScrollTrigger.create({
            trigger: () => imgTrig[i], // trigger from marker of same index
            animation: panelTimeline,
            start: "top top",
            toggleActions: "play none none reverse",
          });
        });

        let pinLeftPanels = gsap.utils.toArray(".pinLeft");
        pinLeftPanels.forEach((panel, i) => { // left panel - image
          ScrollTrigger.create({
            trigger: panel,
            start: "top top",
            end: "+=200%",
            pin: true,
            pinSpacing:false,
            id: "#"+panel.getAttribute("id"), // used for desktop navigation
          });
        });

        let quotes = gsap.utils.toArray(".quoteBlock");
        quotes.forEach((quote, i) => {
          const quotesTl = gsap.timeline({defaults: { ease: "none"}})
          quotesTl
              .fromTo(quote,{ autoAlpha:0 },{ delay: 1, duration: 1, autoAlpha: 1})
          ScrollTrigger.create({
            animation:quotesTl,
            trigger: quote,
            start: "bottom bottom",
            end: "top top-=200px",
            scrub:true,
            pin: quote,
            markers: {
              startColor: "green",
              endColor: "green",
              fontSize: "18px",
              fontWeight: "bold", indent: 50
            }
          });
        });
      },

      "(max-width: 999px)": function () { // mobile
        let pinAllMobilePanels = gsap.utils.toArray(".pinAllMobile");
        pinAllMobilePanels.forEach((panel, i) => {
          ScrollTrigger.create({
            trigger: panel,
            end: "max",
            start: "top top",
            pin: true,
            pinSpacing: false,
            id: "#"+panel.getAttribute("id"), // used for mobile navigation
          });
        });
      },
      "all": function () { // all

      }
    });
  }

  caseStudySlider=()=>{
    gsap.registerPlugin(Draggable, InertiaPlugin);

    var slideDelay = 5;
    var slideDuration = 0.3;
    var wrap = true;

    var slides = document.querySelectorAll(".slide.case-study");
    var nextButton = document.querySelector("#caseStudyNextButton");
    var progressWrap = gsap.utils.wrap(0, 1);

    var numSlides = slides.length;

    gsap.set(slides, {
      xPercent: i => i * 100
    });

    var wrapX = gsap.utils.wrap(-100, (numSlides - 1) * 100);
    var timer = gsap.delayedCall(slideDelay, autoPlay);

    var animation = gsap.to(slides, {
      xPercent: "+=" + (numSlides * 100),
      duration: 1,
      ease: "none",
      paused: true,
      repeat: -1,
      modifiers: {
        xPercent: wrapX
      }
    });

    var proxy = document.createElement("div");
    var slideAnimation = gsap.to({}, {});
    var slideWidth = 0;
    var wrapWidth = 0;

    var draggable = new Draggable(proxy, {
      trigger: ".case-study-container",
      inertia: true,
      onPress: updateDraggable,
      onDrag: updateProgress,
      onThrowUpdate: updateProgress,
      snap: {
        x: snapX
      }
    });

    resize();

    window.addEventListener("resize", resize);

    nextButton.addEventListener("click", function() {
      animateSlides(-1);
    });

    function updateDraggable() {
      timer.restart(true);
      slideAnimation.kill();
      this.update();
    }

    function animateSlides(direction) {

      timer.restart(true);
      slideAnimation.kill();
      var x = snapX(gsap.getProperty(proxy, "x") + direction * slideWidth);

      slideAnimation = gsap.to(proxy, {
        x: x,
        duration: slideDuration,
        onUpdate: updateProgress
      });
    }

    function autoPlay() {
      if (draggable.isPressed || draggable.isDragging || draggable.isThrowing) {
        timer.restart(true);
      } else {
        animateSlides(-1);
      }
    }

    function updateProgress() {
      animation.progress(progressWrap(gsap.getProperty(proxy, "x") / wrapWidth));
    }

    function snapX(value) {
      let snapped = gsap.utils.snap(slideWidth, value);
      return wrap ? snapped : gsap.utils.clamp(-slideWidth * (numSlides - 1), 0, snapped);
    }

    function resize() {

      var norm = (gsap.getProperty(proxy, "x") / wrapWidth) || 0;

      slideWidth = slides[0].offsetWidth;
      wrapWidth = slideWidth * numSlides;

      wrap || draggable.applyBounds({minX: -slideWidth * (numSlides - 1), maxX: 0});

      gsap.set(proxy, {
        x: norm * wrapWidth
      });

      animateSlides(0);
      slideAnimation.progress(1);
    }

  }

  testimonialSlider=()=>{
    gsap.registerPlugin(Draggable, InertiaPlugin);

    var slideDelay = 5;
    var slideDuration = 0.3;
    var wrap = true;

    var slides = document.querySelectorAll(".slide.testimonial");

    var progressWrap = gsap.utils.wrap(0, 1);

    var numSlides = slides.length;

    gsap.set(slides, {
      xPercent: i => i * 100
    });

    var wrapX = gsap.utils.wrap(-100, (numSlides - 1) * 100);
    var timer = gsap.delayedCall(slideDelay, autoPlay);

    var animation = gsap.to(slides, {
      xPercent: "+=" + (numSlides * 100),
      duration: 1,
      ease: "none",
      paused: true,
      repeat: -1,
      modifiers: {
        xPercent: wrapX
      }
    });

    var proxy = document.createElement("div");
    var slideAnimation = gsap.to({}, {});
    var slideWidth = 0;
    var wrapWidth = 0;

    var draggable = new Draggable(proxy, {
      trigger: ".testimonials-container",
      inertia: true,
      onPress: updateDraggable,
      onDrag: updateProgress,
      onThrowUpdate: updateProgress,
      snap: {
        x: snapX
      }
    });

    resize();

    window.addEventListener("resize", resize);


    function updateDraggable() {
      timer.restart(true);
      slideAnimation.kill();
      this.update();
    }

    function animateSlides(direction) {

      timer.restart(true);
      slideAnimation.kill();
      var x = snapX(gsap.getProperty(proxy, "x") + direction * slideWidth);

      slideAnimation = gsap.to(proxy, {
        x: x,
        duration: slideDuration,
        onUpdate: updateProgress
      });
    }

    function autoPlay() {
      if (draggable.isPressed || draggable.isDragging || draggable.isThrowing) {
        timer.restart(true);
      } else {
        animateSlides(-1);
      }
    }

    function updateProgress() {
      animation.progress(progressWrap(gsap.getProperty(proxy, "x") / wrapWidth));
    }

    function snapX(value) {
      let snapped = gsap.utils.snap(slideWidth, value);
      return wrap ? snapped : gsap.utils.clamp(-slideWidth * (numSlides - 1), 0, snapped);
    }

    function resize() {

      var norm = (gsap.getProperty(proxy, "x") / wrapWidth) || 0;

      slideWidth = slides[0].offsetWidth;
      wrapWidth = slideWidth * numSlides;

      wrap || draggable.applyBounds({minX: -slideWidth * (numSlides - 1), maxX: 0});

      gsap.set(proxy, {
        x: norm * wrapWidth
      });

      animateSlides(0);
      slideAnimation.progress(1);
    }

  }

  fadeTestimonials=()=>{
    gsap.registerPlugin(Draggable, InertiaPlugin);

    var slideDelay = 1.5;
    var slideDuration = 0.3;
    var wrap = true;

    var slides = document.querySelectorAll(".testimonials-container .slide");

    var progressWrap = gsap.utils.wrap(0, 1);

    var numSlides = slides.length;

    gsap.set(slides, {
      xPercent: i => i * 100
    });

    var wrapX = gsap.utils.wrap(-100, (numSlides - 1) * 100);
    var timer = gsap.delayedCall(slideDelay, autoPlay);

    var animation = gsap.to(slides, {
      xPercent: "+=" + (numSlides * 100),
      duration: 1,
      ease: "none",
      paused: true,
      repeat: -1,
      modifiers: {
        xPercent: wrapX
      }
    });

    var proxy = document.createElement("div");
    var slideAnimation = gsap.to({}, {});
    var slideWidth = 0;
    var wrapWidth = 0;

    var draggable = new Draggable(proxy, {
      trigger: ".testimonials-container",
      inertia: true,
      onPress: updateDraggable,
      onDrag: updateProgress,
      onThrowUpdate: updateProgress,
      snap: {
        x: snapX
      }
    });
    resize();
    window.addEventListener("resize", resize);
    function updateDraggable() {
      timer.restart(true);
      slideAnimation.kill();
      this.update();
    }
    function animateSlides(direction) {
      timer.restart(true);
      slideAnimation.kill();
      var x = snapX(gsap.getProperty(proxy, "x") + direction * slideWidth);
      slideAnimation = gsap.to(proxy, {
        x: x,
        duration: slideDuration,
        onUpdate: updateProgress
      });
    }
    function autoPlay() {
      if (draggable.isPressed || draggable.isDragging || draggable.isThrowing) {
        timer.restart(true);
      } else {
        animateSlides(-1);
      }
    }
    function updateProgress() {
      animation.progress(progressWrap(gsap.getProperty(proxy, "x") / wrapWidth));
    }
    function snapX(value) {
      let snapped = gsap.utils.snap(slideWidth, value);
      return wrap ? snapped : gsap.utils.clamp(-slideWidth * (numSlides - 1), 0, snapped);
    }

    function resize() {
      var norm = (gsap.getProperty(proxy, "x") / wrapWidth) || 0;
      slideWidth = slides[0].offsetWidth;
      wrapWidth = slideWidth * numSlides;
      wrap || draggable.applyBounds({minX: -slideWidth * (numSlides - 1), maxX: 0});
      gsap.set(proxy, {
        x: norm * wrapWidth
      });
      animateSlides(0);
      slideAnimation.progress(1);
    }
  }
  ;
  init();
  return {};
})();
