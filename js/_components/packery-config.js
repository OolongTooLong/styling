let masonryApp = (() => {
  let init = () => {
      $(document).ready(function () {
        createElements();

      });
      document.body.onload = function () {

      };
    },
    createElements = () => {
      let html = '';
      let imgSrc = '';
      let length = 20;
      let heights = [1600, 1700, 1650, 1750, 1700, 1650, 1700, 1650, 1750, 1700, 1650, 1700, 1650, 1750, 1700, 1650, 1700, 1650, 1750, 1700, 1650, 1700, 1650, 1750, 1700, 1650, 1700, 1650, 1750, 1700, 1650]
      for (let i = 0; i < length; i++) {
        imgSrc = "https://x2x.media/?action=asset&id=7d64bbf4-3f8a-49b7-b004-2ed21f4bd908";
        html += '<div class="grid-item">'
          + '<div class="inner" style="padding-bottom:' + heights[i] / 1000 * 100 + '%";>'
          + '<div class="overlay"><h4>Name</h4><button class="button ghost small">PLAY TRAILER</button></div>'
          + '<img src="' + imgSrc + '"/>'
          + '</div>'
          + '</div>'
      }
      renderElements(html)
    },

    renderElements = (html) => {
      let container = document.getElementById('powered-list');
      container.insertAdjacentHTML('beforeEnd', html);
      let gridItem = $('.grid-item')
      gridItem.hide();
      gridItem.slice(0, 4).fadeIn();

      arrangeElements();
    }

    arrangeElements = () => {
      let packeryOptions = {
        itemSelector: '.grid-item',
        columnWidth: '.grid-sizer',
        gutter: '.gutter-sizer',
        percentPosition: true,
        horizontalOrder: true,
      };
      $('#powered-list').packery( packeryOptions );

      $("#loadMore").on('click', function (e) {
        e.preventDefault();
        let gridItem = '.grid-item:hidden'
        let container = '#powered-list'
        $(gridItem).slice(0, 4).fadeIn();
        $(container).packery('destroy');
        $(container).packery( packeryOptions );
        if ($(gridItem).length == 0) {
          $("#loadMore").fadeOut('slow');
        }
      });
    }


  init();
  return {
    // loadMore : ()=>{loadMore();}
  };
})();
