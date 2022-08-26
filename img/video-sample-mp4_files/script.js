var $ = jQuery.noConflict();


/**

 * --------------------------------------------------------------------------

 *  Breakpoint

 * --------------------------------------------------------------------------

 */



// Breakpoint

var Breakpoint = {

    refreshValue: function() {

        var currentValue = window.getComputedStyle(document.querySelector('body'), ':before')

            .getPropertyValue('content')

            .replace(/\"/g, '');



        if (currentValue !== this.value) {

            this.value = currentValue;

            $(window).trigger('modechanged');

        }

    },

    initTabs: function() {

        $(window)

            .on('resize', function() {

                Breakpoint.refreshValue();

            })

            .trigger('resize');

    },

    //Responsive css breakpoint filters

    filters: function() {

        $(window)

            .on('modechanged', function() {

                if (Breakpoint.value === 'desktop') {

                    //example

                }



            })

            .trigger('modechanged');

    }

}

/**

 * --------------------------------------------------------------------------

 *  mobDevice

 * --------------------------------------------------------------------------

 */



// mobDevice

var mobDevice = false;

// Detect mobile devices

if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {

    $('body').addClass('m-d-active');

    mobDevice = true;

}





var PagePreload = {

    init: function () {

        PagePreload.cacheDom();

        PagePreload.preload();

    },

    cacheDom: function () {

        this.$el = $('.animsition-overlay');

    },

    preload: function () {

        this.$el.animsition({

            // inClass: 'fade-in',

            // outClass: 'fade-out',

            // inDuration: 1000,

            // outDuration: 800,

            // linkElement: '.animsition-link',

            loading: false,

            // loadingParentElement: 'body',

            // loadingClass: 'animsition-loading',

            // loadingInner: ' ', 

            timeout: false,

            // timeoutCountdown: 5000,

            // onLoadEvent: true,

            browser: ['animation-duration', '-webkit-animation-duration'],

            // overlay: false,

            // overlayClass: 'animsition-overlay-slide',

            // overlayParentElement: 'body',

            // transition: function (url) { window.location.href = url; }

        });

    }

}



/**

 * --------------------------------------------------------------------------

 *  Hamburger

 * --------------------------------------------------------------------------

 */



// Hamburger

var Hamburger = {



    init: function() {

        Hamburger.cacheDom();

        Hamburger.bindEvents();

    },

    cacheDom: function() {

        this.$el = $('.hamburger-menu .nav-icon');

        this.$nav = $('.header-navigation');

        this.$menu = $('.header-navigation .menu');

        this.$headerLogo = $('.header-logo');

        this.$header = $('.header-main');

        this.$sideNav = $('.side-nav');

    },

    bindEvents: function() {

        this.$el.on('click', this.trigger.bind(this));

    },

    trigger: function(e) {

        e.preventDefault();

        this.$el.toggleClass('open');

        if (this.$el.hasClass('open')) {

            this.$nav.addClass('active');

            this.$menu.addClass('visible');

            this.$headerLogo.addClass('active');

            this.$header.addClass('active');

            this.$sideNav.removeClass('active');

        } else {

            this.$menu.removeClass('visible');

            this.$headerLogo.removeClass('active');



            setTimeout(function() {

                $('.header-navigation').removeClass('active');

                $('.header-main').removeClass('active');

            }, 866);

        }

    }

};

var Menuitemevents = {

    init: function() {

        Menuitemevents.cacheDom();

        Menuitemevents.bindEvents();

    },

    cacheDom: function() {

        this.$el = $('.has-submenu.menu-item');

    },

    bindEvents: function() {

        this.$el.on('click', this.triggerClick);



        if (mobDevice == false) {

            this.$el.on('mouseleave', this.close);

            this.$el.on('mouseenter', this.open);

        }

    },

    triggerClick: function(e) {

        e.preventDefault();

        if ($(this).find('.custom-submenu-item').hasClass('active')) {

            $(this).find('.custom-submenu-item').removeClass('active');

            switch (Breakpoint.value) {

                case 'sm-p':

                case 'xs':

                case 'xs-p':

                    $(this).find('> a').removeClass('open');

                    $(this).find('.custom-submenu-item').slideUp();

            }

        } else {

            $(this).find('.custom-submenu-item').addClass('active');

            switch (Breakpoint.value) {

                case 'sm-p':

                case 'xs':

                case 'xs-p':

                    $(this).find('> a').addClass('open');

                    $(this).find('.custom-submenu-item').slideDown();

            }

        }

    },

    open: function() {

        $(this).find('.custom-submenu-item').addClass('visible');

    },

    close: function() {

        $(this).find('.custom-submenu-item').removeClass('visible');

    }

}

/**

 * --------------------------------------------------------------------------

 *  SmoothScroll

 * --------------------------------------------------------------------------

 */



// SmoothScroll

var SmoothScroll = {



    init: function() {

        SmoothScroll.cacheDom();

        SmoothScroll.bindEvents();

    },

    cacheDom: function() {

        this.$el = $('a[href*="#c-section"]:not([href="#"])');

    },

    bindEvents: function() {

        this.$el.on('click', this.trigger);

    },

    trigger: function(e) {

        e.preventDefault();



        var $elParentMarginTop = parseInt($(this).parent().css('margin-bottom'));



        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {

            var target = $(this.hash);

            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');

            if (target.length) {

                $('html, body').animate({

                    scrollTop: target.offset().top - (($elParentMarginTop) ? $elParentMarginTop : '')

                }, 1000);

                return false;

            }

        }

    }

};

/**

 * --------------------------------------------------------------------------

 *  ScrollEvents

 * --------------------------------------------------------------------------

 */



// ScrollEvents

var ScrollEvents = {



    init: function() {

        ScrollEvents.cacheDom();

        ScrollEvents.bindEvents();

    },

    cacheDom: function() {

        this.$elHamburger = $('.hamburger-menu');

        this.$hamburgerNavIcon = this.$elHamburger.find('.nav-icon');

        this.$elHamburgerItem = $('.hamburger-menu .nav-icon span');

        this.$scrolled = $(window).scrollTop();

        this.$headerPadding = parseInt($('.header-main').css('padding-top'));

        this.$headerMain = $('.header-main');

        this.lastScrollTop = 0;

        this.$headerNav = $('.header-navigation');

        this.$headerNavList = this.$headerNav.find('.menu');

        this.$headerLogo = $('.header-logo');

        this.$videoSectionBtn = $('.section-video:not(.section-video-btn)');

        this.$sideNav = $('.side-nav');

        this.sideNavList = $('.side-nav-list');

        this.sideNavWrapper = $('.side-nav-wrapper');

        this.$footerOffsetTop = $('.footer-main-wrapper').offset().top;

    },

    bindEvents: function() {

        $(document).on('ready', this.triggerReady.bind(this));

        $(window).on('scroll', this.triggerScroll.bind(this));

        // if (mobDevice) {

        //     this.sideNavWrapper.on('scroll', this.sideNavParallax);

        // } else {

        //     this.sideNavList.on('scroll', this.sideNavParallax);

        // }



    },

    triggerReady: function() {

        this.hamburgerChangeColor(this.$scrolled);

        this.videoTopPlay(this.$scrolled);

    },

    triggerScroll: function() {

        this.$scrolled = $(window).scrollTop();

        this.hamburgerChangeColor(this.$scrolled);

        this.checkScrollDirection(this.$scrolled);

        this.hideSideNavButton(this.$scrolled);

        this.hidePreloader(this.$scrolled);

        if (this.$videoSectionBtn.length > 0) {

            this.playVideoScroll(this.$scrolled);

        }

    },

    hamburgerChangeColor: function(scrollTop) {



        // var triggerElem = this.$elHamburger;



        if ($('.fullpage-section').length == 0) {			

            $('.hamburger-menu .nav-icon span').css('background-color', '');

            $('.page-title-box h2').css('color', '');

			$('.side-nav-button-box button').css('color', '').removeClass('active');

			$('.page-btn-box-single .btn-minus span').css('color', '');			

		}

		

        var section = $('.custom-section').each(function() {			

            var sectionColor = $(this).data('section-color');

            var sectionOffset = $(this).offset().top;

            var sectionHeight = $(this).innerHeight();

            //Check if header reach .custom section

            if ((scrollTop + $('.header-main').height()) > sectionOffset && scrollTop < sectionOffset + sectionHeight - 30) {

                $('.page-title-box h2').css('color', sectionColor);

                $('.hamburger-menu .nav-icon span').css('background-color', sectionColor);

            }

            //check if side nav button reach .custom section

            if ($('.side-nav-button-box').length > 0) {

                if ((scrollTop + $(window).innerHeight() / 2) > sectionOffset - 10 && (scrollTop + $(window).innerHeight() / 2) < sectionOffset + sectionHeight - 14) {

                    $('.side-nav-button-box button').css('color', sectionColor).addClass('active');

                }

            }

            //check if minus button reach .custom section

            if ($('.page-btn-box-single .btn-minus span').length > 0) {				

                if ((scrollTop + $(window).innerHeight() / 2) > sectionOffset && (scrollTop + $(window).innerHeight() / 2) < sectionOffset + sectionHeight - 4) {

					$('.page-btn-box-single .btn-minus span').css('color', sectionColor);	

				}							

			}			

		});	

		

		var pageThumb = $('.page-thumb');		

        if (pageThumb.length > 0) {

			var thumbSectionColor = pageThumb.data('section-color');

            if (scrollTop >= pageThumb.offset().top && scrollTop <= pageThumb.offset().top + pageThumb.innerHeight() + 24) {				

                $('.page-title-box h2').css('color', thumbSectionColor);

                $('.hamburger-menu .nav-icon span').css('background-color', thumbSectionColor);

                $('.page-btn-box-single .btn-minus').css('color', thumbSectionColor);

                $('.page-btn-box-single .btn-minus span').css('color', '');

            }

        }

    },

    checkScrollDirection: function(scrollTop) {



        var st = Math.abs(scrollTop);



        if (st > this.lastScrollTop) {

            if (this.$headerMain.hasClass('active')) {

                this.$headerNav.removeClass('active');

                this.$hamburgerNavIcon.removeClass('open');

                this.$headerNavList.removeClass('visible');

                this.$headerLogo.removeClass('active');

                this.$headerMain.removeClass('active');

            }



            this.$headerMain.removeClass('visible');



        } else if (st == this.lastScrollTop) {

            return

        } else {

            this.$headerMain.addClass('visible');

        }

        this.lastScrollTop = st;

    },

    playVideoScroll: function(scrollTop) {



        if (Breakpoint.value == 'xs-p' || mobDevice) {

            return

        } else {

            var triggerElem = this.$videoSectionBtn;



            triggerElem.each(function() {

                var triggerElemOffset = $(this).offset().top;

                if (scrollTop + (parseInt($(window).outerHeight() / 1.2)) > triggerElemOffset && scrollTop <= triggerElemOffset + $(this).outerHeight()) {

                    if ($(this)[0].paused) {

                        $(this).get(0).play();

                    }

                } else {

                    $(this).get(0).pause();

                }

            });

        }

    },

    videoTopPlay: function(scrollTop) {

        var firstSectionVideo = $('.custom-section:first-child .section-video');

        if (scrollTop === 0 && firstSectionVideo.length > 0 && firstSectionVideo.offset().top === 0) {

            firstSectionVideo.attr({ playsinline: 'true', autoplay: 'true', 'webkit-playsinline': 'true', preload: 'auto', 'x-webkit-airplay': 'true', muted: 'true', loop: 'true' });

        }

    },

    hidePreloader: function(scrollTop) {

        if (Preloader.$el.length > 0 && scrollTop > 0) {

            Preloader.hide();

        } else {

            return

        }

    },

    // sideNavParallax: function() {

    //     var $scrolled = $(this).scrollTop();

    //     $('.side-nav-list .nav-list-bg').each(function() {

    //         $(this).css({

    //             'background-position': 'center ' + (Math.floor($scrolled / 9)) + 'px'

    //         });

    //     })

    // }

    hideSideNavButton : function(scrollTop) {

        var footerOffset = $('.footer-main').offset().top ;

        if ($('.side-nav-button-box').length > 0) {

            if ((scrollTop + $(window).innerHeight() / 2) > footerOffset) {

                $('.side-nav-button-box').addClass('hide');

            } else {

                $('.side-nav-button-box').removeClass('hide');

            }

        }

    }

};

/**

 * --------------------------------------------------------------------------

 *  VideoPlayButton

 * --------------------------------------------------------------------------

 */



// VideoPlayButton

var VideoPlayButton = {



    init: function() {

        VideoPlayButton.cacheDom();

        VideoPlayButton.bindEvents();

        // VideoPlayButton.hideControls();

    },

    cacheDom: function() {

        this.$el = $('.btn-video');

        this.$video = this.$el.prev('.section-video');

    },

    bindEvents: function() {

        if (mobDevice) {

            this.$el.on('touchstart', this.trigger.bind(this));

        } else {

            this.$el.on('click', this.trigger.bind(this));

        }

    },

    trigger: function(e) {

        var videoPlayer = $(e.target).prev('.section-video').get(0);

        if (videoPlayer.paused || videoPlayer.ended) {

            videoPlayer.play();

        } else {

            videoPlayer.pause();

        }

    },

    hideControls: function() {

        var video = $('video').each(function() {

            $(this).get(0).controls == false;

        });

    }

};

/**

 * --------------------------------------------------------------------------

 *  SideNav

 * --------------------------------------------------------------------------

 */



// SideNav

var SideNav = {



    init: function() {

        SideNav.cacheDom();

        SideNav.breakpointChange();

        SideNav.bindTouchDevice();

        SideNav.initSideNavSlider();

    },

    cacheDom: function() {

        this.$elBody = $('body');

        this.$pageContent = this.$elBody.find('main.content');

        this.$pageFooter = this.$elBody.find('footer.footer-main')

        this.$headerMain = $('.header-main');

        this.$sideNav = $('.side-nav');

        this.$sideNavWrapper = $('.side-nav-wrapper');

        this.$sideNavList = $('.side-nav-list');

        this.$sideNavLink = $('.side-nav a');

        this.detectTap = null;

        this.$sidenavOverlay = $('.side-nav-overlay');

        this.inc_X_by = 0;

        this.X_prev = 0;

        this.total_X = 0;

        this.canChangeNav = true;

        this.bgPosition = 0;

        this.isIE11 = !!window.MSInputMethodContext && !!document.documentMode;

    },

    bindEvents: function() {

        if (this.$sideNav.length > 0) {

            this.$elBody.on('mousemove.menuTrigger', this.trigger.bind(this));

        }

    },

    unbindEvents: function() {

        if (this.$sideNav.length > 0) {

            this.$elBody.off('mousemove.menuTrigger');

        }

    },

    trigger: function(event) {



        var sideNavWidth = $('.side-nav').outerWidth();

        var sideNavPosition = this.$sideNav.offset().left + sideNavWidth;

        var cursorPositionX = event.pageX;

        var cursorPositionY = event.pageY;

        var cursorTriggerPosition = $('.side-nav-button-box button').outerWidth();

        var offsetLeft = $(event.target).offset().left;

        // var cursorX = (event.pageX - offsetLeft);



        if ((cursorPositionX < cursorTriggerPosition && cursorPositionY > $('.header-main').outerHeight()) && (cursorPositionY < $('.footer-nav').offset().top || cursorPositionY > ($('.footer-nav').offset().top + $('.footer-nav').outerHeight()))) {



            if(!this.$sideNav.hasClass('active')) {

                var offsetValue = 20 + 'px';

                var windowHeight = $(window).height();

                var btnHeight = $('.side-nav-button-box').outerHeight();

                

                this.$pageContent.css({

                    // transform: 'translate(' + offsetValue + ' ,' + 0 + ')'

                    'left': offsetValue

                });

                // this.$sideNavWrapper.css({

                //     left : ''

                // });

                this.$pageFooter.css({

                    transform: 'translate(' + offsetValue + ' ,' + 0 + ')'

                    // 'left', offsetValue

                });

                if (this.isIE11) {

                    this.$sideNav.css({

                        transform: 'translate(' + (-sideNavWidth + 20) + 'px ,' + 0 + ')'

                    });

                } else {

                    this.$sideNav.css({

                        transform: 'translate(' + (-sideNavWidth + 20) + 'px ,' + 0 +')'

                    });

                }

                

                $('.side-nav-button-box').css({ left: offsetValue, top: (windowHeight / 2) + (btnHeight /2)  }).addClass('triggered');

            }

            

            if (cursorPositionX < sideNavPosition && cursorPositionY > $('.header-main').outerHeight()) {

                this.$elBody.addClass('no-scroll');

                this.$sideNav.addClass('active');

                $('.side-nav-overlay').fadeIn();

                $('.nav-list-inner').addClass('active');

                this.$pageContent.css({

                    // transform: 'translate(' + (this.$sideNav.outerWidth()) + 'px ,' + 0 + ')'

                    'left': this.$sideNav.outerWidth()

                });

                this.$pageFooter.css({

                    transform: 'translate(' + (this.$sideNav.outerWidth()) + 'px ,' + 0 + ')'

                    // 'left', this.$sideNav.outerWidth()

                });

                this.$sidenavOverlay.fadeIn();

            }

        }

        if (cursorPositionX > cursorTriggerPosition && cursorPositionY > $('.header-main').outerHeight() && $('.side-nav.active').length == 0){

            this.hideSideNav();

        }

        if (cursorPositionX > $('.side-nav').outerWidth() && cursorPositionY > $('.header-main').outerHeight() && $('.side-nav.active').length > 0) {

            this.hideSideNav();

        }

    },

    hideSideNav: function() {

        this.$sideNav.css({

            transform: 'translate(' + (this.$sideNav.outerWidth() * -1 -2) + 'px ,' + 0 + ')'

        });

        this.$elBody.removeClass('no-scroll');

        this.$sideNav.removeClass('active');

        $('.side-nav-overlay').fadeOut();

        $('.nav-list-inner').removeClass('active');

        $('.side-nav-button-box').css({

            left: 0

        }).removeClass('triggered');

        this.total_X = 0;

        this.$pageContent.css({ 

            // transform: ''

            left: '' 

        });

        this.$pageFooter.css({ transform: '' });

    },

    breakpointChange: function() {

        $(window).on('modechanged', function() {

            switch (Breakpoint.value) {

                case 'sm':

                case 'sm-p':

                case 'xs':

                case 'xs-p':

                    SideNav.unbindEvents();

                    $('.side-nav').css({ transform: '' });

                    break;

                default:

                    SideNav.bindEvents()

            }



        }).trigger('modechanged');

    },

    bindTouchDevice: function() {

        if (mobDevice) {

			var that = this;

			var ts;

            this.$sideNav.on('touchstart', function(e) {

				this.detectTap = true;

				ts = e.originalEvent.touches[0].clientX;				

			});

			this.$sideNav.on('touchend', function(e) {

				var te = e.originalEvent.changedTouches[0].clientX;

				if(ts > te+35) {

					that.hideSideNav();

				}

            });

            this.$sideNav.on('touchmove', function() {

                this.detectTap = false;

            });

            this.$sideNavLink.on('click touchend', function(e) {

                if (e.type == 'click') {

                    this.detectTap == true;

                    $('.side-nav').removeClass('active');

                    SideNavButton.$sideNavOverlay.fadeOut();

                }

                if (this.detectTap) {

                    return true;

                }

            });

        }

    },

    initSideNavSlider: function () {

        this.$sideNavSlider = this.$sideNavList.lightSlider({

            item: 5,

            loop: true,

            vertical: true,

            pager: false,

            controls: false,

            verticalHeight: window.innerHeight,

            onBeforeSlide: function () {

                SideNav.canChangeNav = false;

            },

            onAfterSlide: function () {

                setTimeout(function () {

                    SideNav.canChangeNav = true;

                }, 250);

            }

        });

        this.$sideNavList.on('mousewheel', this.manageSideNavScroll);

    },

    manageSideNavScroll: function (e) {

        e.preventDefault();

        var self = SideNav;

        var delta = e.deltaFactor * e.deltaY;

        var navListBgHeight = $('.nav-list-bg').outerHeight();

        

        if(self.canChangeNav) {

            if(delta < 0) {

                self.$sideNavSlider.goToNextSlide();

                if (SideNav.bgPosition >= navListBgHeight / 5) {

                    SideNav.bgPosition

                } else {

                    SideNav.bgPosition+=5

                }

            }

            else {

                if (SideNav.bgPosition < navListBgHeight / 5 * -1) {

                    SideNav.bgPosition

                } else {

                    SideNav.bgPosition-=5

                }

                self.$sideNavSlider.goToPrevSlide();

            }

        }

        SideNav.sideNavParallax(SideNav.bgPosition);

    },

    sideNavParallax: function (bgPosition) {

        $('.side-nav-list .nav-list-bg').each(function() {

            $(this).css({

                'background-position': 'center ' + (Math.floor(bgPosition)) + 'px'

            });

        })

    }

};

/**

 * --------------------------------------------------------------------------

 *  FullPage

 * --------------------------------------------------------------------------

 */



// FullPage

var FullPage = {



    init: function() {

        FullPage.cacheDom();

        FullPage.trigger();

        FullPage.bindEvents();

    },

    cacheDom: function() {

        this.$el = $('.fullpage-section');

        this.$elSections = this.$el.find('.section');

        this.$overlay = $('.preloader');

        this.inc_Y_by = 0;

        this.Y_prev = 0;

        this.total_Y = 0;

    },

    bindEvents: function() {

        this.$el.on('mousemove', this.nextSectionShow.bind(this));

        this.$elSections.on('click', this.moveToNextSection);

    },

    trigger: function(e) {

        this.$el.fullpage({

            normalScrollElements: '.side-nav, .header-main, .preloader',

            scrollOverflow: false,

            autoscrolling:false,

            // menu: '.side-nav-list',

            // dragAndMove: 'vertical',

            // dragAndMoveKey: '8E8369A1-20254372-A62280C9-F4B5353F',

            continuousVertical: true,

            onLeave: function(index, nextIndex, direction) {

                if (direction == 'down' || direction == 'up') {

                    $('.side-nav-button-box button').removeClass('active');

                    $('.fullpage-section .section .fp-tableCell').css({

                        'top': 0 + 'px',

                        'bottom': 0 + 'px'

                    })

                    $('.fullpage-section .section').css({

                        'background-position': 'center top'

                    })

                }

            },

            afterLoad: function(anchorLink, index) {

                var pluginContainer = $(this);

                var sectionMainColor = pluginContainer.data('section-color');

                var btnPlusColor = $('.btn-plus').css('background-color');



                $(this).find('.page-title-box h2').css('color', sectionMainColor);

                $('.hamburger-menu .nav-icon span').css('background-color', sectionMainColor);

                $('.side-nav-button-box button').css('color', sectionMainColor).addClass('active');

                $(this).find('.btn-plus').css('background-color', sectionMainColor);



                if ($(this).find('.btn-plus').css('background-color') != btnPlusColor) {

                    $(this).find('.btn-plus span').css('color', btnPlusColor);

                }

            },

            afterRender: function() {

                var pluginContainer = $(this);

                var sectionMainColor = pluginContainer.find('.section.active').data('section-color');

                pluginContainer.find('.section.active .page-title-box h2').css('color', sectionMainColor);

                $('.hamburger-menu .nav-icon span').css('background-color', sectionMainColor);



            }

        });

    },

    nextSectionShow: function(e) {

        if(this.$el.find('.section.active').index() === this.$elSections.length - 1) {

            return 

        }



        var fullPageHeight = $(window).outerHeight();

        var offsetTop = $(e.target).offset().top;

        var mouse_Y = (e.pageY - offsetTop);



        if ((e.pageY > fullPageHeight - 100)) {



            if (this.Y_prev < mouse_Y) {

                this.inc_Y_by = 1;

            } else if (this.Y_prev == mouse_Y) {

                this.inc_Y_by = 0;

            } else {

                this.inc_Y_by = -1;

            }



            this.Y_prev = mouse_Y;

            this.total_Y = this.total_Y + this.inc_Y_by;

            var top = (Math.min(this.total_Y * -2.2, 0));



            if((top * -1) >= 90) {

                return false;

            }



            $('.fullpage-section .section .fp-tableCell').css({

                'top': top + 'px'

            })

            $('.fullpage-section .section').css({

                'background-position': 'center top ' + top + 'px'

            })

        }

        if ((e.pageY > $('.header-main').outerHeight() + 100 && e.pageY < fullPageHeight - 100)) {

            $('.fullpage-section .section .fp-tableCell').css({

                'top': 0 + 'px',

                'bottom': 0 + 'px'

            })

            $('.fullpage-section .section').css({

                'background-position': 'center top'

            })

            this.total_Y = 0;

        }

    },

    moveToNextSection: function () {

        var $this = $(this);



        // if($this.hasClass('active')) {

        //     return false;

    // }



        FullPage.$el.fullpage.moveTo($this.index() + 1);

    }

};

/**

 * --------------------------------------------------------------------------

 *  SideNavButton

 * --------------------------------------------------------------------------

 */



// SideNavButton

var SideNavButton = {



    init: function() {

        SideNavButton.cacheDom();

        SideNavButton.bindEvents();

    },

    cacheDom: function() {

        this.$el = $('.side-nav-button-box button');

        this.$sideNav = $('.side-nav');

        this.$document = $('#page');

        this.$elClose = $('.side-nav-btn-close');

        this.$body = $('body');

        this.$pageContent = this.$body.find('main.content');

        this.$pageFooter = this.$body.find('footer.footer-main');

        this.$sideNavLink = $('.side-nav a');

        this.$sideNavOverlay = $('.side-nav-overlay');

    },

    bindEvents: function() {

        // if (mobDevice) {

        //     this.$el.on('touchstart', this.trigger.bind(this));

        //     this.$sideNavLink.on('touchstart', this.hideSideNav.bind(this));

        //     this.$document.on('touchstart', this.hideBodyClick.bind(this));

        //     this.$elClose.on('touchstart', this.hide.bind(this));

        // }

        //  else {

        this.$el.on('click', this.trigger.bind(this));

        this.$sideNavLink.on('click touchstart', this.hidePreloader);

        this.$document.on('click', this.hideBodyClick.bind(this));

        this.$elClose.on('click', this.hide.bind(this));

        $(window).on('resize', this.setBtnPosition.bind(this));

        $(document).on('ready', this.setBtnPosition.bind(this));

        // }

    },

    trigger: function(e) {

        e.stopPropagation();



        if (this.$sideNav.hasClass('active')) {

            this.hide(e);

            $('.nav-list-inner').removeClass('active');

        } else {

            this.show();

            $('.nav-list-inner').addClass('active');



        }

    },

    show: function() {

        this.$sideNav.addClass('active');

        this.$body.addClass('no-scroll');

        this.$sideNavOverlay.fadeIn();

        if (Breakpoint.value == 'desktop' || Breakpoint.value == 'desktop-s') {

            // this.$pageContent.css('left', this.$sideNav.outerWidth());

            // this.$pageFooter.css('left', this.$sideNav.outerWidth());

            this.$pageContent.css({

                left: this.$sideNav.outerWidth()

                // transform: 'translate(' + (this.$sideNav.outerWidth()) + 'px ,' + 0 + ')'

            });

            this.$pageFooter.css({

                transform: 'translate(' + (this.$sideNav.outerWidth()) + 'px ,' + 0 + ')'

            });

        }

    },

    hide: function() {

        if (this.$sideNav.hasClass('active')) {

            this.$sideNav.removeClass('active');

            this.$body.removeClass('no-scroll');

            this.$sideNavOverlay.fadeOut();

            if (Breakpoint.value == 'desktop' || Breakpoint.value == 'desktop-s') {

                // this.$pageContent.css('left', 0);

                // this.$pageFooter.css('left', 0);

                this.$pageContent.css({ transform: '' });

                this.$pageFooter.css({ transform: '' });

            }

        }

    },

    hideBodyClick: function(e) {

        if (this.$sideNav.hasClass('active') && !$(e.target).closest('.side-nav').length) {

            this.$sideNav.removeClass('active');

            this.$body.removeClass('no-scroll');

            $('.nav-list-inner').removeClass('active');

            this.$sideNavOverlay.fadeOut();

        }

    },

    hideSideNav: function() {

        this.$sideNav.removeClass('active');

        this.$sideNavOverlay.fadeOut();

    },

    hidePreloader: function () {

        if (Preloader.$el.is(':visible')) {

            Preloader.hide();

        } 

    },

    setBtnPosition: function () {

        var windowHeight = $(window).height();

        var btnHeight = this.$el.outerHeight();

        $(this.$el).parent().css({ top: (windowHeight / 2) + (btnHeight / 2) });

    }

};

/**

 * --------------------------------------------------------------------------

 *  FullHeight

 * --------------------------------------------------------------------------

 */



// FullHeight

var FullHeight = {



    init: function() {

        FullHeight.cacheDom();

        FullHeight.bindEvents();

    },

    cacheDom: function() {

        this.$el = $('.custom-section');

    },

    bindEvents: function() {

        $(window).on('load modechanged', this.trigger);

    },

    trigger: function(e) {

        switch (Breakpoint.value) {

            case 'sm-p':

            case 'xs':

            case 'xs-p':

                if ($('.page-thumb').length == 0 && $('.main-sections .custom-section:first-child .section-video').length > 0) {

                    $('.main-sections > .custom-section:first-child').addClass('full-height');

                }

                break;

            default:

                $('.main-sections > .custom-section:first-child').removeClass('full-height');

                break;

        }

    }

};

//Preloader



var Preloader = {

    init: function() {

        Preloader.cacheDom();

        Preloader.bindEvents();

    },

    cacheDom: function() {

        this.$el = $('.preloader');

        this.$elBtn = this.$el.find('.preloader-button');

    },

    bindEvents: function() {

        if (mobDevice) {

            this.$elBtn.on('touchstart', this.hide.bind(this));

        } else {

            this.$elBtn.on('click', this.hide.bind(this));

            this.$el.on('mousewheel', this.hide.bind(this));

        }

    },

    hide: function() {

        this.$el.slideUp(700);

    }

}

var InviewAnimations = {

    init: function () {

        this.cacheDom();

        this.bindEvents();

    },

    cacheDom: function () {

        this.$animatedItems = $('.main-sections img, .text-section-inner, .section-headline-wrapper');

    },

    bindEvents: function () {

        this.$animatedItems.one('inview', this.animateItem);

    },

    animateItem: function () {

        $(this).addClass('animated');

    }

};

//PageChangeAnimBtn



var PageChangeAnimBtn = {

    init: function() {

        PageChangeAnimBtn.cacheDom();

        PageChangeAnimBtn.bindEvents();

    },

    cacheDom: function() {

        this.$elArchive = $('.btn-anim-archive');

        this.$elSingle = $('.btn-anim-single');

    },

    bindEvents: function() {

        this.$elArchive.on('click', pageLocalStorage.save);

        this.$elSingle.on('click', pageLocalStorage.save);

    }

}

//pageLocalStorage



var pageLocalStorage = {

    init: function () {

        pageLocalStorage.html5_storage_support();

        pageLocalStorage.save();

        pageLocalStorage.set();

    },



    html5_storage_support: function () {

        try {

            return 'localStorage' in window && window['localStorage'] !== null;

        } catch (e) {

            return false;

        }

    },

    save: function (e) {

        if (pageLocalStorage.html5_storage_support()) {

            e.preventDefault();

            var linkHref = $(this).attr('href');

            var linkProjects;

            if ($(this).hasClass('btn-anim-archive')) {

                linkProjects = window.location.href;

            }

            var value = $(this).attr('data-pageAnim');

            localStorage.setItem('value', value);

            localStorage.setItem('linkProjects', linkProjects);

            $('.overlay-anim').addClass('overlay-anim-' + value);

            setTimeout(function () {

                location.href = linkHref;

            }, 1000);

        }

    },

    set: function () {

        if (pageLocalStorage.html5_storage_support()) {

            if (localStorage.getItem('value') != null) {

                if($('.preloader').length > 0) {

                    $('.preloader').addClass('hide');

                }

                $('.overlay-anim').addClass('overlay-anim-active');

                var linkToProjectBlogPage = localStorage.getItem('linkProjects');

                $('.btn-anim-single').attr('href', linkToProjectBlogPage);

                $('body').removeClass('hidden-black');

                $('#page').removeClass('hidden');

                $('.outer-storage-overlay').removeClass('outer-storage-overlay-active');

                setTimeout(function () {

                    localStorage.removeItem('linkProjects');

                }, 500);

            }

            if (localStorage.getItem('value') == 'left') {

                $('.overlay-anim').addClass('overlay-anim-right-hide');

                setTimeout(function () {

                    $('.overlay-anim').removeClass('overlay-anim-active overlay-anim-right-hide');

                }, 2500);

            }

            if (localStorage.getItem('value') == 'right') {

                $('.overlay-anim').addClass('overlay-anim-left-hide');

                setTimeout(function () {

                    $('.overlay-anim').removeClass('overlay-anim-active overlay-anim-left-hide');

                }, 2500);

            }

            localStorage.removeItem('value');

        }

    }

}

var Project = {

    init: function() {
        pageLocalStorage.set();
        Breakpoint.refreshValue();
        Breakpoint.initTabs();
        Breakpoint.filters();
        Hamburger.init();
        Menuitemevents.init();
        SmoothScroll.init();
        ScrollEvents.init();
        VideoPlayButton.init();
        SideNav.init();
        FullPage.init();
        SideNavButton.init();
        FullHeight.init();
        Preloader.init();
        InviewAnimations.init();
        PageChangeAnimBtn.init();
        PagePreload.init();

    }
}

$(document).ready(function() {
    Project.init();
});