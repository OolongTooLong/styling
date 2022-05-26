'use strict';
(function ($) {
    window.dataLayer = window.dataLayer || [];
    let options = {
        title: 'Cookies & Privacy Policy',
        message: ['Our website uses cookies to improve user experience. By continuing to browse you are giving us your consent to our use of cookies.'],
        delay: 600,
        expires: [30],
        link: '/privacy-policy',

        onAccept: function () {
            let myPreferences = $.fn.ihavecookies.cookie();
            if ($.fn.ihavecookies.preference('analytics') === true) {
                document.cookie = 'ga-opt-out=false; expires=Thu, 31 Dec 2099 23:59:59 UTC; samesite=lax; path=/';
            }else{
                document.cookie = 'ga-opt-out=true; expires=Thu, 31 Dec 2099 23:59:59 UTC; samesite=lax; path=/';
            }
            if ($.fn.ihavecookies.preference('marketing') === true) {
                document.cookie = 'marketing-opt-out=false; expires=Thu, 31 Dec 2099 23:59:59 UTC; samesite=lax; path=/';
            }else{
                document.cookie = 'marketing-opt-out=true; expires=Thu, 31 Dec 2099 23:59:59 UTC; samesite=lax; path=/';
            }
            if ($.fn.ihavecookies.preference('preferences') === true) { }
            $("#cookie-wrapper").remove();
            //page reload to fire analytics
            location.reload();
        },

        uncheckBoxes: true,
        acceptBtnLabel: 'Accept Cookies',
        moreInfoLabel: 'More information',
        cookieTypesTitle: 'Select which cookies you want to accept',
        fixedCookieTypeLabel: 'Essential',
        fixedCookieTypeDesc: 'These are essential for the website to work correctly.'
    }

    $(document).ready(function () {
        $('body').ihavecookies(options);
        $('.button-cookie').on('click', function () {
            $('body').ihavecookies(options, 'reinit');
            $("#cookie-wrapper").show();
        });
    });

})(jQuery); // Fully reference jQuery after this point.
