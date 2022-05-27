function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

var genericTemplateApp = function () {
  var init = function init() {
    $(document).ready(function () {});
    document.fonts.ready.then(function () {});
  },
      lightOrDark = function lightOrDark() {
    var prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

    if (prefersDarkScheme.matches) {
      document.body.classList.add("dark-theme");
    } else {
      document.body.classList.remove("dark-theme");
    }
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

(function ($) {
  // Select all links with hashes
  $('a[href*="#"]') // Remove links that don't actually link to anything
  .not('[href="#"]').not('[href="#0"]').click(function (event) {
    // On-page links
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      // Figure out element to scroll to
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']'); // Does a scroll target exist?

      if (target.length) {
        // Only prevent default if animation is actually gonna happen
        event.preventDefault();
        $('html, body').animate({
          scrollTop: target.offset().top - 250
        }, 1000, function () {
          // Callback after animation
          // Must change focus!
          var $target = $(target);
          $target.focus();

          if ($target.is(":focus")) {
            // Checking if the target was focused
            return false;
          } else {
            $target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable

            $target.focus(); // Set focus again
          }

          ;
        });
      }
    }
  });
})(jQuery); // Fully reference jQuery after this point


'use strict';

(function ($) {
  // Block Trigger
  $(".draw").hide();
  $(".trigger").click(function () {
    var $this = $(this);
    $this.parent('.accordion-block').toggleClass('active');
    $this.next().slideToggle("fast", "linear", function () {// Animation complete.
    });
  }); // Channel Trigger
  // $(".cat-content").hide();
  // $(".channel-trigger").click(function () {
  //     let $this = $(this);
  //     let $catContent = $this.parent('.grid').next('.cat-content');
  //     $this.toggleClass('active');
  //     $catContent.toggleClass('active');
  //     $catContent.slideToggle( "medium","linear", function() {
  //         // Animation complete.
  //     });
  // });
})(jQuery); // Fully reference jQuery after this point.


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


var isotopeApp = function () {
  var init = function init() {
    $(document).ready(function () {
      IsoInit();
    });
  },
      IsoInit = function IsoInit() {
    $('.isotope-wrapper').isotope({
      // set itemSelector so .grid-sizer is not used in layout
      itemSelector: '.grid-item',
      percentPosition: true,
      masonry: {
        // use element for option
        columnWidth: '.grid-sizer'
      }
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


function O(i) {
  return _typeof(i) == 'object' ? i : document.getElementById(i);
}

function S(i) {
  return O(i).style;
}

function C(i) {
  return document.getElementByClassName(i);
}

'use strict';

(function ($) {// $('p').each(function(){
  //     var string = $.trim($(this).html());
  //     string = string.replace(/ ([^ ]*) ([^ ]*)$/,'&nbsp;$1&nbsp;$2');
  //     $(this).html(string);
  // });
})(jQuery); // Fully reference jQuery after this point