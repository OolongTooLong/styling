let masonryApp = (() => {
  let init = () => {
      $(document).ready(function () {
        isoInit();
        initVideo();
      });
    },

    // isoInit = () => {
    //   $('.grid-item img').each(function(){
    //     // Create dummy image to get real width and height
    //     this.attr("src", $(img).attr("src")).load(function(){
    //       var realWidth = this.width;
    //       var realHeight = this.height;
    //       alert("Original width=" + realWidth + ", " + "Original height=" + realHeight);
    //     });
    //   });
    // }

    isoInit = () => {
      $('.packery-wrapper').packery({
        // options
        itemSelector: '.grid-item',
        columnWidth: '.grid-sizer',
        gutter: '.gutter-sizer',
        percentPosition: true,
        horizontalOrder: true,
      });
    }
    initVideo = () => {

    }

  init();
  return {};
})();
