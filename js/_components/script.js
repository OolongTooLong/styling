function O(i) {
    return typeof i == 'object' ? i : document.getElementById(i)
}

function S(i) {
    return O(i).style

}

function C(i) {
    return document.getElementByClassName(i)
}
'use strict';
(function ($) {
        // $('p').each(function(){
        //     var string = $.trim($(this).html());
        //     string = string.replace(/ ([^ ]*) ([^ ]*)$/,'&nbsp;$1&nbsp;$2');
        //     $(this).html(string);
        // });


})(jQuery); // Fully reference jQuery after this point
