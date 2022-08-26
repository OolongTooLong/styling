let archivePage = (() => {
    let init = () => {
        $(document).ready(function () {
          if ($("#card-section-case-studies").length) {
            showMore();
          }
        });
    },
    showMore = () => {
      let card = $('.card');
      let button = $('.button-wrap');
      // Hide all items
      card.hide();
      button.hide();
      // Show first 12 items
      window.addEventListener("load", event => {
        var image = document.querySelector('.image');
        var isLoaded = image.complete && image.naturalHeight !== 0;
          card.slice(0, 9).show();
          button.fadeIn();
      });
      $("#show-more").on('click', function (e) {
        e.preventDefault();
        // Target hidden items
        let card = '.card:hidden'
        $(card).slice(0, 6).fadeIn();
        // If there are no more hidden items hide the button
        if ($(card).length == 0) {
          $("#show-more").fadeOut('slow');
        }
      });
    }
    ;
    init();
    return {};
})();
