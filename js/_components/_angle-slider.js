let angleSliderSettings = (() => {
  let init = () => {
    $(document).ready(function() {
      if ($('.angle-slider').length) {
        angleSlider();
      }
    });
  },
  angleSlider=()=>{
        gsap.registerPlugin(Draggable, InertiaPlugin);

        const slideDelay = 5;
        const slideDuration = 1;
        let snapX;
        const slides = document.querySelectorAll(".slide-image");
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

        animation.pause();
        var proxy = document.createElement("div");
        var slideAnimation = gsap.to({}, {});
        var slideWidth = 0;
        var wrapWidth = 0;
        let first = 1;
        let playButton = document.querySelector(".play");
        let pauseButton = document.querySelector(".pause");
        let allProgress = $('.bg-progress');
        let allSlideText= $('.slide-text ');
        let navBlocks = gsap.utils.toArray(".nav-block");
        resize();

        var draggable = new Draggable(proxy, {
            type: "x",
            trigger: "#hero",
            inertia: true,
            maxDuration: 0.75,
            minDuration: 0.1,
            onPress: function(){
                updateDraggable;
            },
            onDrag: function(){
                updateProgress;
                onDragAnimation();
            },
            onThrowUpdate: updateProgress,
            onThrowComplete: onThrowCompleteAnimation,
            allowContextMenu : true,
            allowNativeTouchScrolling: true,
            snap: {
                x: value => snapX(value, draggable.deltaX < 0 ? -1 : 1)
            }
        });
        function onDragAnimation () {
            console.log('onDragAnimation');
            gsap.to(allSlideText, { opacity: 0 })
        }
        function onThrowCompleteAnimation (){
            let currentIndex = animation.progress() * numSlides;
            var slideContent = slides[currentIndex].parentNode.childNodes[3];

            gsap.to(slideContent, { y: 0, opacity: 1, stagger: 0.2 })
            timer.restart(true);
        }

        window.addEventListener("resize", resize);

        pauseButton.addEventListener("click", (e) => {
            console.log('pauseButton');
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

                var slideContent = slides[index].parentNode.childNodes[3];

                slideAnimation = gsap.to(proxy, {
                    x: x,
                    duration: slideDuration,
                    onStart: () => {
                        gsap.set(allSlideText, { opacity: 0 })
                        gsap.set(slideContent, { y: 30, opacity: 0 })
                    },
                onUpdate: updateProgress,
                    onComplete: () => gsap.to(slideContent, {y: 0, opacity: 1, stagger: 0.2})
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
                onStart: () => {
                    gsap.set(allSlideText, { opacity: 0 })
                    gsap.set(slideContent, { y: 30, opacity: 0 })
                },
                onUpdate: updateProgress,
                onComplete: () => gsap.to(slideContent, { y: 0, opacity: 1, stagger: 0.2 })
            });

        }

        function updateProgress() {
            animation.progress(progressWrap(gsap.getProperty(proxy, "x") / -wrapWidth));
            updateNav();
            allProgress.removeClass('complete');
            playButton.classList.add('hidden');
            pauseButton.classList.remove('hidden');
        }

        function updateNav(){
            let currentIndex = animation.progress() * numSlides;
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



  ;
  init();
  return {};
})();
