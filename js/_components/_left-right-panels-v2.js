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

    let mm = gsap.matchMedia();

    mm.add("(min-width: 1000px)", () => {

      let pinRightPanels = gsap.utils.toArray(".pinRight");
      pinRightPanels.forEach((pinRight, i) =>     { // right panel - text - get all items to fade in
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
        let singleAnimation = panelAnimation[i].classList.contains('singlePanelAnimation');
        rightBlock.text = rightBlock.querySelectorAll(".staggerAnimateUp"); // get all child items to stagger in
        const panelTimeline = gsap.timeline({defaults: { ease: "none"}});
        panelTimeline.fromTo(rightBlock,{ autoAlpha:0 },{ duration: 1, autoAlpha: 1}) // fade in panel
        panelTimeline.fromTo(rightBlock.text,{ y: '60vh', autoAlpha:0 },{ duration: 0.5, autoAlpha:1, y: 0, stagger: 0.2}, ">-0.2"); // move from y 60vh to 0vh staggered
        if (singleAnimation) {
          ScrollTrigger.create({
            trigger: () => imgTrig[i], // trigger from marker of same index
            animation: panelTimeline,
            start: "top top",
            end: "bottom bottom",
            toggleActions: "complete none none reset" ,
            markers:true
          });
        } else {
          ScrollTrigger.create({
            trigger: () => imgTrig[i], // trigger from marker of same index
            animation: panelTimeline,
            start: "top top",
            end: "bottom bottom",
            toggleActions: "play none none reverse" ,
          });
        }
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

    });
    mm.add("(max-width: 999px)", () => {
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
    });

    // let breakers = gsap.utils.toArray(".breaker");
    // breakers.forEach((breaker, i) => {
    //   breaker.innerBreaker = breaker.querySelectorAll(".inner-breaker"); // get all child items to stagger in
    //   breaker.outlineTitle = breaker.querySelectorAll(".outline"); // get all child items to stagger in
    //
    //   ScrollTrigger.create({
    //     trigger: breaker,
    //     start: "top top",
    //     end: "+=200px",
    //     pin: breaker.innerBreaker[0],
    //     pinSpacing: false,
    //   });
    //   ScrollTrigger.create({
    //     trigger: breaker,
    //     start: "top top",
    //     end: "bottom top",
    //     pin: breaker.outlineTitle[0],
    //     pinSpacing: false,
    //   });
    // });

    let quotes = gsap.utils.toArray(".quoteBlock");
    quotes.forEach((quote, i) => {
      quotes.text = quote.querySelectorAll(".inner");
      quotes.overlay = quote.querySelectorAll(".overlay");

      const quotesTl = gsap.timeline({defaults: { ease: "none"}, onComplete: function(){ console.log('quotes - finish') }})
      quotesTl
          .add('start')
          .fromTo(quotes.text ,{ y: '60vh', autoAlpha:0 },{  duration: 0.8, autoAlpha:1, y: 0}, 'start')
          .fromTo(quote.overlay, { autoAlpha:0 },{ duration: 1, autoAlpha: 1}, ">-0.2")

      ScrollTrigger.create({
        animation:quotesTl,
        trigger: quote,
        start: "bottom bottom",
        end: "top top-=50%",
        pin: true,
        pinSpacing:false,
        toggleActions: "play none none reverse",
      });
    });

  }

  caseStudySlider=()=>{
    console.log('caseStudySlider');
    gsap.registerPlugin(Draggable, InertiaPlugin);

    const slideDelay = 5;
    const slideDuration = 1;
    let snapX;
    const slides = document.querySelectorAll(".slide.case-study");
    let progressWrap = gsap.utils.wrap(0, 1);
    let indexWrap = gsap.utils.wrap(0, slides.length);

    let numSlides = slides.length;

    gsap.set(slides, {
      xPercent: (i) => i * 100
    });

    let wrap = gsap.utils.wrap(-100, (numSlides - 1) * 100);
    let timer = gsap.delayedCall(slideDelay, autoPlay);

    let animation = gsap.timeline({repeat:-1});

    animation.to(slides, {
      xPercent: "-=" + numSlides * 100,
      duration: numSlides,
      ease: "none",
      modifiers: {
        xPercent: wrap
      },
    },0)

    // animation.to('.slide .inner-slide ', {
    //   rotate: 360,
    //   ease: "none",
    //   stagger: {
    //     amount: numSlides-1
    //   }
    // },0);

// animation.timeScale(0.5);

// comment these two lines to preview timeline animation
    animation.pause();
    var proxy = document.createElement("div");
    var slideAnimation = gsap.to({}, {});
    var slideWidth = 0;
    var wrapWidth = 0;
    let first = 1;
    let playButton = document.querySelector(".play");
    let pauseButton = document.querySelector(".pause");
    let allProgress = $('.bg-progress');
    let navBlocks = gsap.utils.toArray(".nav-block");
    let currentIndex= 0;
    console.log(currentIndex);
    resize();

    var draggable = new Draggable(proxy, {
      type: "x",
      trigger: ".case-study-container",
      inertia: true,
      maxDuration: 0.75,
      minDuration: 0.1,
      onPress: function(){
        updateDraggable;
        onPressAnimation();
      },
      onDrag: updateProgress,
      onThrowUpdate: updateProgress,
      onThrowComplete: onThrowCompleteAnimation,
      allowContextMenu : true,
      allowNativeTouchScrolling: true,
      snap: {
        x: value => snapX(value, draggable.deltaX < 0 ? -1 : 1)
      }
    });
    function onPressAnimation () {
      let currentIndex = animation.progress() * numSlides;
      for (let i = 0; i < numSlides; i++) {
        if(i !== currentIndex){
          let slideContent = slides[i].querySelectorAll('.inner-slide');
          gsap.set(slideContent, {y: 30, opacity: 0});
        }
      }
    }

    function onThrowCompleteAnimation (){
      let currentIndex = animation.progress() * numSlides;
      let slideContent = slides[currentIndex].querySelectorAll('.inner-slide');
      gsap.to(slideContent, { y: 0, opacity: 1, stagger: 0.2 })
      timer.restart(true);
    }

    window.addEventListener("resize", resize);
    document.querySelector("#caseStudyNextButton").addEventListener("click", () => {
      timer.restart(true);
      animateSlides(-1);
    });

    pauseButton.addEventListener("click", (e) => {
      e.target.parentNode.childNodes[3].classList.remove('hidden');
      e.target.classList.add('hidden');
      let currentIndex = animation.progress() * numSlides;

      navBlocks.forEach((link, i) => {
        let progress = link.childNodes[3];
        if(i===currentIndex) {
          progress.classList.add('complete');
        }else{
          progress.classList.remove('complete');
        }
      });
      timer.kill();
    });

    playButton.addEventListener("click", (e) => {
      $(allProgress).removeClass('complete');
      e.target.parentNode.childNodes[1].classList.remove('hidden');
      e.target.classList.add('hidden');
      autoPlay();
    });

    navBlocks.forEach((link, i) => {
      link.addEventListener("click", () => {
        timer.restart(true);
        gotoSection(i);
      });
    });

    function updateDraggable() {
      slideAnimation.kill();
      this.update();
    }

    function gotoSection(index) {
      slideAnimation.kill();
      let currentIndex = animation.progress() * numSlides;
      if(currentIndex !== index) {
        let direction = index - currentIndex;
        let x = snapX(gsap.getProperty(proxy, "x") + direction * -slideWidth);


        let slideContent = slides[index].querySelectorAll('.inner-slide');
        slideAnimation = gsap.to(proxy, {
          x: x,
          duration: slideDuration,
          onStart: () => {
            for (let i = 0; i < numSlides; i++) {
              if(i !== currentIndex){
                let slideContent = slides[i].querySelectorAll('.inner-slide');
                gsap.set(slideContent, {y: 30, opacity: 0});
              }
            }
          },
          onUpdate: updateProgress,
          onComplete: () => gsap.to(slideContent, {y: 0, opacity: 1, stagger: 0.2})
        });

      }
    }

    function animateSlides(direction) {
      console.log('animateSlides');
      timer.restart(true);
      slideAnimation.kill();

      var x = snapX(gsap.getProperty(proxy, "x") + direction * slideWidth);

      var index = indexWrap(-x / slideWidth);
      var slideContent = slides[index].querySelectorAll('.inner-slide');

      slideAnimation = gsap.to(proxy, {
        x: x,
        duration: slideDuration,
        onStart: () => {
          gsap.set(slideContent, { y: 30, opacity: 0 })
        },
        onUpdate: () => {
          updateProgress()
        },
        onComplete: () => gsap.to(slideContent, { y: 0, opacity: 1, stagger: 0.2 })
      });

    }

    function updateProgress() {
      // console.log(gsap.getProperty(proxy, "x") / -wrapWidth, "wrapped", progressWrap(gsap.getProperty(proxy, "x") / -wrapWidth))
      animation.progress(progressWrap(gsap.getProperty(proxy, "x") / -wrapWidth));

      updateNav(),
      // allProgress.removeClass('complete');
      playButton.classList.add('hidden');
      pauseButton.classList.remove('hidden');
    }

    function updateNav(){
      currentIndex = animation.progress() * numSlides;
      console.log('updateNav' + currentIndex);
      navBlocks.forEach((link, i) => {
        let progress = link.childNodes[3];
        let navAnimation = gsap.timeline();
        if(i===currentIndex){
          link.classList.add('active');
          navAnimation.fromTo(progress, {
            width: '0',
            ease: "none",
          },{
            width: '100%',
            ease: "none",
            duration: function (){
              if(currentIndex === 0 && first ===1){
                first = 0;
                return slideDelay
              }else{
                return slideDelay-slideDuration
              }
            },
            // duration: function (){
            //     return slideDelay
            // },
          },0);
        }else{
          link.classList.remove('active');
        }
      });
    }

    function autoPlay() {
      if (draggable.isPressed || draggable.isDragging || draggable.isThrowing) {
        timer.restart(true);
      } else {
        animateSlides(-1);

      }
    }

    function resize() {
      var norm = (gsap.getProperty(proxy, "x") / wrapWidth) || 0;

      slideWidth = slides[0].offsetWidth;
      wrapWidth = slideWidth * numSlides;
      snapX = snapDirectional(slideWidth);

      gsap.set(proxy, {
        x: norm * wrapWidth
      });
      animateSlides(0);
      slideAnimation.progress(1);
    }

    function snapDirectional(increment) {
      let snap = gsap.utils.snap(increment);
      return (value, direction, threshold = 1e-3) => {
        let snapped = snap(value);
        return !direction || Math.abs(snapped - value) < threshold || ((snapped - value < 0) === direction < 0) ? snapped : snap(direction < 0 ? value - increment : value + increment);
      };
    }
  }

  testimonialSlider=()=>{
    gsap.registerPlugin(Draggable, InertiaPlugin);

    let snapX;
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
      type:"x",
      // snap: {
      //   x: snapX
      // }
      snap: {
        x: value => snapX(value, draggable.deltaX < 0 ? -1 : 1)
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

    function resize() {
      var norm = (gsap.getProperty(proxy, "x") / wrapWidth) || 0;

      slideWidth = slides[0].offsetWidth;
      wrapWidth = slideWidth * numSlides;
      snapX = snapDirectional(slideWidth);

      gsap.set(proxy, {
        x: norm * wrapWidth
      });
      animateSlides(0);
      slideAnimation.progress(1);
    }

    function snapDirectional(increment) {
      let snap = gsap.utils.snap(increment);
      return (value, direction, threshold = 1e-3) => {
        let snapped = snap(value);
        return !direction || Math.abs(snapped - value) < threshold || ((snapped - value < 0) === direction < 0) ? snapped : snap(direction < 0 ? value - increment : value + increment);
      };
    }

    // function snapX(value) {
    //   let snapped = gsap.utils.snap(slideWidth, value);
    //   return wrap ? snapped : gsap.utils.clamp(-slideWidth * (numSlides - 1), 0, snapped);
    // }
    //
    // function resize() {
    //
    //   var norm = (gsap.getProperty(proxy, "x") / wrapWidth) || 0;
    //
    //   slideWidth = slides[0].offsetWidth;
    //   wrapWidth = slideWidth * numSlides;
    //
    //   wrap || draggable.applyBounds({minX: -slideWidth * (numSlides - 1), maxX: 0});
    //
    //   gsap.set(proxy, {
    //     x: norm * wrapWidth
    //   });
    //
    //   animateSlides(0);
    //   slideAnimation.progress(1);
    // }

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
