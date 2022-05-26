'use strict';
(function ($) {
// This will create a single gallery from all elements that have class "gallery-item"
    $('.gallery-item').magnificPopup({
        type: 'image',
        gallery:{
            enabled:true
        }
    });
    $('.popup-video').magnificPopup({
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,
        fixedContentPos: false
    });
    $('.open-card-popup').magnificPopup({
        type:'inline',
        midClick: false // Allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source in href.
    });
    $('.open-contact-popup').magnificPopup({
        type:'inline',
        midClick: false // Allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source in href.
    });
    $('.popup-tweet').magnificPopup({
        type: 'inline',
        gallery:{
            enabled:true
        }
    });
    $('.open-popup-link').magnificPopup({
        type:'inline',
        gallery:{
            enabled:true
        },
        midClick: true // Allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source in href.
    });

})(jQuery); // Fully reference jQuery after this point.
