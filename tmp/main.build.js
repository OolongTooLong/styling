function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

var angleSliderSettings = function () {
  var init = function init() {
    $(document).ready(function () {
      if ($('.angle-slider').length) {
        angleSlider();
      }
    });
  },
      angleSlider = function angleSlider() {
    gsap.registerPlugin(Draggable, InertiaPlugin);
    var slideDelay = 5;
    var slideDuration = 1;
    var snapX;
    var slides = document.querySelectorAll(".slide-image");
    var progressWrap = gsap.utils.wrap(0, 1);
    var indexWrap = gsap.utils.wrap(0, slides.length);
    var numSlides = slides.length;
    gsap.set(slides, {
      xPercent: function xPercent(i) {
        return i * 100;
      }
    });
    var wrap = gsap.utils.wrap(-100, (numSlides - 1) * 100);
    var timer = gsap.delayedCall(slideDelay, autoPlay);
    var animation = gsap.timeline({
      repeat: -1
    });
    animation.to(slides, {
      xPercent: "-=" + numSlides * 100,
      duration: numSlides,
      ease: "none",
      modifiers: {
        xPercent: wrap
      }
    }, 0); // animation.to('.slide .inner-slide ', {
    //   rotate: 360,
    //   ease: "none",
    //   stagger: {
    //     amount: numSlides-1
    //   }
    // },0);

    animation.pause();
    var proxy = document.createElement("div");
    var slideAnimation = gsap.to({}, {});
    var slideWidth = 0;
    var wrapWidth = 0;
    var first = 1;
    var playButton = document.querySelector(".play");
    var pauseButton = document.querySelector(".pause");
    var allProgress = $('.bg-progress');
    var allSlideText = $('.slide-text ');
    var navBlocks = gsap.utils.toArray(".nav-block");
    resize();
    var draggable = new Draggable(proxy, {
      type: "x",
      trigger: "#hero",
      inertia: true,
      maxDuration: 0.75,
      minDuration: 0.1,
      onPress: function onPress() {
        updateDraggable;
      },
      onDrag: function onDrag() {
        updateProgress;
        onDragAnimation();
      },
      onThrowUpdate: updateProgress,
      onThrowComplete: onThrowCompleteAnimation,
      allowContextMenu: true,
      allowNativeTouchScrolling: true,
      snap: {
        x: function x(value) {
          return snapX(value, draggable.deltaX < 0 ? -1 : 1);
        }
      }
    });

    function onDragAnimation() {
      console.log('onDragAnimation');
      gsap.to(allSlideText, {
        opacity: 0
      });
    }

    function onThrowCompleteAnimation() {
      var currentIndex = animation.progress() * numSlides;
      var slideContent = slides[currentIndex].parentNode.childNodes[3];
      gsap.to(slideContent, {
        y: 0,
        opacity: 1,
        stagger: 0.2
      });
      timer.restart(true);
    }

    window.addEventListener("resize", resize);
    pauseButton.addEventListener("click", function (e) {
      console.log('pauseButton');
      e.target.parentNode.childNodes[3].classList.remove('hidden');
      e.target.classList.add('hidden');
      var currentIndex = animation.progress() * numSlides;
      navBlocks.forEach(function (link, i) {
        var progress = link.childNodes[3];

        if (i === currentIndex) {
          progress.classList.add('complete');
        } else {
          progress.classList.remove('complete');
        }
      });
      timer.kill();
    });
    playButton.addEventListener("click", function (e) {
      $(allProgress).removeClass('complete');
      e.target.parentNode.childNodes[1].classList.remove('hidden');
      e.target.classList.add('hidden');
      autoPlay();
    });
    navBlocks.forEach(function (link, i) {
      link.addEventListener("click", function () {
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
      var currentIndex = animation.progress() * numSlides;

      if (currentIndex !== index) {
        var direction = index - currentIndex;
        var x = snapX(gsap.getProperty(proxy, "x") + direction * -slideWidth);
        var slideContent = slides[index].parentNode.childNodes[3];
        slideAnimation = gsap.to(proxy, {
          x: x,
          duration: slideDuration,
          onStart: function onStart() {
            gsap.set(allSlideText, {
              opacity: 0
            });
            gsap.set(slideContent, {
              y: 30,
              opacity: 0
            });
          },
          onUpdate: updateProgress,
          onComplete: function onComplete() {
            return gsap.to(slideContent, {
              y: 0,
              opacity: 1,
              stagger: 0.2
            });
          }
        });
      }
    }

    function animateSlides(direction) {
      timer.restart(true);
      slideAnimation.kill();
      var x = snapX(gsap.getProperty(proxy, "x") + direction * slideWidth);
      var index = indexWrap(-x / slideWidth);
      var slideContent = slides[index].parentNode.childNodes[3];
      slideAnimation = gsap.to(proxy, {
        x: x,
        duration: slideDuration,
        onStart: function onStart() {
          gsap.set(allSlideText, {
            opacity: 0
          });
          gsap.set(slideContent, {
            y: 30,
            opacity: 0
          });
        },
        onUpdate: updateProgress,
        onComplete: function onComplete() {
          return gsap.to(slideContent, {
            y: 0,
            opacity: 1,
            stagger: 0.2
          });
        }
      });
    }

    function updateProgress() {
      animation.progress(progressWrap(gsap.getProperty(proxy, "x") / -wrapWidth));
      updateNav();
      allProgress.removeClass('complete');
      playButton.classList.add('hidden');
      pauseButton.classList.remove('hidden');
    }

    function updateNav() {
      var currentIndex = animation.progress() * numSlides;
      navBlocks.forEach(function (link, i) {
        var progress = link.childNodes[3];
        var navAnimation = gsap.timeline();

        if (i === currentIndex) {
          link.classList.add('active');
          navAnimation.fromTo(progress, {
            width: '0',
            ease: "none"
          }, {
            width: '100%',
            ease: "none",
            duration: function duration() {
              if (currentIndex === 0 && first === 1) {
                first = 0;
                return slideDelay;
              } else {
                return slideDelay - slideDuration;
              }
            }
          }, 0);
        } else {
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
      var norm = gsap.getProperty(proxy, "x") / wrapWidth || 0;
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
      var snap = gsap.utils.snap(increment);
      return function (value, direction) {
        var threshold = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1e-3;
        var snapped = snap(value);
        return !direction || Math.abs(snapped - value) < threshold || snapped - value < 0 === direction < 0 ? snapped : snap(direction < 0 ? value - increment : value + increment);
      };
    }
  };

  init();
  return {};
}();

var archivePage = function () {
  var init = function init() {
    $(document).ready(function () {
      if ($("#card-section-case-studies").length) {
        showMore();
      }
    });
  },
      showMore = function showMore() {
    var card = $('.card');
    var button = $('.button-wrap'); // Hide all items

    card.hide();
    button.hide(); // Show first 12 items

    window.addEventListener("load", function (event) {
      var image = document.querySelector('.image');
      var isLoaded = image.complete && image.naturalHeight !== 0;
      card.slice(0, 9).show();
      button.fadeIn();
    });
    $("#show-more").on('click', function (e) {
      e.preventDefault(); // Target hidden items

      var card = '.card:hidden';
      $(card).slice(0, 6).fadeIn(); // If there are no more hidden items hide the button

      if ($(card).length == 0) {
        $("#show-more").fadeOut('slow');
      }
    });
  };

  init();
  return {};
}();

var autoSliderSettings = function () {
  var init = function init() {
    $(document).ready(function () {
      if ($(".auto-slider").length) {
        slider();
      }
    });
  },
      slider = function slider() {
    gsap.registerPlugin(Draggable, InertiaPlugin);
    var slideDelay = 5;
    var slideDuration = 0.3;
    var wrap = true;
    var slides = document.querySelectorAll(".slide");
    var prevButton = document.querySelector("#prevButton");
    var nextButton = document.querySelector("#nextButton");
    var progressWrap = gsap.utils.wrap(0, 1);
    var numSlides = slides.length;
    gsap.set(slides, {
      backgroundColor: "random([red, blue, green, purple, orange, yellow, lime, pink])",
      xPercent: function xPercent(i) {
        return i * 100;
      }
    });
    var wrapX = gsap.utils.wrap(-100, (numSlides - 1) * 100);
    var timer = gsap.delayedCall(slideDelay, autoPlay);
    var animation = gsap.to(slides, {
      xPercent: "+=" + numSlides * 100,
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
      trigger: ".slides-container",
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
    prevButton.addEventListener("click", function () {
      animateSlides(1);
    });
    nextButton.addEventListener("click", function () {
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
      var snapped = gsap.utils.snap(slideWidth, value);
      return wrap ? snapped : gsap.utils.clamp(-slideWidth * (numSlides - 1), 0, snapped);
    }

    function resize() {
      var norm = gsap.getProperty(proxy, "x") / wrapWidth || 0;
      slideWidth = slides[0].offsetWidth;
      wrapWidth = slideWidth * numSlides;
      wrap || draggable.applyBounds({
        minX: -slideWidth * (numSlides - 1),
        maxX: 0
      });
      gsap.set(proxy, {
        x: norm * wrapWidth
      });
      animateSlides(0);
      slideAnimation.progress(1);
    }
  };

  init();
  return {};
}();

var codexArriPage = function () {
  var init = function init() {
    $(document).ready(function () {
      codexArriPageFunction();
    });
    document.fonts.ready.then(function () {});
  },
      codexArriPageFunction = function codexArriPageFunction() {// console.log('hello')
  };

  init();
  return {};
}();

var formSettings = function () {
  var init = function init() {
    $(document).ready(function () {
      if ($("#form").length) {
        formSettings();
      }
    });
  },
      formSettings = function formSettings() {
    $('.customText').each(function () {
      var $this = $(this),
          optionWrapper = $(this).children('.options'),
          options = $(this).children('.options').children('p'),
          input = $(this).children('input');
      input.click(function () {
        optionWrapper.addClass('active');
      });
      input.on('focusout', function () {
        optionWrapper.removeClass('active');
      });
      options.click(function (e) {
        input.val(e.target.innerText);
        optionWrapper.removeClass('active');
      });
    });
  };

  init();
  return {};
}(); // let genericTemplateApp = (() => {
//     let init = () => {
//         $(document).ready(function() { });
//         document.fonts.ready.then(function () { });
//     },
//     hideUnusedBreakerImages = () => {
//       $(".breaker .grid img").each((i, elem) => {
//         const src = elem.getAttribute('src')
//         if (!src) {
//           elem.parentNode.parentNode.style.display = 'none';
//         }
//       });
//     },
//     lightOrDark = () => {
//         const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
//         if (prefersDarkScheme.matches) {
//             document.body.classList.add("dark-theme");
//         } else {
//             document.body.classList.remove("dark-theme");
//         }
//     }
//     ;
//     init();
//     return {};
// })();


var greenSockScrollApp = function () {
  var init = function init() {
    $(function () {
      if ($('body.green-sock-scroll-pin').length) {
        greenSockScrollPin();
      }
    });
  },
      greenSockScrollPin = function greenSockScrollPin() {
    gsap.registerPlugin(ScrollTrigger);
    gsap.defaults({
      ease: "none",
      duration: 2
    });
    var tLeft = gsap.timeline();
    tLeft.from(".left-two", {
      yPercent: 100
    }).from(".left-three", {
      yPercent: 100
    }).from(".left-four", {
      yPercent: 100
    });
    ScrollTrigger.create({
      animation: tLeft,
      trigger: "#left-wrapper",
      start: "top top",
      end: "+=4000",
      scrub: true,
      pin: true,
      anticipatePin: 1
    });
    var tRight = gsap.timeline();
    tRight.to(".right-one", {
      opacity: 0,
      delay: 0.3,
      duration: 0.2
    }).fromTo(".right-two", {
      y: 100,
      opacity: 0,
      ease: "power2"
    }, {
      y: 0,
      opacity: 1
    }).fromTo(".right-three", {
      y: 100,
      opacity: 0,
      ease: "power2"
    }, {
      y: 0,
      opacity: 1
    }).fromTo(".right-four", {
      y: 100,
      opacity: 0,
      ease: "power2"
    }, {
      y: 0,
      opacity: 1
    }); // pin the container and link the animation to the scrollbar (scrub: true).

    ScrollTrigger.create({
      animation: tRight,
      trigger: "#right-wrapper",
      start: "top top",
      end: "+=4000",
      scrub: true,
      pin: true,
      anticipatePin: 1
    });
  };

  init();
  return {};
}();

var greenSockApp = function () {
  var init = function init() {
    $(function () {
      if ($('body.green-sock').length) {
        greenSock();
      }
    });
  },
      greenSock = function greenSock() {
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
  };

  init();
  return {};
}();

var pixHomeSettings = function () {
  var init = function init() {
    $(document).ready(function () {
      if ($('.pix-home').length) {
        javascriptChecker();
        panelAnimation();
        caseStudySlider();
        testimonialSlider();
        menuHandler();
        textTreatment();
      }
    });
  },
      javascriptChecker = function javascriptChecker() {
    var html = document.querySelector("html");
    html.classList.remove('no-js');
    html.classList.add('js');
  };

  menuHandler = function menuHandler() {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
    var scrollDeadzone = 80;
    var lastScrollTop = 0;
    var menuTrigger = ScrollTrigger.create;
    lastScrollTop = $(window).scrollTop();
    $(window).scroll(menuScrollHandler);

    function menuScrollHandler(e) {
      scrollTop = $(e.currentTarget).scrollTop();

      if (scrollTop > lastScrollTop + scrollDeadzone) {
        hideMenu();
        lastScrollTop = scrollTop;
        return;
      }

      if (scrollTop < lastScrollTop - scrollDeadzone || scrollTop < scrollDeadzone) {
        showMenu();
        lastScrollTop = scrollTop;
        return;
      }
    }

    function hideMenu() {
      gsap.to(".strip", {
        y: "-100%"
      });
    }

    function showMenu() {
      gsap.to(".strip", {
        y: "0%"
      });
    }

    gsap.utils.toArray("#page-navigation a ").forEach(function (a) {
      a.addEventListener("click", function (e) {
        e.preventDefault();
        var id = e.target.getAttribute("href"),
            trigger = ScrollTrigger.getById(id);
        gsap.to(window, {
          duration: 1,
          scrollTo: trigger ? trigger.start : id
        });
      });
    });
  };

  panelAnimation = function panelAnimation() {
    var mm = gsap.matchMedia();
    mm.add("(min-width: 1000px)", function () {
      var pinRightPanels = gsap.utils.toArray(".pinRight");
      pinRightPanels.forEach(function (pinRight, i) {
        // right panel - text - get all items to fade in
        ScrollTrigger.create({
          trigger: pinRight,
          start: "top top",
          pin: true,
          end: "max",
          pinSpacing: false,
          id: "pinRight" + i
        });
      });
      var imgTrig = gsap.utils.toArray(".rightTrigger");
      var panelAnimation = gsap.utils.toArray(".panelAnimation");
      panelAnimation.forEach(function (rightBlock, i) {
        // right panel - text - get all items to fade in
        var singleAnimation = panelAnimation[i].classList.contains('singlePanelAnimation');
        rightBlock.text = rightBlock.querySelectorAll(".staggerAnimateUp"); // get all child items to stagger in

        var panelTimeline = gsap.timeline({
          defaults: {
            ease: "none"
          }
        });
        panelTimeline.fromTo(rightBlock, {
          autoAlpha: 0
        }, {
          duration: 1,
          autoAlpha: 1
        }); // fade in panel

        panelTimeline.fromTo(rightBlock.text, {
          y: '60vh',
          autoAlpha: 0
        }, {
          duration: 0.5,
          autoAlpha: 1,
          y: 0,
          stagger: 0.2
        }, ">-0.2"); // move from y 60vh to 0vh staggered

        if (singleAnimation) {
          ScrollTrigger.create({
            trigger: function trigger() {
              return imgTrig[i];
            },
            // trigger from marker of same index
            animation: panelTimeline,
            start: "top top",
            end: "bottom bottom",
            toggleActions: "complete none none reset",
            markers: true
          });
        } else {
          ScrollTrigger.create({
            trigger: function trigger() {
              return imgTrig[i];
            },
            // trigger from marker of same index
            animation: panelTimeline,
            start: "top top",
            end: "bottom bottom",
            toggleActions: "play none none reverse"
          });
        }
      });
      var pinLeftPanels = gsap.utils.toArray(".pinLeft");
      pinLeftPanels.forEach(function (panel, i) {
        // left panel - image
        ScrollTrigger.create({
          trigger: panel,
          start: "top top",
          end: "+=200%",
          pin: true,
          pinSpacing: false,
          id: "#" + panel.getAttribute("id") // used for desktop navigation

        });
      });
    });
    mm.add("(max-width: 999px)", function () {
      var pinAllMobilePanels = gsap.utils.toArray(".pinAllMobile");
      pinAllMobilePanels.forEach(function (panel, i) {
        ScrollTrigger.create({
          trigger: panel,
          end: "max",
          start: "top top",
          pin: true,
          pinSpacing: false,
          id: "#" + panel.getAttribute("id") // used for mobile navigation

        });
      });
    }); // let breakers = gsap.utils.toArray(".breaker");
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

    var quotes = gsap.utils.toArray(".quoteBlock");
    quotes.forEach(function (quote, i) {
      quotes.text = quote.querySelectorAll(".inner");
      quotes.overlay = quote.querySelectorAll(".overlay");
      var quotesTl = gsap.timeline({
        defaults: {
          ease: "none"
        },
        onComplete: function onComplete() {
          console.log('quotes - finish');
        }
      });
      quotesTl.add('start').fromTo(quotes.text, {
        y: '60vh',
        autoAlpha: 0
      }, {
        duration: 0.8,
        autoAlpha: 1,
        y: 0
      }, 'start').fromTo(quote.overlay, {
        autoAlpha: 0
      }, {
        duration: 1,
        autoAlpha: 1
      }, ">-0.2");
      ScrollTrigger.create({
        animation: quotesTl,
        trigger: quote,
        start: "bottom bottom",
        end: "top top-=50%",
        pin: true,
        pinSpacing: false,
        toggleActions: "play none none reverse"
      });
    });
  };

  caseStudySlider = function caseStudySlider() {
    console.log('caseStudySlider');
    gsap.registerPlugin(Draggable, InertiaPlugin);
    var slideDelay = 5;
    var slideDuration = 1;
    var snapX;
    var slides = document.querySelectorAll(".slide.case-study");
    var progressWrap = gsap.utils.wrap(0, 1);
    var indexWrap = gsap.utils.wrap(0, slides.length);
    var numSlides = slides.length;
    gsap.set(slides, {
      xPercent: function xPercent(i) {
        return i * 100;
      }
    });
    var wrap = gsap.utils.wrap(-100, (numSlides - 1) * 100);
    var timer = gsap.delayedCall(slideDelay, autoPlay);
    var animation = gsap.timeline({
      repeat: -1
    });
    animation.to(slides, {
      xPercent: "-=" + numSlides * 100,
      duration: numSlides,
      ease: "none",
      modifiers: {
        xPercent: wrap
      }
    }, 0); // animation.to('.slide .inner-slide ', {
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
    var first = 1;
    var playButton = document.querySelector(".play");
    var pauseButton = document.querySelector(".pause");
    var allProgress = $('.bg-progress');
    var navBlocks = gsap.utils.toArray(".nav-block");
    var currentIndex = 0;
    console.log(currentIndex);
    resize();
    var draggable = new Draggable(proxy, {
      type: "x",
      trigger: ".case-study-container",
      inertia: true,
      maxDuration: 0.75,
      minDuration: 0.1,
      onPress: function onPress() {
        updateDraggable;
        onPressAnimation();
      },
      onDrag: updateProgress,
      onThrowUpdate: updateProgress,
      onThrowComplete: onThrowCompleteAnimation,
      allowContextMenu: true,
      allowNativeTouchScrolling: true,
      snap: {
        x: function x(value) {
          return snapX(value, draggable.deltaX < 0 ? -1 : 1);
        }
      }
    });

    function onPressAnimation() {
      var currentIndex = animation.progress() * numSlides;
      console.log('onPressAnimation' + navBlocks + ' ' + navBlocks[currentIndex]); // allProgress[currentIndex].style.width = 0;

      navBlocks[currentIndex].classList.remove('active');

      for (var i = 0; i < numSlides; i++) {
        if (i !== currentIndex) {
          var slideContent = slides[i].querySelectorAll('.inner-slide');
          gsap.set(slideContent, {
            y: 30,
            opacity: 0
          });
        }
      }
    }

    function onThrowCompleteAnimation() {
      var currentIndex = animation.progress() * numSlides;
      console.log(currentIndex);
      var slideContent = slides[currentIndex].querySelectorAll('.inner-slide');
      gsap.to(slideContent, {
        y: 0,
        opacity: 1,
        stagger: 0.2
      });
      timer.restart(true);
      updateNav(currentIndex);
    }

    window.addEventListener("resize", resize);
    document.querySelector("#caseStudyNextButton").addEventListener("click", function () {
      timer.restart(true);
      animateSlides(-1);
    });
    pauseButton.addEventListener("click", function (e) {
      e.target.parentNode.childNodes[3].classList.remove('hidden');
      e.target.classList.add('hidden');
      var currentIndex = animation.progress() * numSlides;
      navBlocks.forEach(function (link, i) {
        var progress = link.childNodes[3];

        if (i === currentIndex) {
          progress.classList.add('complete');
        } else {
          progress.classList.remove('complete');
        }
      });
      timer.kill();
    });
    playButton.addEventListener("click", function (e) {
      $(allProgress).removeClass('complete');
      e.target.parentNode.childNodes[1].classList.remove('hidden');
      e.target.classList.add('hidden');
      autoPlay();
    });
    navBlocks.forEach(function (link, i) {
      link.addEventListener("click", function () {
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
      var currentIndex = animation.progress() * numSlides;

      if (currentIndex !== index) {
        var direction = index - currentIndex;
        var x = snapX(gsap.getProperty(proxy, "x") + direction * -slideWidth);
        var slideContent = slides[index].querySelectorAll('.inner-slide');
        slideAnimation = gsap.to(proxy, {
          x: x,
          duration: slideDuration,
          onStart: function onStart() {
            updateNav(index);

            for (var i = 0; i < numSlides; i++) {
              if (i !== currentIndex) {
                var _slideContent = slides[i].querySelectorAll('.inner-slide');

                gsap.set(_slideContent, {
                  y: 30,
                  opacity: 0
                });
              }
            }
          },
          onUpdate: updateProgress,
          onComplete: function onComplete() {
            return gsap.to(slideContent, {
              y: 0,
              opacity: 1,
              stagger: 0.2
            });
          }
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
        onStart: function onStart() {
          gsap.set(slideContent, {
            y: 30,
            opacity: 0
          });
          updateNav(index);
        },
        onUpdate: function onUpdate() {
          updateProgress();
        },
        onComplete: function onComplete() {
          return gsap.to(slideContent, {
            y: 0,
            opacity: 1,
            stagger: 0.2
          });
        }
      });
    }

    function updateProgress() {
      // console.log(gsap.getProperty(proxy, "x") / -wrapWidth, "wrapped", progressWrap(gsap.getProperty(proxy, "x") / -wrapWidth))
      animation.progress(progressWrap(gsap.getProperty(proxy, "x") / -wrapWidth));
    }

    function updateNav(currentIndex) {
      // currentIndex = animation.progress() * numSlides;
      allProgress.removeClass('complete');
      playButton.classList.add('hidden');
      pauseButton.classList.remove('hidden');
      console.log('updateNav' + currentIndex);
      navBlocks.forEach(function (link, i) {
        var progress = link.childNodes[3];
        var navAnimation = gsap.timeline();

        if (i === currentIndex) {
          link.classList.add('active');
          navAnimation.fromTo(progress, {
            width: '0',
            ease: "none"
          }, {
            width: '100%',
            ease: "none",
            // duration: function (){
            //   if(currentIndex === 0 && first ===1){
            //     first = 0;
            //     return slideDelay
            //   }else{
            //     return slideDelay-slideDuration
            //   }
            // },
            duration: function duration() {
              return slideDelay;
            }
          }, 0);
        } else {
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
      var norm = gsap.getProperty(proxy, "x") / wrapWidth || 0;
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
      var snap = gsap.utils.snap(increment);
      return function (value, direction) {
        var threshold = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1e-3;
        var snapped = snap(value);
        return !direction || Math.abs(snapped - value) < threshold || snapped - value < 0 === direction < 0 ? snapped : snap(direction < 0 ? value - increment : value + increment);
      };
    }
  };

  testimonialSlider = function testimonialSlider() {
    gsap.registerPlugin(Draggable, InertiaPlugin);
    var snapX;
    var slideDelay = 5;
    var slideDuration = 0.3;
    var wrap = true;
    var slides = document.querySelectorAll(".slide.testimonial");
    var progressWrap = gsap.utils.wrap(0, 1);
    var numSlides = slides.length;
    gsap.set(slides, {
      xPercent: function xPercent(i) {
        return i * 100;
      }
    });
    var wrapX = gsap.utils.wrap(-100, (numSlides - 1) * 100);
    var timer = gsap.delayedCall(slideDelay, autoPlay);
    var animation = gsap.to(slides, {
      xPercent: "+=" + numSlides * 100,
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
      type: "x",
      // snap: {
      //   x: snapX
      // }
      snap: {
        x: function x(value) {
          return snapX(value, draggable.deltaX < 0 ? -1 : 1);
        }
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
      var norm = gsap.getProperty(proxy, "x") / wrapWidth || 0;
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
      var snap = gsap.utils.snap(increment);
      return function (value, direction) {
        var threshold = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1e-3;
        var snapped = snap(value);
        return !direction || Math.abs(snapped - value) < threshold || snapped - value < 0 === direction < 0 ? snapped : snap(direction < 0 ? value - increment : value + increment);
      };
    } // function snapX(value) {
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

  };

  fadeTestimonials = function fadeTestimonials() {
    gsap.registerPlugin(Draggable, InertiaPlugin);
    var slideDelay = 1.5;
    var slideDuration = 0.3;
    var wrap = true;
    var slides = document.querySelectorAll(".testimonials-container .slide");
    var progressWrap = gsap.utils.wrap(0, 1);
    var numSlides = slides.length;
    gsap.set(slides, {
      xPercent: function xPercent(i) {
        return i * 100;
      }
    });
    var wrapX = gsap.utils.wrap(-100, (numSlides - 1) * 100);
    var timer = gsap.delayedCall(slideDelay, autoPlay);
    var animation = gsap.to(slides, {
      xPercent: "+=" + numSlides * 100,
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
      var snapped = gsap.utils.snap(slideWidth, value);
      return wrap ? snapped : gsap.utils.clamp(-slideWidth * (numSlides - 1), 0, snapped);
    }

    function resize() {
      var norm = gsap.getProperty(proxy, "x") / wrapWidth || 0;
      slideWidth = slides[0].offsetWidth;
      wrapWidth = slideWidth * numSlides;
      wrap || draggable.applyBounds({
        minX: -slideWidth * (numSlides - 1),
        maxX: 0
      });
      gsap.set(proxy, {
        x: norm * wrapWidth
      });
      animateSlides(0);
      slideAnimation.progress(1);
    }
  };

  textTreatment = function textTreatment() {
    function kernText() {
      // split text to target with styles
      $(".kernText").each(function (i, e) {
        // if(wordCount($(e).text()) < 5){
        split = new SplitText(e, {
          type: "chars, words",
          reduceWhiteSpace: false
        });
        split.chars.forEach(function (e) {
          $(e).attr("data-char", e.innerText);
        }); // }
      });
    }

    function orphanPreventor() {
      // add non breaking space between the last words in text blocks
      $('.orphanPrevent, .parentOrphanPrevent *').each(function (i, d) {
        // larger sized fonts should skip treatment on shorter sentances and last words longer than 10 chars
        if (d.tagName === 'H1' || d.tagName === 'H2' || d.tagName === 'H3') {
          if (wordCount($(d).text()) > 3) {
            // if sentance length is longer than 3 words
            var lastWord = $(d).text().split(" ").slice(-1);

            if (lastWord[0].length < 10) {
              // if last word is shorter than 10 characters
              $(d).html($(d).text().replace(/\s(?=[^\s]*$)/g, "&nbsp;"));
            }
          } // typically smaller sized fonts should all be treated

        } else if (d.tagName === 'P' || d.tagName === 'H4' || d.tagName === 'H5' || d.tagName === 'H6' || d.tagName === 'H6' || d.tagName === 'BLOCKQUOTE') {
          $(d).html($(d).text().replace(/\s(?=[^\s]*$)/g, "&nbsp;"));
        }
      });
    }

    function wordCount(str) {
      return str.split(" ").length;
    }

    kernText();
    orphanPreventor();
  };

  init();
  return {};
}();

var leftRightSettings = function () {
  var init = function init() {
    $(document).ready(function () {
      if ($('body.left-right-panel').length) {// initPinning();
      }
    });
  },
      initPinning = function initPinning() {
    gsap.utils.toArray(".animate-panel").forEach(function (section, i) {
      // IMAGE ANIMATION
      section.img = section.querySelector(".image-block"); // ScrollTrigger.create({
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
      var fadeAnim = gsap.to(section.text, {
        duration: 0.5,
        autoAlpha: 1
      });
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
          fontWeight: "bold",
          indent: 0
        }
      });
    });
  };

  init();
  return {};
}();

var listingPage = function () {
  var init = function init() {
    $(document).ready(function () {
      cardFadeScroll();
      previewPlayer();
    });
  },
      cardFadeScroll = function cardFadeScroll() {
    // fade cards images in on scroll
    var images = gsap.utils.toArray('.image-wrapper');
    images.forEach(function (image, i) {
      var fadeAnim = gsap.to(image, {
        duration: 0.5,
        autoAlpha: 1
      });
      ScrollTrigger.create({
        trigger: image,
        animation: fadeAnim,
        toggleActions: 'play none none none',
        once: true
      });
    });
    gsap.utils.toArray(".card").forEach(function (card, i) {
      var tl = gsap.timeline({
        defaults: {
          ease: "none"
        }
      });
      ScrollTrigger.create({
        trigger: card,
        animation: tl,
        toggleActions: 'play none none reverse',
        toggleClass: "active",
        markers: true,
        scrub: true
      });
      tl.to(card, {
        width: "100%"
      }).to(card, {
        width: "60%"
      });
      var innerCard = $(card).children(".inner-card");
      var tl2 = gsap.timeline({
        defaults: {
          ease: "none"
        }
      });
      ScrollTrigger.create({
        trigger: card,
        animation: tl2,
        toggleActions: 'play none none reverse',
        toggleClass: "active",
        markers: true,
        scrub: true
      });
      tl2.to(innerCard, {
        scale: 1.2,
        transformOrigin: "left"
      }).to(innerCard, {
        scale: 1
      });
    });
  };

  previewPlayer = function previewPlayer() {
    var controls = "\n            <div class=\"plyr__controls\">\n               <button type=\"button\" class=\"plyr__control\" data-plyr=\"fullscreen\">\n                  <svg class=\"icon--pressed\" role=\"presentation\"><use xlink:href=\"#plyr-exit-fullscreen\"></use></svg>\n                  <svg class=\"icon--not-pressed\" role=\"presentation\"><use xlink:href=\"#plyr-enter-fullscreen\"></use></svg>\n              </button>\n              <button type=\"button\" class=\"plyr__control\" aria-label=\"Play, {title}\" data-plyr=\"play\">\n                  <svg class=\"icon--pressed\" role=\"presentation\"><use xlink:href=\"#plyr-pause\"></use></svg>\n                  <svg class=\"icon--not-pressed\" role=\"presentation\"><use xlink:href=\"#plyr-play\"></use></svg>\n              </button>\n              <button type=\"button\" class=\"plyr__control\" aria-label=\"Mute\" data-plyr=\"mute\">\n                  <svg class=\"icon--pressed\" role=\"presentation\"><use xlink:href=\"#plyr-muted\"></use></svg>\n                  <svg class=\"icon--not-pressed\" role=\"presentation\"><use xlink:href=\"#plyr-volume\"></use></svg>\n              </button>\n              <div class=\"plyr__progress\">\n                  <input data-plyr=\"seek\" type=\"range\" min=\"0\" max=\"100\" step=\"0.01\" value=\"0\" aria-label=\"Seek\">\n                  <progress class=\"plyr__progress__buffer\" min=\"0\" max=\"100\" value=\"0\">% buffered</progress>\n              </div>\n              <div class=\"plyr__time plyr__time--current\" aria-label=\"Current time\">00:00</div>\n            </div>\n        ";
    var options = {
      controls: false,
      invertTime: true,
      hideControls: true,
      disableContextMenu: true,
      autoplay: true,
      muted: true,
      storage: {
        enabled: false
      }
    };
    var potentialPlayers = document.getElementsByClassName("card");

    var playerHandler = function playerHandler() {
      var id = this.getAttribute("id");
      var panelSelector = "#" + id + " .preview-panel";
      var player = new Plyr("#" + id + ".preview-player", options); // create player

      gsap.to(panelSelector, {
        duration: 0.5,
        autoAlpha: 1
      }); // animate opacity

      function on(selector, type, callback) {
        document.querySelector(selector).addEventListener(type, callback, false);
      }

      on("#" + id, 'mouseleave', function () {
        // event listener to pause when leaving player
        gsap.to(panelSelector, {
          duration: 0.5,
          opacity: 0,
          onComplete: mouseLeaveTweenComplete
        }); // animate opacity

        function mouseLeaveTweenComplete() {
          // on animation complete
          player.pause();
        }
      });
      on("#" + id, 'mouseenter', function () {
        // event listener to play when re-entering the player
        player.play();
        gsap.to(panelSelector, {
          duration: 0.5,
          autoAlpha: 1
        }); // animate opacity
      });
    };

    "click mouseenter".split(" ").forEach(function (e) {
      // add event listeners to all potential players to create player
      for (var i = 0; i < potentialPlayers.length; i++) {
        potentialPlayers[i].addEventListener(e, playerHandler, {
          passive: true
        });
      }
    });
  };

  init();
  return {};
}();

var videoPlaylist = function () {
  var init = function init() {
    $(document).ready(function () {
      if ($("#video_player").length) {
        videoPlaylist();
      }
    });
  },
      videoPlaylist = function videoPlaylist() {
    var controls = "\n        <div class=\"plyr__controls\">\n          <button type=\"button\" class=\"plyr__control\" aria-label=\"Play, {title}\" data-plyr=\"play\">\n              <svg class=\"icon--pressed\" role=\"presentation\"><use xlink:href=\"#plyr-pause\"></use></svg>\n              <svg class=\"icon--not-pressed\" role=\"presentation\"><use xlink:href=\"#plyr-play\"></use></svg>\n              <span class=\"label--pressed plyr__tooltip\" role=\"tooltip\">Pause</span>\n              <span class=\"label--not-pressed plyr__tooltip\" role=\"tooltip\">Play</span>\n          </button>\n          <button type=\"button\" class=\"plyr__control\" aria-label=\"Mute\" data-plyr=\"mute\">\n              <svg class=\"icon--pressed\" role=\"presentation\"><use xlink:href=\"#plyr-muted\"></use></svg>\n              <svg class=\"icon--not-pressed\" role=\"presentation\"><use xlink:href=\"#plyr-volume\"></use></svg>\n              <span class=\"label--pressed plyr__tooltip\" role=\"tooltip\">Unmute</span>\n              <span class=\"label--not-pressed plyr__tooltip\" role=\"tooltip\">Mute</span>\n          </button>\n          <div class=\"plyr__progress\">\n              <input data-plyr=\"seek\" type=\"range\" min=\"0\" max=\"100\" step=\"0.01\" value=\"0\" aria-label=\"Seek\">\n              <progress class=\"plyr__progress__buffer\" min=\"0\" max=\"100\" value=\"0\">% buffered</progress>\n              <span role=\"tooltip\" class=\"plyr__tooltip\">00:00</span>\n          </div>\n\n          <div class=\"plyr__time plyr__time--current\" aria-label=\"Current time\">00:00</div>\n\n          <button type=\"button\" class=\"plyr__control\" data-plyr=\"fullscreen\">\n              <svg class=\"icon--pressed\" role=\"presentation\"><use xlink:href=\"#plyr-exit-fullscreen\"></use></svg>\n              <svg class=\"icon--not-pressed\" role=\"presentation\"><use xlink:href=\"#plyr-enter-fullscreen\"></use></svg>\n              <span class=\"label--pressed plyr__tooltip\" role=\"tooltip\">Exit fullscreen</span>\n              <span class=\"label--not-pressed plyr__tooltip\" role=\"tooltip\">Enter fullscreen</span>\n          </button>\n      </div>\n      ";
    var player = new Plyr('#video', {
      controls: controls,
      blankVideo: 'blank.mp4',
      fullscreen: {
        enabled: false
      },
      hideControls: true,
      keyboard: {
        focused: true,
        global: false
      },
      storage: {
        enabled: false
      },
      seekTime: 10,
      resetOnEnd: true
    });
    var video_player = document.getElementById("video_player"),
        links = video_player.getElementsByTagName('a');

    for (var i = 0; i < links.length; i++) {
      links[i].onclick = handler;
    }

    function handler(e) {
      e.preventDefault();
      videotarget = this.getAttribute("href");
      filename = videotarget.substr(0, videotarget.lastIndexOf('.')) || videotarget;
      video = document.querySelector("#video_player video");
      video.removeAttribute("poster");
      source = document.querySelectorAll("#video_player video source");
      source[0].src = filename + ".mp4";
      video.load();
      video.play();
    }
  };

  init();
  return {};
}();

var templateApp = function () {
  var init = function init() {
    $(document).ready(function () {
      if ($(".videoOne").length) {
        video();
      }
    });
  },
      video = function video() {
    var controls = "\n        <div class=\"plyr__controls\">\n          <button type=\"button\" class=\"plyr__control\" aria-label=\"Play, {title}\" data-plyr=\"play\">\n              <svg class=\"icon--pressed\" role=\"presentation\"><use xlink:href=\"#plyr-pause\"></use></svg>\n              <svg class=\"icon--not-pressed\" role=\"presentation\"><use xlink:href=\"#plyr-play\"></use></svg>\n              <span class=\"label--pressed plyr__tooltip\" role=\"tooltip\">Pause</span>\n              <span class=\"label--not-pressed plyr__tooltip\" role=\"tooltip\">Play</span>\n          </button>\n          <button type=\"button\" class=\"plyr__control\" aria-label=\"Mute\" data-plyr=\"mute\">\n              <svg class=\"icon--pressed\" role=\"presentation\"><use xlink:href=\"#plyr-muted\"></use></svg>\n              <svg class=\"icon--not-pressed\" role=\"presentation\"><use xlink:href=\"#plyr-volume\"></use></svg>\n              <span class=\"label--pressed plyr__tooltip\" role=\"tooltip\">Unmute</span>\n              <span class=\"label--not-pressed plyr__tooltip\" role=\"tooltip\">Mute</span>\n          </button>\n          <div class=\"plyr__progress\">\n              <input data-plyr=\"seek\" type=\"range\" min=\"0\" max=\"100\" step=\"0.01\" value=\"0\" aria-label=\"Seek\">\n              <progress class=\"plyr__progress__buffer\" min=\"0\" max=\"100\" value=\"0\">% buffered</progress>\n              <span role=\"tooltip\" class=\"plyr__tooltip\">00:00</span>\n          </div>\n\n          <div class=\"plyr__time plyr__time--current\" aria-label=\"Current time\">00:00</div>\n\n          <button type=\"button\" class=\"plyr__control\" data-plyr=\"fullscreen\">\n              <svg class=\"icon--pressed\" role=\"presentation\"><use xlink:href=\"#plyr-exit-fullscreen\"></use></svg>\n              <svg class=\"icon--not-pressed\" role=\"presentation\"><use xlink:href=\"#plyr-enter-fullscreen\"></use></svg>\n              <span class=\"label--pressed plyr__tooltip\" role=\"tooltip\">Exit fullscreen</span>\n              <span class=\"label--not-pressed plyr__tooltip\" role=\"tooltip\">Enter fullscreen</span>\n          </button>\n      </div>\n      "; // const players = Array.from(document.querySelectorAll('.js-player')).map(p => new Plyr(p,{
    //   controls: controls,
    //   invertTime: true
    // }));

    var player = new Plyr('#player', {
      controls: controls,
      invertTime: true
    });
    $('.js-play').on('click', function () {
      player.play();
    });
    $('.js-next').on('click', function () {
      player.source = {
        type: 'video',
        title: 'Example title',
        sources: [{
          src: '76979871',
          type: 'vimeo'
        }]
      };
      player.play();
    });
  };

  init();
  return {};
}();

var templateAppTwo = function () {
  var init = function init() {
    $(document).ready(function () {
      if ($(".videoTwo").length) {
        videoTwo();
      }
    });
  },
      videoTwo = function videoTwo() {
    // This is the bare minimum JavaScript. You can opt to pass no arguments to setup.
    var player = new Plyr('#player2'); // Expose

    window.player = player;
    $('.player-src').on('click', function () {
      src = $(this).data("src");
      type = 'video/' + $(this).data("type");
      poster = $(this).data("poster") || "";
      player.source = {
        type: 'video',
        title: 'Example title',
        sources: [{
          src: src,
          type: type,
          size: 720
        }],
        poster: poster
      };
      player.play();
    });
  };

  init();
  return {};
}();

var templateAppThree = function () {
  var init = function init() {
    $(document).ready(function () {
      if ($(".videoThree").length) {// videoThree();
      }
    });
  },
      videoThree = function videoThree() {
    var controls = "\n        <div class=\"plyr__controls\">\n          <button type=\"button\" class=\"plyr__control\" aria-label=\"Play, {title}\" data-plyr=\"play\">\n              <svg class=\"icon--pressed\" role=\"presentation\"><use xlink:href=\"#plyr-pause\"></use></svg>\n              <svg class=\"icon--not-pressed\" role=\"presentation\"><use xlink:href=\"#plyr-play\"></use></svg>\n              <span class=\"label--pressed plyr__tooltip\" role=\"tooltip\">Pause</span>\n              <span class=\"label--not-pressed plyr__tooltip\" role=\"tooltip\">Play</span>\n          </button>\n          <button type=\"button\" class=\"plyr__control\" aria-label=\"Mute\" data-plyr=\"mute\">\n              <svg class=\"icon--pressed\" role=\"presentation\"><use xlink:href=\"#plyr-muted\"></use></svg>\n              <svg class=\"icon--not-pressed\" role=\"presentation\"><use xlink:href=\"#plyr-volume\"></use></svg>\n              <span class=\"label--pressed plyr__tooltip\" role=\"tooltip\">Unmute</span>\n              <span class=\"label--not-pressed plyr__tooltip\" role=\"tooltip\">Mute</span>\n          </button>\n          <div class=\"plyr__progress\">\n              <input data-plyr=\"seek\" type=\"range\" min=\"0\" max=\"100\" step=\"0.01\" value=\"0\" aria-label=\"Seek\">\n              <progress class=\"plyr__progress__buffer\" min=\"0\" max=\"100\" value=\"0\">% buffered</progress>\n              <span role=\"tooltip\" class=\"plyr__tooltip\">00:00</span>\n          </div>\n          <div class=\"plyr__time plyr__time--current\" aria-label=\"Current time\">00:00</div>\n          <button type=\"button\" class=\"plyr__control\" data-plyr=\"fullscreen\">\n              <svg class=\"icon--pressed\" role=\"presentation\"><use xlink:href=\"#plyr-exit-fullscreen\"></use></svg>\n              <svg class=\"icon--not-pressed\" role=\"presentation\"><use xlink:href=\"#plyr-enter-fullscreen\"></use></svg>\n              <span class=\"label--pressed plyr__tooltip\" role=\"tooltip\">Exit fullscreen</span>\n              <span class=\"label--not-pressed plyr__tooltip\" role=\"tooltip\">Enter fullscreen</span>\n          </button>\n        </div>\n      ";
    var players = Array.from(document.querySelectorAll('.js-player')).map(function (p) {
      return new Plyr(p, {
        controls: controls,
        invertTime: true
      });
    });
  } // mobileVideoModal = () =>{
  //   $('.popup-video').magnificPopup({
  //     type: 'iframe',
  //     mainClass: 'mfp-fade',
  //     removalDelay: 160,
  //     preloader: false,
  //     fixedContentPos: false
  //   });
  // }
  ;

  init();
  return {};
}();

var simplePinSettings = function () {
  var init = function init() {
    $(document).ready(function () {// simplePin();
    });
  },
      simplePin = function simplePin() {
    gsap.registerPlugin(ScrollTrigger);
    var pinLeftPanels = gsap.utils.toArray(".pinLeft");
    pinLeftPanels.forEach(function (panel, i) {
      // left panel - image
      panel.quote = panel.querySelectorAll(".quote-block");
      var quotesTl = gsap.timeline({
        defaults: {
          ease: "none"
        }
      });
      quotesTl.fromTo(panel.quote, {
        autoAlpha: 0
      }, {
        duration: 1,
        autoAlpha: 1
      }); // fade in panel

      ScrollTrigger.create({
        animation: quotesTl,
        trigger: panel.quote,
        pin: panel.quote,
        start: "bottom center",
        end: "top top",
        scrub: true,
        markers: {
          startColor: "green",
          endColor: "green",
          fontSize: "18px",
          fontWeight: "bold",
          indent: 50
        }
      });
    });
  };

  init();
  return {};
}(); // (function ($) {
// // Select all links with hashes
//     $('a[href*="#"]')
//         // Remove links that don't actually link to anything
//         .not('[href="#"]')
//         .not('[href="#0"]')
//         .click(function (event) {
//             // On-page links
//             if (
//                 location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
//                 &&
//                 location.hostname == this.hostname
//             ) {
//                 // Figure out element to scroll to
//                 var target = $(this.hash);
//                 target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
//                 // Does a scroll target exist?
//                 if (target.length) {
//                     // Only prevent default if animation is actually gonna happen
//                     event.preventDefault();
//                     $('html, body').animate({
//                         scrollTop: target.offset().top - 250
//                     }, 1000, function () {
//                         // Callback after animation
//                         // Must change focus!
//                         var $target = $(target);
//                         $target.focus();
//                         if ($target.is(":focus")) { // Checking if the target was focused
//                             return false;
//                         } else {
//                             $target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
//                             $target.focus(); // Set focus again
//                         }
//                         ;
//                     });
//                 }
//             }
//         });
// })(jQuery); // Fully reference jQuery after this point


var greenSockFadeApp = function () {
  var init = function init() {
    $(function () {
      if ($('body.sock-fade').length) {
        greenSockFade();
        parallaxViewport();
      }
    });
  },
      greenSockFade = function greenSockFade() {
    var imgs = gsap.utils.toArray("#backGround .image-wrap");
    var next = 5; // time to change

    var fade = 1.5; // fade time
    //only for the first

    gsap.set(imgs[0], {
      autoAlpha: 1
    }); // ====================

    function crossfade() {
      var action = gsap.timeline().to(imgs[0], {
        autoAlpha: 0,
        duration: fade
      }).to(imgs[1], {
        autoAlpha: 1,
        duration: fade
      }, 0);
      imgs.push(imgs.shift()); // start endless run

      gsap.delayedCall(next, crossfade);
    } // start the crossfade after next = 3 sec


    gsap.delayedCall(next, crossfade);
  };

  parallaxViewport = function parallaxViewport() {
    gsap.registerPlugin(ScrollTrigger);

    var getRatio = function getRatio(el) {
      return window.innerHeight / (window.innerHeight + el.offsetHeight);
    };

    gsap.utils.toArray(".image-wrap").forEach(function (section, i) {
      section.bg = section.querySelector(".img");
      gsap.fromTo(section.bg, {
        // backgroundPosition: "50% 0px"
        backgroundPosition: function backgroundPosition(i, el) {
          return parseFloat(el.getAttribute("data-hotspotX")) + "% 0px";
        }
      }, {
        // backgroundPosition: () => `50% ${window.innerHeight * (1 - getRatio(section))}px`,
        backgroundPosition: function backgroundPosition(i, el) {
          return parseFloat(el.getAttribute("data-hotspotX")) + "% ".concat(window.innerHeight * (1 - getRatio(section)), "px");
        },
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: true,
          invalidateOnRefresh: true
        }
      });
    });
  };

  init();
  return {};
}();

var textTest = function () {
  var init = function init() {
    $(function () {
      if ($('body.text-test').length) {
        modText();
      }
    });
  },
      modText = function modText() {
    $('#title').html(function (i, v) {
      v = v.replace(/Gilded Age/g, '<span class="no-break">Gilded Age</span>');
      return v;
    });
  };

  init();
  return {};
}(); // 'use strict';
// (function ($) {
//     // Block Trigger
//     $(".draw").hide();
//     $(".trigger").click(function () {
//         let $this = $(this);
//         $this.parent('.accordion-block').toggleClass('active');
//         $this.next().slideToggle( "slow","linear", function() {
//             // Animation complete.
//         });
//     });
//
//     // Channel Trigger
//     // $(".cat-content").hide();
//     // $(".channel-trigger").click(function () {
//     //     let $this = $(this);
//     //     let $catContent = $this.parent('.grid').next('.cat-content');
//     //     $this.toggleClass('active');
//     //     $catContent.toggleClass('active');
//     //     $catContent.slideToggle( "medium","linear", function() {
//     //         // Animation complete.
//     //     });
//     // });
//
// })(jQuery); // Fully reference jQuery after this point.


'use strict';

(function ($) {
  var nVer = navigator.appVersion;
  var nAgt = navigator.userAgent;
  var browserName = navigator.appName;
  var fullVersion = '' + parseFloat(navigator.appVersion);
  var majorVersion = parseInt(navigator.appVersion, 10);
  var nameOffset, verOffset, ix; // In Opera 15+, the true version is after "OPR/"

  if ((verOffset = nAgt.indexOf("OPR/")) != -1) {
    browserName = "opera";
    fullVersion = nAgt.substring(verOffset + 4);
  } // In older Opera, the true version is after "Opera" or after "Version"
  else if ((verOffset = nAgt.indexOf("Opera")) != -1) {
    browserName = "opera";
    fullVersion = nAgt.substring(verOffset + 6);
    if ((verOffset = nAgt.indexOf("Version")) != -1) fullVersion = nAgt.substring(verOffset + 8);
  } // In MSIE, the true version is after "MSIE" in userAgent
  else if ((verOffset = nAgt.indexOf("MSIE")) != -1) {
    browserName = "ie";
    fullVersion = nAgt.substring(verOffset + 5);
  } // In Chrome, the true version is after "Chrome"
  else if ((verOffset = nAgt.indexOf("Chrome")) != -1) {
    browserName = "chrome";
    fullVersion = nAgt.substring(verOffset + 7);
  } // In Safari, the true version is after "Safari" or after "Version"
  else if ((verOffset = nAgt.indexOf("Safari")) != -1) {
    browserName = "safari";
    fullVersion = nAgt.substring(verOffset + 7);
    if ((verOffset = nAgt.indexOf("Version")) != -1) fullVersion = nAgt.substring(verOffset + 8);
  } // In Firefox, the true version is after "Firefox"
  else if ((verOffset = nAgt.indexOf("Firefox")) != -1) {
    browserName = "firefox";
    fullVersion = nAgt.substring(verOffset + 8);
  } // In most other browsers, "name/version" is at the end of userAgent
  else if ((nameOffset = nAgt.lastIndexOf(' ') + 1) < (verOffset = nAgt.lastIndexOf('/'))) {
    browserName = nAgt.substring(nameOffset, verOffset);
    fullVersion = nAgt.substring(verOffset + 1);

    if (browserName.toLowerCase() == browserName.toUpperCase()) {
      browserName = navigator.appName;
    }
  } // trim the fullVersion string at semicolon/space if present


  if ((ix = fullVersion.indexOf(";")) != -1) fullVersion = fullVersion.substring(0, ix);
  if ((ix = fullVersion.indexOf(" ")) != -1) fullVersion = fullVersion.substring(0, ix);
  majorVersion = parseInt('' + fullVersion, 10);

  if (isNaN(majorVersion)) {
    fullVersion = '' + parseFloat(navigator.appVersion);
    majorVersion = parseInt(navigator.appVersion, 10);
  }

  $('html').addClass(browserName + '-' + majorVersion);
})(jQuery); // Fully reference jQuery after this point


var columnScrollMarginStaggerSetting = function () {
  var init = function init() {
    $(document).ready(function () {
      if ($(".column-scroll-margin-stagger").length) {
        columnScrollMarginStagger();
      }
    });
  },
      columnScrollMarginStagger = function columnScrollMarginStagger() {
    gsap.registerPlugin(ScrollTrigger); // timeline for columns Y move

    var colsTimeLine = gsap.timeline({
      defaults: {
        ease: "power1.out"
      }
    });
    colsTimeLine.to('.col', {
      y: 10,
      stagger: 0.05
    });
    ScrollTrigger.create({
      trigger: '#trigger',
      markers: true,
      animation: colsTimeLine,
      start: "top center",
      end: "bottom bottom",
      invalidateOnRefresh: true,
      onUpdate: function onUpdate(self) {
        // self.direction === -1 ? colsTimeLine.play() : colsTimeLine.reverse()
        colsTimeLine.play();
      }
    }); // timeline for cards margin top

    var cardsTimeLine = gsap.timeline({
      defaults: {
        ease: "power1.out"
      }
    });
    cardsTimeLine.to('.image-wrapper', {
      marginTop: "1.2rem",
      stagger: 0.01
    });
    ScrollTrigger.create({
      trigger: '#trigger',
      markers: true,
      animation: cardsTimeLine,
      start: "top center",
      end: "bottom bottom",
      onUpdate: function onUpdate(self) {
        cardsTimeLine.play();
      },
      invalidateOnRefresh: true
    }); // reverse on scroll stop

    ScrollTrigger.addEventListener("scrollEnd", function () {
      colsTimeLine.reverse();
      cardsTimeLine.reverse();
    });
  };

  init();
  return {};
}();

var columnScrollStaggerSetting = function () {
  var init = function init() {
    $(document).ready(function () {
      if ($(".column-scroll-snap-stagger").length) {
        columnScrollSnapStagger();
      }
    });
  },
      columnScrollSnapStagger = function columnScrollSnapStagger() {
    gsap.registerPlugin(ScrollTrigger);
    var clamp = gsap.utils.clamp(-100, 100);
    var tl = gsap.timeline({
      defaults: {
        ease: "none"
      }
    });
    tl.to('.stack', {
      y: function y(i, el) {
        return (1 - parseFloat(el.getAttribute("data-speed"))) * ScrollTrigger.maxScroll(window);
      },
      stagger: 0.1
    });
    ScrollTrigger.create({
      trigger: '#trigger',
      start: '100px 150px',
      markers: true,
      animation: tl,
      scrub: 1,
      invalidateOnRefresh: true
    });
    var tl2 = gsap.timeline({
      defaults: {
        ease: "none"
      }
    });
    tl2.to('.image-wrapper', {
      marginTop: function marginTop(i, el) {
        return parseFloat(el.getAttribute("data-margin"));
      },
      stagger: 0.1
    }).to('.image-wrapper', {
      marginTop: 10,
      stagger: 0.1
    });
    ScrollTrigger.create({
      trigger: '#trigger',
      start: '100px 150px',
      markers: true,
      animation: tl2,
      scrub: 1,
      invalidateOnRefresh: true
    });
  };

  init();
  return {};
}();

var columnScrollSnapUpDownSetting = function () {
  var init = function init() {
    $(document).ready(function () {
      if ($(".column-scroll-snap-up-down").length) {
        columnScrollSnapUpDown();
      }
    });
  },
      columnScrollSnapUpDown = function columnScrollSnapUpDown() {
    gsap.registerPlugin(ScrollTrigger); //up animation

    var proxy = {
      y: 0
    };
    var ySetter = gsap.quickSetter(".upCol", "y", "px");
    var clamp = gsap.utils.clamp(-100, 100);
    ScrollTrigger.create({
      onUpdate: function onUpdate(self) {
        var yPos = clamp(self.getVelocity() / -150);
        proxy.y = yPos;
        gsap.to(proxy, {
          y: 0,
          ease: "none",
          overwrite: true,
          onUpdate: function onUpdate() {
            return ySetter(proxy.y);
          }
        });
      }
    }); //down animation

    var proxyAlt = {
      y: 0
    };
    var ySetterAlt = gsap.quickSetter(".downCol", "y", "px");
    var clampAlt = gsap.utils.clamp(-100, 100);
    ScrollTrigger.create({
      onUpdate: function onUpdate(self) {
        var yPosAlt = clamp(self.getVelocity() / -150);
        proxyAlt.y = -yPosAlt;
        gsap.to(proxyAlt, {
          y: 0,
          ease: "none",
          overwrite: true,
          onUpdate: function onUpdate() {
            return ySetterAlt(proxyAlt.y);
          }
        });
      }
    });
  };

  init();
  return {};
}();

var columnSlideBounceSetting = function () {
  var init = function init() {
    $(document).ready(function () {
      if ($(".column-slide-bounce").length) {
        columnSlideBounce();
      }
    });
  },
      columnSlideBounce = function columnSlideBounce() {
    gsap.registerPlugin(ScrollTrigger);
    var onUpdateTL = gsap.timeline();

    function myFuncTL() {
      onUpdateTL.to(".col", {
        y: 0,
        ease: "power1.inOut",
        yoyo: true,
        stagger: {
          amount: .2,
          axis: "center",
          ease: "power1.inOut",
          from: null
        }
      });
    }

    ScrollTrigger.create({
      trigger: "#trigger",
      start: 'top top'
    });
    ScrollTrigger.addEventListener("scrollEnd", myFuncTL);
    gsap.to("[data-y]", {
      y: function y(i, el) {
        return (1 - parseFloat(el.getAttribute("data-y"))) * ScrollTrigger.maxScroll(window);
      },
      ease: "none",
      yoyo: true,
      scrollTrigger: {
        trigger: "#trigger",
        end: "max",
        scrub: 0
      }
    });
  };

  init();
  return {};
}();

var columnSlideSkewSetting = function () {
  var init = function init() {
    $(document).ready(function () {
      if ($(".column-slide-skew").length) {
        columnSlideSkew();
      }
    });
  },
      columnSlideSkew = function columnSlideSkew() {
    var proxy = {
      skew: 0
    },
        // skewSetter = gsap.quickSetter(".skewElem", "skewY", "deg"), // fast
    skewSetter = gsap.quickSetter(".skewCol", "skewY", "deg"),
        // fast
    clamp = gsap.utils.clamp(-20, 20); // don't let the skew go beyond 20 degrees.

    ScrollTrigger.create({
      onUpdate: function onUpdate(self) {
        var skew = clamp(self.getVelocity() / -300); // only do something if the skew is MORE severe. Remember, we're always tweening back to 0, so if the user slows their scrolling quickly, it's more natural to just let the tween handle that smoothly rather than jumping to the smaller skew.

        if (Math.abs(skew) > Math.abs(proxy.skew)) {
          proxy.skew = skew;
          gsap.to(proxy, {
            skew: 0,
            duration: 0.8,
            ease: "power3",
            overwrite: true,
            onUpdate: function onUpdate() {
              return skewSetter(proxy.skew);
            }
          });
        }
      }
    }); // make the right edge "stick" to the scroll bar. force3D: true improves performance

    gsap.set(".skewCol", {
      transformOrigin: "right center",
      force3D: true
    });
    gsap.to("[data-speed]", {
      y: function y(i, el) {
        return (1 - parseFloat(el.getAttribute("data-speed"))) * ScrollTrigger.maxScroll(window);
      },
      ease: "none",
      scrollTrigger: {
        trigger: "#trigger",
        end: "max",
        invalidateOnRefresh: true,
        scrub: 0
      }
    });
  };

  init();
  return {};
}();

var parallaxColumnsSetting = function () {
  var init = function init() {
    $(document).ready(function () {
      if ($(".columns-parallax").length) {
        parallaxColSlide();
      }
    });
  },
      parallaxColSlide = function parallaxColSlide() {
    gsap.registerPlugin(ScrollTrigger);
    gsap.to("[data-speed]", {
      y: function y(i, el) {
        return (1 - parseFloat(el.getAttribute("data-speed"))) * ScrollTrigger.maxScroll(window);
      },
      ease: "none",
      scrollTrigger: {
        trigger: "#trigger",
        end: "max",
        invalidateOnRefresh: true,
        scrub: 0
      }
    });
  };

  init();
  return {};
}();

var elaborateAnimationSequencesApp = function () {
  var init = function init() {
    $(function () {
      if ($('body.green-sock-elaborate-animation-sequences').length) {
        elaborateAnimationSequences();
      }
    });
  },
      elaborateAnimationSequences = function elaborateAnimationSequences() {
    var tl = gsap.timeline({
      defaults: {
        ease: "power4.inOut",
        duration: 2
      }
    });
    var flagPoles = CSSRulePlugin.getRule(".card:before");
    tl.to('h1', {
      clipPath: 'polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)',
      opacity: 1,
      y: 0,
      duration: 2.2
    }).to('.form', {
      clipPath: 'polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)',
      opacity: 1,
      y: 0
    }, '-=2').from('.card', {
      scaleY: 0,
      stagger: .2
    }, '-=2').from(flagPoles, {
      stagger: 1,
      opacity: 0,
      transform: 'translateY(100px)'
    }, '-=2');
  };

  init();
  return {};
}();

var fadeUpSetting = function () {
  var init = function init() {
    $(document).ready(function () {
      if ($(".fade-up").length) {
        fadeUp();
      }
    });
  },
      fadeUp = function fadeUp() {
    gsap.registerPlugin(ScrollTrigger);
    gsap.utils.toArray(".fadeUp").forEach(function (section, i) {
      gsap.fromTo(section, {
        y: 20,
        opacity: 0
      }, {
        y: 0,
        opacity: 1,
        ease: "back.out(1.7)",
        duration: 0.6,
        scrollTrigger: {
          trigger: section,
          start: "+=150 90%",
          end: "+=200 40%",
          markers: true
        }
      });
    });
  };

  init();
  return {};
}();

var iconBase = './uploads/map-icon.png';

if ($('.map').length) {
  var initmultipleMaps = function initmultipleMaps() {
    $('.map').each(function (index, Element) {
      var params = $(Element).text().split(",");
      var target = {
        lat: parseFloat(params[0]),
        lng: parseFloat(params[1])
      };
      var zoom = parseFloat(params[2]);
      var mapID = params[3];
      var iconColour = params[4];
      var addressName = params[5] + params[6] + params[7] + params[8];
      var mapStringLit = "".concat(mapID);
      var myOptions = {
        zoom: zoom,
        mapId: mapStringLit,
        center: target,
        disableDefaultUI: true
      };
      var map = new google.maps.Map(Element, myOptions);
      var icon = {
        path: "M23.13,8a11.45,11.45,0,0,0-10.5-8c-5.15-.23-9,2.07-11.39,6.65A12.67,12.67,0,0,0,3,20.31c2.67,3,5.47,6,8.21,8.94L12,30l.77-.78q3.84-4.21,7.69-8.42A12.26,12.26,0,0,0,23.13,8ZM11.86,17.79a5.66,5.66,0,0,1-5.3-5.61,5.52,5.52,0,0,1,5.64-5.6,5.62,5.62,0,0,1-.34,11.21Z",
        fillColor: iconColour,
        fillOpacity: 1,
        anchor: new google.maps.Point(12, 24),
        strokeWeight: 0,
        scale: 1.5
      };
      var marker = new google.maps.Marker({
        position: target,
        map: map,
        icon: icon
      });
      var infowindow = new google.maps.InfoWindow({
        content: addressName + ' <a target="_blank" href="http://maps.google.com/?q=' + addressName + '">Get Directions</a>'
      });
      marker.addListener("click", function () {
        infowindow.open(map, marker);
      });
    });
  };
}

if ($('#map').length) {
  var initmultiplePins = function initmultiplePins() {
    var parentMapInfo = $("#map > .map-info");
    var mapParams = parentMapInfo.text().split(",");
    var zoom = parseFloat(mapParams[0]);
    var mapID = mapParams[1];
    var mapStringLit = "".concat(mapID);
    var maps = $("#map > .location");
    var location = [];
    maps.each(function (index, Element) {
      var params = $(Element).text().split(",");
      location.push({
        lat: parseFloat(params[0]),
        lng: parseFloat(params[1]),
        addressName: params[3] + params[4] + params[5],
        iconColour: params[2]
      });
    }); //First location defines the Map Center

    var center = new google.maps.LatLng(location[0].lat, location[0].lng);
    var myOptions = {
      zoom: zoom,
      mapId: mapStringLit,
      center: center,
      disableDefaultUI: true
    };
    var map = new google.maps.Map(document.getElementById('map'), myOptions);
    var infowindow = new google.maps.InfoWindow({});
    var marker, count;

    for (count = 0; count < location.length; count++) {
      var icon = {
        path: "M23.13,8a11.45,11.45,0,0,0-10.5-8c-5.15-.23-9,2.07-11.39,6.65A12.67,12.67,0,0,0,3,20.31c2.67,3,5.47,6,8.21,8.94L12,30l.77-.78q3.84-4.21,7.69-8.42A12.26,12.26,0,0,0,23.13,8ZM11.86,17.79a5.66,5.66,0,0,1-5.3-5.61,5.52,5.52,0,0,1,5.64-5.6,5.62,5.62,0,0,1-.34,11.21Z",
        fillColor: location[count].iconColour,
        fillOpacity: 1,
        anchor: new google.maps.Point(12, 24),
        strokeWeight: 0,
        scale: 1.5
      };
      marker = new google.maps.Marker({
        position: new google.maps.LatLng(location[count].lat, location[count].lng),
        map: map,
        icon: icon
      });
      google.maps.event.addListener(marker, 'click', function (marker, count) {
        return function () {
          infowindow.setContent(location[count].addressName + ' <a target="_blank" href="http://maps.google.com/?q=' + location[count].addressName + '">Get Directions</a>'); // infowindow.setContent(location[count].name);

          infowindow.open(map, marker);
        };
      }(marker, count));
    }
  };
}

'use strict';

(function ($) {
  //MOBILE NAVIGATION
  var navItems = [];
  var sideNav = $("header nav");
  var menuButton = $("#menu-icon");
  var trigger = $(".sub-menu"); // $('.nav-link').each(function () {
  //     navItems.push($(this).children());
  // })
  //
  // if ($(window).width() < mobileBreakpoint) {
  //     // $(sideNav).html(navItems);
  //     trigger.on("click", function (e) {
  //         e.stopPropagation();
  //         $(this).toggleClass('active')
  //         // $(this).parent('.nav-link').siblings().children('.sub-nav').slideUp();
  //         $(this).next('.sub-nav').slideToggle("fast").animate({easing: 'linear'});
  //     });
  // }

  menuButton.on("click", function (e) {
    $(this).toggleClass('active');
    e.stopPropagation();
    $('#header').toggleClass(headerPosition + ' active');
    sideNav.slideToggle('fast', function () {
      if ($(this).is(':visible')) $(this).css('display', 'flex');
    }).animate({
      easing: 'linear'
    });
    $('html, body').animate({
      scrollTop: 0
    }, 'fast');
  });
  $(window).scroll(function () {
    var scroll = $(window).scrollTop();

    if (scroll >= 300) {
      $('#header').addClass('scrolled');
    } else {
      $('#header').removeClass('scrolled');
    }
  });
})(jQuery); // Fully reference jQuery after this point.
// let masonryApp = (() => {
//   let init = () => {
//       $(document).ready(function () {
//         createElements();
//
//       });
//       document.body.onload = function () {
//
//       };
//     },
//     createElements = () => {
//       let html = '';
//       let imgSrc = '';
//       let length = 20;
//       let heights = [1600, 1700, 1650, 1750, 1700, 1650, 1700, 1650, 1750, 1700, 1650, 1700, 1650, 1750, 1700, 1650, 1700, 1650, 1750, 1700, 1650, 1700, 1650, 1750, 1700, 1650, 1700, 1650, 1750, 1700, 1650]
//       for (let i = 0; i < length; i++) {
//         imgSrc = "https://x2x.media/?action=asset&id=7d64bbf4-3f8a-49b7-b004-2ed21f4bd908";
//         html += '<div class="grid-item">'
//           + '<div class="inner" style="padding-bottom:' + heights[i] / 1000 * 100 + '%";>'
//           + '<div class="overlay"><h4>Name</h4><button class="button ghost small">PLAY TRAILER</button></div>'
//           + '<img src="' + imgSrc + '"/>'
//           + '</div>'
//           + '</div>'
//       }
//       renderElements(html)
//     },
//
//     renderElements = (html) => {
//       let container = document.getElementById('powered-list');
//       container.insertAdjacentHTML('beforeEnd', html);
//       let gridItem = $('.grid-item')
//       gridItem.hide();
//       gridItem.slice(0, 4).fadeIn();
//
//       arrangeElements();
//     }
//
//     arrangeElements = () => {
//       let packeryOptions = {
//         itemSelector: '.grid-item',
//         columnWidth: '.grid-sizer',
//         gutter: '.gutter-sizer',
//         percentPosition: true,
//         horizontalOrder: true,
//       };
//       $('#powered-list').packery( packeryOptions );
//
//       $("#loadMore").on('click', function (e) {
//         e.preventDefault();
//         let gridItem = '.grid-item:hidden'
//         let container = '#powered-list'
//         $(gridItem).slice(0, 4).fadeIn();
//         $(container).packery('destroy');
//         $(container).packery( packeryOptions );
//         if ($(gridItem).length == 0) {
//           $("#loadMore").fadeOut('slow');
//         }
//       });
//     }
//
//
//   init();
//   return {
//     // loadMore : ()=>{loadMore();}
//   };
// })();


var parallaxHeroSplitSetting = function () {
  var init = function init() {
    $(document).ready(function () {
      if ($(".parallax-hero-split").length) {
        parallaxSplitHero();
      }
    });
  },
      parallaxSplitHero = function parallaxSplitHero() {
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.create({
      trigger: "#hero",
      start: "top top",
      pin: true,
      pinSpacing: false
    }); // move background image wrapper in Y direction

    gsap.to("#backGround", {
      y: "-20px",
      scrollTrigger: {
        start: "top top",
        end: "bottom top",
        scrub: true,
        invalidateOnRefresh: true
      }
    });
    gsap.to('.hero-text', {
      y: '-100px',
      scrollTrigger: {
        start: "top top",
        end: "bottom top",
        scrub: true,
        invalidateOnRefresh: true
      }
    });
    gsap.to(".hero-text", {
      duration: 1,
      filter: "blur(20px)",
      ease: "none",
      scrollTrigger: {
        start: "top top",
        end: "center top",
        scrub: true
      }
    });
  };

  init();
  return {};
}();

var parallaxHeroSetting = function () {
  var init = function init() {
    $(document).ready(function () {
      if ($(".parallax-hero").length) {
        parallaxHero();
      }
    });
  },
      parallaxHero = function parallaxHero() {
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.create({
      trigger: "#hero",
      start: "top top",
      pin: true,
      pinSpacing: false
    }); // move text in Y direction

    gsap.to("#backGround", {
      y: "-20px",
      scrollTrigger: {
        start: "top top",
        end: "bottom top",
        scrub: true,
        invalidateOnRefresh: true
      }
    });
    gsap.to('.hero-text', {
      y: '-100px',
      scrollTrigger: {
        start: "top top",
        end: "bottom top",
        scrub: true,
        invalidateOnRefresh: true
      }
    }); //from now on, we can animate "blur" as a number! (Well, in browsers that support filter)

    gsap.to(".hero-text", {
      duration: 1,
      filter: "blur(20px)",
      ease: "none",
      scrollTrigger: {
        start: "top top",
        end: "bottom top",
        scrub: true,
        markers: true
      }
    });
  };

  init();
  return {};
}();

var parallaxNewSetting = function () {
  var init = function init() {
    $(document).ready(function () {
      if ($(".parallax-new").length) {
        parallaxNew();
      }
    });
  },
      parallaxNew = function parallaxNew() {
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.defaults({
      toggleActions: "restart pause resume pause",
      scroller: ".parallax-new"
    });

    var getRatio = function getRatio(el) {
      return window.innerHeight / (window.innerHeight + el.offsetHeight);
    };

    var wrap = $('#para-wrap');
    var img = $('#para-image');
    gsap.fromTo(img, {
      backgroundPosition: "50% 0px"
    }, {
      // backgroundPosition: "50% 100px",
      backgroundPosition: function backgroundPosition() {
        return "50% ".concat(window.innerHeight * (1 - getRatio(wrap)), "px");
      },
      ease: "none",
      scrollTrigger: {
        trigger: wrap,
        start: "top top",
        end: "bottom top",
        scrub: true,
        invalidateOnRefresh: true
      }
    });
  };

  init();
  return {};
}();

var parallaxSetting = function () {
  var init = function init() {
    $(document).ready(function () {
      if ($(".parallax").length) {
        parallax();
      }
    });
  },
      parallax = function parallax() {
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.defaults({
      toggleActions: "restart pause resume pause",
      scroller: ".parallax"
    });

    var getRatio = function getRatio(el) {
      return window.innerHeight / (window.innerHeight + el.offsetHeight);
    };

    gsap.utils.toArray("#para-wrap").forEach(function (section, i) {
      section.bg = section.querySelector("#para-image");
      gsap.fromTo(section.bg, {
        backgroundPosition: "50% 0px"
      }, {
        backgroundPosition: function backgroundPosition() {
          return "50% ".concat(window.innerHeight * (1 - getRatio(section)), "px");
        },
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: true,
          invalidateOnRefresh: true
        }
      });
    });
  };

  init();
  return {};
}();

function O(i) {
  return _typeof(i) == 'object' ? i : document.getElementById(i);
}

function S(i) {
  return O(i).style;
}

function C(i) {
  return document.getElementByClassName(i);
}

'use strict'; // (function ($) {
//         // $('p').each(function(){
//         //     var string = $.trim($(this).html());
//         //     string = string.replace(/ ([^ ]*) ([^ ]*)$/,'&nbsp;$1&nbsp;$2');
//         //     $(this).html(string);
//         // });
//     const controls = `
//           <div class="plyr__controls">
//             <button type="button" class="plyr__control" aria-label="Play, {title}" data-plyr="play">
//                 <svg class="icon--pressed" role="presentation"><use xlink:href="#plyr-pause"></use></svg>
//                 <svg class="icon--not-pressed" role="presentation"><use xlink:href="#plyr-play"></use></svg>
//                 <span class="label--pressed plyr__tooltip" role="tooltip">Pause</span>
//                 <span class="label--not-pressed plyr__tooltip" role="tooltip">Play</span>
//             </button>
//             <button type="button" class="plyr__control" aria-label="Mute" data-plyr="mute">
//                 <svg class="icon--pressed" role="presentation"><use xlink:href="#plyr-muted"></use></svg>
//                 <svg class="icon--not-pressed" role="presentation"><use xlink:href="#plyr-volume"></use></svg>
//                 <span class="label--pressed plyr__tooltip" role="tooltip">Unmute</span>
//                 <span class="label--not-pressed plyr__tooltip" role="tooltip">Mute</span>
//             </button>
//             <div class="plyr__progress">
//                 <input data-plyr="seek" type="range" min="0" max="100" step="0.01" value="0" aria-label="Seek">
//                 <progress class="plyr__progress__buffer" min="0" max="100" value="0">% buffered</progress>
//                 <span role="tooltip" class="plyr__tooltip">00:00</span>
//             </div>
//             <div class="plyr__time plyr__time--current" aria-label="Current time">00:00</div>
//             <button type="button" class="plyr__control" data-plyr="fullscreen">
//                 <svg class="icon--pressed" role="presentation"><use xlink:href="#plyr-exit-fullscreen"></use></svg>
//                 <svg class="icon--not-pressed" role="presentation"><use xlink:href="#plyr-enter-fullscreen"></use></svg>
//                 <span class="label--pressed plyr__tooltip" role="tooltip">Exit fullscreen</span>
//                 <span class="label--not-pressed plyr__tooltip" role="tooltip">Enter fullscreen</span>
//             </button>
//           </div>
//         `;
//
//     const player = new Plyr('.js-player',{
//       controls: controls,
//       invertTime: true
//     });
//
//     window.addEventListener('load', function () {
//       player.play();
//       console.log('play')
//     });
//
// })(jQuery); // Fully reference jQuery after this point