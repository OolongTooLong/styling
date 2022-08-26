let formSettings = (() => {
    let init = () => {
        $(document).ready(function () {
          if ($("#form").length) {
            formSettings();
          }
        });
    },
    formSettings=()=>{

      $('.customText').each(function(){
        var $this = $(this), optionWrapper = $(this).children('.options'), options = $(this).children('.options').children('p'), input = $(this).children('input');
        input.click(function(){
          optionWrapper.addClass('active')
        });
        input.on('focusout', function () {
          optionWrapper.removeClass('active');

        });

        options.click(function(e) {
          input.val(e.target.innerText);
          optionWrapper.removeClass('active');
        });
      });
    }
    ;
    init();
    return {};
})();
